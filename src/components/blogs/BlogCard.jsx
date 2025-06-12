import { roboto } from "@/utils/fonts";
import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";

const BlogCard = ({ img, title, description, id }) => {
  const router = useRouter();
  const handleReadMore = () => {
    router.push(`/blogs/${id}/blog-detail`);
  };

  return (
    <div>
      <Card sx={{ height: 450, display: 'flex', flexDirection: 'column' }}>
        <CardMedia component={"img"} src={img} width={250} height={250} />
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
          
          <Button
            variant="contained"
            sx={{
              mt: 'auto',
              fontFamily: roboto.style,
              fontWeight: 500,
              background: '#1976d2',
              color: 'white',
              borderRadius: 1,
              boxShadow: 'none',
              '&:hover': { background: '#115293' },
            }}
            onClick={handleReadMore}
          >
            Read More
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogCard;
