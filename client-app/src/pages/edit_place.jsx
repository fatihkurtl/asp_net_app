import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiServices from "../services/api";

const EditPlacePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [placeDetails, setPlaceDetails] = useState({
    placeName: "",
    streetAddress: "",
    city: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await ApiServices.getPlace(id);
        const data = response.data;
        setPlaceDetails({
          placeName: data.placeName || "",
          streetAddress: data.address?.streetAddress || "",
          city: data.address?.city || "",
        });
      } catch (error) {
        console.log(error);
        setError("Yer ayrıntıları alınırken bir hata oluştu.");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
    fetchPlace();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPlaceDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      placeDetails.placeName &&
      placeDetails.streetAddress &&
      placeDetails.city
    ) {
      try {
        const response = await ApiServices.updatePlace(id, {
          placeName: placeDetails.placeName,
          address: {
            streetAddress: placeDetails.streetAddress,
            city: placeDetails.city,
          },
        });

        console.log(response);
        if (response.statusText === "OK") {
          setSuccess("Yer başarıyla güncellendi!");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          setError("Yer güncellenirken bir hata oluştu.");
        }
      } catch (error) {
        console.error(error);
        setError("Yer güncellenirken bir hata oluştu.");
      }
    } else {
      setError("Lütfen gerekli tüm alanları doldurunuz.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Düzenle</h1>
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
              value={placeDetails.placeName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="streetAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Sokak Adresi
            </label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              value={placeDetails.streetAddress}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              Şehir
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={placeDetails.city}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            Güncelle
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPlacePage;
