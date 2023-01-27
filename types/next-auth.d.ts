import { User } from "@models/models";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}