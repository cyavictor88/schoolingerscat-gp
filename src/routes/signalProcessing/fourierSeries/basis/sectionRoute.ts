import type { IRoute } from "$lib/components/Route/route";


const baseRoute = '/signalProcessing/fourierSeries/basis'




export const sectionRoute : IRoute = {
  label: 'Basis',
  subRoutes: [
    { label: 'Orthogonal Basis', path: baseRoute+'/orthogonalBasis'},
    { label: 'Vector Decomposition', path: baseRoute+'/vectorDecomposition'},
    { label: 'Function Decomposition', path: baseRoute+'/functionDecomposition'},
  ]
}
