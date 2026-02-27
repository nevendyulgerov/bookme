import { type FC, Fragment } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/common/hooks/ui/use-color-mode-value";

interface StepsProps {
  stepsCount: number;
  currentStep: number;
}

export const Steps: FC<StepsProps> = (props) => {
  const { stepsCount, currentStep } = props;
  const steps = Array.from({ length: stepsCount }).map((_, index) => index);
  const backgroundColor = useColorModeValue("gray.600", "gray.800");
  const borderColor = useColorModeValue("gray.500", "gray.700");

  return (
    <Flex alignItems="center" gap="42px">
      {steps.map((step, index) => {
        const stepPosition = index + 1;
        const isFilled = stepPosition <= currentStep;
        return (
          <Fragment key={step}>
            <Flex alignItems="center" position="relative">
              <Flex
                width="44px"
                height="44px"
                justifyContent="center"
                alignItems="center"
                borderRadius="100%"
                backgroundColor={isFilled ? "orange.400" : backgroundColor}
                borderColor={borderColor}
                borderWidth={isFilled ? 0 : 1}
                zIndex={10}
                transition="background-color ease-in-out 0.25s"
              >
                <Text fontSize="xl" color="gray.50">
                  {step + 1}
                </Text>
              </Flex>
              {index < steps.length - 1 && (
                <Box
                  position="absolute"
                  left="2px"
                  width="126px"
                  height="10px"
                  backgroundColor={backgroundColor}
                  borderColor={borderColor}
                  borderWidth={1}
                >
                  <Box
                    position="absolute"
                    top="-1px"
                    left="0px"
                    width={
                      stepPosition > currentStep
                        ? "0px"
                        : stepPosition < currentStep
                          ? "100%"
                          : "50%"
                    }
                    height="10px"
                    backgroundColor="orange.400"
                    borderRightRadius="sm"
                    transition="width ease-in-out 0.25s"
                  />
                </Box>
              )}
            </Flex>
          </Fragment>
        );
      })}
    </Flex>
  );
};
