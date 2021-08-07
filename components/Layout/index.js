import MainNavbar from "components/MainNavbar";
import Footer from "components/Footer";
import MainMeta from "components/MainMeta";

export default function Layout({ children }) {
  return (
    <>
      <MainMeta />
      <MainNavbar />
      {children}
      <Footer />
    </>
  );
}
