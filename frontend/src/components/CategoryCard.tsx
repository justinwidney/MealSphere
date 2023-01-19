import { background, Card, CardHeader, Heading } from "@chakra-ui/react";
import React from "react";

interface CategoryCardProps {
  HeadingName: string;
  backgroundColor: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  HeadingName,
  backgroundColor,
}) => {
  return (
    <Card w="100%" backgroundColor={backgroundColor}>
      <CardHeader>
        <Heading size="md">{HeadingName}</Heading>
      </CardHeader>
    </Card>
  );
};
