import { afterEach, beforeEach, describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Layout } from "@/common/components/layout/layout";
import { PublicLayout } from "@/common/components/layout/public-layout";
import { PrivateLayout } from "@/common/components/layout/private-layout";
import { withChakraTheme } from "../../../with-chakra-theme";
import { useUser } from "@/features/auth/hooks/use-user";
import { user } from "../../../features/auth/mocks";
import type { FC, PropsWithChildren } from "react";
import { createMemoryRouter, RouterProvider } from "react-router";

vi.mock("../../../../src/common/components/layout/public-layout");
const PublicLayoutMock = vi.mocked(PublicLayout, true);

vi.mock("../../../../src/common/components/layout/private-layout");
const PrivateLayoutMock = vi.mocked(PrivateLayout, true);

vi.mock("../../../../src/features/auth/hooks/use-user");
const useUserMock = vi.mocked(useUser, true);

const Component = withChakraTheme(Layout);

const PublicLayoutComponent: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid="public-layout">{children}</div>
);

const PrivateLayoutComponent: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid="private-layout">{children}</div>
);

describe("Layout", () => {
  beforeEach(() => {
    useUserMock.mockReturnValue(user);
    PublicLayoutMock.mockReturnValue(<PublicLayoutComponent />);
    PrivateLayoutMock.mockReturnValue(<PrivateLayoutComponent />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should wrap content in private route when user is authenticated", () => {
    useUserMock.mockReturnValue(user);
    const router = createMemoryRouter([{ path: "/", element: <Component /> }]);

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("private-layout")).toBeInTheDocument();
  });

  it("should wrap content in public route when user is unauthenticated", () => {
    useUserMock.mockReturnValue({ email: null });
    const router = createMemoryRouter([{ path: "/", element: <Component /> }]);

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("public-layout")).toBeInTheDocument();
  });
});
