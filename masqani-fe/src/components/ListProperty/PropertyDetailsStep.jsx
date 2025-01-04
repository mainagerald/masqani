/* eslint-disable react/prop-types */
const PropertyDetails = ({
    bedrooms,
    bathrooms,
    onBedroomsChange,
    onBathroomsChange,
  }) => (
    <div className="space-y-4">
      <input
        type="number"
        placeholder="Bedrooms"
        value={bedrooms}
        onChange={(e) => onBedroomsChange(parseInt(e.target.value))}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Bathrooms"
        value={bathrooms}
        onChange={(e) => onBathroomsChange(parseInt(e.target.value))}
        className="w-full p-2 border rounded"
      />
    </div>
  );

  export default PropertyDetails;