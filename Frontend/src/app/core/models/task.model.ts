export interface Task {
  id?: number; 
  title: string;
  status: string;
  duration: string;
  description: string;
  priority: number;
  user: {
    id: number;
  };
  project: {
    id: number;
  };
}
