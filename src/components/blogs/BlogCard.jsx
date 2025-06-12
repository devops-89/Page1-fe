import { roboto } from "@/utils/fonts";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
const BlogCard = ({ img, title, description }) => {
  return (
    <div>
      <Card sx={{ height: 400 }}>
        <CardMedia component={"img"} src={img} width={250} height={250} />
        <CardContent>
          <Typography
            sx={{ fontSize: 15, fontFamily: roboto.style, fontWeight: 600 }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              fontFamily: roboto.style,
              fontWeight: 400,
              mt: 1,
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogCard;
