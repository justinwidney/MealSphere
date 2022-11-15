import { resolve } from "path";
import prisma from "../db";

// GET All
export const getIngrediants = async (req, res) => {
  const Ingrediants = await prisma.Ingredient.findMany({
    where: {
      recipeHolder: {
        some: {
          recipeid: req.params.id,
        },
      },
    },
  });

  res.json({ data: Ingrediants });
};

export const getOneIngrediant = async (req, res) => {
  const Ingredient = await prisma.Ingrediants.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: Ingredient });
};

export const createIngredient = async (req, res) => {
  const Ingredient = await prisma.Ingredients.create({
    where: {
      name: req.body.name,
      calories: req.body.calories,
    },
  });

  res.json({ data: Ingredient });
};

export const updateIngredient = async (req, res) => {
  const Ingredient = await prisma.Ingredients.update({
    where: {
      id: req.body.id,
    },
    data: {
      name: req.body.name,
      calories: req.body.calories,
    },
  });

  res.json({ data: Ingredient });
};

export const deleteIngredient = async (req, res) => {
  const deleted = await prisma.Ingredients.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: deleted });
};
