import { type FC, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useUser } from "@/features/auth/hooks/use-user";
import { PublicLayout } from "@/common/components/layout/public-layout";
import { PrivateLayout } from "@/common/components/layout/private-layout";
import { isString } from "lodash";

export const Layout: FC = () => {
  const user = useUser();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const PageLayout =
    isAuthenticated && user.email ? PrivateLayout : PublicLayout;

  useEffect(() => {
    setAuthenticated(isString(user.email));
  }, [user.email]);

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};
