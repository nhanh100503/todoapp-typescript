import axios from 'axios';
import type { TaskCreate, TaskResponse, TaskUpdate } from 'types/task';

const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

export const createTask = async (task: TaskCreate): Promise<TaskResponse> => {
  const response = await axios.post<TaskResponse>(`${API_BASE_URL}/task/create`, task);
  return response.data;
};

export const updateTask = async (id: string, task: TaskUpdate): Promise<TaskResponse> => {
  const response = await axios.put<TaskResponse>(`${API_BASE_URL}/task/update/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string): Promise<TaskResponse> => {
  const response = await axios.delete<TaskResponse>(`${API_BASE_URL}/task/delete/${id}`);
  return response.data;
};

export const updateStatusTask = async (id: string): Promise<TaskResponse> => {
  const response = await axios.put<TaskResponse>(`${API_BASE_URL}/task/update-status/${id}`);
  return response.data;
};

export const getAllTasks = async (): Promise<TaskResponse[]> => {
  const response = await axios.get<TaskResponse[]>(`${API_BASE_URL}/task/all`);
  return response.data;
};