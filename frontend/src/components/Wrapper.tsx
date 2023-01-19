import { Box } from "@chakra-ui/react";
import { type } from "os";
import React from "react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: WrapperVariant;
  children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      maxW={variant === "regular" ? "1200px" : "400px"}
      w="100"
      mt={8}
      mx="auto"
    >
      {children}
    </Box>
  );
};
