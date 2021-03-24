const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async create({ quantity }) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    const order = await Order.insert({ quantity });

    return order;
  }

  static async edit({ quantity }) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Edit Order received for ${quantity}`
    );
    
    const editOrder = await Order.edit({ quantity });

    return editOrder;
  }

  static async delete({ quantity }) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `deleted Order received for ${quantity}`
    );
    
    const deleteOrder = await Order.delete({ quantity });

    return deleteOrder;
  }
  
};