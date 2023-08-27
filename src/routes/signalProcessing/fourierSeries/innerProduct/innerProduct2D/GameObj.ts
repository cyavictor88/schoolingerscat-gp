
export interface Vec2D {
  x:number;
  y:number;
}


export class GameObj{
  public veca : Vec2D;
  public vec0: Vec2D = {x:0,y:0};
  public vecb: Vec2D;
  public radius = 1;
  public theta_a:number; 
  public theta_b:number;
  public theta_ab:number;  //bTheta + 0.5 * (aTheta - bTheta);


  constructor(veca:Vec2D, vecb:Vec2D){
    this.veca = veca;
    this.vecb = vecb;
    this.theta_a = Math.atan(veca.y / veca.x);
    this.theta_b = Math.atan(vecb.y / vecb.x);
    this.theta_ab =  (this.theta_a + this.theta_b)/2;
  }


}