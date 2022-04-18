import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth, db } from "../firebase";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function NavigationDrawer(title) {
  const { logout } = useAuth();
  const currentUserUid = auth.currentUser.uid;
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const userRef = db.ref("users");
    userRef.on("value", (snap) => {
      const users = snap.val();
      if (users !== null) {
        Object.keys(users).forEach((uid) => {
          if (uid === currentUserUid) {
            setUser(users[uid]);
            setAdmin(users[uid].admin);
          }
        });
      }
    });
  }, []);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const mainNavigationList = [
    {
      text: "My Tours",
      icon: <FormatListBulletedOutlinedIcon />,
      onClick: () => navigate("/tourlist"),
    },
    {
      text: "Create Tour",
      icon: <MapOutlinedIcon />,
      onClick: () => navigate("/createtour"),
    },
    {
      text: "My Places",
      icon: <LocationCityOutlinedIcon />,
      onClick: () => navigate("/poilist"),
    },
    {
      text: "Create Place",
      icon: <AddLocationAltOutlinedIcon />,
      onClick: () => navigate("/createpoi"),
    },
  ];

  const accountNavigationList = [
    {
      text: "Logout",
      icon: <LogoutOutlinedIcon />,
      onClick: () => handleLogout(),
    },
  ];

  const adminOptions = [
    {
      text: "All Tours",
      icon: <FormatListBulletedOutlinedIcon />,
      onClick: () => navigate("/alltours"),
    },
    {
      text: "All Destinations",
      icon: <FormatListBulletedOutlinedIcon />,
      onClick: () => navigate("/allpois"),
    },
    {
      text: "All Users",
      icon: <FormatListBulletedOutlinedIcon />,
      onClick: () => navigate("/allusers"),
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="sticky" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {mainNavigationList.map((item, index) => {
            const { text, icon, onClick } = item;

            return (
              <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <List>
          {accountNavigationList.map((item, index) => {
            const { text, icon, onClick } = item;

            return (
              <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
        {admin && (
          <>
            <Divider />
            <List>
              {adminOptions.map((item, index) => {
                const { text, icon, onClick } = item;

                return (
                  <ListItem button key={text} onClick={onClick}>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    <ListItemText primary={text} />
                  </ListItem>
                );
              })}
            </List>
          </>
        )}
      </Drawer>
    </Box>
  );
}
