import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import {
  Box,
  Container,
  Grid2,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "next/image";
import logo from "@/logo/logo.png";
import { Headphones, LocationOn, Message } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ pt: 10, backgroundColor: COLORS.LIGHTBLUE }}>
      <Container>
        <Grid2 container spacing={4}>
          <Grid2 size={3}>
            <Typography
              sx={{
                fontSize: 25,
                fontFamily: nunito.style,
                fontWeight: 600,
                mb: 2,
              }}
            >
              Our Services
            </Typography>
            <Grid2 container columnSpacing={2}>
              {data.services.map((val, i) => (
                <Grid2 size={6} key={i}>
                  <List>
                    <ListItemButton sx={{ padding: 0 }}>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              fontSize: 12,
                              textTransform: "capitalize",
                              fontFamily: nunito.style,
                              fontWeight: 550,
                            }}
                          >
                            {val.label}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </List>
                </Grid2>
              ))}
            </Grid2>
          </Grid2>

          <Grid2 size={3} sx={{ pl: 10 }}>
            <Typography
              sx={{
                fontSize: 25,
                fontFamily: nunito.style,
                fontWeight: 600,
                mb: 2,
              }}
            >
              Company
            </Typography>
            <List>
              {data.company.map((val, i) => (
                <ListItemButton key={i} sx={{ padding: 0, mb: 1 }}>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontSize: 12,
                          textTransform: "capitalize",
                          fontFamily: nunito.style,
                          fontWeight: 550,
                        }}
                      >
                        {val.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Grid2>

          <Grid2 size={3} sx={{ pl: 4 }}>
            <Typography
              sx={{
                fontSize: 25,
                fontFamily: nunito.style,
                fontWeight: 600,
                mb: 2,
              }}
            >
              Support
            </Typography>
            <List>
              {data.support.map((val, i) => (
                <ListItemButton key={i} sx={{ padding: 0, mb: 1 }}>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontSize: 12,
                          textTransform: "capitalize",
                          fontFamily: nunito.style,
                          fontWeight: 550,
                        }}
                      >
                        {val.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Grid2>
          <Grid2 size={3}>
            <Typography
              sx={{
                fontSize: 25,
                fontFamily: nunito.style,
                fontWeight: 600,
                mb: 2,
              }}
            >
              Destinations
            </Typography>
            <List>
              {data.destinations.map((val, i) => (
                <ListItemButton key={i} sx={{ padding: 0, mb: 1 }}>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontSize: 12,
                          textTransform: "capitalize",
                          fontFamily: nunito.style,
                          fontWeight: 550,
                        }}
                      >
                        {val.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Grid2>
        </Grid2>
        <Box
          sx={{
            backgroundColor: COLORS.WHITE,
            borderRadius: 2,
            px: 2,
            boxShadow: " rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
            pt: 2,
            pb: 2,
            mt: 2,
          }}
        >
          <Grid2 container spacing={4}>
            <Grid2
              size={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image src={logo} width={100} />
            </Grid2>
            <Grid2 size={3} textAlign={"center"}>
              <List>
                <ListItem>
                  <ListItemAvatar
                    sx={{
                      backgroundColor: COLORS.PRIMARY,
                      borderRadius: "50%",
                      minWidth: 50,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Headphones
                      sx={{ fontSize: 20, color: COLORS.SECONDARY }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 700,
                          fontFamily: nunito.style,
                        }}
                      >
                        Customer Support
                      </Typography>
                    }
                    secondary={
                      <Typography
                        sx={{
                          fontSize: 13,
                          fontFamily: nunito.style,
                          fontWeight: 600,
                        }}
                      >
                        +91 7977512494
                      </Typography>
                    }
                    sx={{ ml: 2 }}
                  />
                </ListItem>
              </List>
            </Grid2>
            <Grid2 size={3}>
              <List>
                <ListItem>
                  <ListItemAvatar
                    sx={{
                      backgroundColor: COLORS.PRIMARY,
                      borderRadius: "50%",
                      minWidth: 50,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Message sx={{ fontSize: 20, color: COLORS.SECONDARY }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 700,
                          fontFamily: nunito.style,
                        }}
                      >
                        Drop Us an Email
                      </Typography>
                    }
                    secondary={
                      <Typography
                        sx={{
                          fontSize: 13,
                          fontFamily: nunito.style,
                          fontWeight: 600,
                        }}
                      >
                        info@page1travels.com
                      </Typography>
                    }
                    sx={{ ml: 2 }}
                  />
                </ListItem>
              </List>
            </Grid2>
            <Grid2 size={3}>
              <List>
                <ListItem>
                  <ListItemAvatar
                    sx={{
                      backgroundColor: COLORS.PRIMARY,
                      borderRadius: "50%",
                      minWidth: 50,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LocationOn
                      sx={{ fontSize: 20, color: COLORS.SECONDARY }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 700,
                          fontFamily: nunito.style,
                        }}
                      >
                        Reach Us at
                      </Typography>
                    }
                    secondary={
                      <Typography
                        sx={{
                          fontSize: 13,
                          fontFamily: nunito.style,
                          fontWeight: 600,
                        }}
                      >
                        Ghaziabad, UP, 201002
                      </Typography>
                    }
                    sx={{ ml: 2 }}
                  />
                </ListItem>
              </List>
            </Grid2>
          </Grid2>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
