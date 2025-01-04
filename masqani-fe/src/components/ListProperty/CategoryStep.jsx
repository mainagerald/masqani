/* eslint-disable react/prop-types */
import PropertyCategories from "../../service/model/PropertyCategory";

export const CategoryStep = ({
    selectedCategory,
    onCategorySelect,
  }) => (
    <div className="grid md:grid-cols-4 lg:grid-cols-4 sm:grid-cols-2 gap-3">
      {PropertyCategories.map(({ id, icon: Icon,name }) => (
        <button
          key={id}
          type="button"
          onClick={() => onCategorySelect(id)}
          className={`p-4 border rounded-lg flex flex-col items-center ${
            selectedCategory === id ? "border-black" : "border-gray-200"
          }`}
        >
            {console.log("category selected-----", selectedCategory)
            }
          <Icon className="h-8 w-8 mb-2" />
          <span>{name}</span>
        </button>
      ))}
    </div>
  );