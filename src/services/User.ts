import { randomUUID } from "crypto";
import { PrismaClient, User } from "../../generated/prisma";

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(name: string): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: {
          id: randomUUID(),
          name,
          contributed: 0,
          withdrawn: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  async getUser(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { name: userId },
    });
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  }
  async updateUser(
    userId: string,
    updates: Partial<User>
  ): Promise<User | null> {
    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: updates,
      });
      return user;
    } catch {
      return null;
    }
  }

  async deleteUser(userId: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id: userId },
      });
      return true;
    } catch {
      return false;
    }
  }
}
