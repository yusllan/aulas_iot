// Sidebar.jsx
import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import SidebarTitle from "./SidebarTitle";

const drawerWidth = 280;

// Drawer estilizado
const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "darkMode",
})(({ theme, darkMode }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    backgroundColor: darkMode ? "#22223b" : "#ffffff",
    color: darkMode ? "#fff" : "#2d3748",
    borderRight: darkMode ? "none" : "1px solid #e2e8f0",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const Sidebar = ({
  title,
  items = [],
  darkMode,
  activeView,
  onViewChange,
  open,
  onClose,
  isMobile,
}) => {
  const theme = useTheme();

  const drawerContent = (
    <>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],
        }}
      >
        <Typography variant="h6" noWrap component="div">
          {title}
        </Typography>
        {isMobile && (
          <IconButton onClick={onClose}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Toolbar>
      <Divider />
      <List>
        {items.map((item) => (
          <ListItemButton
            key={item.id}
            selected={activeView === item.id}
            onClick={() => onViewChange(item.id)}
            sx={{
              "&.Mui-selected": {
                backgroundColor: darkMode ? "#3a3a5c" : "#f7fafc",
                color: darkMode ? "#fca311" : "#2b6cb0",
              },
              "&.Mui-selected:hover": {
                backgroundColor: darkMode ? "#3a3a5c" : "#f7fafc",
              },
              borderRadius: 1,
              mx: 1,
              my: 0.5,
            }}
          >
            {item.icon && (
              <ListItemIcon
                sx={{
                  color:
                    activeView === item.id
                      ? darkMode
                        ? "#fca311"
                        : "#2b6cb0"
                      : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
            )}
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: darkMode ? "#22223b" : "#ffffff",
            color: darkMode ? "#fff" : "#2d3748",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <StyledDrawer
      variant="permanent"
      darkMode={darkMode}
      open={open}
      sx={{
        display: { xs: "none", md: "block" },
      }}
    >
      {drawerContent}
    </StyledDrawer>
  );
};

export default Sidebar;
