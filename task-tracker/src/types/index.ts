export type TaskStatus = 'todo' | 'doing' | 'done';

export interface Task {
  id: string;
  _id?: string; // from mongo
  title: string;
  status: TaskStatus;
  assignee?: string;
  dueDate?: string;
  priority?: 'Low' | 'Medium' | 'High';
  description?: string;
  tags?: string[];
  comments?: { author: string; text: string; date: string }[];
}

export interface ActivityLog {
  id: string;
  type: 'CREATE' | 'UPDATE' | 'DELETE' | 'MOVE';
  taskTitle: string;
  details: string;
  date: string;
}