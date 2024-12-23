import { data } from "@/assests/data";
import logo from "@/logo/logo.png";
import { COLORS } from "@/utils/colors";
import { raleway } from "@/utils/fonts";
import { Person, ShoppingBag } from "@mui/icons-material";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
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
          <Image src={logo} width={100} />
          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            {data.headerLinks.map((val, i) => (
              <Typography
                sx={{
                  fontSize: 16,
                  fontFamily: raleway.style,
                  textTransform: "capitalize",
                  fontWeight: 600,
                  color: COLORS.WHITE,
                }}
                key={i}
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
