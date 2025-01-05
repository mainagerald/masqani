import { useEffect, useState } from "react";
import { createPropertyListing } from "../../../service/api/propertyApi";
import { CategoryStep } from "../../../components/ListProperty/CategoryStep";
import PropertyDetails from "../../../components/ListProperty/PropertyDetailsStep";
import { PropertyDescription } from "../../../components/ListProperty/PropertyDescriptionStep";
import { PhotosStep } from "../../../components/ListProperty/PhotosStep";
import { PricingStep } from "../../../components/ListProperty/PriceStep";
import { LocationStep } from "../../../components/ListProperty/LocationStep";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";

const INIT_FORM_DATA = {
  category: "ALL",
  location: "",
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
};

const ListProperty = () => {
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem("currentStep");
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("propertyFormData");
    return savedData ? JSON.parse(savedData) : INIT_FORM_DATA;
  });

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        return Boolean(formData.category);
      case 2:
        return (
          formData.infos.bedrooms.value > 0 && formData.infos.baths.value > 0
        );
      case 3:
        return Boolean(
          formData.location &&
          formData.coordinates.latitude &&
          formData.coordinates.longitude
        );
      case 4:
        return Boolean(
          formData.description.title.value &&
          formData.description.description.value
        );
      case 5:
        return formData.price.value > 0;
      case 6:
        return files.length >= 1;
      default:
        return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const submissionData = {
        ...formData,
      };

      await createPropertyListing(submissionData, files);
      
      localStorage.removeItem("currentStep");
      localStorage.removeItem("propertyFormData");
      
      toast.success("Property listing created successfully!");
      
    } catch (error) {
      toast.error(error.message || "Failed to create property listing");
      console.error("Error creating property listing:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("currentStep", step);
    localStorage.setItem("propertyFormData", JSON.stringify(formData));
  }, [step, formData]);

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
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
          <LocationStep
            location={formData.location}
            onLocationSelect={({ location, coordinates }) => {
              setFormData({
                ...formData,
                location,
                coordinates,
              });
            }}
          />
        );
      case 4:
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
      case 5:
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
      case 6:
        return (
          <PhotosStep
            onFilesChange={({ files: newFiles }) => {
              setFiles(newFiles);
            }}
          />
        );
      default:
        return null;
    }
  };setIsSubmitting

  const renderStepIndicator = () => {
    const steps = ["Category", "Details", "Location", "Description", "Price", "Photos"];
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((stepName, index) => (
            <div
              key={stepName}
              className={`flex items-center ${
                index < steps.length - 1 ? "flex-1" : ""
              }`}
            >
              <div
                className={`relative flex items-center justify-center w-8 h-8 rounded-full border ${
                  index + 1 === step
                    ? "border-black bg-black text-white"
                    : index + 1 < step
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                {index + 1 < step ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${
                    index + 1 < step ? "bg-gray-900" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((stepName) => (
            <span
              key={stepName}
              className="text-xs text-gray-500"
              style={{ width: "60px", textAlign: "center" }}
            >
              {stepName}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">List Your Property</h1>
        {renderStepIndicator()}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {renderStep()}
          </div>
          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Previous
              </button>
            )}
            {step < 6 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!validateStep(step)}
                className="ml-auto px-6 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={!validateStep(step) || isSubmitting}
                className="ml-auto px-6 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Listing"}
              </button>
            )}
          </div>
        </form>
      </div>
      {isSubmitting && (<Spinner/>)}
    </div>
  );
};

export default ListProperty;