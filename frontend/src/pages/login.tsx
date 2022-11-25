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

import { useState } from "react";
import Router, { NextRouter, useRouter } from "next/router";
import { validateNewUser } from "../data/validation/user";
import axios from "axios";
import { toErrorMap } from "../utils/toErrorMap";
import e from "cors";
import { response } from "express";
import Error from "next/error";

interface LoginProps {}

interface Errors {
  field: string;
  message: string;
}
// The below import defines which components come from formik
// import { Field, Form, Formik } from 'formik';

export const Login: React.FC<LoginProps> = ({}) => {
  axios.defaults.withCredentials = false;

  const router = useRouter();
  const [validationMessage, setValidationMessage] = useState<string>("");

  const validateLogin = async (values: any): any => {
    if (false) {
      e.preventDefault();
      Router.push("/login?how=loggedin");
    } else {
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
    }
  };

  const handleSubmit = async (values: any) => {
    const payload = {
      username: values.username,
      password: values.password,
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/login/password",
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
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await validateLogin(values);

          console.log(response, "did i get these");

          if (response?.Errors) {
            console.log("Setting Errors");

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
              <Box mb={4}>
                <InputField
                  name="username"
                  placeholder="username"
                  label="Username"
                  //value={modifiedData.username}
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
                Login
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
