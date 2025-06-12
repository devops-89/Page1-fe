import { Box, Container, Grid2, Typography } from "@mui/material";
import React from "react";
import blogBanner from "@/banner/blogs.jpg";
import { roboto } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import { BLOG_DATA } from "@/assests/blog";
import BlogCard from "@/components/blogs/BlogCard";
export default function Blogs() {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${blogBanner.src})`,
          height: { lg: "50vh", xs: "30vh" },
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(0,0,0,0.50)",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: 50, xs: 30 },
              fontFamily: roboto.style,
              color: COLORS.WHITE,
              letterSpacing: 2,
              fontWeight: 600,
            }}
          >
            Blogs
          </Typography>
        </Box>
      </Box>
      <Container>
        <Box sx={{ mt: 2 }}>
          <Grid2 container spacing={4}>
            {BLOG_DATA.map((val, i) => (
              <Grid2 size={{ lg: 4, xs: 12 }} key={i}>
                <BlogCard
                  img={val.image}
                  title={val.title}
                  description={val.shortDescription}
                />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Container>
    </Box>
  );
}
