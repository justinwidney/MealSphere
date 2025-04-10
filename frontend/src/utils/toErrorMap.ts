import { AuthPayload, FieldError } from "../generated/graphql";

export const toErrorMap = (errors: FieldError) => {
  const errorMap: Record<string, string> = {};

  console.log(errors, "in Errors Map");

  errorMap[errors.field] = errors.message;

  console.log(errorMap, "My ERROR MAP");
  return errorMap;
};
