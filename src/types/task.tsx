export interface TaskCreate {
  name: string;
}

export interface TaskUpdate {
  name: string;
}

export interface TaskResponse {
  id: string; 
  name: string;
  create_at: string; 
  is_completed: boolean;
}

export interface Task {
  id: string; 
  name: string;
  create_at: string; 
  is_completed: boolean;
}