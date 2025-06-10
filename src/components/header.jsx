import { data } from "@/assests/data";
import logo from "@/logo/logo.png";
import { removeUserDetails } from "@/redux/reducers/user";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
// import { ShoppingBag } from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
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
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import TabletNavbar from "./tabletNavbar";
const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);


  const handleShowPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const [isScrolling, setIsScrolling] = useState(false);
  const [openMenu ,setOpenMenu] = useState(false);
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

          
  const dispatch = useDispatch();
  const changeRouter = (path) => { 
    if (path === "/login"){
      localStorage.removeItem("access_token");
      dispatch(removeUserDetails());
      router.push(path);
      setAnchorEl(null);
    } else {
      router.push(path);
      setAnchorEl(null);

    
    }
   
    
   
  };
  
  useEffect(() => {
    setOpenMenu(true); // Close the menu whenever the route changes
  }, [router.pathname]);
  

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (router.pathname === "/register") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [router]);

  const user = useSelector((state) => state.USER.UserData);

  // console.log("user---------------", user)

  const name = user?.email ? user.email.slice(0, 1) : "";
  

  const tablet = useMediaQuery("(max-width:900px)");
  const handleOpenMenu = function(){
     setOpenMenu(pre =>!pre)
  }


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
      <Container maxWidth='lg'>
        < Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          p={1}
        >
         { openMenu && <Link href={"/"} passHref>
            <Image src={logo} width={tablet ?80:100}  alt="" />
          </Link>}
          { !tablet &&
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
                onClick={() => changeRouter(val.url)}
                 
              >
                 {val.label} 
               
              </Typography>
            ))}

         
          </Stack>}

          { openMenu &&
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            {/* <IconButton
              sx={{
                backgroundColor: COLORS.WHITE,
                border: `1px solid ${COLORS.WHITE}`,
              }}
            >
              <ShoppingBag sx={{ color: COLORS.PRIMARY, fontSize: {lg:14 ,sm:14 ,xs:10} }} />
            </IconButton> */}
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
                    {name.toUpperCase()}
                  </Typography>
                )}
              </IconButton>
            ) : (
              <IconButton
                sx={{
                  backgroundColor: COLORS.WHITE,
                  border: `1px solid ${COLORS.WHITE}`,
                }}
                onClick={() => router.replace("/login")}
              >
                <PersonIcon sx={{color: COLORS.PRIMARY, fontSize: {lg:14 ,sm:12 ,xs:10}, zIndex:999 }} />
              </IconButton>
            )}
           
            { tablet && ( openMenu ?
           <IconButton
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  border: `1px solid ${COLORS.WHITE}`,
                }}
              
              >
                <MenuIcon sx={{ fontSize: {lg:14 ,sm:16 ,xs:13}, color:COLORS.WHITE }} onClick={handleOpenMenu}  />
              </IconButton> : <IconButton
                sx={{
                  backgroundColor: COLORS.WHITE,
                  border: `1px solid ${COLORS.WHITE}`,
                }}
              
              >
                <CloseIcon sx={{ fontSize: {lg:14 ,sm:12 ,xs:10}, color: COLORS.PRIMARY }} />
              </IconButton>)
                }
          </Stack>
}
       
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
     
     { !openMenu &&  <TabletNavbar onClose={handleOpenMenu}/> }
    </Box>
  );
};

export default Header;
