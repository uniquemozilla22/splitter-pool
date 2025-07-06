export type User = {
  id: string;
  name: string;
  contributed: number;
  withdrawn: number;
  createdAt: string;
  updatedAt: string;
};

export type MemberLinks = {
  id: string;
  userId: string;
  groupId: string;
  user: User;
  group: null;
};

export type Group = {
  id: string;
  name: string;
  memberLinks: MemberLinks[];
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};
