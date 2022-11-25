import { FieldError } from "../../generated/graphql";
import { ValidationError, ValidationCode } from "./validation-error";

export function validateUsername(values: {
  username: string;
  password: string;
}) {
  if (values.username.length < 3 || values.username.length > 32) {
    return {
      Errors: {
        field: "username",
        message: "username too short",
      },
    };
  }
  return {};
}

export function validateNewUser(values: {
  username: string;
  password: string;
}) {
  if (values.username.length < 3 || values.username.length > 32) {
    return {
      Errors: {
        field: "username",
        message: "username too short",
      },
    };
  }

  if (values.password.length < 8 || values.password.length > 100) {
    return {
      Errors: {
        field: "password",
        message: "password too short",
      },
    };
  }

  return {};
}
