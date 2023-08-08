import type { IRoute } from "$lib/components/Route/route";

export const rootRoute : IRoute = {
  label: 'Fourier Series',
  subRoutes: [
    { label: 'Intro', path: '/signalProcessing/fourierSeries/intro'},
    { label: 'Inner Product', path: '/signalProcessing/fourierSeries/innerProduct'},
    { label: 'Basis', path: '/signalProcessing/fourierSeries/basis'},
  ]
}
