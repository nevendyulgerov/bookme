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

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  const user = useUser();
  const navigate = useNavigate();
  const [isAuthenticated, setAuthenticated] = useState(false);

  const protectRoutes = useCallback(() => {
    if (user.email) {
      setAuthenticated(true);
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, user.email]);

  useEffect(() => {
    protectRoutes();
  }, [protectRoutes]);

  return isAuthenticated ? (
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
