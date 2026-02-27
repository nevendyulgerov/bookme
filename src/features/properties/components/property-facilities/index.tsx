import { Flex, Icon, Text } from "@chakra-ui/react";
import type { FC } from "react";
import type { PropertyModel } from "@/store/slices/properties/types";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { LuCar, LuWifi } from "react-icons/lu";
import { IoFitness, IoRestaurantOutline } from "react-icons/io5";
import { FaBowlFood } from "react-icons/fa6";
import { GiKidSlide } from "react-icons/gi";

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
            <Icon
              as={
                facility === "spa"
                  ? LiaSwimmingPoolSolid
                  : facility === "restaurant"
                    ? IoRestaurantOutline
                    : facility === "free-wifi"
                      ? LuWifi
                      : facility === "parking"
                        ? LuCar
                        : facility === "fitness-center"
                          ? IoFitness
                          : facility === "room-service"
                            ? FaBowlFood
                            : GiKidSlide
              }
              width={3}
              height={3}
            />
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
          </Flex>
        );
      })}
    </Flex>
  );
};
