export const i18n = {
  defaultLocale: "en",
  locales: ["en", "vi"],
  localeDetection: false,
} as const;

export type Locale = (typeof i18n)["locales"][number];
