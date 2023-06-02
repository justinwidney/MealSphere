import { objectType, extendType, intArg, nonNull, arg } from "nexus";
import { resolve } from "path";
import { PostalCode } from "./PostalCodes_Model";

export const PostalCode_Query = extendType({
  type: "Query",
  definition(t) {
    t.nullable.field("PostalCode", {
      type: "PostalCode",
      args: {
        id: intArg(),
      },
      resolve: (_parent, args, context) => {
        return context.prisma.PostalCode.findUnique({
          where: { postalCode: args.id || undefined },
        });
      },
    });
  },
});
