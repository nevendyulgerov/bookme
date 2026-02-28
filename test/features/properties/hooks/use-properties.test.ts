import { afterEach, beforeEach, describe, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useProperties } from "@/features/properties/hooks/use-properties";
import { useAppSelector } from "@/store/store";
import { properties, propertyA } from "../mocks";

vi.mock("../../../../src/store/store");
const useAppSelectorMock = vi.mocked(useAppSelector, true);

describe("useProperties", () => {
  beforeEach(() => {
    useAppSelectorMock.mockReturnValue({
      properties,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return properties data", () => {
    const { result } = renderHook(() => useProperties());
    expect(result.current.length).toBe(properties.length);
    expect(result.current[0].name).toBe(propertyA.name);
  });
});
