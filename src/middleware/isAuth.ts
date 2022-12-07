import { MiddlewareFn } from "type-graphql";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

type MyContext = {
  req: Request;
  res: Response;
  prisma: PrismaClient;
  userId: number;
};

export const isAuth = (id: number) => {
  if (!id) {
    throw new Error("not authenticated");
  }
  return true;
};
