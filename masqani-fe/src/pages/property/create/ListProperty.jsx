import { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MapLocationPicker from "../../../components/MapLocationPicker";
import PropertyCategories from "../../../service/model/PropertyCategory";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const ListProperty = () => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [position, setPosition] = useState(null);
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
        return formData.category && formData.address && position;
      case 2:
        return (
          formData.infos.bedrooms.value > 0 && formData.infos.baths.value > 0
        );
      case 3:
        return (
          formData.description.title.value &&
          formData.description.description.value
        );
      case 4:
        return formData.price.value > 0;
      default:
        return true;
    }
  };

  const handleMapClick = (pos) => {
    setPosition(pos);
    setFormData({
      ...formData,
      coordinates: {
        latitude: pos.lat,
        longitude: pos.lng,
      },
    });
  };

  const generateIdempotencyKey = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idempotencyKey = generateIdempotencyKey();

    const formDataObj = new FormData();
    files.forEach((file) => {
      formDataObj.append("files", file);
    });

    formDataObj.append(
      "dto",
      JSON.stringify({
        ...formData,
        idempotencyKey,
      })
    );

    try {
      const response = await fetch(
        "http://localhost:9090/api/landlord-listing/create",
        {
          method: "POST",
          body: formDataObj,
        }
      );

      if (!response.ok) throw new Error("Submission failed");

      // success
    } catch (error) {
      console.error(error);
      // error
    }
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {PropertyCategories.map(({ id, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: id })}
                    className={`p-4 border rounded-lg flex flex-col items-center ${
                      formData.category === id
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                  >
                    <Icon className="h-8 w-8 mb-2" />
                    <span>{id}</span>
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <div className="h-64 rounded-lg">
                <MapLocationPicker onLocationSelect={handleMapClick} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Bedrooms"
                value={formData.infos.bedrooms.value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    infos: {
                      ...formData.infos,
                      bedrooms: { value: parseInt(e.target.value) },
                    },
                  })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Bathrooms"
                value={formData.infos.baths.value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    infos: {
                      ...formData.infos,
                      baths: { value: parseInt(e.target.value) },
                    },
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.description.title.value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: {
                      ...formData.description,
                      title: { value: e.target.value },
                    },
                  })
                }
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={formData.description.description.value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: {
                      ...formData.description,
                      description: { value: e.target.value },
                    },
                  })
                }
                className="w-full p-2 border rounded h-32"
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Price"
                value={formData.price.value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: { value: parseInt(e.target.value) },
                  })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
                accept="image/*"
              />
            </div>
          )}

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
            {step < 4 ? (
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
