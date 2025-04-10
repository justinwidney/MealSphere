import { verify } from "jsonwebtoken";

interface JwtPayload {
  id: number;
  username: string;
}

const APP_SECRET = process.env.JWT_SECRET;

function getTokenPayload(token) {
  let SECRET = process.env.JWT_SECRET as string;

  return verify(token, SECRET);
}

export function getUserId(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");

      if (!token) {
        throw new Error("No token found");
      }
      const { id } = getTokenPayload(token) as JwtPayload;

      return id;
    }
  } else if (authToken) {
    const { id } = getTokenPayload(authToken) as JwtPayload;
    return id;
  }

  throw new Error("Not authenticated");
}

export const validateRegister = (data) => {
  if (data.username.length <= 4) {
    return {
      field: "username",
      message: "length must be greater than 2",
    };
  }

  if (data.username.includes("@")) {
    return {
      field: "username",
      message: "cannot include an @",
    };
  }

  if (data.password.length <= 4) {
    return {
      field: "password",
      message: "length must be greater than 4",
    };
  }

  return null;
};
