import { Text } from "@chakra-ui/react";
import type { FC } from "react";
import type { FacilityType } from "@/store/slices/properties/types";

interface FacilityNameProps {
  facility: FacilityType;
}

export const FacilityName: FC<FacilityNameProps> = ({ facility }) => {
  return (
    <Text fontSize="2xs">
      {facility === "spa"
        ? "Spa"
        : facility === "restaurant"
          ? "Restaurant"
          : facility === "free-wifi"
            ? "WiFi"
            : facility === "parking"
              ? "Parking"
              : facility === "fitness-center"
                ? "Fitness"
                : facility === "room-service"
                  ? "Room service"
                  : "Kids playground"}
    </Text>
  );
};
