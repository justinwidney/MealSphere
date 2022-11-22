import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (e) {
    e.type = "input";
    console.log(e);
    next(e);
  }
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePassword(req.body.password, user.password);

  if (!isValid) {
    res.state(401);
    res.json({ message: "nope" });
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
