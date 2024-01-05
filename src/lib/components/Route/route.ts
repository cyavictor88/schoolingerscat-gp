import type { ILatexMix } from "../Latex/latexMix";
import { subjectRoute as fourierSeriesRoute } from "../../../routes/signalProcessing/fourierSeries/subjectRoute";
import { subjectRoute as crossProductRoute2 } from "../../../routes/math/crossProduct2/subjectRoute";
import { subjectRoute as crossProductRoute } from "../../../routes/math/crossProduct/subjectRoute";
import { subjectRoute as determinantRoute } from "../../../routes/math/determinant/subjectRoute";

export interface IRoute {
  label: string;
  path?: string;
  subRoutes?: IRoute[];
  open?: boolean;
  parent?: IRoute;
  katexMix?: ILatexMix[];
}

// https://svelte.dev/repl/347b37e18b5d4a65bbacfd097536db02?version=4.1.2
export const rootRoute : IRoute = {
  label:'Home',
  path:'/',
  subRoutes: [
   {
    label:'Signal Processing', 
    subRoutes: [
        fourierSeriesRoute
      ]
    } ,
   {
    label:'Math',
    subRoutes: [
      determinantRoute,
      crossProductRoute, 
      crossProductRoute2, 
    ]
    } ,
  ] 
};

export function getSiteRootRoute(isLocal:boolean) : IRoute {
  if(!isLocal)
    return rootRoute
  
  const playground =  {label: 'Playground', subRoutes: [
    {label: '3JS', path: '/freeDraw'},
    {label: 'Pixi', path: '/pixi'},
    {label: 'D3', path: '/d3'},
    {label: '3js', subRoutes:[
      {label: 'MultiScenes', subRoutes:[
        {label: 'raw', path: '/threejs/multiScenes/raw'},
        {label: 'toggle', path: '/threejs/multiScenes/toggle'},
      ]}
    ]},
    {label: 'Scrollspy', subRoutes: [
      {label: 'Scrollspy1', path: '/hello/scroll'},
      {label: 'Scrollspy2', path: '/hello/scrollspy'},
      {label: 'Scrollspy3', path: '/hello/scrollspy3'},
    ]}
  ]}
  const devRootRoute = {...rootRoute};
  devRootRoute.subRoutes = [...devRootRoute.subRoutes!, playground];
  return devRootRoute;
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
      if (child.path === currentPath) {
        route.open = true;
        if(route.parent) setOpenForAncestors(route.parent);
      }
      setOpenedPath(child, currentPath);
    }
  }
}


export function getHref(label:string,route: IRoute): string{

  // function recurGet(label:string, route:IRoute, res:{href:string|null}){
  //   if(route.label && route.label.toLowerCase()===label.toLowerCase() && route.path) {
  //     res.href = route.path;
  //     return
  //   };
  //   if(route.subRoutes){
  //     for (let i = 0; i < route.subRoutes.length; i++) {
  //       const subRoute = route.subRoutes[i];
  //       recurGet(label,subRoute,res);
  //       if(res.href)return;
  //     }
  //   }
  // }
  // let resHref = {href:null}
  // recurGet(label,route,resHref);
  // return resHref.href!

  function recurGet(label:string, route:IRoute) :string|null{
    if(route.label && route.label.toLowerCase()===label.toLowerCase() && route.path) {
      return route.path;
    };
    if(route.subRoutes){
      for (let i = 0; i < route.subRoutes.length; i++) {
        const subRoute = route.subRoutes[i];
        const href = recurGet(label,subRoute);
        if(href) return href;
      }
    }
    return null;
  }
  const href = recurGet(label,route);
  return href ?? ''
}

