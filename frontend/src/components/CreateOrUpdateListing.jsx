import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { amenities, cities, states, countries } from "../jsonData.js";
import { useNavigate } from "react-router-dom";

const CreateOrUpdateListingPage = () => {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [highlightDesc, setHighlightDesc] = useState("");
  const [highlight, setHighlight] = useState("");
  const [price, setPrice] = useState("");
  const [rooms, setRooms] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("5marla");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");


   const navigate = useNavigate();
  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };
  console.log(selectedAmenities, "selected aminities");
  console.log(selectedCategory, "selected category");

  // Fetching Categories by using tanstack query
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/category");
        return res?.data;
      } catch (err) {
        toast.error(err.response.data.message || "Something went wrong");
      }
    },
    staleTime: 1000000,
    refetchOnWindowFocus : false
  });

  // Mutation fro creating Listing
  const { mutate: createListing } = useMutation({
    mutationFn: (listingData) =>
       axiosInstance.post("/listings/create-listing", listingData),
    onSuccess: (data) => {
      toast.success("Listing Created successfully");
      console.log(data?.data?.data?._id,"listing id");
      navigate(`/listings/${data?.data?.data?._id}`, { replace: true })
      
    },
    onError: (err) => {
      console.log("errrrr", err.response.data);
      toast.error(err.response.data.message || "Something went wrong");
    },
  });
  console.log(createListing, "created Listing");



  const handleImageChange = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    if (validImages?.length + images?.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    setImages((prevImages) => [...prevImages, ...validImages]);
    setPreviewImages((prevPreviews) => [
      ...prevPreviews,
      ...validImages.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previewImages.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviewImages(newPreviews);
  };

  //Form Data for creating Listing
  // const amenitiesArray = amenities?.trim()?.split(",");
  // const category = ["5Marla"];
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("highlight", highlight);
    formData.append("highlightDesc", highlightDesc);
    formData.append("price", price);
    formData.append("rooms", rooms);
    formData.append("categories", selectedCategory);
    selectedAmenities?.forEach((amenity) => {
      formData.append("amenities[]", amenity);
    });
    formData.append("location[address]", address);
    formData.append("location[city]", city);
    formData.append("location[state]", state);
    formData.append("location[zipCode]", zipCode);
    formData.append("location[country]", country);
    images.forEach((image) => {
      formData.append(`listingImages`, image, image?.name);
    });

    createListing(formData);
    // for viewing form data in console
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  };

  return (
    <div className="max-w-md laptop:max-w-5xl mx-auto p-8  mb-20">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-4">
          <label className="block text-lg laptop:text-2xl font-bold mb-4">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded focus:outline-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg laptop:text-2xl font-bold mb-4 ">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border rounded focus:outline-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg laptop:text-2xl font-bold mb-4">
            Highlight
          </label>
          <input
            value={highlight}
            onChange={(e) => setHighlight(e.target.value)}
            required
            className="w-full p-2 border rounded focus:outline-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg laptop:text-2xl font-bold mb-4">
            Highlight Description
          </label>
          <textarea
            value={highlightDesc}
            onChange={(e) => setHighlightDesc(e.target.value)}
            required
            className="w-full p-2 border rounded focus:outline-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg laptop:text-2xl font-bold mb-4">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-2 border rounded focus:outline-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg laptop:text-2xl font-bold mb-4">
            Rooms
          </label>
          <input
            type="number"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            required
            className="w-full p-2 border rounded focus:outline-blue-600"
          />
        </div>

        {/* <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Amenities (comma separated)
          </label>
          <input
            type="text"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div> */}
        {/*  */}
        <div className=" my-4 ">
          <h1 className="mb-4 text-lg laptop:text-2xl font-bold">Amenities</h1>
          <div className="btn-group flex gap-4 flex-wrap justify-start">
            {amenities.map((amenity) => (
              <button
                key={amenity.id}
                className={`btn  ${
                  selectedAmenities.includes(amenity.title)
                    ? "btn-primary text-white"
                    : ""
                } w-[content] text-xs tablet:text-md`}
                onClick={(e) => {
                  e.preventDefault();
                  handleAmenityChange(amenity.title);
                }}
              >
                {amenity.title}
              </button>
            ))}
          </div>
        </div>
        {/*  */}
        <div className="mb-4">
          <h1 className="mb-4 text-lg laptop:text-2xl font-bold">Category</h1>

          {
            <div className="btn-group flex gap-4 flex-wrap justify-start">
              {categories?.data?.map((category) => (
                <button
                  key={category?._id}
                  value={category?.name}
                  className={`btn ${
                    selectedCategory === category?.name
                      ? "btn-primary text-white"
                      : ""
                  } w-[content] text-xs tablet:text-md`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory(category?.name);
                  }}
                >
                  {category?.name}
                </button>
              ))}
            </div>
          }
        </div>
        {/*  */}
        {/*Address starts here  */}
        <h2 className="mb-4 text-lg laptop:text-2xl font-bold">Location</h2>
        <div className="max-w-full justify-between flex flex-wrap  gap-4">
          <div className="mb-4 w-1/2 laptop:w-1/3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              required
              className="w-full p-2 border rounded focus:outline-blue-600"
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />
          </div>
          <div className="mb-4 w-1/2 laptop:w-1/3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <select
              className="block appearance-none w-full bg-white border  hover:border-blue-600 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 w-1/2 laptop:w-1/3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="state"
            >
              State
            </label>
            <select
              className="block appearance-none w-full bg-white border hover:border-blue-600 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Select state</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 w-1/2 laptop:w-1/3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="zipCOde"
            >
              Zip Code
            </label>
            <input
            className="w-full p-2 border rounded focus:outline-blue-600"
              id="zipCode"
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
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
              value={country}
              onChange={(e) => setCountry(e.target.value)}
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

        <div className="mb-4">
          <label className="block text-lg laptop:text-2xl font-bold mb-4">
            Upload Images (max 5)
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            required
            className="mb-8"
          />
          <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-4 mb-4">
            {previewImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`preview ${index}`}
                  className="w-full h-32 object-cover rounded  "
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
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn w-[50%] btn-primary hover:bg-transparent text-white hover:text-blue-600 font-bold py-2 px-4 rounded  my-10"
          >
            Create a Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrUpdateListingPage;
