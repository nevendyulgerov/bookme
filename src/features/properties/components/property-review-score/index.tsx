import { Badge, Flex, Text, Stack, Box } from "@chakra-ui/react";
import type { FC } from "react";
import type { PropertyModel } from "@/store/slices/properties/types";
import { useColorModeValue } from "@/common/hooks/ui/use-color-mode-value";

interface PropertyReviewScoreProps {
  reviewScore: PropertyModel["reviewScore"];
  reviewsCount: PropertyModel["reviewsCount"];
}

export const PropertyReviewScore: FC<PropertyReviewScoreProps> = (props) => {
  const { reviewScore, reviewsCount } = props;
  const badgeVariant = useColorModeValue(undefined, "solid");

  return (
    <Flex gap={2}>
      <Stack gap={0.5}>
        <Text fontSize="md" fontWeight="600">
          {reviewScore >= 9.0
            ? "Wonderful"
            : reviewScore > 8.5
              ? "Excellent"
              : reviewScore > 7.5
                ? "Very Good"
                : reviewScore > 6.5
                  ? "Good"
                  : reviewScore > 5.5
                    ? "Pleasant"
                    : "Not Good"}
        </Text>
        <Text fontSize="xs">
          {new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(reviewsCount)}{" "}
          reviews
        </Text>
      </Stack>

      <Box>
        <Badge
          variant={badgeVariant}
          fontWeight="600"
          backgroundColor={
            reviewScore >= 9.0
              ? "green.500"
              : reviewScore > 8.5
                ? "green.300"
                : reviewScore > 7.5
                  ? "green.200"
                  : reviewScore > 6.5
                    ? "yellow.100"
                    : reviewScore > 5.5
                      ? "orange.300"
                      : "orange.400"
          }
        >
          {reviewScore.toFixed(1)}
        </Badge>
      </Box>
    </Flex>
  );
};
