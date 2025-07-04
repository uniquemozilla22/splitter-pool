import { randomUUID } from "crypto";
import { Group as PrismaGroup, User } from "../../generated/prisma";

type Group = PrismaGroup & {
  totalPool: number;
  members: User[];
  transactions?: Transaction[];
};

type Transaction = {
  id: string;
  type: "contribute" | "withdraw";
  userId: string;
  amount: number;
  timestamp: number;
};

export class GroupService {
  private groups: Record<string, Group & { transactions?: Transaction[] }> = {};

  createGroup(name: string): Group {
    const groupId = randomUUID();
    this.groups[groupId] = {
      id: groupId,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: null,
      members: [],
      totalPool: 0,
      transactions: [],
    };
    return this.groups[groupId];
  }

  addUser(groupId: string, name: string): User | null {
    const group = this.groups[groupId];
    if (!group) return null;
    const user: User = {
      id: randomUUID(),
      name,
      contributed: 0,
      withdrawn: 0,
      createdAt: new Date(),
      updatedAt: new Date(),

    };
    group.members.push(user);
    return user;
  }

  getAllGroups(): Group[] {
    return Object.values(this.groups);
  }

  contribute(groupId: string, userId: string, amount: number): Group | null {
    const group = this.groups[groupId];
    if (!group) return null;
    const user = group.members.find((u: User) => u.id === userId);
    if (!user) return null;
    user.contributed += amount;
    group.totalPool += amount;
    // Add transaction history
    if (!group.transactions) group.transactions = [];
    group.transactions.push({
      id: randomUUID(),
      type: "contribute",
      userId,
      amount,
      timestamp: Date.now(),
    });
    return group;
  }

  withdraw(groupId: string, userId: string, amount: number): Group | null {
    const group = this.groups[groupId];
    if (!group || group.totalPool < amount) return null;
    const user = group.members.find((u: User) => u.id === userId);
    if (!user) return null;
    user.withdrawn += amount;
    group.totalPool -= amount;
    // Add transaction history
    if (!group.transactions) group.transactions = [];
    group.transactions.push({
      id: randomUUID(),
      type: "withdraw",
      userId,
      amount,
      timestamp: Date.now(),
    });
    return group;
  }

  getGroup(groupId: string): (Group & { transactions?: Transaction[] }) | null {
    return this.groups[groupId] || null;
  }
}
