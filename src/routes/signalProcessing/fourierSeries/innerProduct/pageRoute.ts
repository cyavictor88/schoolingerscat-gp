import type { IRoute } from "$lib/components/Route/route";

export const pageRoute : IRoute = {
  label: 'Inner Product',
  subRoutes: [
    { label: 'i-tag1', path: '#t1'},
    { label: 'i-tag2', path: '#t2'},
    { label: 'i-tag3', path: '#t3'},
  ]
}
