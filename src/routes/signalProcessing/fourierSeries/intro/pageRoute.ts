import type { IRoute } from "$lib/components/Route/route";

export const pageRoute : IRoute = {
  label: 'Introduction',
  subRoutes: [
    { label: 'tag1', path: '#t1'},
    { label: 'tag2', path: '#t2'},
    { label: 'tag3', path: '#t3'},
  ]
}
