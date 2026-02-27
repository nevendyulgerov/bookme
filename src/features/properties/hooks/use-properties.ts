import { useAppSelector } from "@/store/store";

export const useProperties = () => {
  const { properties } = useAppSelector((store) => store.properties);
  return properties;
};
