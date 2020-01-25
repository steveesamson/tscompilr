import ts from "typescript";
import { join } from "path";
import fs from "fs";
import fse from "fs-extra";
import { compile } from "../src";

const readDir = (dir: string): string[] =>
  fs
    .readdirSync(dir)
    .reduce(
      (files, file) =>
        fs.statSync(join(dir, file)).isDirectory()
          ? files.concat(readDir(join(dir, file)))
          : files.concat(join(dir, file)),
      []
    );

let tsFiles: string[] = [];
describe("tscompilr", () => {
  beforeAll(done => {
    // Delete js folder before run
    const jsFolder = join(__dirname, "jsFolder");
    const tsFolder = join(__dirname, "tsFolder");

    if (fs.existsSync(jsFolder)) {
      fse.remove(jsFolder, () => {});
    }
    tsFiles = readDir(tsFolder);
    done();
  });

  it("transpile all .ts files in tsFolder directry to .js files in jsFolder with no error", done => {
    compile(
      tsFiles,
      {
        module: ts.ModuleKind.CommonJS,
        outDir: join(__dirname, "jsFolder"),
        noEmitOnError: true,
        rootDir: join(__dirname, "tsFolder")
      },
      skipped => {
        expect(skipped).toBeFalsy();
        done();
      }
    );
  });
  it("transpile all none-existing .ts files in tsFolder directory to .js files in jsFolder with error", done => {
    compile(
      ["./tsFolder/noneFile.ts"],
      {
        module: ts.ModuleKind.CommonJS,
        outDir: join(__dirname, "jsFolder"),
        noEmitOnError: true,
        rootDir: join(__dirname, "tsFolder")
      },
      skipped => {
        expect(skipped).toBeTruthy();
        done();
      }
    );
  });
});
