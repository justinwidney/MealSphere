import { inputObjectType } from "nexus";

export const PostalCodeCreateInput = inputObjectType({
  name: "PostalCodeCreateInput",
  definition(t) {
    t.nonNull.string("postalCode");
    t.nonNull.string("postalCity");
    t.string("postalRegion");
    t.nonNull.string("postalLat");
    t.nonNull.string("postalLong");
  },
});

export default { PostalCodeCreateInput };
