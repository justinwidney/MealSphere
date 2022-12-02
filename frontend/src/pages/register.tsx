import React from "react";
import { Form, Formik } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";

import { Cookies } from "react-cookie";

import { useState } from "react";
import Router, { NextRouter, useRouter } from "next/router";
import { validateNewUser } from "../data/validation/user";
import axios from "axios";
import { useSignupMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}
// The below import defines which components come from formik
// import { Field, Form, Formik } from 'formik';

export const Register: React.FC<registerProps> = ({}) => {
  axios.defaults.withCredentials = false;

  const router = useRouter();
  const [validationMessage, setValidationMessage] = useState<string>("");

  const validateRegister = async (values: any): any => {
    try {
      const Errors = await validateNewUser(values);

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
      username: values.username,
      password: values.password,
      email: values.email,
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/signup",
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
      {validationMessage && <p>{validationMessage}</p>}
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await validateRegister(values);
          if (response?.Errors) {
            setErrors(toErrorMap(response.Errors));
          } else if (response.token) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form //onSubmit={validateRegister}>
          >
            <FormControl>
              <Box mb={2}>
                <InputField
                  name="username"
                  placeholder="username"
                  label="Username"
                  //value={modifiedData.username}
                  //onChange={handleChange}
                ></InputField>
              </Box>
              <Box mb={2}>
                <InputField
                  name="email"
                  placeholder="email"
                  label="email"
                  type="email"

                  //value={modifiedData.password}
                  //onChange={handleChange}
                ></InputField>
              </Box>
              <InputField
                name="password"
                placeholder="password"
                label="password"
                type="password"
                //value={modifiedData.password}
                //onChange={handleChange}
              ></InputField>

              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Register
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
