import { data } from "@/assests/data";
import logo from "@/logo/logo.png";
import { COLORS } from "@/utils/colors";
import { raleway } from "@/utils/fonts";
import { Person, ShoppingBag } from "@mui/icons-material";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
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
  return (
    <Box
      sx={{
        position: isScrolling ? "fixed" : "absolute",
        width: "100%",
        zIndex: 9999,
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
            <Image src={logo} width={100} />
          </Link>
          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            {data.headerLinks.map((val, i) => (
              <Typography
                sx={{
                  fontSize: 16,
                  fontFamily: raleway.style,
                  textTransform: "capitalize",
                  fontWeight: 600,
                  color:
                    router.pathname === val.url ? COLORS.PRIMARY : COLORS.WHITE,
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
            <IconButton
              sx={{
                backgroundColor: COLORS.WHITE,
                border: `1px solid ${COLORS.WHITE}`,
              }}
            >
              <Person sx={{ fontSize: 16, color: COLORS.PRIMARY }} />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Header;
