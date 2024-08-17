import axiosApi from "../utils/axios";

class ApiServices {
  async getPlaces() {
    try {
      const response = await axiosApi.get("/api/Places");
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getPlace(id) {
    try {
      const response = await axiosApi.get(`/api/Places/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default new ApiServices();
