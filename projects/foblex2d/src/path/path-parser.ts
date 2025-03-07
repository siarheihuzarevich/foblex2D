import { PathLexer } from './path-lexer';
import { EPathLexeme } from './e-path-lexeme';
import { PATH_PARAMETER_RECORD } from './path-parameter/path-parameter-record';
import { EPathParameter } from './path-parameter/e-path-parameter';
import { EPathMethod } from './e-path-method';
import { IPathHandler } from './i-path-handler';

const BOP = "BOP";

export class PathParser {

  private readonly _lexer: PathLexer = new PathLexer();
  private _handler: IPathHandler | null = null;

  public parseData(pathData: string): void {
    if (typeof pathData !== "string") {
      throw new TypeError(`The first parameter must be a string: ${ pathData }`);
    }

    if (this._handler !== null && typeof this._handler.beginParse === "function") {
      this._handler.beginParse();
    }

    const lexer = this._lexer;

    lexer.setPathData(pathData);

    let mode: string = BOP;

    let lastToken = null;
    let token = lexer.getNextToken();

    while (token.typeis(EPathLexeme.EOD) === false) {
      let parameterCount: number | undefined;
      const params: any[] = [];

      switch (token.type) {
        case EPathLexeme.COMMAND:
          if (mode === BOP && token.text !== "M" && token.text !== "m") {
            throw new SyntaxError(`New paths must begin with a moveto command. Found '${ token.text }'`);
          }
          mode = token.text;
          parameterCount = PATH_PARAMETER_RECORD[ token.text.toUpperCase() as EPathParameter ];

          token = lexer.getNextToken();
          break;

        case EPathLexeme.NUMBER:
          if (mode === BOP) {
            throw new SyntaxError(`New paths must begin with a moveto command. Found '${ token.text }'`);
          }
          parameterCount = PATH_PARAMETER_RECORD[ mode.toUpperCase() as EPathParameter ];
          break;

        default:
          throw new SyntaxError(`Unrecognized command type: ${ token.type }`);
      }

      for (let i = 0; i < parameterCount; i++) {
        switch (token.type) {
          case EPathLexeme.COMMAND:
            throw new SyntaxError(`Parameter must be a number. Found '${ token.text }'`);

          case EPathLexeme.NUMBER:
            params[ i ] = parseFloat(token.text);
            break;

          case EPathLexeme.EOD:
            throw new SyntaxError("Unexpected end of string");

          default:
            throw new SyntaxError(`Unrecognized parameter type. Found type '${ token.type }'`);
        }

        token = lexer.getNextToken();
      }

      if (this._handler !== null) {
        if (mode === EPathMethod.a || mode === EPathMethod.A) {
          params[ 3 ] = params[ 3 ] !== 0;
          params[ 4 ] = params[ 4 ] !== 0;
        }

        this._runHandler(mode as EPathMethod, params, this._handler);
      }

      switch (mode) {
        case EPathMethod.M:
          mode = EPathMethod.L;
          break;
        case EPathMethod.m:
          mode = EPathMethod.l;
          break;
        case EPathMethod.Z:
        case EPathMethod.z:
          mode = "BOP";
          break;
      }

      if (token === lastToken) {
        throw new SyntaxError(`Parser stalled on '${ token.text }'`);
      }
      lastToken = token;
    }

    if (this._handler !== null && typeof this._handler.endParse === "function") {
      this._handler.endParse();
    }
  }

  private _runHandler(method: EPathMethod, params: any[], handler: IPathHandler): void {
    switch (method) {
      case EPathMethod.A:
        return handler.arcAbs(params);
      case EPathMethod.a:
        return handler.arcRel(params);
      case EPathMethod.C:
        return handler.curvetoCubicAbs(params);
      case EPathMethod.c:
        return handler.curvetoCubicRel(params);
      case EPathMethod.H:
        return handler.linetoHorizontalAbs(params);
      case EPathMethod.h:
        return handler.linetoHorizontalRel(params);
      case EPathMethod.L:
        return handler.linetoAbs(params);
      case EPathMethod.l:
        return handler.linetoRel(params);
      case EPathMethod.M:
        return handler.movetoAbs(params);
      case EPathMethod.m:
        return handler.movetoRel(params);
      case EPathMethod.Q:
        return handler.curvetoQuadraticAbs(params);
      case EPathMethod.q:
        return handler.curvetoQuadraticRel(params);
      case EPathMethod.S:
        return handler.curvetoCubicSmoothAbs(params);
      case EPathMethod.s:
        return handler.curvetoCubicSmoothRel(params);
      case EPathMethod.T:
        return handler.curvetoQuadraticSmoothAbs(params);
      case EPathMethod.t:
        return handler.curvetoQuadraticSmoothRel(params);
      case EPathMethod.V:
        return handler.linetoVerticalAbs(params);
      case EPathMethod.v:
        return handler.linetoVerticalRel(params);
      case EPathMethod.Z:
      case EPathMethod.z:
        return handler.closePath();
    }
  }

  public setHandler(handler: IPathHandler): void {
    this._handler = handler;
  }
}

