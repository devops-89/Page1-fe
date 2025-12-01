import React from "react";
import {
  Box,
  Avatar,
  Paper,
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import VerifiedIcon from "@mui/icons-material/Verified";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";

export default function ProfileGeneral() {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const UserData = useSelector((state) => state.USER?.UserData ?? {});
  console.log("nnnn", UserData);
  const fullName = UserData.full_name || UserData.name || "-";
  const email = UserData.email || "-";
  const phone = UserData.phone_number ?? "-";
  const userType = UserData.user_type ?? "-";
  const referenceId = UserData.reference_id || UserData.id || "-";
  const status = (UserData.status || "-").toUpperCase();
  const createdAt = UserData.created_at
    ? new Date(UserData.created_at).toLocaleDateString()
    : "-";
  const countryCode = UserData.country_code ?? "-";

  const isEmailVerified = !!UserData.is_email_verified;
  const isPhoneVerified = !!UserData.is_phone_verified;
  const capitalize = (str = "") =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const capitalFullName = capitalize(fullName);
  const avatarLetter = (UserData.full_name || UserData.name || "U")
    .charAt(0)
    .toUpperCase();

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: 2 }} elevation={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm="auto">
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  width: sm ? 64 : 88,
                  height: sm ? 64 : 88,
                  bgcolor: COLORS.PRIMARY || "#1976d2",
                  fontSize: sm ? 26 : 34,
                }}
              >
                {avatarLetter}
              </Avatar>

              <Box>
                <Typography variant={sm ? "h6" : "h5"} sx={{ fontWeight: 700 }}>
                  {capitalFullName}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    mt: 0.5,
                  }}
                >
                  <Chip
                    icon={<VerifiedIcon />}
                    label={
                      isEmailVerified ? "Email Verified" : "Email Not Verified"
                    }
                    color={isEmailVerified ? "success" : "default"}
                    size="small"
                  />
                  <Chip
                    icon={<PhoneIcon />}
                    label={
                      isPhoneVerified ? "Phone Verified" : "Phone Not Verified"
                    }
                    color={isPhoneVerified ? "success" : "default"}
                    size="small"
                  />
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {email}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm
            container
            justifyContent="flex-end"
            alignItems="center"
          >
            <Typography variant="subtitle2" color="text.secondary">
              Status: <strong>{status}</strong>
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* General Information Card */}
      <Paper sx={{ p: 2, borderRadius: 2 }} elevation={1}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mb: 1, fontFamily: nunito.style }}
        >
          General Information
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <List dense>
          <ListItem>
            <ListItemText
              primary={<Typography sx={{ fontWeight: 600 }}>Name</Typography>}
              secondary={<Typography>{capitalFullName}</Typography>}
            />
            <PersonIcon color="disabled" />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={<Typography sx={{ fontWeight: 600 }}>Email</Typography>}
              secondary={<Typography>{email}</Typography>}
            />
            <EmailIcon color="disabled" />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={<Typography sx={{ fontWeight: 600 }}>Phone</Typography>}
              secondary={<Typography>{phone}</Typography>}
            />
            <PhoneIcon color="disabled" />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 600 }}>User Type</Typography>
              }
              secondary={<Typography>{userType}</Typography>}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 600 }}>Reference ID</Typography>
              }
              secondary={<Typography>{referenceId}</Typography>}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 600 }}>Country Code</Typography>
              }
              secondary={<Typography>{countryCode}</Typography>}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 600 }}>
                  Account Created
                </Typography>
              }
              secondary={<Typography>{createdAt}</Typography>}
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}
