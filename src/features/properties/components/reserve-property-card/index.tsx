import { type FC } from "react";
import { Flex, Icon, Stack, Text } from "@chakra-ui/react";
import type { PropertyModel } from "@/store/slices/properties/types";
import { Card } from "@/common/components/ui/card";
import { PropertyReviewScore } from "@/features/properties/components/property-review-score";
import { LuMapPin } from "react-icons/lu";
import { PropertyFacilities } from "@/features/properties/components/property-facilities";
import { PropertyType } from "@/features/properties/components/property-type";
import { PropertyPrice } from "@/features/properties/components/property-price";
import { PropertyRating } from "@/features/properties/components/property-rating";
import { PropertyImage } from "@/features/properties/components/property-image";

interface ReservePropertyCardProps {
  property: PropertyModel;
}

export const ReservePropertyCard: FC<ReservePropertyCardProps> = (props) => {
  const { property } = props;
  return (
    <Card height="100%">
      <Flex direction="column" gap={4} padding={2}>
        <Flex gap={4}>
          <PropertyImage
            src={property.imageUrl}
            boxSize={{ base: "100%", md: "700px" }}
            width="initial"
            height="100%"
            alt={property.name}
          />
        </Flex>
        <Stack gap={4} flex={1}>
          <Flex justifyContent="space-between" gap={1} flexWrap="wrap">
            <Stack gap={2}>
              <Flex flexWrap="wrap" gap={2}>
                <Text fontSize="xl" fontWeight="700">
                  {property.name}
                </Text>

                <PropertyRating rating={property.rating} />
              </Flex>

              <Flex alignItems="center" gap={1}>
                <Icon as={LuMapPin} />
                <Text fontSize="xs" fontWeight="700">
                  {property.location}
                </Text>
              </Flex>
            </Stack>

            <PropertyReviewScore
              reviewScore={property.reviewScore}
              reviewsCount={property.reviewsCount}
            />
          </Flex>

          <Stack gap={6} flex={1}>
            <Stack gap={2}>
              <PropertyType type={property.type} />
              <PropertyFacilities facilities={property.facilities} />
            </Stack>
            <Text>{property.description}</Text>
          </Stack>

          <Stack gap={2} flex={1} alignItems="flex-end">
            <PropertyPrice price={property.price} />
          </Stack>
        </Stack>
      </Flex>
    </Card>
  );
};
