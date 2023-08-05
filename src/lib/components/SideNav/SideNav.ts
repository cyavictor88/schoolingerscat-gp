export interface Link {
  label: string;
  subLinks : Link[];
  showSubLinks? : boolean;
}