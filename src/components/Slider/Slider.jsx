"use client";

import { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };
  const handleNavigation = (path) => {
    setIsOpen(false); // Cierra el Drawer al hacer clic
    router.push(path); // Navega a la ruta especificada
  };

  const list = () => (
    <List>
      {[
        { text: 'Home', path: '/' },
        { text: 'Suppliers', path: '/suppliers' },
        { text: 'Category', path: '/categories' },
        { text: 'Country', path: '/countries' },
      ].map(({ text, path }, index) => (
        <ListItem sx={{cursor: 'pointer'}} button key={index} onClick={() => handleNavigation(path)}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box sx={{ml : 2 }}>
      <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit">
        <MenuIcon />
      </IconButton>
      <Drawer sx={{width: "440px" }} anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
