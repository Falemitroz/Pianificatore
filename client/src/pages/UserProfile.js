import React, { useContext } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  IconButton,
  Divider,
  Grid,
  Stack,
  Chip,
  Tooltip
} from '@mui/material';
import { LiaCameraRetroSolid } from 'react-icons/lia';
import { FaMapMarkerAlt, FaSuitcase, FaUserFriends, FaStar } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

function UserProfile() {
  const { user, profileImage, setProfileImage } = useContext(AuthContext);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('profileImage', reader.result);
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10, px: 2 }}>
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 700,
          borderRadius: 4,
          backgroundColor: '#f9fcff',
        }}
      >
        {/* Avatar + Nome */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <Avatar
            alt={user.nome}
            src={profileImage || '/static/images/avatar/2.jpg'}
            sx={{ width: 130, height: 130, border: '4px solid #ffffff', boxShadow: 3 }}
          />
          <IconButton
            component="label"
            sx={{
              position: 'absolute',
              justifySelf: 'center',
              top: 115,
              // right: 332,
              backgroundColor: "white",
              border: '2px solid white',
              p: 1,
              '&:hover': {
                backgroundColor: '#bbdefb',
              },
            }}
          >
            <LiaCameraRetroSolid color="#043f78" size={20} />
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </IconButton>

          <Typography variant="h5" fontWeight={600} mt={2}>
            {user.nome}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Sezione dettagli */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Ruolo
            </Typography>
            <Typography variant="body1">
              {user.ruolo || 'Utente'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Registrato il
            </Typography>
            <Typography variant="body1">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/D'}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Bio
            </Typography>
            <Typography variant="body1" fontStyle="italic">
              {user.bio || 'Aggiungi una bio al tuo profilo per far sapere chi sei!'}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Località
            </Typography>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
              <FaMapMarkerAlt style={{ marginRight: 8 }} />
              {user.localita || 'Non specificata'}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Statistiche utente */}
        <Grid container spacing={2} textAlign="center">
          <Grid item xs={4}>
            <Tooltip title="Viaggi effettuati">
              <Box>
                <FaSuitcase size={20} />
                <Typography variant="h6" fontWeight={500}>12</Typography>
                <Typography variant="caption">Viaggi</Typography>
              </Box>
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <Tooltip title="Amici nella piattaforma">
              <Box>
                <FaUserFriends size={20} />
                <Typography variant="h6" fontWeight={500}>24</Typography>
                <Typography variant="caption">Amici</Typography>
              </Box>
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <Tooltip title="Recensioni lasciate">
              <Box>
                <FaStar size={20} />
                <Typography variant="h6" fontWeight={500}>8</Typography>
                <Typography variant="caption">Recensioni</Typography>
              </Box>
            </Tooltip>
          </Grid>
        </Grid>

        {/* Badge utente */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Badge
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip label="Esploratore" color="primary" />
          <Chip label="Recensore" color="secondary" />
          <Chip label="Viaggiatore Gold" variant="outlined" />
        </Stack>
      </Paper>
    </Box>
  );
}

export default UserProfile;
