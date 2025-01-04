/* eslint-disable react/prop-types */
export const PropertyDescription = ({
    title,
    description,
    onTitleChange,
    onDescriptionChange,
  }) => (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        className="w-full p-2 border rounded h-32"
      />
    </div>
  );