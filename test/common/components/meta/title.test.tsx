import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { Title } from "@/common/components/meta/title";

describe("Title", () => {
  it("should display meta title", () => {
    const title = "Homepage";
    const suffix = "My App";
    render(<Title title={title} suffix={suffix} />);
    expect(document.title).toBe(`${title} | ${suffix}`);
  });
});
