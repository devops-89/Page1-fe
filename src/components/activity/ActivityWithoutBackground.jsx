import React from "react";
import { COLORS } from "@/utils/colors";
import StarIcon from "@mui/icons-material/Star";
import {
  Grid2,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { roboto } from "@/utils/fonts";

const ActivityWithoutBackground = ({ activity, height, handleOpenForm }) => {
  return (
    <>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, sm: 12, md: 6 }} sx={{ maxHeight: height }}>
          <img src={activity.img} style={{ width: "100%", height: "100%" }} />
        </Grid2>
        <Grid2
          size={{ xs: 12, sm: 12, md: 6 }}
          sx={{ textAlign: { xs: "center", sm: "start" } }}
        >
          {/* Activity Heading */}
          <Typography
            variant="h5"
            sx={{
              fontFamily: roboto.style,
              mb: 2,
              fontWeight: "bold",
              color: COLORS.PRIMARY,
            }}
          >
            {activity.heading}
          </Typography>
          {/* Activity Description */}
          <Typography variant="body1" sx={{ fontFamily: roboto.style }}>
            {activity.desc.para}
          </Typography>
          {/* Activity List */}
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {activity.desc.list.map((item, index) => {
              return (
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <StarIcon sx={{ color: COLORS.PRIMARY }} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: roboto.style }}
                    >
                      {item}
                    </Typography>
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>

          <Button
            sx={{
              bgcolor: COLORS.PRIMARY,
              px: 1,
              fontFamily: roboto.style,
              color: COLORS.WHITE,
              borderRadius: 0,
              my: 2,
            }}
            onClick={handleOpenForm}
          >
            Enquire Now
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
};

export default ActivityWithoutBackground;
