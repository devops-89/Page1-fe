import { data } from "@/assests/data";
import logo from "@/logo/logo.png";
import { removeUserDetails } from "@/redux/reducers/user";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { Person, ShoppingBag } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleShowPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const [isScrolling, setIsScrolling] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        setScrollPosition(currentScroll);
        setIsScrolling(currentScroll > 0);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleRouter = (path) => {
    router.push(path);
  };
  const dispatch = useDispatch();
  const changeRouter = (path) => {
    if (path === "/") {
      localStorage.removeItem("access_token");
      dispatch(removeUserDetails());
      router.push(path);
      setAnchorEl(null);
    } else {
      router.push(path);
      setAnchorEl(null);
    }
  };

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (router.pathname === "/register") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [router]);

  const user = useSelector((state) => state.USER);

  const name = user?.full_name ? user.full_name.slice(0, 1) : "";

  return (
    <Box
      sx={{
        position: isScrolling ? "fixed" : "absolute",
        width: "100%",
        zIndex: 999,
        backgroundColor: isScrolling ? COLORS.BLACKOVERLAY : COLORS.TRANSPARENT,
        transition: "all 0.5s ease",
        backdropFilter: isScrolling ? "blur(5px)" : "none",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          p={1}
        >
          <Link href={"/"} passHref>
            <Image src={logo} width={100} alt="" />
          </Link>
          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            {data.headerLinks.map((val, i) => (
              <Typography
                sx={{
                  fontSize: 16,
                  fontFamily: nunito.style,
                  textTransform: "capitalize",
                  fontWeight: 600,
                  color:
                    router.pathname === val.url
                      ? COLORS.PRIMARY
                      : show
                      ? isScrolling
                        ? COLORS.WHITE
                        : COLORS.BLACK
                      : COLORS.WHITE,
                  cursor: "pointer",
                  position: "relative",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: COLORS.PRIMARY,
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: router.pathname === val.url ? "100%" : 0,
                    height: "2px",
                    backgroundColor: COLORS.PRIMARY,
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
                key={i}
                onClick={() => handleRouter(val.url)}
              >
                 {val.label} 
               
              </Typography>
            ))}
          </Stack>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <IconButton
              sx={{
                backgroundColor: COLORS.WHITE,
                border: `1px solid ${COLORS.WHITE}`,
              }}
            >
              <ShoppingBag sx={{ fontSize: 16, color: COLORS.PRIMARY }} />
            </IconButton>
            {user?.isAuthenticated ? (
              <IconButton
                sx={{
                  backgroundColor: COLORS.WHITE,
                  border: `1px solid ${COLORS.WHITE}`,
                  width: 35,
                  height: 35,
                }}
                onClick={handleShowPopover}
              >
                {user.avatar ? (
                  <Image alt="Profile Avatar" src={user.avatar} />
                ) : (
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontFamily: nunito.style,
                      fontWeight: 800,
                      color: COLORS.PRIMARY,
                    }}
                  >
                    {name}
                  </Typography>
                )}
              </IconButton>
            ) : (
              <IconButton
                sx={{
                  backgroundColor: COLORS.WHITE,
                  border: `1px solid ${COLORS.WHITE}`,
                }}
                onClick={() => router.push("/login")}
              >
                <Person sx={{ fontSize: 16, color: COLORS.PRIMARY }} />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Container>
      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPaper-root": {
            width: 150,
            mt: 2,
          },
        }}
      >
        <List>
          {data.popoverData.map((val, i) => (
            <ListItemButton
              key={i}
              sx={{ padding: 0, px: 2, pb: 1 }}
              onClick={() => changeRouter(val.url)}
            >
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: 14, fontFamily: nunito.style }}>
                    {val.label}
                  </Typography>
                }
              />
            </ListItemButton>
          ))}
        </List>
      </Popover>
    </Box>
  );
};

export default Header;
