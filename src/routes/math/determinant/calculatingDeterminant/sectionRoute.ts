import type { IRoute } from "$lib/components/Route/route";


const baseRoute = '/math/determinant/calculatingDeterminant'

export const sectionRoute : IRoute = {
  label: 'Calculating Determinant',
  subRoutes: [
    { label: 'Calculating Determinant in R^2', path: baseRoute+'/calculatingDeterminantR2',katexMix:[{str:'Calculating Determinant in'},{math:'\\mathbb{R}^2'}]},
    { label: 'Calculating Determinant in R^3', path: baseRoute+'/calculatingDeterminantR3',katexMix:[{str:'Calculating Determinant in'},{math:'\\mathbb{R}^3'}]},
    { label: 'Calculating Determinant in R^n', path: baseRoute+'/calculatingDeterminantRn',katexMix:[{str:'Calculating Determinant in'},{math:'\\mathbb{R}^n'}]},
  ]
}
