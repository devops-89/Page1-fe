import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import {
  AddShoppingCartOutlined,
  FavoriteBorderOutlined,
  LocationOnOutlined,
  WatchLaterOutlined,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
const Packagescard = ({ img, location, rating, title, price, duration }) => {
  return (
    <div>
      <Card
        sx={{
          position: "relative",
          height: 430,
          ":hover": {
            ".bg_image": {
              transform: "scale(1.1)",
            },
          },
          ".bg_image": {
            transition: "0.5s ease all",
          },
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${img})`,
            height: 200,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="bg_image"
        >
          <Box
            sx={{ backgroundColor: COLORS.BLACKDARKOVERLAY, height: "100%" }}
          ></Box>
        </Box>
        <IconButton
          sx={{
            position: "absolute",
            top: 2,
            right: 5,
            backgroundColor: COLORS.WHITE,
          }}
        >
          <FavoriteBorderOutlined
            htmlColor={COLORS.PRIMARY}
            sx={{ fontSize: 20 }}
          />
        </IconButton>

        <CardContent>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <LocationOnOutlined
                htmlColor={COLORS.DARKGREY}
                fontSize="small"
              />
              <Typography
                sx={{
                  fontSize: 14,
                  fontFamily: nunito.style,
                  color: COLORS.DARKGREY,
                  fontWeight: 600,
                }}
              >
                {location}
              </Typography>
            </Stack>
            <Tooltip title="Add to Cart">
              <IconButton>
                <AddShoppingCartOutlined sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Stack>
          <Typography
            sx={{
              fontSize: {lg:18},
              fontWeight: 700,
              mt: 1,
              fontFamily: nunito.style,
            }}
          >
            {title}
          </Typography>
          <Rating
            value={rating}
            precision={0.5}
            sx={{ fontSize: 20, mt: 1 }}
            readOnly
          />
          {/* <Stack></Stack> */}
          <Box sx={{ position: "absolute", bottom: 0, width: "85%" }}>
            <Divider />
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              p={1}
            >
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                {/* <Typography
                  sx={{
                    fontSize: 12,
                    color: COLORS.DARKGREY,
                    fontFamily: nunito.style,
                  }}
                >
                  From
                </Typography> */}
                <Typography
                  sx={{
                    fontSize: 20,
                    color: COLORS.BLACK,
                    fontFamily: nunito.style,
                    fontWeight: 800,
                  }}
                >
                  € {price}
                </Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <WatchLaterOutlined
                  htmlColor={COLORS.DARKGREY}
                  sx={{ fontSize: 13 }}
                />
                <Typography
                  sx={{
                    fontSize: 13,
                    color: COLORS.DARKGREY,
                    fontFamily: nunito.style,
                  }}
                >
                  {duration}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Packagescard;
