import { BLOG_DATA } from "@/assests/blog";
import { roboto } from "@/utils/fonts";
import { Box, Container, Typography } from "@mui/material";

export async function getStaticPaths() {
  return {
    paths: BLOG_DATA.map((b) => ({ params: { id: b.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const blog = BLOG_DATA.find((b) => b.id === params.id);
  return {
    props: { blog },
  };
}

export default function BlogDetail({ blog }) {
  return (
    // <div className="min-h-screen bg-white text-gray-900">
    //   <div
    //     className="h-96 bg-cover bg-center flex items-end"
    //     style={{ backgroundImage: `url(${blog.image})` }}
    //   >
    //     <div className="bg-black bg-opacity-50 p-6 w-full">
    //       <h1 className="text-4xl font-bold text-white">{blog.title}</h1>
    //       <p className="text-gray-200 mt-2 italic">{blog.shortDescription}</p>
    //     </div>
    //   </div>

    //   <article className="max-w-4xl mx-auto px-6 py-10 space-y-6">
    //     <p className="text-lg leading-relaxed whitespace-pre-line">
    //       {blog.description}
    //     </p>
    //   </article>
    // </div>
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${blog.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(0,0,0,0.3)",

            width: "100%",
            height: "100%",
          }}
        ></Box>
      </Box>
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography
            sx={{ fontSize: 30, fontWeight: 600, fontFamily: roboto.style }}
          >
            {blog.title}
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 400,
              mt: 1,
              fontFamily: roboto.style,
            }}
          >
            {blog.shortDescription}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 400,
              mt: 1,
              fontFamily: roboto.style,
            }}
          >
            {blog.description}
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 400,
              mt: 1,
              fontFamily: roboto.style,
            }}
          >
            {blog.description2}
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 400,
              mt: 1,
              fontFamily: roboto.style,
            }}
          >
            {blog.description3}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
