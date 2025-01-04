import { useState } from "react";
import { createPropertyListing } from "../../../service/api/propertyApi";
import { CategoryStep } from "../../../components/ListProperty/CategoryStep";
import PropertyDetails from "../../../components/ListProperty/PropertyDetailsStep";
import { PropertyDescription } from "../../../components/ListProperty/PropertyDescriptionStep";
import { PhotosStep } from "../../../components/ListProperty/PhotosStep";
import { PricingStep } from "../../../components/ListProperty/PriceStep";

const ListProperty = () => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    category: "ALL",
    location: "",
    address: "",
    coordinates: {
      latitude: null,
      longitude: null,
    },
    infos: {
      bedrooms: { value: 0 },
      baths: { value: 0 },
    },
    description: {
      title: { value: "" },
      description: { value: "" },
    },
    price: { value: 0 },
    pictures: [],
  });

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        return Boolean(formData.category && formData.address);
      case 2:
        return formData.infos.bedrooms.value > 0 && formData.infos.baths.value > 0;
      case 3:
        return Boolean(
          formData.description.title.value && formData.description.description.value
        );
      case 4:
        return formData.price.value > 0;
      default:
        return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPropertyListing(formData, files);
      // success
    } catch (error) {
      console.error(error);
      // error
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <CategoryStep
            selectedCategory={formData.category}
            onCategorySelect={(category) =>
              setFormData({ ...formData, category })              
            }
          />
          
        );
      case 2:
        return (
          <PropertyDetails
            bedrooms={formData.infos.bedrooms.value}
            bathrooms={formData.infos.baths.value}
            onBedroomsChange={(value) =>
              setFormData({
                ...formData,
                infos: {
                  ...formData.infos,
                  bedrooms: { value },
                },
              })
            }
            onBathroomsChange={(value) =>
              setFormData({
                ...formData,
                infos: {
                  ...formData.infos,
                  baths: { value },
                },
              })
            }
          />
        );
      case 3:
        return (
          <PropertyDescription
            title={formData.description.title.value}
            description={formData.description.description.value}
            onTitleChange={(value) =>
              setFormData({
                ...formData,
                description: {
                  ...formData.description,
                  title: { value },
                },
              })
            }
            onDescriptionChange={(value) =>
              setFormData({
                ...formData,
                description: {
                  ...formData.description,
                  description: { value },
                },
              })
            }
          />
        );
        case 4:
          return (
            <PricingStep
              price={formData.price.value}
              onPriceChange={(value) =>
                setFormData({
                  ...formData,
                  price: { value },
                })
              }
            />
          );
          case 5:
            return (
              <PhotosStep
                onFilesChange={(fileList) => setFiles(Array.from(fileList))}
              />
            );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <form onSubmit={handleSubmit}>
          {renderStep()}
          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 border rounded"
              >
                Previous
              </button>
            )}
            {step < 5 ? (
              <button
                type="button"
                onClick={() => validateStep(step) && setStep(step + 1)}
                disabled={!validateStep(step)}
                className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-300"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={!validateStep(step)}
                className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-300"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListProperty;