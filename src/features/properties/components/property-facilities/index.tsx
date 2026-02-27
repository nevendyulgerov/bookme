import { Flex } from "@chakra-ui/react";
import type { FC } from "react";
import type { PropertyModel } from "@/store/slices/properties/types";
import { FacilityIcon } from "@/features/properties/components/property-facilities/facility-icon";
import { FacilityName } from "@/features/properties/components/property-facilities/facility-name";

interface PropertyFacilitiesProps {
  facilities: PropertyModel["facilities"];
}

export const PropertyFacilities: FC<PropertyFacilitiesProps> = ({
  facilities,
}) => {
  return (
    <Flex gap={2} flexWrap="wrap">
      {facilities.map((facility) => {
        return (
          <Flex key={facility} alignItems="center" gap={0.5}>
            <FacilityIcon facility={facility} />
            <FacilityName facility={facility} />
          </Flex>
        );
      })}
    </Flex>
  );
};
