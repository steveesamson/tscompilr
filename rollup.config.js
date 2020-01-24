import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import tsc from "rollup-plugin-typescript2";
import pkg from "./package.json";

const isProduction = process.env.NODE_ENV === "production";

export default (async () => ({
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "esm"
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {})
  ],
  plugins: [
    resolve({
      extensions: [".ts", ".tsx"]
    }),
    commonjs(),
    tsc({
      exclude: ["node_modules/**"],
      typescript: require("typescript")
    }),
    json({
      exclude: ["node_modules/**"]
    }),
    isProduction && (await import("rollup-plugin-terser")).terser()
  ]
}))();
