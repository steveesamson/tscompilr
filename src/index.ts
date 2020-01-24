import * as ts from "typescript";
export interface CompilerCallBack {
  (res: any): void;
}

const compile = (
  fileNames: string[],
  compilerOptions: ts.CompilerOptions,
  cb: CompilerCallBack
) => {
  const program = ts.createProgram(fileNames, compilerOptions);
  const emitResult = program.emit();

  const allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  allDiagnostics.forEach((diagnostic: any) => {
    if (diagnostic.file) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start
      );
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n"
      );
      console.log(
        `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
      );
    } else {
      console.log(
        ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")
      );
    }
  });

  cb(emitResult.emitSkipped);
};

export { compile };
