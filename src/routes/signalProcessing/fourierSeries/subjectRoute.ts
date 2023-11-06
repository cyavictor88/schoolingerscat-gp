import type { IRoute } from "$lib/components/Route/route";

export const subjectRoute : IRoute = {
  label: 'Fourier Series',
  subRoutes: [
    { label: 'Introduction', path: '/signalProcessing/fourierSeries/introduction'},
    { label: 'Inner Product', path: '/signalProcessing/fourierSeries/innerProduct'},
    { label: 'Basis', path: '/signalProcessing/fourierSeries/basis'},
    { label: 'Fourier Series Proof', path: '/signalProcessing/fourierSeries/fourierSeriesProof'},
  ]
}
