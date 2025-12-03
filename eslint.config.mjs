import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    languageOptions: {
      ...config.languageOptions,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    files: ["src/**/*.{ts,mts,cts}"],
  })),

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
    ...js.configs.recommended,
    rules: {
      "no-fallthrough": "error",
      "no-duplicate-imports": "error",
      "no-var": "error",
      "prefer-const": "warn",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
  },

  prettierConfig,

  {
    files: ["src/**/*.{js,ts}"],

    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },

    rules: {
      "no-shadow": "off",
      "no-use-before-define": "off",
      "no-unused-expressions": "off",
      "no-unused-vars": "off",
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
        },
      ],

      "@typescript-eslint/no-shadow": ["error", { builtinGlobals: false }],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-explicit-any": "error",

      "max-len": [
        "error",
        {
          comments: 160,
          code: 140,
          ignoreTemplateLiterals: true,
          ignoreUrls: true,
          ignorePattern: '^\\s*(import|d="[^"]+")',
        },
      ],
      "prettier/prettier": [
        "error",
        {
          printWidth: 120,
          singleQuote: true,
          trailingComma: "all",
          tabWidth: 2,
          singleAttributePerLine: true,
          htmlWhitespaceSensitivity: "strict",
          semi: true,
        },
      ],
    },
  },

  {
    ignores: ["dist", "node_modules", "/*.*"],
  },
);
