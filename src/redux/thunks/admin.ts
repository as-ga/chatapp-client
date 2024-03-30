import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

const server = process.env.NEXT_SERVER_URI;

interface AdminLoginResponse {
  message: string;
}

interface AdminData {
  admin: any; // Define the type of your admin object
}

interface ErrorResponse {
  message: string;
}

const adminLogin = createAsyncThunk<string, string>(
  "admin/login",
  async (secretKey: string) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data }: AxiosResponse<AdminLoginResponse> = await axios.post(
        `${server}/api/v1/admin/verify`,
        { secretKey },
        config
      );

      return data.message;
    } catch (error:any) {
      throw (error.response.data as ErrorResponse).message;
    }
  }
);

const getAdmin = createAsyncThunk<AdminData["admin"], void>(
  "admin/getAdmin",
  async () => {
    try {
      const { data }: AxiosResponse<AdminData> = await axios.get(
        `${server}/api/v1/admin/`,
        {
          withCredentials: true,
        }
      );

      return data.admin;
    } catch (error:any) {
      throw (error.response.data as ErrorResponse).message;
    }
  }
);

const adminLogout = createAsyncThunk<string, void>("admin/logout", async () => {
  try {
    const { data }: AxiosResponse<{ message: string }> = await axios.get(
      `${server}/api/v1/admin/logout`,
      {
        withCredentials: true,
      }
    );

    return data.message;
  } catch (error:any) {
    throw (error.response.data as ErrorResponse).message;
  }
});

export { adminLogin, getAdmin, adminLogout };
