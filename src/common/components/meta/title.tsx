import type { FC } from "react";

interface TitleProps {
  title: string;
  suffix?: string;
}

export const Title: FC<TitleProps> = (props) => {
  const { title, suffix = "Book Me" } = props;

  return <title>{`${title} | ${suffix}`}</title>;
};
