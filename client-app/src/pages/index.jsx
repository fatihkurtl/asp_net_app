import { useEffect, useState } from "react";
import ApiServices from "../services/api";
import PlaceCard from "../components/PlaceCard";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const response = await ApiServices.getPlaces();
        console.log(response.data.$values);
        setPlaces(response.data.$values);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
    fetchPlaces();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mb-4">
      <div className="flex justify-end mb-4">
        <span className="font-medium">Ziyaret Edilen Toplam Yer Sayısı: {places.length}</span>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {error && <li className="text-red-500">{error.message}</li>}
        {places.length > 0 ? (
          places.map((place) => <PlaceCard key={place.placeId} place={place} />)
        ) : (
          <li className="col-span-full text-center text-gray-500">
            Yer bulunamadı...
          </li>
        )}
      </ul>
    </div>
  );
};

export default HomePage;
