import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import {
  Box,
  Container,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import logo from "@/logo/logo.png";
import {
  Headphones,
  Instagram,
  LocationOn,
  Message,
  X,
} from "@mui/icons-material";
import footer from "@/banner/footer.svg";
import { TiSocialFacebook } from "react-icons/ti";
import { RiLinkedinFill } from "react-icons/ri";
import { useRouter } from "next/router";
import Link from "next/link";
const Footer = () => {
  const router = useRouter();
  const phone = useMediaQuery("(max-width:600px)");
  const tablet = useMediaQuery("(max-width:900px)");
  const fontSize = phone ? 15 : tablet ? 15 : 18;
  const minWidthValue = tablet ? 360 : "auto";
  const socialIcons = [
    {
      icon: <TiSocialFacebook style={{ fontSize: `${fontSize}px` }} />,
      link: "https://www.facebook.com/people/Pageone-Travels/100091821528894/?mibextid=ZbWKwL",
    },
    {
      icon: <X sx={{ fontSize: { lg: 18, sm: 15, xs: 15 } }} />,
      link: "https://twitter.com/Page1Travels?t=ntA0KfIF-a1vfBr4py7tNw&s=09",
    },
    {
      icon: <Instagram sx={{ fontSize: { lg: 18, sm: 15, xs: 15 } }} />,
      link: "https://www.instagram.com/page1travels/?igshid=ZGUzMzM3NWJiOQ%3D%3D",
    },
    {
      icon: <RiLinkedinFill style={{ fontSize: `${fontSize}px` }} />,
      link: "https://www.linkedin.com/in/page1-travels-0a01b7273",
    },
  ];

  const handlePage = (path) => {
    router.push(path);
  };

  return (
    <Box sx={{ pt: 10, backgroundColor: COLORS.LIGHTBLUE }}>
      <Container>
        <Grid2 container spacing={4} justifyContent="center">
          <Grid2
            size={{ lg: 3, sm: 6, xs: 6 }}
            justifyContent="center"
            textAlign="center"
          >
            <Typography
              sx={{
                fontSize: { lg: 25, sm: 20, xs: 20 },
                fontFamily: nunito.style,
                fontWeight: 600,
                mb: 2,
              }}
            >
              Our Services
            </Typography>

            <List>
              {data.services.slice(0, 5).map((val, i) => (
                <ListItemButton key={i} sx={{ padding: 0, mb: 1 }}>
                  <ListItemText
                    onClick={() => handlePage(val.url)}
                    primary={
                      <Typography
                        sx={{
                          fontSize: { lg: 15, sm: 15, xs: 13 },
                          textTransform: "capitalize",
                          fontFamily: nunito.style,
                          fontWeight: 550,
                          textAlign: "center",
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



<Grid2 size={{ lg: 3, sm: 6, xs: 6 }}>
            <Typography
              sx={{
                fontSize: { lg: 25, sm: 20, xs: 20 },
                fontFamily: nunito.style,
                fontWeight: 600,
                mb: 2,
                textAlign: "center",
              }}
            >
            Additional Services
            </Typography>
            <List>
              {data.destinations.slice(0, 5).map((val, i) => (
                <ListItemButton key={i} sx={{ padding: 0, mb: 1 }}>
                  <ListItemText
                   onClick={() => handlePage(val.url)}
                    primary={
                      <Typography
                        sx={{
                          fontSize: { lg: 15, sm: 15, xs: 13 },
                          textTransform: "capitalize",
                          fontFamily: nunito.style,
                          fontWeight: 550,
                          textAlign: "center",
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


          <Grid2 size={{ lg: 3, sm: 6, xs: 6 }}>
            <Typography
              sx={{
                fontSize: { lg: 25, sm: 20, xs: 20 },
                fontFamily: nunito.style,
                fontWeight: 600,
                mb: 2,
                textAlign: "center",
              }}
            >
              Company
            </Typography>
            <List>
              {data.company.map((val, i) => (
                <ListItemButton key={i} sx={{ padding: 0, mb: 1 }}>
                  <ListItemText
                    onClick={() => handlePage(val.url)}
                    primary={
                      <Typography
                        sx={{
                          fontSize: { lg: 15, sm: 15, xs: 13 },
                          textTransform: "capitalize",
                          fontFamily: nunito.style,
                          fontWeight: 550,
                          textAlign: "center",
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

         


           <Grid2 size={{ lg: 3, sm: 6, xs: 6 }}>
            <Typography
              sx={{
                fontSize: { lg: 25, sm: 20, xs: 20 },
                fontFamily: nunito.style,
                fontWeight: 600,
                mb: 2,
                textAlign: "center",
              }}
            >
              Support
            </Typography>
            <List>
              {data.support.map((val, i) => (
                <ListItemButton key={i} sx={{ padding: 0, mb: 1 }}>
                  <ListItemText
                    primary={
                      <Link
                        href={val.url}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <Typography
                          sx={{
                            fontSize: { lg: 15, sm: 15, xs: 13 },
                            textTransform: "capitalize",
                            fontFamily: nunito.style,
                            fontWeight: 550,
                            textAlign: "center",
                          }}
                        >
                          {val.label}
                        </Typography>
                      </Link>
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
            px: 1,
            boxShadow: " rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
            textAlign: "center",

            mt: 3,
          }}
        >
          <Grid2 container spacing={4}>
            <Grid2
              size={{ lg: 3, sm: 6, xs: 12 }}
              textAlign={"start"}
              sx={{
                display: "flex",
                alignItems: { lg: "center", sm: "center", xs: "start" },
                justifyContent: { lg: "center", sm: "center", xs: "start" },
              }}
            >
              <List>
                <ListItem>
                  <ListItemAvatar
                    sx={{
                      marginTop: { lg: 0, md: 0, sm: 2, xs: 2 },
                      minWidth: { lg: 50, sm: 40, xs: 40 },
                      height: { lg: 50, sm: 40, xs: 40 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={logo}
                      width={100}
                      textAlign={"center"}
                      style={{ cursor: "pointer" }}
                      onClick={() => handlePage("/")}
                    />
                  </ListItemAvatar>
                </ListItem>
              </List>
            </Grid2>

            <Grid2
              size={{ lg: 3, sm: 6, xs: 12 }}
              textAlign={"center"}
              sx={{
                display: "flex",
                alignItems: { lg: "center", sm: "center", xs: "start" },
                justifyContent: { lg: "center", sm: "center", xs: "start" },
              }}
            >
              <List>
                <ListItem>
                  <ListItemAvatar
                    sx={{
                      backgroundColor: COLORS.PRIMARY,
                      borderRadius: "50%",
                      minWidth: { lg: 50, sm: 40, xs: 40 },
                      height: { lg: 50, sm: 40, xs: 40 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Headphones
                      sx={{
                        fontSize: { lg: 20, sm: 15, xs: 15 },
                        color: COLORS.SECONDARY,
                      }}
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
                        <Link
                          href={"tel:+917977512494"}
                          style={{
                            textDecoration: "none",
                            color: COLORS.BLACK,
                          }}
                        >
                          +91 7977512494
                        </Link>
                      </Typography>
                    }
                    sx={{ ml: 2 }}
                  />
                </ListItem>
              </List>
            </Grid2>
            <Grid2
              size={{ lg: 3, sm: 6, xs: 12 }}
              textAlign={"center"}
              sx={{
                display: "flex",
                alignItems: { lg: "center", sm: "center", xs: "start" },
                justifyContent: { lg: "center", sm: "center", xs: "start" },
              }}
            >
              <List>
                <ListItem>
                  <ListItemAvatar
                    sx={{
                      backgroundColor: COLORS.PRIMARY,
                      borderRadius: "50%",
                      minWidth: { lg: 50, sm: 40, xs: 40 },
                      height: { lg: 50, sm: 40, xs: 40 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Message
                      sx={{
                        fontSize: { lg: 20, sm: 15, xs: 15 },
                        color: COLORS.SECONDARY,
                      }}
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
                        <Link
                          href={"mailto:info@page1travels.com"}
                          style={{
                            textDecoration: "none",
                            color: COLORS.BLACK,
                          }}
                        >
                          info@page1travels.com
                        </Link>
                      </Typography>
                    }
                    sx={{ ml: 2 }}
                  />
                </ListItem>
              </List>
            </Grid2>
            <Grid2
              size={{ lg: 3, sm: 6, xs: 12 }}
              textAlign={"center"}
              sx={{
                display: "flex",
                alignItems: { lg: "center", sm: "center", xs: "start" },
                justifyContent: { lg: "center", sm: "center", xs: "start" },
              }}
            >
              <List>
                <ListItem>
                  <ListItemAvatar
                    sx={{
                      backgroundColor: COLORS.PRIMARY,
                      borderRadius: "50%",
                      minWidth: { lg: 50, sm: 40, xs: 40 },
                      height: { lg: 50, sm: 40, xs: 40 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LocationOn
                      sx={{
                        fontSize: { lg: 20, sm: 15, xs: 15 },
                        color: COLORS.SECONDARY,
                      }}
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
        <Box sx={{ mt: 2 }}>
          <Image src={footer} style={{ width: "100%" }} />
        </Box>
        <Grid2 container alignItems={"center"} sx={{ mb: 2, mt: 2 }}>
          <Grid2
            size={{ lg: 4, sm: 12, xs: 12 }}
            alignItems={{ sm: "center", xs: "center" }}
            justifyItems={{ sm: "center", xs: "center" }}
          >
            <Typography
              sx={{ fontSize: 14, fontFamily: nunito.style }}
              textAlign={"center"}
            >
              Copyright © 2025. All Rights Reserved,{" "}
              <Typography
                sx={{
                  fontSize: 14,
                  color: COLORS.SECONDARY,
                  fontFamily: nunito.style,
                }}
                component={"span"}
              >
                Page1Travels{" "}
              </Typography>
            </Typography>
          </Grid2>
          <Grid2 size={{ lg: 4, sm: 6, xs: 12 }} mt={{ lg: 0, xs: 1 }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={4}
              justifyContent={"center"}
            >
              {socialIcons.map((val, i) => (
                <Link href={val.link} target="_blank" rel="nofollow">
                  <IconButton
                    sx={{
                      backgroundColor: COLORS.SECONDARY,
                      color: COLORS.PRIMARY,
                      ":hover": {
                        backgroundColor: COLORS.SECONDARY,
                        color: COLORS.PRIMARY,
                      },
                    }}
                    key={i}
                  >
                    {val.icon}
                  </IconButton>
                </Link>
              ))}
            </Stack>
          </Grid2>
          <Grid2 size={{ lg: 4, sm: 6, xs: 12 }} mt={{ lg: 0, xs: 2 }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={2}
              justifyContent={"center"}
            >
              {data.cards.map((val, i) => (
                <Image src={val.img} key={i} width={phone && 35} />
              ))}
            </Stack>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Footer;
