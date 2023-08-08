import type { IRoute } from "$lib/components/Routes/routes";

export const rootRoute : IRoute = {
  label: 'Fourier Series',
  subRoutes: [
    { label: 'Intro', path: '/signalProcessing/fourierSeries/intro'},
    { label: 'Inner Product', path: '/signalProcessing/fourierSeries/innerProduct'},
    { label: 'Basis', path: '/signalProcessing/fourierSeries/basis'},
  ]
}