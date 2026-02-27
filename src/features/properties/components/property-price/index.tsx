import { Flex, Stack, Text } from "@chakra-ui/react";
import type { FC } from "react";
import type { PropertyModel } from "@/store/slices/properties/types";

interface PropertyPriceProps {
  price: PropertyModel["price"];
}

export const PropertyPrice: FC<PropertyPriceProps> = ({ price }) => {
  return (
    <Stack gap={0} alignItems="flex-end">
      <Text fontSize="sm" fontWeight="600">
        Price per night:
      </Text>
      <Flex alignItems="center" gap={2}>
        <Text fontSize="sm">Adult:</Text>
        <Text fontSize="md" fontWeight="700">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(price.adult)}
        </Text>
      </Flex>
      <Flex alignItems="center" gap={2}>
        <Text fontSize="sm">Child:</Text>
        <Text fontSize="md" fontWeight="700">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(price.child)}
        </Text>
      </Flex>
    </Stack>
  );
};
