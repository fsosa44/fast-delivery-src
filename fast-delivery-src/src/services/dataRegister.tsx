import axios from "axios";

const API_URL = `/api/users`;

type DataRegisterProps = {
  name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const dataRegister = async (formData: DataRegisterProps) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default dataRegister;
