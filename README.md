[![Build Status](https://travis-ci.org/steveesamson/tscompilr.svg?branch=master)](https://travis-ci.org/steveesamson/tscompilr)
[![Coverage Status](https://coveralls.io/repos/github/steveesamson/tscompilr/badge.svg?branch=master)](https://coveralls.io/github/steveesamson/tscompilr?branch=master)

# tscompilr

This is a utility for transpiling TypeScript files to equivalent JavaScript files.

## Prerequisite

- [Node.js](https://nodejs.org)

## Installation

With **`npm`**:

```cli
npm install tscompilr --save
```

With **`yarn`**:

```cli
yarn add tscompilr
```

## Usage

In order to use **`tscompilr`**, do the following:

### CommonJS

```js
const { compile } = require("tscompilr");

/* Array of files */
const files = ['src/file-a.ts', 'src/file-b.ts', ...];

/* Every valid TypeScript compiler options is allowed. */
const compilerOptions = {
        module: "commonjs",
        outDir: "dist",
        noEmitOnError: true,
        rootDir:  "src"
      };

/* transpile */
compile(files, compilerOptions, skippedTranspiling =>{
    if(!skippedTranspiling){
        console.log("Files successfully transpiled")
    }
})

```

### ES6

```js
import { compile } from "tscompilr";

/* Array of files */
const files = ['src/file-a.ts', 'src/file-b.ts', ...];

/* Every valid TypeScript compiler options is allowed. */
const compilerOptions = {
        module: "commonjs",
        outDir: "dist",
        noEmitOnError: true,
        rootDir:  "src"
      };

/* transpile */
compile(files, compilerOptions, skippedTranspiling =>{
    if(!skippedTranspiling){
        console.log("Files successfully transpiled")
    }
})

```

### TypeScript

```js
import { compile } from "tscompilr";
import ts from "typescript";

/* Array of files */
const files:string[] = ['src/file-a.ts', 'src/file-b.ts', ...];

/* Every valid TypeScript compiler options is allowed. */
const compilerOptions:ts.CompilerOptions = {
        module: ts.ModuleKind.CommonJS,
        outDir: "dist",
        noEmitOnError: true,
        rootDir: "src"
      };

/* transpile */
compile(files, compilerOptions, (skippedTranspiling:boolean) =>{
    if(!skippedTranspiling){
        console.log("Files successfully transpiled")
    }
})

```

## Running Tests

```cli

$ npm run test

or

$ yarn test

```

Check the scripts key in `package.json` for the complete list of targets.
