type _ = undefined;

export type User = {
  username: string;
  email: string;
  password: string;
  token: string;
};

export type Project = {
  id?: string;
  title: string;
  dateStart: string;
  dateFinish: string;
  description: string;
  price: number;
  finished: boolean;
  userId: string;
  daily?: {
    hour: string;
    todo: string;
    day: number;
  };
};


export type Payload = [_, User & Project];
