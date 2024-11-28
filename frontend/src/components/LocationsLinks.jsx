import { useNavigate } from "react-router-dom";

const LocationsLinks = () => {
  const navigate = useNavigate();
  const handleLinkClick = (location) => {
    navigate(`/search?q=${location}&page=1&pagetype=buy`);
  };
  return (
    <div className="flex flex-col gap-10 laptop:flex-row px-10 tablet:px-20 mx-auto mb-20 justify-between ">
      <div>
      <h1 className="text-xl tablet:text-2xl font-semibold text-blue-600 mb-5">
        Popular Locations Near Gujar khan
      </h1>
      <div className="  text-lg cursor-pointer flex flex-col gap-3 w-full tablet:w-1/2">
        <span
          className="underline hover:text-blue-600 text-sm"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("gujar khan");
          }}
        >
          Gujar Khan City
        </span>
        <span
          className="underline hover:text-blue-600 text-sm"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("mandra");
          }}
        >
         Mandra City
        </span>
        <span
          className="underline hover:text-blue-600 text-sm"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("barki");
          }}
        >
          Barki
        </span>
        <span
          className="underline hover:text-blue-600 text-sm"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("daultala");
          }}
        >
          Daultala
        </span>
        <span
          className="underline hover:text-blue-600 text-sm"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("jabbar");
          }}
        >
          Jabbar
        </span>
        <span
          className="underline hover:text-blue-600 text-sm"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("Hayat Sir Road");
          }}
        >
          Hayat Sir Road
        </span>
      </div>
      </div>
      {/* Popular Locations to Buy Near Jehlum */}
      <div className="">
      <h1 className="text-xl tablet:text-2xl font-semibold text-blue-600 mb-5">
        Popular Locations Near Jehlum
      </h1>
      <div className="  text-lg cursor-pointer flex flex-col gap-3 w-full tablet:w-1/2 ">
        <span
          className="underline hover:text-blue-600 text-sm"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("jehlum");
          }}
        >
          Jehlum City
        </span>
        <span
          className="underline hover:text-blue-600 text-sm"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("soahawa");
          }}
        >
         Sohawa City
        </span>
        <span
          className="underline hover:text-blue-600 text-sm"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("mandar");
          }}
        >
          Mandar
        </span>
        <span
          className="underline hover:text-blue-600 text-sm"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("chakwal Road");
          }}
        >
          Chakwal Road
        </span>
        <span
          className="underline hover:text-blue-600 text-sm"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("Deena");
          }}
        >
          Deena
        </span>
        <span
          className="underline hover:text-blue-600 text-sm"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("Hayat Sir Road");
          }}
        >
          Hayat Sir Road
        </span>
      </div>
      </div>
    </div>
  );
};

export default LocationsLinks;
