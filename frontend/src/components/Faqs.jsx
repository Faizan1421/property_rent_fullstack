const Faqs = () => {
  return (
    <div className="max-w-screen-xl px-10 tablet:px-20 mx-auto mb-20">
      <h2 className="mb-5 text-xl sm:text-2xl md:text-3xl font-extrabold leading-9 text-blue-600">
        FAQs
      </h2>
      <ul className="flex flex-wrap items-start justify-between gap-8">
        <li className="w-full sm:w-2/5">
          <p className="text-lg sm:text-xl md:text-2xl font-medium leading-6 text-gray-600">
            What is the process of buying a property?
          </p>
          <p className="mt-2 text-base sm:text-lg md:text-xl leading-6 text-gray-500">
            The process of buying a property typically involves finding a property, making an offer, negotiating the terms of the sale, conducting inspections and due diligence, and closing the deal.
          </p>
        </li>
        <li className="w-full sm:w-2/5">
          <p className="text-lg sm:text-xl md:text-2xl font-medium leading-6 text-gray-600">
            What is the difference between a real estate agent and a realtor?
          </p>
          <p className="mt-2 text-base sm:text-lg md:text-xl leading-6 text-gray-500">
            A real estate agent is a licensed professional who represents buyers or sellers in a real estate transaction, while a realtor is a member of the National Association of Realtors (NAR) and adheres to a strict code of ethics.
          </p>
        </li>
        <li className="w-full sm:w-2/5">
          <p className="text-lg sm:text-xl md:text-2xl font-medium leading-6 text-gray-600">
            How do I determine the value of a property?
          </p>
          <p className="mt-2 text-base sm:text-lg md:text-xl leading-6 text-gray-500">
            The value of a property can be determined by considering factors such as its location, size, condition, and comparable sales in the area. A real estate agent or appraiser can also provide a professional assessment of the property's value.
          </p>
        </li>
       
      
      </ul>
    </div>
  );
};

export default Faqs;
