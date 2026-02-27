import { Flex, Stack, Text } from "@chakra-ui/react";
import type { FC } from "react";
import type { PropertyModel } from "@/store/slices/properties/types";
import { ReviewScoreLabel } from "@/features/properties/components/property-review-score/review-score-label";
import { ReviewScoreBadge } from "@/features/properties/components/property-review-score/review-score-badge";

interface PropertyReviewScoreProps {
  reviewScore: PropertyModel["reviewScore"];
  reviewsCount: PropertyModel["reviewsCount"];
}

export const PropertyReviewScore: FC<PropertyReviewScoreProps> = (props) => {
  const { reviewScore, reviewsCount } = props;

  return (
    <Flex gap={2}>
      <Stack gap={0.5}>
        <ReviewScoreLabel reviewScore={reviewScore} />
        <Text fontSize="xs">
          {new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(reviewsCount)}{" "}
          reviews
        </Text>
      </Stack>

      <ReviewScoreBadge reviewScore={reviewScore} />
    </Flex>
  );
};
