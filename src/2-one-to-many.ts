import { createProductsWithCategories } from "./helpers.ts/products";
import { createUser } from "./helpers.ts/user";
import { prisma } from "./db/client";
import { sampleArray } from "./helpers.ts/random";
import { clean } from "./helpers.ts/clean";

/*
 * One to many
 * An order has one user, a user can have many orders
 */

