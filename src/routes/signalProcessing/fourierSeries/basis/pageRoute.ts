import type { IRoute } from "$lib/components/Route/route";

export const pageRoute : IRoute = {
  label: 'Basis',
  subRoutes: [
    { label: 'b-tag1', path: '#t1'},
    { label: 'b-tag2', path: '#t2'},
    { label: 'b-tag3', path: '#t3'},
  ]
}
