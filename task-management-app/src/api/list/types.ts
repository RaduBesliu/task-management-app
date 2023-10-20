import { Task } from '../task/types';

export interface List {
  id: string;
  title: string;
  taskLimit?: number;
  tasks: Task[];
  color: string;
  textColor: string;
  userId: string;
}
