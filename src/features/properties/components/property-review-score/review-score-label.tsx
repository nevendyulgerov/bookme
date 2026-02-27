import { Text } from "@chakra-ui/react";
import type { FC } from "react";
import type { PropertyModel } from "@/store/slices/properties/types";

interface ReviewScoreLabelProps {
  reviewScore: PropertyModel["reviewScore"];
}

export const ReviewScoreLabel: FC<ReviewScoreLabelProps> = ({
  reviewScore,
}) => {
  return (
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
  );
};
