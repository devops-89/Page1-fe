import hotel1 from "@/hotel/hotel-1.webp";
import { COLORS } from "@/utils/colors";
import { nunito, raleway } from "@/utils/fonts";
import {
  AspectRatioOutlined,
  BathtubOutlined,
  FavoriteBorderOutlined,
  KingBedOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
const HotelCard = ({
  img,
  price,
  hotelName,
  rooms,
  bathroom,
  rating,
  follower,
  location,
}) => {
  return (
    <div>
      <Card
        sx={{
          position: "relative",
          ":hover": {
            ".image": {
              transform: "scale(1.1)",
            },
          },
          overflow: "hidden",
          ".image": {
            transition: "0.5s ease all",
          },
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
          height: 400,
        }}
      >
        <Box sx={{ position: "relative", overflow: "hiden" }}>
          <Box
            sx={{
              backgroundImage: `url(${img})`,
              height: 200,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="image"
          ></Box>
        </Box>
        <Box sx={{ position: "absolute", top: 0, width: "100%" }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            p={2}
          >
            <Box
              sx={{
                color: COLORS.WHITE,
                backgroundColor: COLORS.SECONDARY,
                width: 60,
                fontSize: 12,
                p: 1,
                borderRadius: 2,
                fontWeight: 550,
                fontFamily: raleway.style,
                textAlign: "center",
              }}
            >
              Featured
            </Box>

            <IconButton
              sx={{
                backgroundColor: COLORS.WHITE,
                borderRadius: 2,
                ":hover": {
                  backgroundColor: COLORS.WHITE,
                },
              }}
            >
              <FavoriteBorderOutlined sx={{ fontSize: 15 }} />
            </IconButton>
          </Stack>
        </Box>
        <CardContent>
          <Typography
            sx={{
              fontSize: 20,
              fontFamily: nunito.style,
              color: COLORS.SECONDARY,
              fontWeight: 600,
            }}
          >
            $ {price}{" "}
            <Typography
              component={"span"}
              sx={{
                fontSize: 13,
                fontFamily: nunito.style,
                color: COLORS.DARKGREY,
                fontWeight: 550,
              }}
            >
              Start From
            </Typography>
          </Typography>
          <Typography
            sx={{
              mt: 1,
              fontSize: 18,
              fontFamily: nunito.style,
              fontWeight: 600,
              mb: 1,
            }}
          >
            {hotelName}
          </Typography>
          <Stack direction={"row"} alignItems={"center"} spacing={2} mt={1}>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <KingBedOutlined
                htmlColor={COLORS.SECONDARY}
                sx={{ fontSize: 20 }}
              />
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 550,
                  color: COLORS.DARKGREY,
                  fontFamily: nunito.style,
                }}
              >
                {rooms}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <BathtubOutlined
                htmlColor={COLORS.SECONDARY}
                sx={{ fontSize: 20 }}
              />
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 550,
                  color: COLORS.DARKGREY,
                  fontFamily: nunito.style,
                }}
              >
                {bathroom}
              </Typography>
            </Stack>
          </Stack>
          <Box sx={{ position: "absolute", width: "90%", bottom: 10 }}>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <LocationOnOutlined
                  htmlColor={COLORS.SECONDARY}
                  sx={{ fontSize: 20 }}
                />
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 550,
                    color: COLORS.DARKGREY,
                    fontFamily: nunito.style,
                  }}
                >
                  {location}
                </Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Rating
                  size="small"
                  defaultValue={rating}
                  precision={0.5}
                  readOnly
                />
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 550,
                    color: COLORS.DARKGREY,
                    fontFamily: nunito.style,
                  }}
                >
                  {follower}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default HotelCard;
