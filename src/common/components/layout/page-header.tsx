import { type ElementType, type FC, type ReactNode } from "react";
import { Flex, Heading, Icon } from "@chakra-ui/react";

interface PageHeaderProps {
  title: string;
  icon: ElementType;
  actionsSlot?: ReactNode;
}

export const PageHeader: FC<PageHeaderProps> = (props) => {
  const { title, icon, actionsSlot } = props;

  return (
    <Flex
      justify="space-between"
      alignItems="center"
      gap={4}
      wrap="wrap"
      marginBottom={6}
    >
      <Flex alignItems="center" gap={2.5}>
        <Icon as={icon} width={8} height={8} color="electricOrange" />
        <Heading size="3xl" fontWeight="600">
          {title}
        </Heading>
      </Flex>

      {actionsSlot}
    </Flex>
  );
};
