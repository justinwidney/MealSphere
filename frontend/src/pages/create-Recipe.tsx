import { FormControl, Flex, Button, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import Link from "next/link";
import router from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { toErrorMap } from "../utils/toErrorMap";

const CreateRecipe: React.FC<{}> = ({}) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          recipeName: "",
          content: "",
          recipeServings: "",
          recipeCookTime: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
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
                name="instruction"
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
    </Wrapper>
  );
};

export default CreateRecipe;
