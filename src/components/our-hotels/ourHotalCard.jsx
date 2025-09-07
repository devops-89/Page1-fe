import {
  Box,
  Container,
  Stack,
  Typography,
  Divider,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import PoolIcon from "@mui/icons-material/Pool";
import { COLORS } from "@/utils/colors";
import Link from "next/link";
import HotTubOutlinedIcon from "@mui/icons-material/HotTubOutlined";
import { useState } from "react";
export default function OurHotalCard({ data }) {
  const [openAmenities, setOpenAmenities] = useState(false);

  const VISIBLE_COUNT = 3;
  const amenities = Array.isArray(data.services) ? data.services : [];

  const visibleAmenities = amenities.slice(0, VISIBLE_COUNT);
  const remainingCount = Math.max(0, amenities.length - VISIBLE_COUNT);

  const handleOpenAmenities = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setOpenAmenities(true);
  };

  const handleCloseAmenities = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setOpenAmenities(false);
  };

  return (
    <Container>
      <Link
        href={`/our-hotels/${data.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Stack
          direction={{ lg: "row", md: "column" }}
          sx={{
            mt: 2,
            border: "1px solid gray",
            padding: 2,
            borderRadius: "8px",
          }}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Stack
            direction={{ lg: "row", md: "column" }}
            spacing={2}
            flexGrow={1}
            sx={{ border: "px solid gray" }}
          >
            <Stack direction={"column"} spacing={1}>
              <Box
                sx={{
                  width: { lg: 260, md: "100%" },
                  height: 150,
                  borderRadius: "16px",
                }}
              >
                <Box
                  component={"img"}
                  src={data.images.main}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "16px",
                  }}
                />
              </Box>
              {/* <div>hey i am small small img box</div> */}

              <Stack direction={"row"} spacing={1}>
                {data.images.thumbnails.slice(0, 4).map((img, i) => (
                  <Box
                    key={i}
                    sx={{ width: { lg: 58, md: "100%" }, height: 58 }}
                  >
                    <Box
                      component={"img"}
                      src={img}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Stack>

            {/* <div>hey i am content box of img</div> */}
            <Stack direction={"column"} gap={1}>
              <Typography
                variant="h5"
                component={"h1"}
                sx={{ fontWeight: "bold" }}
              >
                {data.name}
              </Typography>

              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={2}
                divider={
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ bgcolor: COLORS.GREY }}
                  />
                }
              >
                <Typography
                  variant="subtitle1"
                  color={COLORS.BHARTIBLUE}
                  sx={{ fontWeight: "bold" }}
                >
                  {data.location.city}
                </Typography>
                <Typography variant="subtitle2">
                  {data.location.distanceInfo}
                </Typography>
              </Stack>
              <Stack
                direction={{ lg: "row", sm: "column" }}
                spacing={1}
                divider={<Divider orientation="vertical" flexItem />}
              >
                {data.tags.map((cur) => (
                  <Typography
                    variant="outlined"
                    sx={{
                      paddingTop: 0.3,
                      paddingBottom: 0.3,
                      fontSize: 15,
                      color: COLORS.SECONDARY,
                    }}
                    noWrap={true}
                  >
                    {cur}
                  </Typography>
                ))}
              </Stack>

              {/* <Button variant="outlined" sx={{width:"30%" ,paddingTop:0.3,paddingBottom:0.3, fontSize:11, } } noWrap={true} >Couple Friendly</Button> */}
              {/* service stack */}
              <Stack
                direction={{ lg: "row", sm: "column" }}
                gap={2}
                sx={{ paddingTop: 1, alignItems: "center", flexWrap: "wrap" }}
              >
                {/* show visible amenities as chips */}
                {visibleAmenities.map((amenity, idx) => (
                  <Chip
                    key={idx}
                    label={amenity}
                    size="small"
                    sx={{
                      fontFamily: "inherit",
                      fontWeight: 600,
                      borderRadius: "20px",
                      backgroundColor: COLORS.PRIMARY,
                    }}
                  />
                ))}

                {remainingCount > 0 && (
                  <Button
                    onClick={handleOpenAmenities}
                    variant="text"
                    sx={{
                      color: COLORS.GREEN,
                      fontWeight: "bold",
                      textTransform: "none",
                      pl: 0,
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    +{remainingCount} amenities
                  </Button>
                )}
              </Stack>
              {/* service stack */}

              <Stack
                direction={"row"}
                gap={1}
                alignItems={"center"}
                sx={{ paddingTop: 1 }}
              >
                <PoolIcon sx={{ fontSize: 18 }} />
                <Typography variant="subtutle2"> {data.description}</Typography>
              </Stack>
            </Stack>
          </Stack>

          {/* second box */}

          <Stack
            spacing={1}
            direction={"column"}
            sx={{
              justifyContent: "flex-start",
              alignItems: { lg: "flex-end", md: "flex-start" },
              paddingLeft: 4,
              mt: { lg: 0, sm: 4 },
            }}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Typography
                variant="h6"
                sx={{ color: COLORS.SECONDARY, fontWeigh: "extrabold" }}
              >
                {data.rating.label}{" "}
              </Typography>
              <Box
                sx={{
                  backgroundColor: COLORS.SECONDARY,
                  color: "white",
                  padding: 0.5,
                  borderRadius: 0.8,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  {" "}
                  {data.rating.score}
                </Typography>
              </Box>
            </Stack>
            <Typography variant="subtitle1">
              {data.rating.reviewCount}
            </Typography>

            <Stack
              sx={{
                justifyContent: "flex-start",
                alignItems: { lg: "flex-end", sm: "flex-start" },
                paddingLeft: 0,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ textDecoration: "line-through", color: COLORS.DARKGREY }}
              >
                {data.price.originalPrice}
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {data.price.discounted}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: COLORS.DARKGREY,
                  textAlign: { lg: "end", sm: "start" },
                }}
              >
                {data.price.texesInfo}
              </Typography>
            </Stack>

            {/* <Typography
              variant="subtitle2"
              sx={{
                color: COLORS.SECONDARY,
                pt: 2,
                textAlign: "end",
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              {data.additionalInfo}
            </Typography> */}
          </Stack>

          {/* second box */}
        </Stack>
        <Dialog
          open={openAmenities}
          onClose={handleCloseAmenities}
          fullWidth
          maxWidth="sm"
          onBackdropClick={handleCloseAmenities}
        >
          <DialogTitle>All Amenities</DialogTitle>
          <DialogContent dividers>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {amenities.length === 0 ? (
                <Typography variant="body2">No amenities available.</Typography>
              ) : (
                amenities.map((a, i) => (
                  <Chip
                    key={i}
                    label={a}
                    size="small"
                    sx={{
                      m: 0.5,
                      borderRadius: "20px",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                ))
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAmenities} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Link>
    </Container>
  );
}
