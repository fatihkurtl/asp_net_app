import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApiServices from "../../services/api";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.username && formData.password) {
      try {
        const response = await ApiServices.adminLogin(formData.username, formData.password);
        // console.log(response.data.token); 
        if (response.data.token) {
          dispatch(login({ token: response.data.token }));
          navigate("/");
          // console.log(token);
        } else {
          setError("Kullanıcı adı veya şifre hatalı");
        }       
      } catch (error) {
        console.error(error);
        setError("Kullanıcı adı veya şifre hatalı");
      }
      
    } else {
      setError("Lütfen kullanıcı adınızı ve sifrenizi giriniz.");
    }
  };

  useEffect(() => {
    console.log("Updated token:", token);
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Kullanıcı Adı
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Kullanıcı adınızı giriniz"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              // required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Şifre
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Şifrenizi giriniz"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              // required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            Giriş
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
