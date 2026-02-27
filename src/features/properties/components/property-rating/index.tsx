import { Flex, Icon } from "@chakra-ui/react";
import type { FC } from "react";
import type { PropertyModel } from "@/store/slices/properties/types";
import { LuStar } from "react-icons/lu";

interface PropertyRatingProps {
  rating: PropertyModel["rating"];
}

export const PropertyRating: FC<PropertyRatingProps> = ({ rating }) => {
  const ratingArr = Array.from({ length: rating }).map((_, index) => index + 1);
  return (
    <Flex alignSelf="center" gap={2}>
      {ratingArr.map((ratingItem) => {
        return (
          <Icon
            key={ratingItem}
            as={LuStar}
            width={3}
            height={3}
            fill="orange.400"
            stroke="orange.400"
            data-testid="rating-icon"
          />
        );
      })}
    </Flex>
  );
};
