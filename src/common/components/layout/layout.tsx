import { type FC, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useUser } from "@/features/auth/hooks/use-user";
import { PublicLayout } from "@/common/components/layout/public-layout";
import { PrivateLayout } from "@/common/components/layout/private-layout";

export const Layout: FC = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const PageLayout =
    isAuthenticated && user.email ? PrivateLayout : PublicLayout;

  useEffect(() => {
    if (user.email) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [navigate, user.email]);

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};
