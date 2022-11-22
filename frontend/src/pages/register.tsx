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
import Router, { NextRouter } from "next/router";
import { validateNewUser } from "../data/validation/user";
import axios from "axios";
import { useSignupMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}
// The below import defines which components come from formik
// import { Field, Form, Formik } from 'formik';

export const Register: React.FC<registerProps> = ({}) => {
  axios.defaults.withCredentials = true;

  //const [loginId, setLoginId] = useState<string>("");
  //const [loginPassword, setLoginPassword] = useState<string>("");

  const [, register] = useSignupMutation();

  const [modifiedData, setModifiedData] = useState({
    username: "",
    password: "",
  });

  const [registerId, setRegisterId] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");

  const [validationMessage, setValidationMessage] = useState<string>("");

  const validateLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    if (false) {
      e.preventDefault();
      Router.push("/login?how=loggedin");
    } else {
      try {
        validateNewUser({ id: loginId, password: loginPassword });
      } catch (err: any) {
        e.preventDefault();
        setValidationMessage(err.message);
      }
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setModifiedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateRegister = (e: React.FormEvent<HTMLFormElement>): void => {
    if (false) {
      e.preventDefault();
      Router.push("/login?how=loggedin");
    } else {
      try {
        validateNewUser({
          id: modifiedData.username,
          password: modifiedData.password,
        });
        handleSubmit(e);
      } catch (err: any) {
        e.preventDefault();
        setValidationMessage(err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username: modifiedData.username,
      password: modifiedData.password,
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/signup",
        payload
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper variant="small">
      {validationMessage && <p>{validationMessage}</p>}
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          console.log(response);
          if (response.data?.signupUser.Errors) {
            setErrors({ username: "broke" });

            //setErrors(toErrorMap(response.data.signupUser.Errors));
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
