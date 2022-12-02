function val_username(username: string) {
  if (username.length < 3 || username.length > 32) {
    return {
      Errors: {
        field: "username",
        message: "username too short",
      },
    };
  }
  return {};
}

export function validateUsername(values: {
  username: string;
  password: string;
}) {
  const Errors = val_username(values.username);

  if (Object.keys(Errors).length) {
    return Errors;
  }

  return {};
}

export function validateNewUser(values: {
  username: string;
  password: string;
  email: string;
}) {
  const Errors = val_username(values.username);
  if (Object.keys(Errors).length) {
    return Errors;
  }

  if (
    values.email.length < 3 ||
    values.email.length > 32 ||
    !values.email.includes("@")
  ) {
    return {
      Errors: {
        field: "email",
        message: "email too short",
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

export function validateNewLogin(values: {
  username: string;
  password: string;
}) {
  const Errors = val_username(values.username);

  if (Object.keys(Errors).length) {
    return Errors;
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
