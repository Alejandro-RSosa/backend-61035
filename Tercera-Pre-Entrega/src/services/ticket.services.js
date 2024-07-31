import Services from "./class.services.js";
import TicketDaoMongo from "../persistence/daos/mongodb/ticket.dao.js";
import CartServices from "./cart.services.js";
import ProductService from "./product.services.js";
import { v4 as uuidv4 } from "uuid";

const ticketDao = new TicketDaoMongo();
const prodService = new ProductService();
const cartService = new CartServices();

console.log(prodService);
console.log(cartService);

export default class TicketService extends Services {
  constructor() {
    super(ticketDao);
  }

  async generateTicket(user) {
    try {
      console.log(user);
      const cart = await cartService.getById(user.cart);
      console.log('Cart:', cart);
      if (!cart) return null;

      let amountAcc = 0;
      if (cart.products.length > 0) {
        for (const prodInCart of cart.products) {
          const idProd = prodInCart.product;
          console.log('Product ID:', idProd);
          const prodDB = await prodService.getById(idProd);
          console.log('Product from DB:', prodDB);

          if (prodInCart.quantity <= prodDB.stock) {
            const amount = prodInCart.quantity * prodDB.price;
            amountAcc += amount;
          } else return null;
        }
      }

      const ticket = await this.dao.create({
        code: uuidv4(),
        purchase_datetime: new Date().toLocaleString(),
        amount: amountAcc,
        purchaser: user.email,
      });

      await cartService.clearCart(user.cart);

      return ticket;
    } catch (error) {
      throw new Error(error);
    }
  }
}
