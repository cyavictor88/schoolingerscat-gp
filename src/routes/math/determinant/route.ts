import type { IRoute } from "$lib/components/Route/route";

export const sectionRoute : IRoute = {
  label: 'Determinant',
  subRoutes: [
    { label: 'Introduction', path: '/math/Determinant/introduction'},
    { label: 'Linear Transformation', path: '/math/Determinant/linearTransformation'},
    { label: 'Determinant as Volume', path: '/math/Determinant/linearTransformation'},
    { label: 'Determinant Properties', path: '/math/Determinant/linearFunctional'},
  ]
}
