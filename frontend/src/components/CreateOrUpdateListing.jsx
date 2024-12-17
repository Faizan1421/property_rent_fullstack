import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader, X } from "lucide-react";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { amenities, cities, states, countries } from "../jsonData.js";
import { useNavigate, useParams } from "react-router-dom";

const CreateOrUpdateListingPage = (data) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isupdateComponent, setIsupdateComponent] = useState(false);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [propertyType, setPropertyType] = useState("buy");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: "",
    rooms: "",
    selectedAmenities: [],
    selectedCategory: "5marla",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "pakistan",
    isForRent: false,
  });

  // Populate form data if editing
  useEffect(() => {
    if (data?.data?.data[0]?._id) {
      setIsupdateComponent(true);
      const listing = data.data.data[0];
      setFormData({
        title: listing.title || "",
        description: listing.description || "",
        highlight: listing.highlight || "",
        highlightDesc: listing.highlightDesc || "",
        price: listing.price || "",
        rooms: listing.rooms || "",
        selectedAmenities: listing.amenities || [],
        selectedCategory: listing.categories?.[0]?.name || "5marla",
        address: listing.location?.address || "",
        city: listing.location?.city || "",
        state: listing.location?.state || "",
        zipCode: listing.location?.zipCode || "",
        country: listing.location?.country || "pakistan",
        isForRent: listing.isForRent === true,
      });
      setPropertyType(listing.isForRent === true ? "rent" : "buy");
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(amenity)
        ? prev.selectedAmenities.filter((a) => a !== amenity)
        : [...prev.selectedAmenities, amenity],
    }));
  };

  const handleCategoryChange = (category) => {
    setFormData((prev) => ({
      ...prev,
      selectedCategory: category,
    }));
  };

  const handleTypeChange = (type) => {
    setPropertyType(type);
    setFormData((prev) => ({
      ...prev,
      isForRent: type === "rent",
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    if (validImages.length + images.length > 15) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }

    setImages((prevImages) => [...prevImages, ...validImages]);
    setPreviewImages((prevPreviews) => [
      ...prevPreviews,
      ...validImages.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/category");
        return res.data;
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    },
    staleTime: 1000000,
    refetchOnWindowFocus: false,
  });

  const { mutate: createListing, isPending } = useMutation({
    mutationFn: (listingData) =>
      axiosInstance.post("/listings/create-listing", listingData),
    onSuccess: (data) => {
      toast.success("Listing Created successfully");
      navigate(`/listings/${data?.data?.data?._id}`, { replace: true });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  const { mutate: updateListing, isPending: isUpdating } = useMutation({
    mutationFn: (updateData) =>
      axiosInstance.patch(`/listings/${id}`, updateData),
    onSuccess: () => {
      toast.success("Listing Updated successfully");
      queryClient.invalidateQueries(["ListingDetails", id]);
      navigate(`/listings/${id}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Update failed");
    },
  });

  const handleCreateListing = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append all non-file fields
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("highlight", formData.highlight);
    formDataToSend.append("highlightDesc", formData.highlightDesc);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("rooms", formData.rooms);
    formDataToSend.append("categories", formData.selectedCategory);
    formDataToSend.append("isForRent", formData.isForRent);

    // Append amenities
    formData.selectedAmenities.forEach((amenity) => {
      formDataToSend.append("amenities[]", amenity);
    });

    // Append location fields individually
    formDataToSend.append("location[address]", formData.address);
    formDataToSend.append("location[city]", formData.city);
    formDataToSend.append("location[state]", formData.state);
    formDataToSend.append("location[zipCode]", formData.zipCode);
    formDataToSend.append("location[country]", formData.country);

    // Append images
    images.forEach((image) => {
      formDataToSend.append("listingImages", image, image.name); // Append each image file
    });

    createListing(formDataToSend);
  };

  const handleUpdateListing = (e) => {
    e.preventDefault();
    updateListing(formData);
  };


  return (
    <div className="max-w-md laptop:max-w-5xl mx-auto p-8 mb-20">
      <form
        onSubmit={
          !isupdateComponent ? handleCreateListing : handleUpdateListing
        }
        className="flex flex-col"
      >
        {/* Title */}
        <div className="mb-4">
          <label className="block text-lg laptop:text-2xl font-bold mb-4">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            disabled={isPending || isUpdating}
            className="w-full p-2 border rounded focus:outline-blue-600"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-lg laptop:text-2xl font-bold mb-4">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            disabled={isPending || isUpdating}
            className="w-full p-2 border rounded focus:outline-blue-600"
          />
        </div>

        {/* Highlight */}
        <div className="mb-4">
          <label className="block text-lg laptop:text-2xl font-bold mb-4">
            Highlight
          </label>
          <input
            type="text"
            name="highlight"
            value={formData.highlight}
            onChange={handleInputChange}
            required
            disabled={isPending || isUpdating}
            className="w-full p-2 border rounded focus:outline-blue-600"
          />
        </div>

        {/* Highlight Description */}
        <div className="mb-4">
          <label className="block text-lg laptop:text-2xl font-bold mb-4">
            Highlight Description
          </label>
          <textarea
            name="highlightDesc"
            value={formData.highlightDesc}
            onChange={handleInputChange}
            required
            disabled={isPending || isUpdating}
            className="w-full p-2 border rounded focus:outline-blue-600"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-lg laptop:text-2xl font-bold mb-4">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData?.price}
            onChange={handleInputChange}
            required
            disabled={isPending || isUpdating}
            className="w-full p-2 border rounded focus:outline-blue-600"
          />
        </div>

        {/* Rooms */}
        <div className="mb-4">
          <label className="block text-lg laptop:text-2xl font-bold mb-4">
            Rooms
          </label>
          <input
            type="number"
            name="rooms"
            value={formData.rooms}
            onChange={handleInputChange}
            required
            disabled={isPending || isUpdating}
            min={1}
            max={1000}
            className="w-full p-2 border rounded focus:outline-blue-600"
          />
        </div>
        {/* Property Type */}
        <div className="mb-4">
          <label className="block text-lg laptop:text-2xl font-bold mb-4">
            Property Type
          </label>
          <div className="flex gap-4">
            <button
              className={`btn  text-xs tablet:text-sm  ${
                propertyType === "buy" ? "btn-primary text-white" : "text-black"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setPropertyType("buy");
                handleTypeChange("buy");
              }}
            >
              Buy
            </button>
            <button
              className={`btn text-xs tablet:text-sm   ${
                propertyType === "rent"
                  ? "btn-primary text-white"
                  : "text-black"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setPropertyType("rent");
                handleTypeChange("rent");
              }}
            >
              Rent
            </button>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <h1 className="mb-4 text-lg laptop:text-2xl font-bold">Amenities</h1>
          <div className="btn-group flex gap-4 flex-wrap justify-start">
            {amenities?.map((amenity) => (
              <button
                key={amenity?.id}
                className={`btn ${
                  formData.selectedAmenities?.includes(amenity.title)
                    ? "btn-primary text-white"
                    : ""
                } w-[content] text-xs tablet:text-sm`}
                onClick={(e) => {
                  e.preventDefault();
                  handleAmenityChange(amenity?.title);
                }}
                disabled={isPending || isUpdating}
              >
                {amenity?.title}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <h1 className="mb-4 text-lg laptop:text-2xl font-bold">Category</h1>
          <div className="btn-group flex gap-4 flex-wrap justify-start">
            {categories?.data?.map((category) => (
              <button
                key={category?._id}
                className={`btn ${
                  formData.selectedCategory === category?.name
                    ? "btn-primary text-white"
                    : ""
                } w-[content] text-xs tablet:text-md`}
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryChange(category?.name);
                }}
                disabled={isPending || isUpdating}
              >
                {category?.name}
              </button>
            ))}
          </div>
        </div>

        {/* Location Fields */}
        <h2 className="mb-4 text-lg laptop:text-2xl font-bold">Location</h2>
        <div className="max-w-full justify-between flex flex-wrap gap-4">
          <div className="mb-4 w-1/2 laptop:w-1/3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              disabled={isPending || isUpdating}
              className="w-full p-2 border rounded focus:outline-blue-600"
              type="text"
              placeholder="Enter address"
            />
          </div>

          {/* City */}
          <div className="mb-4 w-1/2 laptop:w-1/3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              disabled={isPending || isUpdating}
              className="block appearance-none w-full bg-white border hover:border-blue-600 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div className="mb-4 w-1/2 laptop:w-1/3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              State
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              disabled={isPending || isUpdating}
              className="block appearance-none w-full bg-white border hover:border-blue-600 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select state</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Zip Code */}
          <div className="mb-4 w-1/2 laptop:w-1/3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Zip Code
            </label>
            <input
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              disabled={isPending || isUpdating}
              className="w-full p-2 border rounded focus:outline-blue-600"
              type="text"
              placeholder="Enter zip code"
            />
          </div>
          <div className="mb-4 w-1/2 laptop:w-1/3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="country"
            >
              Country
            </label>
            <select
              className="block appearance-none w-full bg-white border  hover:border-blue-600 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="country"
              value={formData.country}
              disabled={isPending || isUpdating}
              onChange={handleInputChange}
            >
              <option value="">Select country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Address Ends Here */}
        {/* Images Upload */}
        {!isupdateComponent && (
          <div className="mb-4">
            <label className="block text-lg laptop:text-2xl font-bold mb-4">
              Upload Images (max 15)
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              required
              disabled={isPending || isUpdating}
              className="mb-8"
            />
            <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-4 mb-4">
              {previewImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`preview ${index}`}
                    className="w-full h-32 object-cover rounded  "
                    disabled={isPending || isUpdating}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveImage(index);
                    }}
                    className="absolute top-0 right-0 bg-white text-white rounded-full p-1"
                  >
                    <X color="blue" width={10} height={10} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Images Upload ends here*/}

        {!isupdateComponent ? (
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn w-[50%] btn-primary hover:bg-transparent text-white hover:text-blue-600 font-bold py-2 px-4 rounded  my-10"
              disabled={isPending || isUpdating}
            >
              {isPending ? (
                <Loader className="size-5 animate-spin" />
              ) : (
                "Create a Listing"
              )}
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn w-[50%] btn-primary hover:bg-transparent text-white hover:text-blue-600 font-bold py-2 px-4 rounded  my-10"
              disabled={isPending || isUpdating}
            >
              {isUpdating ? (
                <Loader className="size-5 animate-spin" />
              ) : (
                "Update Listing"
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateOrUpdateListingPage;
