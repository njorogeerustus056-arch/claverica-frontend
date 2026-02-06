declare module "@mui/icons-material" {
  import * as React from "react";
  export const Add: React.ComponentType<any>;
  export const Remove: React.ComponentType<any>;
  export const Edit: React.ComponentType<any>;
  export const Delete: React.ComponentType<any>;
  export const Search: React.ComponentType<any>;
  // Allow any icon name
  export const __icons: { [key: string]: React.ComponentType<any> };
}

declare module "@mui/material/Grid" {
  import { ComponentType } from "react";
  const Grid: ComponentType<any>;
  export default Grid;
}
