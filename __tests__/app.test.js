const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then((res) => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });

  it('ASYNC/AWAIT: creates a new order in our database and sends a text message', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    expect(res.body).toEqual({
      id: '1',
      quantity: 10,
    });
  });

  it('gets all orders', async() => {
    await Promise.all([
      Order.insert({
        quantity: 10
      }),
      Order.insert({
        quantity: 5
      }),
      Order.insert({
        quantity: 2
      }),
    ]);

    const orders = await Order.find();

    expect(orders).toEqual(expect.arrayContaining([
      { id: expect.any(String), quantity: 10 },
      { id: expect.any(String), quantity: 5 },
      { id: expect.any(String), quantity: 2 },
    ]))
  });

  it('get by id', async() => {
    const oneOrder = await Order.insert({
      quantity: 7
    });
    const findOrder = await Order.findById(oneOrder.id)

    expect(findOrder).toEqual({ id: oneOrder.id, quantity: 7 })
  })

  it('update quantity of order using its id', async () => {
    const oldOrder = await Order.insert({
      quantity: 10
    });
    const updatedOrder = await Order.edit(oldOrder.id, {
      quantity: 1
    });
    expect(updatedOrder).toEqual({ id: oldOrder.id, quantity: 1 })
  })

  it('delets an order based off its id', async () => {
    const order = await Order.insert({ quantity: 200 });
    const deletedOrder = await Order.delete(order.id);

    expect(deletedOrder).toEqual({ id: order.id, quantity: 200 })
  })
});