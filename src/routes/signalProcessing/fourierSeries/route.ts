import type { IRoute } from "$lib/components/Route/route";

export const sectionRoute : IRoute = {
  label: 'Fourier Series',
  subRoutes: [
    { label: 'Introduction', path: '/signalProcessing/fourierSeries/intro'},
    { label: 'Inner Product', path: '/signalProcessing/fourierSeries/innerProduct'},
    { label: 'Basis', path: '/signalProcessing/fourierSeries/basis'},
  ]
}
