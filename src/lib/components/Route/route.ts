import type { IKatexMix } from "../Katex/katexMix";

export interface IRoute {
  label: string;
  path?: string;
  subRoutes?: IRoute[];
  open?: boolean;
  parent?: IRoute;
  katexMix?: IKatexMix[];
}
// https://svelte.dev/repl/347b37e18b5d4a65bbacfd097536db02?version=4.1.2
export const rootRoute : IRoute = {
  label:'home',
  path:'/',
  subRoutes: [
    {label: 'FreeDraw', path: '/freeDraw'},
    {label: 'Pixi', path: '/pixi'},
    {label: 'Hello', subRoutes: [
      {label: 'World', path: '/hello/world'},
    ]},
    {label: 'Signal Processing', subRoutes: [
      {label: 'Fourier Series', subRoutes:[
        {label: 'Intro', path: '/signalProcessing/fourierSeries/intro'},
        {label: 'Inner Product', path: '/signalProcessing/fourierSeries/innerProduct'},
        {label: 'Basis', path: '/signalProcessing/fourierSeries/basis'},
      ]}
    ]}
  ] 
}



export function setOpenedPath(route: IRoute, currentPath: string){
  function setOpenForAncestors(route: IRoute){
    route.open = true;
    if(route.parent) {
      setOpenForAncestors(route.parent)
    }
  }
  
  route.open = false;
  if(route.subRoutes) {
    for (let i = 0; i < route.subRoutes.length; i++) {
      const child = route.subRoutes[i];
      child.parent = route;
      if(child.path === currentPath) {
        route.open = true;
        if(route.parent) setOpenForAncestors(route.parent);
      }
      setOpenedPath(child, currentPath);
    }
  }
}


