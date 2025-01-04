/* eslint-disable react/prop-types */
export const PricingStep= ({
    price,
    onPriceChange,
  }) => (
    <div className="space-y-4">
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => onPriceChange(parseInt(e.target.value))}
        className="w-full p-2 border rounded"
      />
    </div>
  );