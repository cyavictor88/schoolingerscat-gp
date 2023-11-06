import { writable } from 'svelte/store'
import { subjectRoute as myRoute } from './subjectRoute'

export const storeSubjectRoute = writable(myRoute);
