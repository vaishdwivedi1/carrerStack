const CustomSectionForm = ({ section, onSave, onCancel }) => {
  const [formData, setFormData] = useState(section || { title: "", items: [] });
  const [newItem, setNewItem] = useState("");
  const addItem = () => {
    if (newItem.trim()) {
      setFormData({
        ...formData,
        items: [...formData.items, newItem.trim()],
      });
      setNewItem("");
    }
  };
  const removeItem = (index) =>
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Section Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Items
        </label>
        {formData.items.map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const newItems = [...formData.items];
                newItems[index] = e.target.value;
                setFormData({ ...formData, items: newItems });
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => removeItem(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add item"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === "Enter" && addItem()}
          />
          <button
            onClick={addItem}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(formData)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CustomSectionForm;
