export enum SITE_COLOR {
  IndexPageRouteBG = '#D3D3D3',
  SiteLayoutContentBG = '#decfcf',
  CompTopNavDirectory = '#FFD700',
  CompTopNavBG = '#8B4513',
  CompTopNavLogo = '#ffdab9',
  CompSideBarRouteBG = '#b08968',
  CompScrollspyFocusBG = '#ffa5ff',
  CompRouteDefaultBG = '#ADD8E6',
  CompRouteFocusBG = '#e6ccb2',
  CompRouteHoverBG = '#ede0d4',
  CompRouteHoverBar = '#800000',
  CompRouteLinkColor = '#3F2E3E',
  LayoutFSContentBG = '#e7d8c9',
  LayoutFSBorderBottom = '#8B4513',
  LayoutFSMobileRouteBG = '#6c584c',
  LayoutFSPageRouteBG = '#ddb892',
  TitleBG = '#00000011',




  // LIGHTGREY: 
}


export enum COLOR {
  RED = '#FF0000',
  BLUE = '#0000FF',
  BROWN = '#964B00',
}

export function getColor( color: SITE_COLOR | COLOR, alpha?:number):string {
  if(alpha){
    const hex = color+Math.floor(255*alpha).toString(16);
    return hex.length > 1 ? hex : '0' + hex;
  } 
  return color
}
