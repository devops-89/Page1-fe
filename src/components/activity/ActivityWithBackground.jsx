import { Typography, Container, Box, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import StarIcon from "@mui/icons-material/Star";
import React from 'react';
import { COLORS } from "@/utils/colors";
import { roboto } from "@/utils/fonts";

const ActivityWithBackground = ({ activity,handleOpenForm }) => {
  return (
    <Box 
      sx={{ 
        position: 'relative', 
        backgroundImage: `url(${activity.img})`, 
        marginTop: "90px", 
        backgroundRepeat: "no-repeat", 
        backgroundSize: "cover", 
        backgroundPosition: "center",
        minHeight: "100vh" // or any height you want
      }}
    >
      {/* Overlay */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black overlay with 50% opacity
          zIndex: 1 
        }} 
      />

      {/* Content */}
      <Container sx={{ py: 10, position: 'relative', zIndex: 2 }}>
        <Box sx={{ width: "500px" }}>
          <Typography 
            variant='h4' 
            sx={{ color: COLORS.PRIMARY, fontWeight: "bold", fontFamily: roboto.style }}
          >
            {activity.heading}
          </Typography>

          <Typography 
            variant='body1' 
            sx={{ color: COLORS.WHITE, fontFamily: roboto.style, mt: 2 }}
          >
            {activity.desc.para}
          </Typography>

          {/* Activity List */}
          <List sx={{ width: "100%", mt: 2 }}>
            {activity.desc.list.map((item, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemIcon>
                  <StarIcon sx={{ color: COLORS.PRIMARY }} />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body1" sx={{ fontFamily: roboto.style, color: COLORS.WHITE }}>
                    {item}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>

          <Button 
            sx={{ 
              bgcolor: COLORS.PRIMARY, 
              px: 3, 
              fontFamily: roboto.style, 
              color: COLORS.WHITE, 
              borderRadius: 0, 
              my: 2,
              '&:hover': { bgcolor: COLORS.PRIMARY } 
            }}
            onClick={handleOpenForm}
          >
            Enquire Now
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default ActivityWithBackground;
