import { type FC, type ReactNode } from "react";
import { PageSpinner } from "@/common/components/layout/page-spinner";
import { PageError } from "@/common/components/layout/page-error";

interface PageProps {
  children: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
}

export const Page: FC<PageProps> = (props) => {
  const { children, isLoading = false, isError = false } = props;

  return (
    <>{isLoading ? <PageSpinner /> : isError ? <PageError /> : children}</>
  );
};
