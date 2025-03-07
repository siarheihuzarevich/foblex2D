import { PathLexeme } from './path-lexeme';
import { EPathLexeme } from './e-path-lexeme';

export class PathLexer {

  private _pathData: string | undefined;

  constructor(pathData?: string) {
    if (pathData === null || pathData === undefined) {
      pathData = "";
    }

    this.setPathData(pathData);
  }

  public setPathData(pathData: string) {
    if (typeof pathData !== "string") {
      throw new TypeError("The first parameter must be a string");
    }

    this._pathData = pathData;
  }

  public getNextToken(): PathLexeme {
    let result: PathLexeme | null = null;
    let d = this._pathData!;

    while (result === null) {
      if (d === null || d === "") {
        result = new PathLexeme(EPathLexeme.EOD, "");
      } else if (d.match(/^([ \t\r\n,]+)/)) {
        d = d.substr(RegExp.$1.length);
      } else if (d.match(/^([AaCcHhLlMmQqSsTtVvZz])/)) {
        result = new PathLexeme(EPathLexeme.COMMAND, RegExp.$1);
        d = d.substr(RegExp.$1.length);
      } else if (d.match(/^(([-+]?\d+(\.\d*)?|[-+]?\.\d+)([eE][-+]?\d+)?)/)) {
        result = new PathLexeme(EPathLexeme.NUMBER, RegExp.$1);
        d = d.substr(RegExp.$1.length);
      } else {
        throw new SyntaxError(`Unrecognized path data: ${ d }`);
      }
    }

    this._pathData = d;

    return result;
  }
}
