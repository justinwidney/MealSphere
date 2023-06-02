import { inputObjectType } from "nexus";

export const StoreCreateInput = inputObjectType({
  name: "StoreCreateInput",
  definition(t) {
    t.nonNull.string("StoreName");
    t.nonNull.string("StoreAddress");
    t.nonNull.string("StoreCity");
    t.nonNull.string("StoreState");
    t.string("StoreZip");
    t.string("storeLong");
    t.string("storeLat");
    t.nonNull.string("StorePhone");
    t.nonNull.string("StoreEmail");
    t.nonNull.string("StoreWebsite");
    t.nonNull.string("StoreHours");
    t.nonNull.string("StoreDescription");
  },
});

export default { StoreCreateInput };
