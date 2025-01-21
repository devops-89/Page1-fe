import Layout from "@/components/layout";
import store from "@/redux/store";
import "@/styles/globals.css";
import "animate.css";
import { Provider } from "react-redux";
import "swiper/css";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}