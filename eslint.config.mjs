import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    "rules": {
      "tab-width": ["error", 2],
      "indent": ["error", "tab"],
      "@typescript-eslint/indent": ["error", "tab"],
      "semi": ["error", "never"],
    }
  }
];

export default eslintConfig;
