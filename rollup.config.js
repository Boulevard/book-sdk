// rollup.config.js
import typescript from "@rollup/plugin-typescript";
import common from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default [
  {
    input: "src/blvd.ts",
    output: {
      sourcemap: true,
      dir: "lib",
      format: "es",
      name: "book-sdk"
    },
    plugins: [typescript()]
  },
  {
    input: "src/blvd.ts",
    output: {
      sourcemap: true,
      file: "lib/index.umd.js",
      format: "umd",
      name: "boulevard"
    },
    plugins: [nodeResolve({ browser: true }), common(), typescript()]
  }
];
