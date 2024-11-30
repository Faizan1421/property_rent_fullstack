
import Faqs from "../components/Faqs";
import FeaturedListings from "../components/FeaturedListings";
import Footer from "../components/Footer";
import HomeSectionOne from "../components/HomeSectionOne";
import NavbarSub from "../components/layout/NavbarSub";
import Location from "../components/location";
import LocationsLinks from "../components/LocationsLinks";
import SelectType from "../components/selectType";
import Sponsers from "../components/Sponsers";
// import Slide from "../components/Slide";

const HomePage = () => {
  return (
    <>
      {/* <Slide /> */}
      <NavbarSub/>
      <SelectType />
      <HomeSectionOne/>
      <FeaturedListings type="rent"/>
      <FeaturedListings type="featured"/>
      <Sponsers/>
      <LocationsLinks/>
      <Faqs/>
      <Location />
      <Footer/>
    </>
  );
};

export default HomePage;
