
export interface Project {
  id?: string;
  title: string;
  dateStart: string;
  dateFinish: string;
  description: string;
  currency: string;
  price: number;
  finished: boolean;
  userId: string;
  daily: string;
}
