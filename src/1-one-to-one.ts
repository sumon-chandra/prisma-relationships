import { faker } from "@faker-js/faker";
import { prisma } from "./db/client";
import { clean } from "./helpers.ts/clean";

/*
 * one-to-one
 * A user has one profile, a profile belongs to one user
 */
async function createUserWithProfile() {
  await clean()
  // create a user
  const user = await prisma.user.create({
    data: {}
  })
  // create a profile
  const profile = await prisma.profile.create({
    data: {
      name: faker.name.firstName(),
      userId: user.id
    }
  })
  const firstUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      profile: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })
  // create a user with a profile
  const secUser = await prisma.user.create({
    data: {
      profile: {
        create: {
          name: faker.name.firstName(),
        }
      }
    },
    include: {
      profile: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })

  return { firstUser, secUser }
}

const userWithProfile = await createUserWithProfile()
console.log("One-to-one");
console.log(userWithProfile);

