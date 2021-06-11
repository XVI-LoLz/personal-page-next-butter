import MainNavbar from "components/MainNavbar";

export default function Layout({ children }) {
  return (
    <>
      <MainNavbar />
      {children}
    </>
  );
}
