import { useState } from "react";
import ApiServices from "../services/api";
import { useNavigate } from "react-router-dom";

const AddPlacePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    placeName: "",
    addressId: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.placeName) {
      try {
        const response = await ApiServices.addPlace(formData);
        console.log(response);
        if (response.status === 201) {
          setSuccess("Yer eklendi.");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          setError("Yer eklenemedi!");
        }
      } catch (error) {
        console.error(error);
        setError("Yer eklenemedi!");
      } 
    } else {
      setError("Yer adı alanı zorunludur!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Yer Ekle</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="placeName"
              className="block text-sm font-medium text-gray-700"
            >
              Yer Adı
            </label>
            <input
              type="text"
              id="placeName"
              name="placeName"
              value={formData.placeName}
              onChange={handleChange}
              placeholder="Yer adını giriniz"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            Ekle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPlacePage;
