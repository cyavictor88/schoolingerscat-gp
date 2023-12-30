import type { IRoute } from "$lib/components/Route/route";

export const subjectRoute : IRoute = {
  label: 'Cross Product2',
  subRoutes: [
    { label: 'Introduction', path: '/math/crossProduct2/introduction'},
    { label: 'Parallelepiped', path: '/math/crossProduct2/parallelepiped'},
    { label: 'Linear Functional', path: '/math/crossProduct2/linearFunctional'},
    { label: 'Cross Product Proof', path: '/math/crossProduct2/crossProductProof'},
  ]
}
