import { Role } from "@/lib/models/Role"
import bcrypt from 'bcrypt'

export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: Role;
    lastActive: Date
  
    constructor(id: number, username: string, email: string, password: string, role: Role, lastActive: Date) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.password = password;
      this.role = Role.ADMIN;
      this.lastActive = lastActive ?? new Date();
    }
  
    updateLastActive(): void{
        this.lastActive = new Date();
    }
}

