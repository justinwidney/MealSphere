function val_field(field: string, fieldname: string) {
  if (field.length < 3 || field.length > 50) {
    return {
      Errors: {
        field: fieldname,
        message: `${fieldname} too short`,
      },
    };
  }
  return {};
}

// Could add Better error Findings
export function validateNewCreate(values: {
  recipeName: string;
  instructions: string;
  recipeServings: string;
  recipeCookTime: string;
}) {
  for (const value in values) {
    const Errors = val_field(values[value as keyof typeof values], value);

    if (Object.keys(Errors).length) {
      return Errors;
    }
  }

  return {};
}
