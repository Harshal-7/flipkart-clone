"use server";
import axios from "axios";

export const getProductsByCategoryId = async (id: string, sort_by?: string) => {
  const optionsWithSortby = {
    method: "GET",
    url: "https://real-time-flipkart-api.p.rapidapi.com/products-by-category",
    params: {
      category_id: id,
      page: "1",
      sort_by: sort_by,
    },
    headers: {
      "x-rapidapi-key": "8fd9fec7d6msh253b64b0b38c2abp1ddf82jsn09344b5aaefc",
      "x-rapidapi-host": "real-time-flipkart-api.p.rapidapi.com",
    },
  };
  const optionsWithoutSortby = {
    method: "GET",
    url: "https://real-time-flipkart-api.p.rapidapi.com/products-by-category",
    params: {
      category_id: id,
      page: "1",
    },
    headers: {
      "x-rapidapi-key": "8fd9fec7d6msh253b64b0b38c2abp1ddf82jsn09344b5aaefc",
      "x-rapidapi-host": "real-time-flipkart-api.p.rapidapi.com",
    },
  };

  if (sort_by) {
    try {
      const response = await axios.request(optionsWithSortby);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const response = await axios.request(optionsWithoutSortby);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export const getProductsByCategoryName = async (
  name: string,
  sort_by?: string
) => {
  const optionsWithSortby = {
    method: "GET",
    url: "https://real-time-flipkart-api.p.rapidapi.com/product-search",
    params: {
      q: name,
      page: "1",
      sort_by: sort_by,
    },
    headers: {
      "x-rapidapi-key": "8fd9fec7d6msh253b64b0b38c2abp1ddf82jsn09344b5aaefc",
      "x-rapidapi-host": "real-time-flipkart-api.p.rapidapi.com",
    },
  };
  const optionsWithoutSortby = {
    method: "GET",
    url: "https://real-time-flipkart-api.p.rapidapi.com/product-search",
    params: {
      q: name,
      page: "1",
    },
    headers: {
      "x-rapidapi-key": "8fd9fec7d6msh253b64b0b38c2abp1ddf82jsn09344b5aaefc",
      "x-rapidapi-host": "real-time-flipkart-api.p.rapidapi.com",
    },
  };

  if (sort_by === "relevance" || !sort_by) {
    try {
      const response = await axios.request(optionsWithoutSortby);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const response = await axios.request(optionsWithSortby);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
