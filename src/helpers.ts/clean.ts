import { prisma } from "../db/client";
export async function clean() {
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
}
