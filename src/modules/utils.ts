import { verify } from "jsonwebtoken";

interface JwtPayload {
  id: number;
  username: string;
}

const APP_SECRET = process.env.JWT_SECRET;

function getTokenPayload(token) {
  return verify(token, APP_SECRET);
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
      console.log(id);
      return id;
    }
  } else if (authToken) {
    const { id } = getTokenPayload(authToken) as JwtPayload;
    return id;
  }

  throw new Error("Not authenticated");
}
