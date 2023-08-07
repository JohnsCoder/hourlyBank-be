export interface Project {
  id?: string;
  title: string;
  price: number;
  currency: string;
  description: string;
  finished?: boolean;
  userId: string;
  createdAt?: string;
}
