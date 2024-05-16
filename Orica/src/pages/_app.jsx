import Providers from "@/redux/provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Providers>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-7Q8F0SCDDV" />
    </Providers>
  );
}
