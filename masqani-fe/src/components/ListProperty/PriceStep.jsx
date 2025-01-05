/* eslint-disable react/prop-types */

export const PricingStep = ({ price, onPriceChange }) => {

  return (
    <div className="space-y-4 shadow-sm p-4 m-2">
      <h2 className="font-medium text-xl">Pricing</h2>
      <p className="text-gray-600 text-sm">
        Enter the price of your property in KES. Make sure it reflects the estimated
        market value.
      </p>
      <div
        className={`flex items-center rounded transition-shadow duration-300
          
        }`}
      >
        <p className="p-1 m-1">KES</p>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => onPriceChange(Math.max(0, parseInt(e.target.value)) || 0)}
          className={`flex-grow p-3 border-none bg-gray-200
          }`}
          aria-label="Property price"
        />
      </div>
    </div>
  );
};




