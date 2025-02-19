import React, { useEffect, useState } from "react";
import { Stack, Typography, Box, IconButton } from "@mui/material";
import { data } from "@/assests/data";
import { nunito } from "@/utils/fonts";
import { useRouter } from "next/router";
import { COLORS } from "@/utils/colors";
import Link from "next/link";
import logo from "@/logo/logo.png";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";


function TabletNavbar({onClose}) {
  const router = useRouter();
  
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleRouter = (path) => {
    router.push(path);
  };

  let show = true;

  const [isScrolling, setIsScrolling] = useState(false);

 

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

  return (
    <div>
      <Stack
        direction={"column"}
        alignItems={"flex-start"}
        spacing={3}
        backgroundColor={COLORS.WHITE}
        position={"absolute"}
        top={0}
        width="100%"
        zIndex={1000}
        boxSizing="border-box"
        padding={5}
       height={"100vh"}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ width: "100%" }}
        >
          <Link href={"/"} passHref>
            <Image src={logo} width={80} alt="" />
          </Link>
          <IconButton onClick={onClose} >
            <CloseIcon style={{color:COLORS.PRIMARY ,fontWeight:"extrabold" ,fontSize:"28px"}} />
          </IconButton>
        </Stack>

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
                    ? COLORS.BLACK
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
    </div>
  );
}

export default TabletNavbar;
