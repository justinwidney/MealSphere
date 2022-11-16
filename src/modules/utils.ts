import { verify } from "jsonwebtoken";

interface JwtPayload {
  userId: string;
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
      const { userId } = getTokenPayload(token) as JwtPayload;
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken) as JwtPayload;
    return userId;
  }

  throw new Error("Not authenticated");
}
