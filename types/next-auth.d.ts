import { DefaultUser } from "next-auth";
import { User } from "@models/models";

declare module "next-auth" {
  interface Session {
    user: DefaultUser & User;
  }
}