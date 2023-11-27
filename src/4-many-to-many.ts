import { faker } from "@faker-js/faker";
import { prisma } from "./db/client";
import { clean } from "./helpers.ts/clean";
import fs from "fs";

/*
 * many-to-many
 * A category can have a parent category and a category can have multiple child categories
 */

async function createCategories() {
    await clean()

    const categoriesPromises = Array(10).fill(null).map(() => {
        return prisma.category.create({
            data: {
                name: faker.commerce.productAdjective()
            }
        })
    })

    const categories = await prisma.$transaction(categoriesPromises);

    const childCategoriesPromises = Array(10).fill(null).map((_, i) => {
        return prisma.category.create({
            data: {
                name: faker.commerce.productAdjective(),
                parent: {
                    connect: {
                        id: categories[i].id,
                    }
                }
            }
        })
    })

    return prisma.$transaction(childCategoriesPromises)
}

function findCategories() {
    return prisma.category.findMany({
        include: {
            parent: true,
            children: true
        }
    })
}

const childCategories = JSON.stringify(await createCategories(), null, 2)
const categories = JSON.stringify(await findCategories(), null, 2)
console.log("many-to-many that call itself");
console.log(childCategories);
console.log("--------------------------------");
console.log("Find categories");
console.log(categories);



