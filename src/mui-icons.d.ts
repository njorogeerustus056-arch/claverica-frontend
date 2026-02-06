declare module "@mui/icons-material" {
  import * as React from "react";
  
  // Export specific icons
  export const Add: React.ComponentType<any>;
  export const Remove: React.ComponentType<any>;
  export const Edit: React.ComponentType<any>;
  export const Delete: React.ComponentType<any>;
  export const Search: React.ComponentType<any>;
  export const Menu: React.ComponentType<any>;
  export const Close: React.ComponentType<any>;
  export const Check: React.ComponentType<any>;
  export const ArrowBack: React.ComponentType<any>;
  export const ArrowForward: React.ComponentType<any>;
  export const Home: React.ComponentType<any>;
  export const Settings: React.ComponentType<any>;
  export const Person: React.ComponentType<any>;
  export const Notifications: React.ComponentType<any>;
  export const Email: React.ComponentType<any>;
  export const Phone: React.ComponentType<any>;
  export const LocationOn: React.ComponentType<any>;
  export const MoreVert: React.ComponentType<any>;
  export const ExpandMore: React.ComponentType<any>;
  export const ChevronRight: React.ComponentType<any>;
  export const ChevronLeft: React.ComponentType<any>;
  export const Dashboard: React.ComponentType<any>;
  export const AccountCircle: React.ComponentType<any>;
  export const Lock: React.ComponentType<any>;
  export const ExitToApp: React.ComponentType<any>;
  export const Payment: React.ComponentType<any>;
  export const CreditCard: React.ComponentType<any>;
  export const AttachMoney: React.ComponentType<any>;
  export const TrendingUp: React.ComponentType<any>;
  export const TrendingDown: React.ComponentType<any>;
  export const Info: React.ComponentType<any>;
  export const Warning: React.ComponentType<any>;
  export const Error: React.ComponentType<any>;
  export const CheckCircle: React.ComponentType<any>;
  export const Cancel: React.ComponentType<any>;
  export const Receipt: React.ComponentType<any>;
  export const Briefcase: React.ComponentType<any>;
  export const Train: React.ComponentType<any>;
  
  // Use a namespace for dynamic access
  namespace MuiIcons {
    export function getIcon(name: string): React.ComponentType<any> | undefined;
  }
  
  // Export the namespace
  export { MuiIcons };
}
