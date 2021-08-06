import MainNavbar from "components/MainNavbar";
import Footer from "components/Footer";

export default function Layout({ children }) {
  return (
    <>
      <MainNavbar />
      {children}
      <Footer />
    </>
  );
}
