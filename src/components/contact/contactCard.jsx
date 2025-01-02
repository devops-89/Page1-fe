import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";

const ContactCard = ({ data }) => {
  return (
    <div>
      <List>
        {data.map((val, i) => (
          <Box sx={{p:1}}>
            <ListItem key={i}>
              <ListItemAvatar
                sx={{
                  backgroundColor: COLORS.BLUEOVERLAY,
                  borderRadius: "50%",
                  minWidth: 50,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {val.icon}
              </ListItemAvatar>
              <ListItemText
                sx={{ ml: 4 }}
                primary={
                  <Typography
                    sx={{
                      fontSize: 15,
                      color: COLORS.DARKGREY,
                      fontFamily: nunito.style,
                    }}
                  >
                    {val.contactType}
                  </Typography>
                }
                secondary={
                  <Typography
                    sx={{
                      fontSize: 18,
                      color: COLORS.BLACK,
                      fontFamily: nunito.style,
                    }}
                  >
                    {val.contactInfo}
                  </Typography>
                }
              />
            </ListItem>
            {i !== data.length - 1 && (
              <Divider sx={{  borderColor: COLORS.GREY }} />
            )}
          </Box>
        ))}
      </List>
    </div>
  );
};

export default ContactCard;
