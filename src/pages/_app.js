import Layout from "@/components/layout";
import {store,persistor} from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "@/styles/globals.css";
import "animate.css";
import { Provider } from "react-redux";
import "swiper/css";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </PersistGate>
    </Provider>
  );
}
