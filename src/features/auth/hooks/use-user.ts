import { useAppSelector } from "@/store/store";

export const useUser = () => {
  const { user } = useAppSelector((store) => store.user);
  return user;
};
