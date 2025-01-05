/* eslint-disable react/prop-types */
export const PropertyDescription = ({
    title,
    description,
    onTitleChange,
    onDescriptionChange,
  }) => (
    <div className="bg-white shadow-sm p-6 rounded-lg m-2">
      <h2 className="font-semibold text-2xl text-black mb-4">Property Description</h2>
      <p className="text-gray-800 mb-6">Please add a title and description that best describes your property. <br/>
        The description should include amenities and any other fitting details about the property.
        </p>
        <p className="italic flex flex-row m-1 p-1">(An appropriate title would, for example, be: <strong className="font-medium">4 bedroom mansionette)</strong></p> 
      <div className="space-y-4 p-4 m-2">
        <label>Title</label>
      <input
        type="text"
        placeholder="Descriptive title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full p-2 border rounded bg-gray-100"
      />
      <label>Description</label>
      <textarea
        placeholder="Description for amenities, etc..."
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        className="w-full p-2 border rounded h-32 bg-gray-100"
      />
    </div>
    </div>
  );