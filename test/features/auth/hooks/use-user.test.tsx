import { describe, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useUser } from "@/features/auth/hooks/use-user";
import { useAppSelector } from "@/store/store";

vi.mock("../../../../src/store/store");
const useAppSelectorMock = vi.mocked(useAppSelector, true);

describe("useUser", () => {
  it("should return user data", () => {
    const email = "john@doe.com";
    useAppSelectorMock.mockReturnValue({
      user: { email },
    });
    const { result } = renderHook(() => useUser());
    expect(result.current.email).toBe(email);
  });
});
