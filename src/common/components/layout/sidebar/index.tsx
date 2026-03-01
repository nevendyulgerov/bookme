import { type ElementType, type FC, useCallback, useState } from "react";
import { Box, Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { LuHotel, LuLogOut, LuLuggage } from "react-icons/lu";
import { Link as RouterLink, useLocation } from "react-router";
import { Logo } from "@/common/components/layout/logo";
import { LogoutDialog } from "@/features/auth/components/logout-dialog";
import { useColorModeValue } from "@/common/hooks/ui/use-color-mode-value";
import { SidebarLink } from "@/common/components/layout/sidebar/sidebar-link";

interface SidebarLinkModel {
  path: string;
  label: string;
  icon: ElementType;
}

const sidebarLinks: SidebarLinkModel[] = [
  {
    path: "/properties",
    label: "Properties",
    icon: LuHotel,
  },
  {
    path: "/bookings",
    label: "My Bookings",
    icon: LuLuggage,
  },
];

export const Sidebar: FC = () => {
  const location = useLocation();
  const [isLogoutConfirmationActive, setLogoutConfirmationActive] =
    useState(false);
  const borderColor = useColorModeValue("gray.300", "gray.700");

  const onLogout = useCallback(() => {
    setLogoutConfirmationActive(true);
  }, []);

  return (
    <>
      <LogoutDialog
        isActive={isLogoutConfirmationActive}
        onChangeActive={setLogoutConfirmationActive}
      />

      <Stack
        direction="column"
        gap={0}
        overflowY="auto"
        overflowX="hidden"
        scrollbarGutter="stable"
        scrollbarWidth="thin"
      >
        <Box
          position="sticky"
          top="0"
          height="80px"
          padding={6}
          borderBottomWidth={1}
          width="calc(100% + 12px)"
          marginLeft="0px"
          borderRightWidth={{ base: 0, lg: "1px" }}
          borderRightColor="card"
          backgroundColor="card"
          zIndex={10}
        >
          <RouterLink to="/">
            <Flex justifyContent="center" alignItems="center" gap={2}>
              <Logo />{" "}
              <Text fontSize="2xl" fontWeight="700" fontFamily="montserrat">
                Book Me
              </Text>
            </Flex>
          </RouterLink>
        </Box>

        <nav>
          <Flex
            direction="column"
            flex="1"
            paddingY={4}
            paddingLeft={6}
            paddingRight={3}
            overflowY="auto"
            minHeight="calc(100vh - 80px)"
          >
            {sidebarLinks.map((sidebarLink) => (
              <Box
                key={sidebarLink.path}
                paddingY={3}
                _notLast={{ borderBottomWidth: 1, borderColor: borderColor }}
              >
                <SidebarLink
                  to={sidebarLink.path}
                  label={sidebarLink.label}
                  icon={<Icon as={sidebarLink.icon} w={5} h={5} />}
                  isActive={location.pathname.includes(sidebarLink.path)}
                />
              </Box>
            ))}

            <Flex alignItems="flex-end" flex={1} marginTop="auto">
              <Button
                colorPalette="red"
                variant="solid"
                width="100%"
                backgroundColor="card"
                color="errorForeground/63"
                _hover={{
                  color: "errorForeground",
                }}
                _active={{
                  color: "errorForeground",
                }}
                borderColor="transparent"
                paddingY={2}
                paddingX={4}
                paddingLeft={3}
                borderRadius={0}
                textTransform="uppercase"
                justifyContent="flex-start"
                gap={2}
                onClick={onLogout}
              >
                <Icon as={LuLogOut} width={4} height={4} />
                <Text fontSize="md" fontWeight="semibold">
                  Log out
                </Text>
              </Button>
            </Flex>
          </Flex>
        </nav>
      </Stack>
    </>
  );
};
