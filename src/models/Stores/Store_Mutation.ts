import { objectType, extendType } from "nexus";
import { nonNull, arg } from "nexus";
import { isAuth } from "../../middleware/isAuth";
import { getUserId } from "../../modules/utils";
import { GraphQLError } from "graphql";

export const Store_Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createStore", {
      type: "Store",
      args: {
        data: nonNull(
          arg({
            //FIELDS: (recipeName / instructions / recipeCookTime / recipeServings / skillLvl)
            type: "StoreCreateInput",
          })
        ),
      },
      resolve: async (_, args, context) => {
        const Store = await context.prisma.Recipe.create({
          data: {
            storeName: args.data.storeName,
            storeAddress: args.data.storeAddress,
            storeCity: args.data.storeCity,
            storeLat: args.data.storeLat,
            storeLong: args.data.storeLong,
            storeZip: args.data.storeZip,
          },
        });

        return Store;
      },
    });
  },
});
