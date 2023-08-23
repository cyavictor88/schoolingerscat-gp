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
  label:'Home',
  path:'/',
  subRoutes: [
    {label: 'Playground', subRoutes: [
      {label: '3JS', path: '/freeDraw'},
      {label: 'Pixi', path: '/pixi'},
      {label: 'D3', path: '/d3'},
      {label: 'Scrollspy', subRoutes: [
        {label: 'Scrollspy1', path: '/hello/scroll'},
        {label: 'Scrollspy2', path: '/hello/scrollspy'},
      ]}
    ]},


    // {label: 'Hello', subRoutes: [
    //   {label: 'World', path: '/hello/world'},
    //   {label: 'Scroll', path: '/hello/scroll'},
    //   {label: 'Scrollspy', path: '/hello/scrollspy'},
    // ]},
    {label: 'Signal Processing', subRoutes: [
      {label: 'Fourier Series', subRoutes:[
        {label: 'Introduction', path: '/signalProcessing/fourierSeries/intro'},
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


