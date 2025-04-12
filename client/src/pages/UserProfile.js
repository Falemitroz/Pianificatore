import React from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';

function UserProfile() {
  
  const user = {
    name: 'Mario Rossi', //sostituire con API
    email: 'mario.rossi@example.com', //sostituire con API
    avatar: '/static/images/avatar/2.jpg', 
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, width: 300, textAlign: 'center' }}>
        <Avatar 
          alt={user.name} 
          src={user.avatar} 
          sx={{ width: 80, height: 80, margin: '0 auto 16px auto' }} 
        />
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="body2" color="text.secondary">{user.email}</Typography>
      </Paper>
    </Box>
  );
}

export default UserProfile;