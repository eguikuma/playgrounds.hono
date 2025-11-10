import { globalIgnores } from "@eslint/config-helpers";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import nextConfig from "eslint-config-next/core-web-vitals";
import nodePlugin from "eslint-plugin-n";
import unicornPlugin from "eslint-plugin-unicorn";

const eslintConfig = [
  globalIgnores([
    ".next",
    ".vercel",
    ".wrangler",
    ".open-next",
    "public",
    "**/*.d.ts",
  ]),
  ...nextConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      unicorn: unicornPlugin,
      n: nodePlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "n/no-process-env": ["error"],
      "react-hooks/rules-of-hooks": ["off"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": ["off"],
    },
  },
  {
    files: ["services/env/*.ts"],
    rules: {
      "n/no-process-env": ["off"],
    },
  },
];

export default eslintConfig;
