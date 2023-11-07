import type { IRoute } from "$lib/components/Route/route";

export const subjectRoute : IRoute = {
  label: 'Determinant',
  subRoutes: [
    { label: 'Introduction', path: '/math/determinant/introduction'},
    { label: 'Linear Transformation', path: '/math/determinant/linearTransformation'},
    { label: 'Oriented Volume', path: '/math/determinant/orientedVolume'},
    { label: 'Calculating Determinant', path: '/math/determinant/calculatingDeterminant'},
    { label: 'Determinant Properties', path: '/math/determinant/determinantProperties'},
  ]
}
