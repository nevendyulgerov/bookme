import { type FC } from "react";
import { Image, type ImageProps } from "@chakra-ui/react";

export const PropertyImage: FC<ImageProps> = (props) => {
  return (
    <Image
      loading="lazy"
      width={{ base: "240px", xl: "300px" }}
      height="100%"
      objectFit="cover"
      borderRadius="xl"
      {...props}
    />
  );
};
