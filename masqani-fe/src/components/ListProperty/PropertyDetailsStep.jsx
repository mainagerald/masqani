/* eslint-disable react/prop-types */
const PropertyDetails = ({
  bedrooms,
  bathrooms,
  onBedroomsChange,
  onBathroomsChange,
}) => (
  <div className="bg-white shadow-sm p-6 rounded-lg m-2">
    <h2 className="font-semibold text-2xl text-black mb-4">Property Details</h2>
    <p className="text-gray-700 mb-6">
      Please provide some basic details about your property. Further information can be added under the description section.
    </p>
    <p className="italic text-gray-600 text-sm mb-5">(Note: Studios can be treated as having one bedroom.)</p>
    <div className="space-y-4">
      <div className="flex items-center space-x-4 shadow-sm p-3 m-1">
        <label className="flex-grow text-lg text-gray-800 font-medium">Bedrooms</label>
        {bedrooms>0 && (
          <button
          type="button"
          onClick={() => onBedroomsChange(bedrooms - 1)}
          disabled={bedrooms === 0}
          className={`p-2 text-2xl h-10 w-10 items-center flex justify-center rounded-full
             text-black border border-gray-800
          transition duration-300`}
        >
          -
        </button>
        )}
        <input
          type="number"
          value={bedrooms}
          onChange={(e) => onBedroomsChange(Math.max(0, parseInt(e.target.value) || 0))}
          className="w-16 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <button
          onClick={() => onBedroomsChange(bedrooms + 1)}
          type="button"
          className="p-2 text-2xl h-10 w-10 items-center flex justify-center border-gray-800 border text-black rounded-full transition duration-300"
        >
          +
        </button>
      </div>

      <div className="flex items-center space-x-4 shadow-sm p-3 m-1">
        <label className="flex-grow text-lg text-gray-800 font-medium">Bathrooms</label>
        {bathrooms>0 && (
          <button
          onClick={() => onBathroomsChange(bathrooms - 1)}
          disabled={bathrooms === 0}
          type="button"
          className={`p-2 rounded-full text-2xl
             text-black border border-gray-800 h-10 w-10 items-center flex justify-center
          transition duration-300`}
        >
          -
        </button>
        )}
        <input
          type="number"
          value={bathrooms}
          onChange={(e) => onBathroomsChange(Math.max(0, parseInt(e.target.value) || 0))}
          className="w-16 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <button
          onClick={() => onBathroomsChange(bathrooms + 1)}
          type="button"
          className="p-2 text-2xl h-10 w-10 items-center flex justify-center border-gray-800 border text-black rounded-full transition duration-300"
        >
          +
        </button>
      </div>
    </div>
  </div>
);

export default PropertyDetails;
