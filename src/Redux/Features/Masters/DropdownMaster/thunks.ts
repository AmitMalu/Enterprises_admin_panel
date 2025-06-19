import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../Config/Api/AxiosInstance";
import { API_ENDPOINTS } from "../../../../Config/Api/EndPoints";
import { CreateDropdownPayload, FetchDropdownMasterListParams } from "./types";

export const fetchDropdownList = createAsyncThunk(
  "dropdownMaster/fetchDropdownList",
  async (
    { page = 0, size = 10, filter }: FetchDropdownMasterListParams,
    { rejectWithValue }
  ) => {
    const params = new URLSearchParams();
    params.append("page", String(page - 1));
    params.append("size", String(size));
    if (filter?.key) {
      params.append(String(filter.key), String(filter.value ?? ""));
    }
    try {
      const response = await axiosInstance.get(
        `${
          API_ENDPOINTS?.MASTER?.DROPDOWN_MASTER
        }/get-all-dropdown?${params.toString()}`
      );
      const responseData = response?.data;

      if (responseData && responseData.statusCode === 200) {
        return responseData;
      } else {
        return rejectWithValue(
          responseData?.message || "No Dropdown Master found"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "No Dropdown Master found"
      );
    }
  }
);

export const createDropdownMaster = createAsyncThunk(
  "dropdownMaster/createDropdownMaster",
  async (data: CreateDropdownPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.MASTER.DROPDOWN_MASTER,
        data
      );
      const responseData = response?.data;

      if (responseData && responseData?.statusCode === 201) {
        return responseData;
      } else {
        return rejectWithValue(
          responseData?.message || "Failed to Create Dropdown Master"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create Dropdown Master"
      );
    }
  }
);
