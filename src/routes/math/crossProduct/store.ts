import { writable } from 'svelte/store'
import { sectionRoute as myRoute } from './route'

export const sectionRoute = writable(myRoute);
