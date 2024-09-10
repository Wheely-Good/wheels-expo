export type Section = 'tests' | 'lessons' | 'training';

export interface Test {
  id: number;
  name: string;
  date: string;
  score: number;
}

export interface Lesson {
  id: number;
  name: string;
  status: 'completed' | 'in-progress' | 'not-started';
}