import { FormControl, Button, Box } from "@chakra-ui/react";
import axios from "axios";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import {
  validateNewLogin,
  validateNewPassword,
} from "../../data/validation/user";
import { toErrorMap } from "../../utils/toErrorMap";

export const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [tokenError, setTokenError] = useState("");

  const validateChange = async (values: any) => {
    try {
      const Errors = await validateNewPassword(values);

      if (Object.keys(Errors).length) {
        console.log(Errors);
        return Errors;
      }

      const response = await handleSubmit(values);

      return { token: response };
    } catch (Errors: any) {
      console.log("got here?", Errors);
      return { Errors: { field: Errors.field, message: Errors.message } };
    }
  };

  const handleSubmit = async (values: any) => {
    const payload = {
      password: values.password,
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/change/password",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response, "check");
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common["Authorization"] =
        "Bearer" + response.data.token;
      return response.data.token;
    } catch (e) {
      console.log(e, "the error");
      throw e.response.data.Errors;
    }
  };

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await validateChange(values);
          if (response?.Errors) {
            const errorMap = toErrorMap(response.Errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.token) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormControl>
              <InputField
                name="password"
                placeholder="new Password"
                label="New Password"
                type="password"
                //value={modifiedData.username}
                //onChange={handleChange}
              ></InputField>
              {tokenError ? <Box color="red">{tokenError}</Box> : null}
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Change Password
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
