import { objectType, extendType } from "nexus";
import { nonNull, arg } from "nexus";
import { isAuth } from "../../middleware/isAuth";
import { getUserId } from "../../modules/utils";
import { GraphQLError } from "graphql";

export const PostalCode_Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPostalCode", {
      type: "PostalCode",
      args: {
        data: nonNull(
          arg({
            //FIELDS: (recipeName / instructions / recipeCookTime / recipeServings / skillLvl)
            type: "PostalCode CreateInput",
          })
        ),
      },
      resolve: async (_, args, context) => {
        const recipe = await context.prisma.Recipe.create({
          data: {
            postalCode: args.data.postalCode,
            postalCity: args.data.postalCity,
            postalRegion: args.data.postalRegion,
            postalLat: args.data.postalLat,
            postalLong: args.data.postalLong,
          },
        });

        return recipe;
      },
    });
  },
});
