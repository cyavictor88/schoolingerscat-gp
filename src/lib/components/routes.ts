

export interface Route {
  label?: string;
  path?: string;
  subRoutes?: Route[];
}
// https://svelte.dev/repl/347b37e18b5d4a65bbacfd097536db02?version=4.1.2
export const routes : Route = {
  subRoutes: [
    {label: 'FreeDraw', path: '/freeDraw'},
    {label: 'Pixi', path: '/pixi'},
    {label: 'Hello', path: '/hello'},
    {label: 'Signal Processing', subRoutes: [
      {label: 'Fourier Series', subRoutes:[
        {label: 'Intro'},
        {label: 'Inner Product', path: '/signalProcessing/fourierSeries/innerProduct'},
        {label: 'Basis', path: '/signalProcessing/fourierSeries/basis'},
      ]}
    ]}
  ] 
}