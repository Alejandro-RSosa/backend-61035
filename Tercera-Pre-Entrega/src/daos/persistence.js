import { initMongoDB } from "./db/connection.js";
import ProductDaoFS from './filesystem/product.dao.js';
import ProductDaoMongo from './mongodb/product.dao.js';
import CartDaoMongo from './mongodb/cart.dao.js';
import UserDaoMongo from './mongodb/user.dao.js';
import 'dotenv/config';

let prodDao = null;
let cartDao = null;
let userDao = null;

// let persistence = process.argv[2];
let persistence = process.env.PERSISTENCE;

switch (persistence) {
    case 'fs':
        prodDao = new ProductDaoFS('.src/daos/filesystem/data/products.json');                
        break;
    case 'mongo':
        initMongoDB();
        prodDao = new ProductDaoMongo();
        cartDao = new CartDaoMongo();
        userDao = new UserDaoMongo();        
        break;
    default:
        prodDao = new ProductDaoFS('.src/daos/filesystem/data/products.json');
    break;
}

export default { prodDao, cartDao, userDao };