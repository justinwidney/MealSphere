import { background, Card, CardHeader, Heading, Image } from "@chakra-ui/react";
import React from "react";

interface CategoryCardProps {
  HeadingName: string;
  backgroundColor: string;
  url: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  HeadingName,
  backgroundColor,
  url,
}) => {
  return (
    <Card w="100%" backgroundColor={backgroundColor}>
      <CardHeader>
        <Heading size="md">{HeadingName}</Heading>
        <Image src={url} />
      </CardHeader>
    </Card>
  );
};
