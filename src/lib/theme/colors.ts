export enum COLOR {
  RED = '#FF0000',
  BLUE = '#0000FF',
  BROWN = '#964B00',
}

export function getColor( color: COLOR, alpha?:number):string {
  if(alpha) return color+alpha.toString(16);
  return color
}
