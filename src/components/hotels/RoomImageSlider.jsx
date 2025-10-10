import React, { useRef } from "react";
import { Box, Stack, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const RoomImageSlider = ({ roomImages, onImageClick }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200; // adjust how much to scroll
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {/* Left Arrow */}
      <IconButton
        onClick={() => scroll("left")}
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          zIndex: 1,
          backgroundColor: "rgba(255,255,255,0.7)",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      {/* Scrollable Images */}
      <Stack
        direction="row"
        spacing={2}
        ref={scrollRef}
        sx={{
          overflowX: "auto",
          scrollBehavior: "smooth",
          py: 1,
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {roomImages?.length > 0 &&
          roomImages.map((image, index) => (
            <Box
              key={index}
              component="img"
              src={image}
              alt={`Room ${index + 1}`}
              onClick={() => onImageClick?.(image)} // 👈 ADDED
              sx={{
                width: 180,
                height: 120,
                borderRadius: 2,
                objectFit: "cover",
                flexShrink: 0,
                cursor: "pointer", // 👈 feedback for clickable
                border: "2px solid transparent",
                transition: "border-color 0.2s",
                "&:hover": {
                  borderColor: "#1976d2",
                },
              }}
            />
          ))}
      </Stack>

      {/* Right Arrow */}
      <IconButton
        onClick={() => scroll("right")}
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          zIndex: 1,
          backgroundColor: "rgba(255,255,255,0.7)",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default RoomImageSlider;
