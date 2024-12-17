import  { useState } from "react";

const ConstructionCostCalculator = () => {
  const [firstFloorSize, setFirstFloorSize] = useState(0); // Initialize to 0
  const [secondFloorSize, setSecondFloorSize] = useState(0);
  const [firstFloorUnit, setFirstFloorUnit] = useState("marla");
  const [secondFloorUnit, setSecondFloorUnit] = useState("marla");
  const [language, setLanguage] = useState("en");

  const handleFirstFloorSizeChange = (event) => {
    setFirstFloorSize(Number(event.target.value));
  };

  const handleSecondFloorSizeChange = (event) => {
    setSecondFloorSize(Number(event.target.value));
  };

  const handleFirstFloorUnitChange = (event) => {
    setFirstFloorUnit(event.target.value);
  };

  const handleSecondFloorUnitChange = (event) => {
    setSecondFloorUnit(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const calculateCost = () => {
    const firstFloorSqft =
      firstFloorUnit === "marla" ? firstFloorSize * 272.25 : firstFloorSize;
    const secondFloorSqft =
      secondFloorUnit === "marla" ? secondFloorSize * 272.25 : secondFloorSize;

    const firstFloorCost = firstFloorSqft * 4500;
    const secondFloorCost = secondFloorSqft * 5000;

    return {
      firstFloorCost,
      secondFloorCost,
      totalCost: firstFloorCost + secondFloorCost,
    };
  };

  const getMaxToilets = (size) => {
    if (size >= 1 && size <= 3) return 2;
    if (size >= 4 && size <= 6) return 3;
    if (size >= 7 && size <= 10) return 4;
    return 0;
  };

  const { firstFloorCost, secondFloorCost, totalCost } = calculateCost();
  const totalToilets =
    getMaxToilets(firstFloorSize) + getMaxToilets(secondFloorSize);

  const constructionDetailsEn = [
    "Foundation and structure (RCC or steel)",
    "Brickwork and plastering",
    "Flooring (tiles or marble)",
    "Electrical wiring and fixtures",
    "Plumbing and sanitary fittings",
    "Doors and windows",
    "Paint and finishing",
  ];

  const constructionDetailsUr = [
    "بنیاد اور ڈھانچہ (آر سی سی یا اسٹیل)",
    "اینٹوں کا کام اور پلستر",
    "فرش (ٹائلیں یا ماربل)",
    "بجلی کی وائرنگ اور فکسچر",
    "پلمبنگ اور سینیٹری فٹنگز",
    "دروازے اور کھڑکیاں",
    "پینٹ اور فنشنگ",
  ];

  const constructionDetails =
    language === "en" ? constructionDetailsEn : constructionDetailsUr;

  return (
    <div className=" min-h-screen p-8 text-white flex flex-col items-center ">
      <div className="bg-white text-gray-800 p-8 rounded-lg border-2  to shadow-xl w-full max-w-2xl ">
        <div className="flex justify-end mb-4">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-300 text-black"
          >
            <option value="en">English</option>
            <option value="ur">اردو</option>
          </select>
        </div>
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
          {language === "en"
            ? "Construction Cost Calculator"
            : "تعمیراتی لاگت کا کیلکولیٹر"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label
              htmlFor="firstFloorUnit"
              className="block font-medium mb-2 text-blue-600"
            >
              {language === "en" ? "First Floor Unit:" : "پہلی منزل کی اکائی:"}
            </label>
            <select
              id="firstFloorUnit"
              value={firstFloorUnit}
              onChange={handleFirstFloorUnitChange}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-300"
            >
              <option value="marla">
                {language === "en" ? "Marla" : "مرلہ"}
              </option>
              <option value="sqft">
                {language === "en" ? "Square Feet" : "مربع فٹ"}
              </option>
            </select>
          </div>
          <div>
            <label
              htmlFor="firstFloorSize"
              className="block font-medium mb-2 text-blue-600"
            >
              {language === "en" ? "First Floor Size:" : "پہلی منزل کا سائز:"}
            </label>
            <input
              type="number"
              id="firstFloorSize"
              value={firstFloorSize}
              onChange={handleFirstFloorSizeChange}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-300 "
              min={0} // Removed min={3}
            />
          </div>

          <div>
            <label
              htmlFor="secondFloorUnit"
              className="block font-medium mb-2 text-blue-600"
            >
              {language === "en"
                ? "Second Floor Unit:"
                : "دوسری منزل کی اکائی:"}
            </label>
            <select
              id="secondFloorUnit"
              value={secondFloorUnit}
              onChange={handleSecondFloorUnitChange}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-300"
            >
              <option value="marla">
                {language === "en" ? "Marla" : "مرلہ"}
              </option>
              <option value="sqft">
                {language === "en" ? "Square Feet" : "مربع فٹ"}
              </option>
            </select>
          </div>
          <div>
            <label
              htmlFor="secondFloorSize"
              className="block font-medium mb-2 text-blue-600"
            >
              {language === "en" ? "Second Floor Size:" : "دوسری منزل کا سائز:"}
            </label>
            <input
              type="number"
              id="secondFloorSize"
              value={secondFloorSize}
              onChange={handleSecondFloorSizeChange}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-300"
              min={0}
            />
          </div>
        </div>

        <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-inner text-gray-800">
          <p className="font-medium text-lg">
            {language === "en"
              ? `First Floor Cost (4500 PKR/sqft): ${firstFloorCost.toLocaleString()} PKR`
              : `پہلی منزل کی لاگت (4500 PKR/sqft): ${firstFloorCost.toLocaleString()} PKR`}
          </p>
          <p className="font-medium text-lg">
            {language === "en"
              ? `Second Floor Cost (5000 PKR/sqft): ${secondFloorCost.toLocaleString()} PKR`
              : `دوسری منزل کی لاگت (5000 PKR/sqft): ${secondFloorCost.toLocaleString()} PKR`}
          </p>
          <p className="font-bold text-xl mt-4">
            {language === "en" ? "Total Estimated Cost:" : "کل تخمینہ لاگت:"}{" "}
            {totalCost.toLocaleString()} PKR
          </p>
          <p className="font-medium text-lg mt-2">
            {language === "en"
              ? "Maximum Toilets:"
              : "زیادہ سے زیادہ بیت الخلا:"}{" "}
            {totalToilets}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            {language === "en" ? "What's Included:" : "کیا شامل ہے:"}
          </h2>
          <ul className="list-disc pl-6 text-gray-800">
            {constructionDetails.map((detail, index) => (
              <li key={index} className="mb-2">
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConstructionCostCalculator;
