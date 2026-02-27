import { useUser } from "@/features/auth/hooks/use-user";
import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { Flex, Spinner } from "@chakra-ui/react";

export const PublicRoute: FC<PropsWithChildren> = ({ children }) => {
  const user = useUser();
  const navigate = useNavigate();
  const [isUnauthenticated, setUnauthenticated] = useState(false);
  const [isForcingNavigation, setForcingNavigation] = useState(false);

  const protectRoutes = useCallback(() => {
    if (user.email) {
      navigate("/properties", { replace: true });
      setUnauthenticated(false);
      setForcingNavigation(true);
    } else {
      setUnauthenticated(true);
      setForcingNavigation(false);
    }
  }, [user, navigate]);

  useEffect(() => {
    protectRoutes();
  }, [protectRoutes]);

  return isUnauthenticated && !isForcingNavigation ? (
    children
  ) : (
    <Flex
      w="100%"
      h="100vh"
      justify="center"
      align="center"
      minHeight="inherit"
    >
      <Spinner size="xl" color="electricOrange" />
    </Flex>
  );
};
