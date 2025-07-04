export interface User {
  id: string;
  name: string;
  contributed: number;
  withdrawn: number;
}

export interface Group {
  id: string;
  name: string;
  members: User[];
  totalPool: number;
}
