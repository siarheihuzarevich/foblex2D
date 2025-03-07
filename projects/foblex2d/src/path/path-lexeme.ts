import { EPathLexeme } from './e-path-lexeme';

export class PathLexeme {

  constructor(
    public type: EPathLexeme,
    public text: string
  ) {
  }

  public typeis(type: EPathLexeme) {
    return this.type === type;
  }
}



