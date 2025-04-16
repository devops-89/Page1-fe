import Layout from "@/components/layout";
import Modal from "@/components/Modal";
import ToastBar from "@/components/toastBar";
import { persistor, store } from "@/redux/store";
import "@/styles/globals.css";
import "animate.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "swiper/css";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Modal />
          <ToastBar />
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}
