import { Icon } from "@chakra-ui/react";
import type { FC } from "react";
import type { FacilityType } from "@/store/slices/properties/types";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { LuCar, LuWifi } from "react-icons/lu";
import { IoFitness, IoRestaurantOutline } from "react-icons/io5";
import { FaBowlFood } from "react-icons/fa6";
import { GiKidSlide } from "react-icons/gi";

interface FacilityIconProps {
  facility: FacilityType;
}

export const FacilityIcon: FC<FacilityIconProps> = ({ facility }) => {
  return (
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
  );
};
