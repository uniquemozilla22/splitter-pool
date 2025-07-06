import { randomUUID } from "crypto";
import {
  Group,
  PrismaClient,
  Group as PrismaGroup,
  User,
} from "../generated/prisma";

export class GroupService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createGroup(name: string, userId: string): Promise<Group> {
    console.log("Creating group with name:", name, "and userId:", userId);
    const groupId = randomUUID();
    const group = await this.prisma.group.create({
      data: {
        id: groupId,
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: null,
        memberLinks: {
          create: {
            user: {
              connect: { id: userId },
            },
          },
        },
      },
    });

    return group as Group;
  }

  addUser(groupId: string, name: string): User | null {
    // const group = this.groups[groupId];
    // if (!group) return null;
    // const user: User = {
    //   id: randomUUID(),
    //   name,
    //   contributed: 0,
    //   withdrawn: 0,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // };
    // group.members.push(user);
    // return user;
    return null; // Placeholder for actual implementation
  }

  async getAllGroups() {
    // return Object.values(this.groups);
    const groups = await this.prisma.group.findMany({
      include: {
        memberLinks: {
          include: {
            group: false,
            user: true,
          },
        },
      },
    });
    return groups;
  }

  contribute(groupId: string, userId: string, amount: number): Group | null {
    // const group = this.groups[groupId];
    // if (!group) return null;
    // const user = group.members.find((u: User) => u.id === userId);
    // if (!user) return null;
    // user.contributed += amount;
    // group.totalPool += amount;
    // // Add transaction history
    // if (!group.transactions) group.transactions = [];
    // group.transactions.push({
    //   id: randomUUID(),
    //   type: "contribute",
    //   userId,
    //   amount,
    //   timestamp: Date.now(),
    // });
    // return group;

    return null; // Placeholder for actual implementation
  }

  withdraw(groupId: string, userId: string, amount: number): Group | null {
    // const group = this.groups[groupId];
    // if (!group || group.totalPool < amount) return null;
    // const user = group.members.find((u: User) => u.id === userId);
    // if (!user) return null;
    // user.withdrawn += amount;
    // group.totalPool -= amount;
    // // Add transaction history
    // if (!group.transactions) group.transactions = [];
    // group.transactions.push({
    //   id: randomUUID(),
    //   type: "withdraw",
    //   userId,
    //   amount,
    //   timestamp: Date.now(),
    // });
    // return group;
    return null; // Placeholder for actual implementation
  }

  async getGroup(groupId: string): Promise<Group | null> {
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
      include: {
        memberLinks: {
          include: {
            group: false,
            user: true,
          },
        },
      },
    });
    return group;
  }
}
