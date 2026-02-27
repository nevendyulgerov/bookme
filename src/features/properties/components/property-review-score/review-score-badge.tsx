import { Badge, Box } from "@chakra-ui/react";
import type { FC } from "react";
import type { PropertyModel } from "@/store/slices/properties/types";
import { useColorModeValue } from "@/common/hooks/ui/use-color-mode-value";

interface ReviewScoreBadgeProps {
  reviewScore: PropertyModel["reviewScore"];
}

export const ReviewScoreBadge: FC<ReviewScoreBadgeProps> = ({
  reviewScore,
}) => {
  const badgeVariant = useColorModeValue(undefined, "solid");

  return (
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
  );
};
