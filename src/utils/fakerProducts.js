import { faker } from "@faker-js/faker";

export const generateProducts =()=>{
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        code:faker.string.nanoid(6),
        category: faker.commerce.department(),
        status: faker.datatype.boolean(),
        stock: faker.number.int({ min: 0, max: 380 }),
    };
}