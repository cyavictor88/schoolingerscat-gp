import type { IRoute } from "$lib/components/Route/route";

export const pageRoute : IRoute = {
  label: 'Inner Product',
  subRoutes: [
    { label: 'Inner Product in R^2', path: '#innerProduct2D',katexMix:[{str:'Inner Product in'},{math:'\\mathbb{R}^2'}]},
    { label: 'i-tag2', path: '#t2'},
    { label: 'i-tag3', path: '#t3'},
  ]
}