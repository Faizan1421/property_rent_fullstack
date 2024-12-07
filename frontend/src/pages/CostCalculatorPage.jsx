
import { useState } from "react"

const MARLA_TO_SQFT = 272.251;

export default function CostCalculator() {
  const [material, setMaterial] = useState("premium")
  const [coveredAreaMarla, setCoveredAreaMarla] = useState(5.95) // Approximately 1620 sq ft
  const [constructionType, setConstructionType] = useState("without_material")
  const [bedrooms, setBedrooms] = useState(3)
  const [bathrooms, setBathrooms] = useState(4)
  const [kitchens, setKitchens] = useState(2)
  const [livingRooms, setLivingRooms] = useState(2)
  const [drawingRooms, setDrawingRooms] = useState(1)

  const calculateCost = () => {
    const coveredAreaSqFt = coveredAreaMarla * MARLA_TO_SQFT;
    const baseCost = material === "premium" ? 200 : 150
    const materialCost = constructionType === "with_material" ? 1.3 : 1
    const roomCost = (bedrooms * 100000) + (bathrooms * 80000) + (kitchens * 150000) + 
                    (livingRooms * 250000) + (drawingRooms * 250000)
    
    return (baseCost * coveredAreaSqFt * materialCost) + roomCost
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="card bg-white shadow-lg border border-gray-200 rounded-xl overflow-hidden">
        <div className="card-body p-0">
          <div className="bg-blue-600 text-white p-6">
            <h2 className="card-title text-2xl font-bold flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
              </svg>
              Construction Cost Calculator
            </h2>
          </div>
          <div className="p-6 space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Material Quality</label>
                <div className="flex gap-4">
                  {["premium", "standard"].map((option) => (
                    <label key={option} className="inline-flex items-center">
                      <input type="radio" name="material" className="radio radio-sm radio-primary" value={option} 
                             checked={material === option} onChange={(e) => setMaterial(e.target.value)} />
                      <span className="ml-2 text-sm text-gray-700 capitalize">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="covered-area" className="text-sm font-medium text-gray-700">Covered Area (marla)</label>
                <input 
                  id="covered-area"
                  type="number" 
                  value={coveredAreaMarla} 
                  onChange={(e) => setCoveredAreaMarla(Number(e.target.value))}
                  className="input input-bordered w-full focus:border-blue-600 focus:ring-1 focus:ring-blue-600" 
                  step="0.01"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {(coveredAreaMarla * MARLA_TO_SQFT).toFixed(2)} sq ft
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Construction Type</label>
              <div className="flex gap-4">
                {["with_material", "without_material"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input type="radio" name="constructionType" className="radio radio-sm radio-primary" value={option} 
                           checked={constructionType === option} onChange={(e) => setConstructionType(e.target.value)} />
                    <span className="ml-2 text-sm text-gray-700 capitalize">{option.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid gap-6 tablet:grid-cols-2 laptop:grid-cols-3">
              {[
                { label: "Bedrooms", value: bedrooms, setValue: setBedrooms, options: [1, 2, 3, 4, 5,6,7,8] },
                { label: "Bathrooms", value: bathrooms, setValue: setBathrooms, options: [1, 2, 3, 4, 5] },
                { label: "Kitchens", value: kitchens, setValue: setKitchens, options: [1, 2, 3] },
                { label: "Living Rooms", value: livingRooms, setValue: setLivingRooms, options: [1, 2, 3,4,5] },
                { label: "Drawing Rooms", value: drawingRooms, setValue: setDrawingRooms, options: [1, 2] },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <label htmlFor={item.label.toLowerCase().replace(' ', '-')} className="text-sm font-medium text-gray-700">{item.label}</label>
                  <select 
                    id={item.label.toLowerCase().replace(' ', '-')}
                    className="select select-bordered w-full focus:border-blue-600 focus:ring-1 focus:ring-blue-600" 
                    value={item.value} 
                    onChange={(e) => item.setValue(Number(e.target.value))}
                  >
                    {item.options.map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-600">Estimated Cost</div>
                <div className="text-4xl font-bold mt-2 text-blue-600">
                  PKR {calculateCost().toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

