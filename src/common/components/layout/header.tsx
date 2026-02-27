import {
  type ChangeEvent,
  type FC,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CloseButton,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  useBreakpointValue,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { ThemeToggleButton } from "@/common/components/layout/theme-toggle-button";
import { Logo } from "@/common/components/layout/logo";
import { useColorModeValue } from "@/common/hooks/ui/use-color-mode-value";
import { useLocation } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router";

interface HeaderProps {
  onClick: () => void;
}

export const Header: FC<HeaderProps> = ({ onClick }) => {
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search");
  const [search, setSearch] = useState(urlSearch ?? "");
  const isSmallScreen = useBreakpointValue({ base: true, xl: false });
  const backgroundColor = useColorModeValue("gray.50", "gray.800");
  const color = useColorModeValue("gray.900", "gray.100");
  const borderColor = useColorModeValue("gray.300", "gray.700");
  const location = useLocation();
  const navigate = useNavigate();
  const lastPathname = useRef(location.pathname);
  const hasSearch = search !== "";

  const onChangeSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const onSubmitSearch = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        navigate(`/properties?search=${search}`);
      }
    },
    [navigate, search],
  );

  const onClearSearch = useCallback(() => {
    setSearch("");
    navigate(location.pathname, { replace: true });
  }, [location.pathname, navigate]);

  const resetSearchOnPathnameChange = useCallback(() => {
    if (location.pathname !== lastPathname.current) {
      lastPathname.current = location.pathname;
      setSearch("");
    } else if (!urlSearch) {
      setSearch("");
    }
  }, [location.pathname, urlSearch]);

  useEffect(() => {
    resetSearchOnPathnameChange();
  }, [resetSearchOnPathnameChange]);

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="card"
      paddingY={3}
      paddingX={6}
      borderTopWidth={1}
      borderBottomWidth={1}
      borderColor="border"
      height="80px"
      minHeight="80px"
    >
      <Flex alignItems="center" gap={2}>
        <IconButton
          variant="ghost"
          display={isSmallScreen ? "block" : "none"}
          _hover={{
            backgroundColor: "muted",
          }}
          borderRadius="50%"
          aria-label="Toggle sidebar"
          onClick={onClick}
        >
          <Flex justifyContent="center" alignItems="center">
            <Logo />
          </Flex>
        </IconButton>

        <InputGroup
          startElement={<Icon as={LuSearch} color={color} />}
          endElement={
            hasSearch ? (
              <CloseButton
                size="sm"
                borderRadius="50%"
                width={6}
                height={6}
                minWidth={6}
                minHeight={6}
                onClick={onClearSearch}
              />
            ) : null
          }
        >
          <Input
            id="search"
            type="search"
            value={search}
            placeholder="Search properties by location..."
            height="30px"
            borderRadius="2xl"
            width={{ base: "500px", xl: "600px" }}
            maxWidth="calc(100vw - 94px)"
            fontSize="md"
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            color={color}
            _placeholder={{
              color: color,
            }}
            onChange={onChangeSearch}
            onKeyDown={onSubmitSearch}
          />
        </InputGroup>
      </Flex>

      <HStack alignItems="center" flexWrap="wrap" gap={1}>
        <ThemeToggleButton />
      </HStack>
    </Flex>
  );
};
