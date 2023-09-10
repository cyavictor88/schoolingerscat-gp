import type { IRoute } from "$lib/components/Route/route";


const baseRoute = '/signalProcessing/fourierSeries/innerProduct'

export const pageRoute : IRoute = {
  label: 'Inner Product',
  subRoutes: [
    { label: 'Inner Product in R^2', path: baseRoute+'/innerProduct2D',katexMix:[{str:'Inner Product in'},{math:'\\mathbb{R}^2'}]},
    { label: 'Inner Product in R^3', path: baseRoute+'/innerProduct3D',katexMix:[{str:'Inner Product in'},{math:'\\mathbb{R}^3'}]},
    { label: 'Inner Product in R^n', path: baseRoute+'/innerProductRn',katexMix:[{str:'Inner Product in'},{math:'\\mathbb{R}^n'}]},
    { label: 'Inner Product in C^n', path: baseRoute+'/innerProductCn',katexMix:[{str:'Inner Product in'},{math:'\\mathbb{C}^n'}]},
    { label: 'Inner Product for Functions', path: baseRoute+'/innerProductFn'},
  ]
}
