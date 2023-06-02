import { interfaceType, objectType } from "nexus";

export const PostalCode = objectType({
  name: "PostalCode",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("postalCode");
    t.nonNull.string("postalCode");
    t.nonNull.string("postalCity");
    t.string("postalRegion");
    t.nonNull.string("postalLat");
    t.nonNull.string("postalLong");
  },
});
