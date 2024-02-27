import { defineStore } from "pinia";
import { SetupStoreId } from "@/enum";
import { localStg } from "@/utils/storage";
import { ref } from "vue";
import { setLocale } from "@/locales";

export const useAppStore = defineStore(SetupStoreId.App, () => {
  const locale = ref<App.I18n.LangType>(localStg.get("lang") || "zh-CN");

  const localeOptions: App.I18n.LangOption[] = [
    {
      label: "中文",
      key: "zh-CN",
    },
    {
      label: "English",
      key: "en-US",
    },
  ];

  function changeLocale(lang: App.I18n.LangType) {
    locale.value = lang;
    setLocale(lang);
    localStg.set("lang", lang);
  }

  return {
    locale,
    localeOptions,
    changeLocale,
  };
});
