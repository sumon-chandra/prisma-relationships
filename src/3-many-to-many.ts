import { faker } from "@faker-js/faker";
import { prisma } from "./db/client";
import { clean } from "./helpers.ts/clean";
import { sampleArray } from "./helpers.ts/random";

/*
 * many-to-many
 * A product can have multiple categories and a category can belong to multiple products
 */

