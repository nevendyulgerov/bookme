import { Box, useToken } from "@chakra-ui/react";
import { type CSSProperties, type FC } from "react";
import { type DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useColorModeValue } from "@/common/hooks/ui/use-color-mode-value";

import "./index.css";

interface DurationPickerProps {
  range: DateRange | undefined;
  defaultMonth?: Date;
  disabledDates?: Date[];
  onChangeRange: (range: DateRange | undefined) => void;
}

export const DurationPicker: FC<DurationPickerProps> = (props) => {
  const {
    range,
    defaultMonth = new Date(),
    disabledDates = [],
    onChangeRange,
  } = props;
  const accentColor = "orange.400";
  const accentBackgroundColor = useColorModeValue("gray.300", "gray.600");
  const [accentColorValue, accentBackgroundColorValue] = useToken("colors", [
    accentColor,
    accentBackgroundColor,
  ]);

  return (
    <Box
      className="duration-picker"
      style={
        {
          "--accent-color": accentColorValue,
          "--accent-background-color": accentBackgroundColorValue,
        } as CSSProperties
      }
    >
      <DayPicker
        mode="range"
        defaultMonth={defaultMonth}
        selected={range}
        disabled={[{ before: new Date() }, ...disabledDates]}
        excludeDisabled
        onSelect={onChangeRange}
      />
    </Box>
  );
};
