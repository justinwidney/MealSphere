import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
        email: req.body.email,
      },
    });
    const token = createJWT(user);
    res.json({ token });
    return;
  } catch (error) {
    res.status(401);
    res.json({
      Errors: { field: "username", message: "username is taken" },
    });
    return;
  }
};

export const signin = async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: req.body.username }, { email: req.body.username }],
    },
  });

  if (!user) {
    res.status(401);
    res.json({ Errors: { field: "username", message: "user doesn't exist" } });
    return;
  }

  const isValid = await comparePassword(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ Errors: { field: "password", message: "incorrect password" } });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};

export const getUser = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return user;
};

export const getPassword = async (username: string, password: String) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    return false;
  }

  return true;
};
