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

  async deletePlace(id) {
    try {
      const response = await axiosApi.delete(`/api/Places/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async addPlace(data) {
    try {
      const response = await axiosApi.post("/api/Places/add", data);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updatePlace(id, data) {
    try {
      const response = await axiosApi.put(`/api/Places/update/${id}`, data);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async adminLogin(username, password) {
    try {
      const response = await axiosApi.post("/api/Auth/login", {
        username,
        password,
      });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async adminLogout() {
    try {
      const response = await axiosApi.post("/api/Auth/logout");
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default new ApiServices();
