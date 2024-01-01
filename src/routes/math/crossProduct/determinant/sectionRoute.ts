import type { IRoute } from "$lib/components/Route/route";
const baseRoute = '/math/crossProduct/determinant'

export const sectionRoute : IRoute = {
  label: 'Determinant',
  subRoutes: [
    { label: 'Oriented Volume', path: baseRoute + '/orientedVolume'},
    { label: 'Calculating Determinant', path: baseRoute+'/calculatingDeterminant'},
    { label: 'Linear Transformation', path: baseRoute + '/calculatingDeterminant/linearTransformation'},
    { label: 'Row Ops in R^2', path: baseRoute+'/calculatingDeterminant/r2',katexMix:[{str:'Row Ops in'},{math:'\\mathbb{R}^2'}]},
    { label: 'Row Ops in R^3', path: baseRoute+'/calculatingDeterminant/r3',katexMix:[{str:'Row Ops in'},{math:'\\mathbb{R}^3'}]},
  ]
}
