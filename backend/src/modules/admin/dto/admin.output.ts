import { Admin, Prisma } from "@prisma/client";

export const adminFieldsOutput: Prisma.AdminSelect = {
  id: true,
  name: true,
  email: true,
  password: false,
  type: true,
};

export type AdminOutputType = Pick<Admin, "id" | "type" | "email" | "name">;
