declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

export interface CustomMedicine {
  name: string;
  uses?: string;
  dosage?: string;
  sideEffects?: string;
  prohibited?: string;
  warnings?: string;
  interactions?: string[]; // List of medicine names this interacts with
}
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}