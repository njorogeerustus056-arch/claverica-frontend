// Quick fix for MUI icons - declare as any type
declare module "@mui/icons-material" {
  const content: any;
  export default content;
  export * from "@mui/icons-material";
}
