import { Box, useToken } from "@chakra-ui/react";
import { type CSSProperties, type FC } from "react";
import { type DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useColorModeValue } from "@/common/hooks/ui/use-color-mode-value";

import "./index.css";
import { isString } from "lodash";

interface DurationPickerProps {
  range: DateRange | undefined;
  defaultMonth?: Date;
  disabledDates?: Date[];
  error?: string;
  onChangeRange: (range: DateRange | undefined) => void;
}

export const DurationPicker: FC<DurationPickerProps> = (props) => {
  const {
    range,
    defaultMonth = new Date(),
    disabledDates = [],
    error,
    onChangeRange,
  } = props;
  const accentColor = "orange.400";
  const accentBackgroundColor = useColorModeValue("gray.300", "gray.600");
  const [accentColorValue, accentBackgroundColorValue] = useToken("colors", [
    accentColor,
    accentBackgroundColor,
  ]);
  const hasError = isString(error) && error !== "";
  const pastDays = { before: new Date() };

  return (
    <Box
      className="duration-picker"
      style={
        {
          "--accent-color": accentColorValue,
          "--accent-background-color": accentBackgroundColorValue,
        } as CSSProperties
      }
      padding={4}
      borderRadius="10px"
      borderWidth={1}
      borderColor={hasError ? "border.error" : "transparent"}
    >
      <DayPicker
        mode="range"
        defaultMonth={defaultMonth}
        selected={range}
        modifiers={{ disabledDates }}
        modifiersClassNames={{
          disabledDates: "duration-picker__disabled-day",
        }}
        disabled={[pastDays, ...disabledDates]}
        excludeDisabled
        onSelect={onChangeRange}
      />
    </Box>
  );
};
