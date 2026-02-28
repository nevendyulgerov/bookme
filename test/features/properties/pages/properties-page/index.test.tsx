import { afterEach, beforeEach, describe, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PropertiesPage } from "@/features/properties/pages/properties-page";
import { withChakraTheme } from "../../../../with-chakra-theme";
import { useNavigate, useSearchParams } from "react-router";
import { properties } from "../../mocks";
import { useAppDispatch } from "@/store/store";
import { useProperties } from "@/features/properties/hooks/use-properties";

vi.mock("../../../../../src/features/properties/hooks/use-properties");
const usePropertiesMock = vi.mocked(useProperties, true);

vi.mock("../../../../../src/store/store");
const useAppDispatchMock = vi.mocked(useAppDispatch, true);

vi.mock("react-router");
const useNavigateMock = vi.mocked(useNavigate, true);
const useSearchParamsMock = vi.mocked(useSearchParams, true);

const Component = withChakraTheme(PropertiesPage);

describe("PropertiesPage", () => {
  beforeEach(() => {
    usePropertiesMock.mockReturnValue(properties);
    useAppDispatchMock.mockReturnValue(vi.fn());
    useNavigateMock.mockReturnValue(vi.fn());
    useSearchParamsMock.mockReturnValue([new URLSearchParams(), vi.fn()]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should display meta title", () => {
    render(<Component />);
    expect(document.title).toBe("Properties | Book Me");
  });

  it("should display page title", () => {
    render(<Component />);

    const title = `Properties (${properties.length})`;
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("should display property cards", () => {
    render(<Component />);

    const propertyCards = screen.getAllByTestId("property-card");
    expect(propertyCards.length).toBe(properties.length);
  });

  it("should display no results found when no user bookings are available", () => {
    usePropertiesMock.mockReturnValue([]);
    render(<Component />);

    const noResultsTitle = "No properties found";
    expect(screen.getByText(noResultsTitle)).toBeInTheDocument();
  });

  it("should display search tag", () => {
    const searchParams = new URLSearchParams();
    const [property] = properties;
    const search = property.location.toLowerCase();
    searchParams.set("search", search);
    useSearchParamsMock.mockReturnValue([searchParams, vi.fn()]);

    render(<Component />);

    expect(screen.getByText(`Search: ${search}`)).toBeInTheDocument();
  });

  it("should display filter properties by location based on search", () => {
    const searchParams = new URLSearchParams();
    const [property] = properties;
    const search = property.location.toLowerCase();
    const filteredProperties = properties.filter((p) =>
      p.location.toLowerCase().includes(search),
    );
    searchParams.set("search", search);
    useSearchParamsMock.mockReturnValue([searchParams, vi.fn()]);

    render(<Component />);

    const propertyCards = screen.getAllByTestId("property-card");
    expect(propertyCards.length).toBe(filteredProperties.length);
  });

  it("should remove search when remove search button is clicked", () => {
    const navigateMock = vi.fn();
    useNavigateMock.mockReturnValue(navigateMock);
    const searchParams = new URLSearchParams();
    const [property] = properties;
    const search = property.location.toLowerCase();
    searchParams.set("search", search);
    useSearchParamsMock.mockReturnValue([searchParams, vi.fn()]);

    render(<Component />);

    const removeSearchButton = screen.getByTestId("remove-search-button");
    fireEvent.click(removeSearchButton);

    expect(navigateMock).toHaveBeenCalledWith("/properties");
  });
});
