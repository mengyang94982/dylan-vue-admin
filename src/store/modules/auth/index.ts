import { defineStore } from "pinia";
import { SetupStoreId } from "@/enum";
import { useLoading } from "@sa/hooks";

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const { loading: loginLoading, startLoading, endLoading } = useLoading();

  async function login(userName: string, password: string) {}

  return {
    loginLoading,
    login,
  };
});
