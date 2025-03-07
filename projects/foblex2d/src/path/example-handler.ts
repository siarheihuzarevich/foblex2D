import { IPathHandler } from './i-path-handler';

export class ExampleHandler implements IPathHandler {

  beginParse(): void {
    this.log('beginParse');
  }

  log(name: string, ...params: any): void {
    console.log(name, params);
  }

  arcAbs(params: any[]): void {
    this.log('arcAbs', params);
  }

  arcRel(params: any[]): void {
    this.log('arcRel', params);
  }

  curvetoCubicAbs(params: any[]): void {
    this.log('curvetoCubicAbs', params);
  }

  curvetoCubicRel(params: any[]): void {
    this.log('curvetoCubicRel', params);
  }

  linetoHorizontalAbs(params: any[]): void {
    this.log('linetoHorizontalAbs', params);
  }

  linetoHorizontalRel(params: any[]): void {
    this.log('linetoHorizontalRel', params);
  }

  linetoAbs(params: any[]): void {
    this.log('linetoAbs', params);
  }

  linetoRel(params: any[]): void {
    this.log('linetoRel', params);
  }

  movetoAbs(params: any[]): void {
    this.log('movetoAbs', params);
  }

  movetoRel(params: any[]): void {
    this.log('movetoRel', params);
  }

  curvetoQuadraticAbs(params: any[]): void {
    this.log('curvetoQuadraticAbs', params);
  }

  curvetoQuadraticRel(params: any[]): void {
    this.log('curvetoQuadraticRel', params);
  }

  curvetoCubicSmoothAbs(params: any[]): void {
    this.log('curvetoCubicSmoothAbs', params);
  }

  curvetoCubicSmoothRel(params: any[]): void {
    this.log('curvetoCubicSmoothRel', params);
  }

  curvetoQuadraticSmoothAbs(params: any[]): void {
    this.log('curvetoQuadraticSmoothAbs', params);
  }

  curvetoQuadraticSmoothRel(params: any[]): void {
    this.log('curvetoQuadraticSmoothRel', params);
  }

  linetoVerticalAbs(params: any[]): void {
    this.log('linetoVerticalAbs', params);
  }

  linetoVerticalRel(params: any[]): void {
    this.log('linetoVerticalRel', params);
  }

  closePath(): void {
    this.log('closePath');
  }

  endParse(): void {
    this.log('endParse');
  }
}
