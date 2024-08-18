import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ApiServices from "../services/api";

const PlaceCard = ({ place }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDelete = async () => {
    try {
      await ApiServices.deletePlace(place.placeId);
      window.location.reload();
    } catch (error) {
      console.error("Yer silinirken hata oluştu:", error);
    } finally {
      setShowConfirmModal(false);
    }
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('tr-TR', options);
  };

  return (
    <li
      key={place.placeId}
      className="border border-gray-300 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 relative"
    >
      <Link
        to={`/edit/place/${place.placeId}`}
        className="text-2xl font-semibold mb-2 block text-blue-600 hover:text-blue-800"
      >
        {place.placeName}
      </Link>
      {place.address ? (
        <>
          <p className="text-gray-600">{place.address.city}</p>
          <p className="text-gray-600">{place.address.streetAddress}</p>
        </>
      ) : (
        <>
          <p className="text-red-600">Şehir bilgisi tanımlı değil.</p>
          <p className="text-red-600">Adres bilgisi tanımlı değil.</p>
        </>
      )}
      <hr className="my-4" />
      <p className="text-gray-600 text-sm">Oluşturulma Tarihi: {formatDate(place.createdAt)}</p>
      <p className="text-gray-600 text-sm">Son Güncelleme Tarihi: {formatDate(place.updatedAt)}</p>
      <button
        onClick={() => setShowConfirmModal(true)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">
              {place.placeName} yerini silmek istediğinize emin misiniz?
            </h2>
            <p className="mb-4">
              Bu işlemi geri alamazsınız. Yer kaydını silmek istediğinize emin
              misiniz?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Sil
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

PlaceCard.propTypes = {
  place: PropTypes.shape({
    placeId: PropTypes.number.isRequired,
    placeName: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    address: PropTypes.shape({
      city: PropTypes.string,
      streetAddress: PropTypes.string,
    }),
  }).isRequired,
};

export default PlaceCard;
