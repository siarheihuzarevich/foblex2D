export interface IPathHandler {

  beginParse(): void;

  log(name: string, ...params: any): void;

  arcAbs(params: any[]): void;
  arcRel(params: any[]): void;

  curvetoCubicAbs(params: any[]): void;
  curvetoCubicRel(params: any[]): void;

  linetoHorizontalAbs(params: any[]): void;
  linetoHorizontalRel(params: any[]): void;

  linetoAbs(params: any[]): void;
  linetoRel(params: any[]): void;

  movetoAbs(params: any[]): void;
  movetoRel(params: any[]): void;

  curvetoQuadraticAbs(params: any[]): void;
  curvetoQuadraticRel(params: any[]): void;

  curvetoCubicSmoothAbs(params: any[]): void;
  curvetoCubicSmoothRel(params: any[]): void;

  curvetoQuadraticSmoothAbs(params: any[]): void;
  curvetoQuadraticSmoothRel(params: any[]): void;

  linetoVerticalAbs(params: any[]): void;
  linetoVerticalRel(params: any[]): void;

  closePath(): void;

  endParse(): void;
}
