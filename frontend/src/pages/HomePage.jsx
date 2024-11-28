
import Faqs from "../components/Faqs";
import FeaturedListings from "../components/FeaturedListings";
import Footer from "../components/Footer";
import HomeSectionOne from "../components/homeSectionOne";
import Location from "../components/location";
import LocationsLinks from "../components/LocationsLinks";
import SelectType from "../components/selectType";
import Slide from "../components/Slide";

const HomePage = () => {
  return (
    <>
      <Slide />
      <SelectType />
      <HomeSectionOne/>
      <FeaturedListings type="featured"/>
      <FeaturedListings type="rent"/>
      <LocationsLinks/>
      <Faqs/>
      <Location />
      <Footer/>
    </>
  );
};

export default HomePage;
