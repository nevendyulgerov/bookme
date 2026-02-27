import { type FC } from "react";
import { Button, Flex, Icon, Link, Stack, Text } from "@chakra-ui/react";
import type { PropertyModel } from "@/store/slices/properties/types";
import { Card } from "@/common/components/ui/card";
import { PropertyReviewScore } from "@/features/properties/components/property-review-score";
import { LuMapPin } from "react-icons/lu";
import { PropertyFacilities } from "@/features/properties/components/property-facilities";
import { PropertyType } from "@/features/properties/components/property-type";
import { PropertyPrice } from "@/features/properties/components/property-price";
import { PropertyRating } from "@/features/properties/components/property-rating";
import { Link as RouterLink } from "react-router";
import { PropertyImage } from "@/features/properties/components/property-image";

interface PropertyCardProps {
  property: PropertyModel;
}

export const PropertyCard: FC<PropertyCardProps> = ({ property }) => {
  const pathToProperty = `/properties/${property.id}`;

  return (
    <Card height="100%" flex={1} contentProps={{ height: "100%" }}>
      <Flex gap={4} height="100%">
        <Flex gap={4}>
          <RouterLink to={pathToProperty}>
            <PropertyImage src={property.imageUrl} />
          </RouterLink>
        </Flex>
        <Stack gap={4} flex={1}>
          <Flex justifyContent="space-between" gap={1} flexWrap="wrap">
            <Stack gap={2}>
              <Flex flexWrap="wrap" gap={2}>
                <Link asChild>
                  <RouterLink to={pathToProperty}>
                    <Text fontSize="xl" fontWeight="700">
                      {property.name}
                    </Text>
                  </RouterLink>
                </Link>

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

          <Stack gap={2} flex={1}>
            <PropertyType type={property.type} />
            <PropertyFacilities facilities={property.facilities} />
          </Stack>

          <Stack gap={2} flex={1} alignItems="flex-end" marginTop="auto">
            <PropertyPrice price={property.price} />

            <Button colorPalette="orange" variant="solid" asChild>
              <RouterLink to={pathToProperty}>Reserve</RouterLink>
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Card>
  );
};
