import { ISize } from './i-size';

export class SizeExtensions {

  public static initialize(width: number = 0, height: number = 0): ISize {
    return { width, height };
  }
}





