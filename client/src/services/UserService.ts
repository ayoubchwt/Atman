import api from "../api/Axios";
import type { userResponseDto } from "../types/User";

export const getUser = async (): Promise<userResponseDto> => {
  const response = await api.get<userResponseDto>("/user/");
  return response.data;
};
