import { useAppSelector } from "@/store/store";
import type { UserModel } from "@/store/slices/user/types";

export const useUser = (): UserModel => {
  const { user } = useAppSelector((store) => store.user);
  return user;
};
