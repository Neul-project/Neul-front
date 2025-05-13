import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import Header from "@/components/Header";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isChatPage = router.pathname === "/chat";
  const isStatusPage = router.pathname === "/status";

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div
        style={{
          paddingTop: isChatPage ? "0px" : "64px",
          backgroundColor: isStatusPage ? "aliceblue" : "transparent",
        }}
      >
        <Component {...pageProps} />
      </div>

      <Footer />
    </ThemeProvider>
  );
}
