import CreateOrUpdateListingPage from "../components/CreateOrUpdateListing";

const CreateListingPage = () => {
  return (
    <>
      <h2 className="text-3xl laptop:text-4xl font-bold mt-20 mb-10 laptop:mb-20 text-center text-blue-600 ">
        Create a New Listing
      </h2>
      <CreateOrUpdateListingPage />
    </>
  );
};

export default CreateListingPage;
