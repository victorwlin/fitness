import React from 'react';
import { Link, navigate } from "@reach/router";

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { auth } from "../../firebase";

export const mainListItems = (
  <div>
    <ListItem button onClick={() => navigate("/")}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    
    <ListItem button onClick={() => navigate("/weight")}>
      <ListItemIcon>
        <WebAssetIcon />
      </ListItemIcon>
      <ListItemText primary="Weight Tracker" />
    </ListItem>
    
    <ListItem button>
      <ListItemIcon>
        <FitnessCenterIcon />
      </ListItemIcon>
      <ListItemText primary="Exercise (Coming Soon)" />
    </ListItem>
    
    <ListItem button>
      <ListItemIcon>
        <RestaurantIcon />
      </ListItemIcon>
      <ListItemText primary="Nutrition (Coming Soon)" />
    </ListItem>
    
    <ListItem button onClick={() => auth.signOut()}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Sign Off" />
    </ListItem>

  </div>
);

// export const secondaryListItems = (
//   <div>
//     <ListSubheader inset>Saved reports</ListSubheader>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItem>
//   </div>
// );