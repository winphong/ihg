import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Legacy CRA/Express code being replaced by this Next.js app - not part
    // of it, will be deleted at cutover (see docs/MIGRATION_PLAN.md).
    "frontend/**",
    "server/**",
    "apps/**",
  ]),
]);

export default eslintConfig;
