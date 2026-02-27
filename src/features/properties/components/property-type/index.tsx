import { Text } from "@chakra-ui/react";
import type { FC } from "react";
import type { PropertyModel } from "@/store/slices/properties/types";
import { capitalize } from "lodash";

interface PropertyTypeProps {
  type: PropertyModel["type"];
}

export const PropertyType: FC<PropertyTypeProps> = ({ type }) => {
  return (
    <Text fontSize="xs" fontWeight="500">
      {type.map(capitalize).join(", ")}
    </Text>
  );
};
