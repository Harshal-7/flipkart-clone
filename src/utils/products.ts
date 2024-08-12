"use server";
import axios from "axios";
import { env } from "process";

export const getProductsByCategory = async (id: string, sort_by?: string) => {
  const options = {
    method: "GET",
    url: "https://real-time-flipkart-api.p.rapidapi.com/products-by-category",
    params: {
      category_id: `${id}`,
      page: "1",
    },
    headers: {
      "x-rapidapi-key": "8fd9fec7d6msh253b64b0b38c2abp1ddf82jsn09344b5aaefc",
      "x-rapidapi-host": "real-time-flipkart-api.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log("response.data : ", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
