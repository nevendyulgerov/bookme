import { Flex, type FlexProps, Heading, Stack, Text } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";
import { useColorModeValue } from "@/common/hooks/ui/use-color-mode-value";

interface CardProps extends FlexProps {
  title?: string;
  titleIcon?: ReactNode;
  titleSuffix?: ReactNode;
  description?: string;
  contentProps?: FlexProps;
}

export const Card: FC<CardProps> = (props) => {
  const {
    title,
    titleIcon,
    description,
    children,
    titleSuffix,
    contentProps,
    ...restProps
  } = props;
  const borderColor = useColorModeValue("gray.200", "none");

  return (
    <Flex
      direction="column"
      borderRadius="xl"
      background="transparentCardBackground"
      padding={2.5}
      gap={5}
      boxShadow="xl"
      borderWidth={1}
      borderColor={borderColor}
      {...restProps}
    >
      {title && (
        <Flex justifyContent="space-between" alignItems="center">
          <Stack gap={1}>
            <Flex alignItems="center" gap={2.5}>
              <Heading size="md">{title}</Heading>
              {titleIcon}
            </Flex>

            {description && (
              <Text fontSize="sm" color="gray.400">
                {description}
              </Text>
            )}
          </Stack>

          {titleSuffix}
        </Flex>
      )}
      <Flex direction="column" overflowX="auto" {...contentProps}>
        {children}
      </Flex>
    </Flex>
  );
};
