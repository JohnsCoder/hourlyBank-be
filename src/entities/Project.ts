export interface Project {
  id?: string;
  title: string;
  createdAt?: string;
  price: number;
  currency: string;
  description: string;
  finished?: boolean;
  userId: string;
}
