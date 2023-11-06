import type { IRoute } from "$lib/components/Route/route";


const baseRoute = '/signalProcessing/fourierSeries/fourierSeriesProof'




export const sectionRoute : IRoute = {
  label: 'Fourier Series Proof',
  subRoutes: [
    { label: 'Fourier Basis', path: baseRoute+'/fourierBasis'},
    { label: 'Examples From Intro', path: baseRoute+'/examples'},
    { label: 'Exponential Form', path: baseRoute+'/exponentialForm'},

  ]
}
