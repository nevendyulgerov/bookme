import { type FC } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import type { PropertyModel } from "@/store/slices/properties/types";
import { getDifferenceInDays } from "@/features/properties/components/book-property-form/utils";

interface SummaryProps {
  property: PropertyModel;
}

export const Summary: FC<SummaryProps> = ({ property }) => {
  const { getValues } = useFormContext();
  const { duration, numberAdults, numberChildren } = getValues();
  const days = getDifferenceInDays(duration);
  const totalAmount =
    Number(days) * numberAdults * property.price.adult +
    Number(days) * numberChildren * property.price.child;

  return (
    <Flex direction="column" gap="80px" paddingTop={2}>
      <Flex direction="column" gap={2} alignItems="center">
        <Flex width="200px" maxWidth="100%" justifyContent="space-between">
          <Text>Number of days:</Text>
          <Text fontWeight="700">{days}</Text>
        </Flex>

        <Flex width="200px" maxWidth="100%" justifyContent="space-between">
          <Text>Number of adults:</Text>
          <Text fontWeight="700">{numberAdults}</Text>
        </Flex>

        <Flex width="200px" maxWidth="100%" justifyContent="space-between">
          <Text>Number of children:</Text>
          <Text fontWeight="700">{numberChildren}</Text>
        </Flex>

        <Flex width="200px" maxWidth="100%" justifyContent="space-between">
          <Text>Total amount:</Text>
          <Text fontSize="md" fontWeight="700">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(totalAmount)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
