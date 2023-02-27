type _ = undefined;

export type User = {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  token?: string;
};

export type Project = {
  id?: string;
  title?: string;
  dateStart?: string;
  dateFinish?: string;
  description?: string;
  currency?: string;
  price?: number;
  finished?: boolean;
  userId?: string;
  daily?: Daily;
};

export type Daily = {
  id?: string;
  hour: number;
  todo: string;
};

export type Payload = [_, User & Project & Daily];
