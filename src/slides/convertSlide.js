import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_API_URL;

const ConvertApi = createApi({
  reducerPath: "ConvertApi",
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  keepUnusedDataFor: 600,
  endpoints: (build) => ({
    convert8583to20022: build.mutation({
      query: (data) => ({
        url: "/api/8583to20022",
        method: "POST",
        data: data, 
      }),
    }),

    
    convert20022to8583 :build.mutation({
      query:(data)=>({
        url:"/api/20022to8583",
        method:"POST",
        data:data
      })
    })
  }),
});

export const { useConvert8583to20022Mutation,useConvert20022to8583Mutation } = ConvertApi;

export default ConvertApi;