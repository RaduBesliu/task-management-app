export interface Task {
  id: string;
  title: string;
  description?: string;
  color: string;
  textColor: string;
  isCompleted: boolean;
  userId: string;
}
