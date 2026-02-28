import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHeader } from "@/common/components/layout/page-header";
import { withChakraTheme } from "../../../with-chakra-theme";
import { LuHotel } from "react-icons/lu";
import { Button } from "@chakra-ui/react";

const Component = withChakraTheme(PageHeader);

describe("PageHeader", () => {
  it("should display page title", () => {
    const title = "Homepage";
    render(<Component title={title} icon={LuHotel} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("should display action slot", () => {
    const action = "Action";
    render(
      <Component
        title="Homepage"
        icon={LuHotel}
        actionsSlot={<Button>Action</Button>}
      />,
    );

    expect(screen.getByText(action)).toBeInTheDocument();
  });
});
