import type { IRoute } from "$lib/components/Route/route";

export const subjectRoute : IRoute = {
  label: 'Cross Product2',
  subRoutes: [
    { label: 'Introduction', path: '/math/crossProduct/introduction'},
    { label: 'Parallelepiped', path: '/math/crossProduct/parallelepiped'},
    { label: 'Linear Functional', path: '/math/crossProduct/linearFunctional'},
    { label: 'Cross Product Proof', path: '/math/crossProduct/crossProductProof'},
  ]
}
