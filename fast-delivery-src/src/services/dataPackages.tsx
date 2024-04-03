import axios, { AxiosError } from "axios";
import { format } from "date-fns";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/packages`;

type PackageData = {
  address: string;
  city?: string;
  client_name?: string;
  weight?: string;
  delivery_date?: string;
  id?: number | null;
  driver_id?: number;
  status?: string;
};

// get all packages
export const getAllPackages = async () => {
  try {
    const response = await axios.get(`${API_URL}`, { withCredentials: true });
    let newArr = response.data.map((individualPackage: PackageData) => {
      const adressArr = individualPackage.address.split(",");
      individualPackage.address = adressArr[0];
      individualPackage.city = adressArr[1];
      return individualPackage;
    });
    return newArr;
  } catch (error) {
    console.error("Error al obtener todos los paquetes:", error);
    throw error;
  }
};

// get package from today

export const getPackagesToday = async () => {
  try {
    const dateToday = format(new Date(), "yyyy-MM-dd");
    const response = await axios.get(`${API_URL}/date/${dateToday}`, {
      withCredentials: true,
    });
    let newArr = response.data.map((individualPackage: PackageData) => {
      const adressArr = individualPackage.address.split(",");
      individualPackage.address = adressArr[0];
      individualPackage.city = adressArr[1];
      return individualPackage;
    });
    return newArr;
  } catch (error: any) {
    console.error("Error al obtener el paquete:", error);
    return error.response;
  }
};

// get package by id

export const getPackageById = async (id: number | string) => {
  try {
    const response = await axios.get(`${API_URL}/single/${id}`, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    console.error("Error al obtener el paquete:", error);
    return error.response;
  }
};

//get package by status
export const getPackageByStatus = async (status: string) => {
  try {
    const response = await axios.get(`${API_URL}/status/${status}`, {
      withCredentials: true,
    });
    let newArr = response.data.map((individualPackage: PackageData) => {
      const adressArr = individualPackage.address.split(",");
      individualPackage.address = adressArr[0];
      individualPackage.city = adressArr[1];
      return individualPackage;
    });
    return newArr;
  } catch (error) {
    console.error("Error al obtener el paquete:", error);
    throw error;
  }
};

//get packages By driver
export const getPackagesByDriver = async (
  driver_id: Number | null | undefined
) => {
  try {
    const response = await axios.get(`${API_URL}/driver/${driver_id}`, {
      withCredentials: true,
    });
    let newArr = response.data.map((individualPackage: PackageData) => {
      const adressArr = individualPackage.address.split(",");
      individualPackage.address = adressArr[0];
      individualPackage.city = adressArr[1];
      return individualPackage;
    });
    return newArr;

    // return response.data;
  } catch (error) {
    console.error("Error al obtener los paquetes:", error);
    throw error;
  }
};

// create package
export const createPackage = async (packageData: PackageData) => {
  try {
    const response = await axios.post(`${API_URL}`, packageData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear un paquete:", error);
    throw error;
  }
};

// start delivery (put)
export const startDelivery = async (
  idsArray: (string | undefined)[],
  userId: Number | null
) => {
  try {
    const response = await axios.put(
      `${API_URL}/start-delivery`,
      {
        ids: idsArray,
        driver_id: userId,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error al iniciar la entrega:", error);
    throw error;
  }
};

// change status (put)
export const changeStatus = async (
  id: number | string | undefined,
  newStatus: string
) => {
  try {
    const response = await axios.put(
      `${API_URL}/status/${id}`,
      { newStatus },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al modificar el estado de un paquete:", error);
    throw error;
  }
};

//delete package
export const deletePackage = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/single/${id}`, { withCredentials: true });
  } catch (error) {
    console.error("Error al eliminar el paquete:", error);
    throw error;
  }
};
