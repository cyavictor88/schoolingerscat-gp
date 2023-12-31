import type { IRoute } from "$lib/components/Route/route";

export const subjectRoute : IRoute = {
  label: 'Cross Product',
  subRoutes: [
    { label: 'Introduction', path: '/math/crossProduct/introduction'},
    { label: 'Determinant', path: '/math/crossProduct/determinant'},
    { label: 'Linear Functional', path: '/math/crossProduct/linearFunctional'},
    { label: 'Cross Product Proof', path: '/math/crossProduct/crossProductProof'},
  ]
}
