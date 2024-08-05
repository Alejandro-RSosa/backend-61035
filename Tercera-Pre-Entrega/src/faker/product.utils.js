import { faker } from '@faker-js/faker';

export const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl(),
        code: faker.commerce.int(),
        stock: faker.number.int(),
        // status: faker.random.boolean(),
        category: faker.commerce.department(),
    };
}