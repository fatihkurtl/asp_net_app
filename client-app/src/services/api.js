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
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deletePlace(id) {
    try {
      const response = await axiosApi.delete(`/api/Places/${id}`);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async addPlace(data) {
    try {
      const response = await axiosApi.post("/api/Places/add", data);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updatePlace(id, data) {
    try {
      const response = await axiosApi.put(`/api/Places/update/${id}`, data);
      console.log(response);
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
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async adminLogouth() {
    try {
      const response = await axiosApi.post("/api/Auth/logout");
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default new ApiServices();
