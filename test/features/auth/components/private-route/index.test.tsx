import { afterEach, beforeEach, describe, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { PrivateRoute } from "@/features/auth/components/private-route";
import { useUser } from "@/features/auth/hooks/use-user";
import { withChakraTheme } from "../../../../with-chakra-theme";
import { useNavigate } from "react-router";
import { user } from "../../mocks";

vi.mock("react-router");
const useNavigateMock = vi.mocked(useNavigate, true);

vi.mock("../../../../../src/features/auth/hooks/use-user");
const useUserMock = vi.mocked(useUser, true);

const Component = withChakraTheme(PrivateRoute);

describe("PrivateRoute", () => {
  beforeEach(() => {
    useUserMock.mockReturnValue(user);
    useNavigateMock.mockReturnValue(vi.fn());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should navigate to login page when user is unauthenticated", async () => {
    useUserMock.mockReturnValue({ email: null });
    const navigateMock = vi.fn();
    useNavigateMock.mockReturnValue(navigateMock);
    const content = "Page Content";
    render(<Component>{content}</Component>);

    await waitFor(() =>
      expect(() => screen.getByText(content)).toThrow(
        `Unable to find an element with the text: ${content}`,
      ),
    );
    expect(navigateMock).toHaveBeenCalledWith("/login", { replace: true });
  });

  it("should allow children to be displayed when user is authenticated", async () => {
    useUserMock.mockReturnValue(user);
    const navigateMock = vi.fn();
    useNavigateMock.mockReturnValue(navigateMock);
    const content = "Page Content";
    render(<Component>{content}</Component>);

    await waitFor(() => expect(() => screen.findByText(content)));
    expect(navigateMock).not.toHaveBeenCalled();
  });
});
