import Layout from "@/components/layout";
import "@/styles/globals.css";
import "swiper/css";
import "animate.css";
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
