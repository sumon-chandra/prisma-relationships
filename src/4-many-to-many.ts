import { faker } from "@faker-js/faker";
import { prisma } from "./db/client";
import { clean } from "./helpers.ts/clean";
import fs from "fs";

/*
 * many-to-many
 * A category can have a parent category and a category can have multiple child categories
 */

