import { FormControl, Flex, Button, Box } from "@chakra-ui/react";
import axios from "axios";
import { Formik, Form } from "formik";
import Link from "next/link";
import router from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { validateNewCreate } from "../data/validation/Recipe";
import { validateNewLogin } from "../data/validation/user";
import { useCreateRecipeMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/UrqlClient";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import { useUser } from "../data/hooks/hooks";

const CreateRecipe: React.FC<{}> = ({}) => {
  //useUser({ redirectTo: "/login", redirectIfFound: false });

  const [, createRecipe] = useCreateRecipeMutation();
  const router = useRouter();

  const validateCreate = async (values: any) => {
    try {
      values.recipeCookTime = parseInt(values.recipeCookTime);
      values.recipeServings = parseInt(values.recipeServings);

      const Errors = await validateNewCreate(values);

      if (Object.keys(Errors).length) {
        console.log(Errors, "Create Errors");
        return Errors;
      }

      const response = await handleSubmit(values);

      return response;
    } catch (Errors: any) {
      return { Errors: { field: Errors.field, message: Errors.message } };
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const response = await createRecipe({
        recipeName: values.recipeName,
        recipeServings: values.recipeServings,
        recipeCookTime: values.recipeCookTime,
        instructions: values.Instructions,
      });

      console.log(response.data, "response Data");

      return response.data;
    } catch (e) {
      throw e.response.data.Errors;
    }
  };

  return (
    <Layout variant="small">
      <Formik
        initialValues={{
          recipeName: "",
          instructions: "",
          recipeServings: "",
          recipeCookTime: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await validateCreate(values);

          console.log(response, "form check");
          console.log(response?.CreateRecipe?.id, "id");

          if (response?.Errors) {
            setErrors(toErrorMap(response.Errors));
          } else if (response?.createRecipe?.id) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form //onSubmit={validateRegister}>
          >
            <FormControl>
              <Box mb={4}>
                <InputField
                  name="recipeName"
                  placeholder="title"
                  label="Recipe Name"
                ></InputField>
              </Box>
              <InputField
                textArea
                name="instructions"
                placeholder="instructions"
                label="Enter Instructions.."
              ></InputField>
              <InputField
                name="recipeCookTime"
                placeholder="Cook Time"
                label="Enter Cook Time"
              ></InputField>

              <InputField
                name="recipeServings"
                placeholder="Recipe Serving"
                label="Enter Recipe Serving"
              ></InputField>

              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                create Post
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(CreateRecipe);
