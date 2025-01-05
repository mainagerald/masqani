/* eslint-disable react/prop-types */
import PropertyCategories from "../../service/model/PropertyCategory";

export const CategoryStep = ({
    selectedCategory,
    onCategorySelect,
  }) => (
    <div>
      <h2 className="font-semibold text-2xl p-2 m-2">Category</h2>
      <h5 className="p-2 m-1">Please choose a category that best describes your property.</h5>
      <div className="grid md:grid-cols-4 lg:grid-cols-4 sm:grid-cols-2 gap-3 p-4 m-2">
      {PropertyCategories.map(({ id, icon: Icon,name }) => (
        <button
          key={id}
          type="button"
          onClick={() => onCategorySelect(id)}
          className={`p-4 border rounded-lg flex flex-col items-center bg-gray-100 hover:scale-105 ease-in-out duration-300 hover:bg-gray-200 ${
            selectedCategory === id ? "border-black bg-gray-300 border-2" : "border-gray-100"
          }`}
        >
          <Icon className="h-8 w-8 mb-2" />
          <span>{name}</span>
        </button>
      ))}
    </div>
    </div>
  );