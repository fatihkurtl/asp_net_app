import { useEffect, useState } from "react";
import ApiServices from "../services/api";
const HomePage = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await ApiServices.getPlaces();
        console.log(response.data.$values);
        setPlaces(response.data.$values);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchPlaces();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {places.map((place) => (
          <li key={place.placeId}>
            <h2>{place.placeName}</h2>
            <p>{place.address.city}</p>
            <p>{place.address.streetAddress}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
