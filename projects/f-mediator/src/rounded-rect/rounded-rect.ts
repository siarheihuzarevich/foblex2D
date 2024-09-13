import { IRoundedRect } from './i-rounded-rect';
import { IPoint, Point, PointExtensions } from '../point';
import { IRect } from '../rect';

export class RoundedRect implements IRoundedRect {

  public gravityCenter: IPoint = PointExtensions.initialize();

  constructor(
    public x: number = 0,
    public y: number = 0,
    public width: number = 0,
    public height: number = 0,
    public radius1: number = 0,
    public radius2: number = 0,
    public radius3: number = 0,
    public radius4: number = 0
  ) {
    this.gravityCenter = this.calculateGravityCenter(this);
  }

  private calculateGravityCenter(rect: IRoundedRect): IPoint {
    return new Point(rect.x + rect.width / 2, rect.y + rect.height / 2);
  }

  public static fromRect(rect: IRect): RoundedRect {
    return new RoundedRect(rect.x, rect.y, rect.width, rect.height);
  }

  public static fromRoundedRect(rect: IRoundedRect): RoundedRect {
    return new RoundedRect(rect.x, rect.y, rect.width, rect.height, rect.radius1, rect.radius2, rect.radius3, rect.radius4);
  }

  public addPoint(point: IPoint): RoundedRect {
    const copy = RoundedRect.fromRoundedRect(this);
    copy.x += point.x;
    copy.y += point.y;
    copy.gravityCenter = this.calculateGravityCenter(copy);
    return copy;
  }
}
