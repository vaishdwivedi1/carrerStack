const AchievementForm = ({ ach, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    ach || { title: "", description: "", year: "" },
  );
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Achievement Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <RichTextEditor
        value={formData.description}
        onChange={(value) => setFormData({ ...formData, description: value })}
        placeholder="Achievement Description"
        className="w-full"
      />
      <input
        type="text"
        placeholder="Year"
        value={formData.year}
        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
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

export default AchievementForm;
