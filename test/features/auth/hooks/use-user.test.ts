import { afterEach, beforeEach, describe, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useUser } from "@/features/auth/hooks/use-user";
import { useAppSelector } from "@/store/store";
import { user } from "../mocks";

vi.mock("../../../../src/store/store");
const useAppSelectorMock = vi.mocked(useAppSelector, true);

describe("useUser", () => {
  beforeEach(() => {
    useAppSelectorMock.mockReturnValue({
      user,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return user data", () => {
    const { result } = renderHook(() => useUser());
    expect(result.current.email).toBe(user.email);
  });
});
