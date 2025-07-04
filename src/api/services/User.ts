import { randomUUID } from "crypto";
import { User } from "../types/types";

export class UserService {
  private users: Record<string, User> = {};

  createUser(name: string): User {
    const user: User = {
      id: randomUUID(),
      name,
      contributed: 0,
      withdrawn: 0,
    };
    this.users[user.id] = user;
    return user;
  }

  getUser(userId: string): User | null {
    return this.users[userId] || null;
  }

  getAllUsers(): User[] {
    return Object.values(this.users);
  }

  updateUser(userId: string, updates: Partial<User>): User | null {
    const user = this.users[userId];
    if (!user) return null;
    this.users[userId] = { ...user, ...updates };
    return this.users[userId];
  }

  deleteUser(userId: string): boolean {
    if (this.users[userId]) {
      delete this.users[userId];
      return true;
    }
    return false;
  }
}
