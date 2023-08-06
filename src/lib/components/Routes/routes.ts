
import { ORIGINAL_XDG_CURRENT_DESKTOP } from '$env/static/private';
import { writable } from 'svelte/store';
export interface Route {
  label: string;
  path?: string;
  subRoutes?: Route[];
  open?: boolean;
  parent?: Route;
}
// https://svelte.dev/repl/347b37e18b5d4a65bbacfd097536db02?version=4.1.2
export const rootRoute : Route = {
  label:'home',
  path:'/',
  subRoutes: [
    {label: 'FreeDraw', path: '/freeDraw'},
    {label: 'Pixi', path: '/pixi'},
    {label: 'Hello', path: '/hello'},
    {label: 'Signal Processing', subRoutes: [
      {label: 'Fourier Series', subRoutes:[
        {label: 'Intro', path: '/signalProcessing/fourierSeries/intro'},
        {label: 'Inner Product', path: '/signalProcessing/fourierSeries/innerProduct'},
        {label: 'Basis', path: '/signalProcessing/fourierSeries/basis'},
      ]}
    ]}
  ] 
}

// export const currentRoute = writable('/');


// export function setOpenPath(route: Route, currentPath: string){
//   route.open = false;
//   if(route.subRoutes) {
//     for (let i = 0; i < route.subRoutes.length; i++) {
//       const child = route.subRoutes[i];
//       child.parent = route;
//       if(child.path === currentPath) {
//         route.open = true;
//         if(route.parent) setOpenForAncestors(route.parent);
//       }
//       setOpenPath(child, currentPath);
//     }
//   }
// }

// function setOpenForAncestors(route: Route){
//   route.open = true;
//   if(route.parent) {
//     setOpenForAncestors(route.parent)
//   }
// }

