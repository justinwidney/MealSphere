import { AuthPayload } from "../generated/graphql";

export const toErrorMap = (errors: AuthPayload[]) => {
  const errorMap: Record<string, string> = {};

  Array.from(errors).forEach(({ Errors }) => {
    if (Errors?.field) {
      errorMap[Errors.field] = Errors?.message;
    }
  });

  return errorMap;
};
