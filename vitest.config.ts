import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["**/*.test.ts", "**/*.test.tsx"],
    exclude: ["node_modules/**", ".next/**", "tests/e2e/**", "docs/archive/**"],
    coverage: {
      provider: "v8",
      include: ["lib/**/*.ts", "components/**/*.tsx", "app/**/*.tsx"],
      exclude: ["**/*.test.*", "**/*.d.ts"],
      thresholds: {
        // The parser is the one piece of real logic on this site: everything else is
        // presentation over static Markdown. A regression there breaks navigation for a
        // whole dissertation, so it is held to a floor the rest is not.
        "lib/works.ts": { statements: 90, branches: 75, functions: 90, lines: 90 },
      },
    },
  },
});
