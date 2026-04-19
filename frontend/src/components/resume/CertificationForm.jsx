const CertificationForm = ({ cert, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    cert || { name: "", issuer: "", year: "", link: "" },
  );
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Certification Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Issuer"
          value={formData.issuer}
          onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Year"
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          placeholder="Certification Link"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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

export default CertificationForm;
