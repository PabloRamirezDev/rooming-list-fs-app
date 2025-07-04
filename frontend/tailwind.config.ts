import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    colors: {
      alabaster: "#F9FBFF",
      mist: "#E4ECF2",
      iron: "#CDD4E5",
      slate: "#777E90",
      cinder: "#141416",
      dodgerblue: "#3E8CFF",
      royalblue: "#4323FF",
      topaz: "#00C2A6",
      indigo: "#6707FD",
    },
    fontSize: {
      sm: [
        "0.75rem", // 12px
        "1rem", // 16px
      ],
      base: [
        "0.875rem", // 14px
        "1.25rem", // 20px
      ],
      lg: [
        "1rem", // 16px
        "1.5rem", // 24px
      ],
      xl: [
        "1.625rem", // 26px
        "1.5rem", // 24px
      ],
      "2xl": [
        "2rem", // 32px
        "2rem", //32px
      ],
    },
  },
};

export default config;
