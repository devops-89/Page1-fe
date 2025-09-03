import {
  Box,
  Container,
  Stack,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import PoolIcon from "@mui/icons-material/Pool";
import { COLORS } from "@/utils/colors";
import Link from "next/link";
import HotTubOutlinedIcon from "@mui/icons-material/HotTubOutlined";

export default function OurHotalCard({ data }) {
  return (
    <Link href={`/our-hotels/${data.id}`} style={{ textDecoration: "none" }}>
      <Container>
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
                sx={{ paddingTop: 1 }}
              >
                {data.services.map((cur) => (
                  <Stack direction={"row"} gap={1} alignItems={"center"}>
                    <PoolIcon sx={{ fontSize: 18, color: COLORS.DARKGREY }} />
                    <Typography variant="subtutle2" color={COLORS.DARKGREY}>
                      {cur}
                    </Typography>
                  </Stack>
                ))}

                {/* 
              <Stack direction={"row"} gap={1} alignItems={"center"} >
                <PoolIcon sx={{ fontSize:18 ,color:COLORS.DARKGREY}}/>
                <Typography variant="subtutle2" color={COLORS.DARKGREY}>Swimming Pool</Typography>
              </Stack> */}

                {/* <Stack direction={"row"} gap={1} alignItems={"center"} >
                <PoolIcon sx={{ fontSize:18 ,color:COLORS.DARKGREY}}/>
                <Typography variant="subtutle2" color={COLORS.DARKGREY}>Swimming Pool</Typography>
              </Stack> */}

                {/* <Stack direction={"row"} gap={1} alignItems={"center"} >
                <PoolIcon sx={{ fontSize:18 ,color:COLORS.DARKGREY}}/>
                <Typography variant="subtutle2" color={COLORS.DARKGREY}>Swimming Pool</Typography>
              </Stack>
               */}
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

            <Typography
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
            </Typography>
          </Stack>

          {/* second box */}
        </Stack>
      </Container>
    </Link>
  );
}
