const { Router } = require('express');
const { Client } = require('pg');
const Order = require('../models/Order');
const OrderService = require('../services/OrderService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    // OrderService
    //   .create(req.body)
    //   .then(order => res.send(order))
    //   .catch(next);
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const getAllOrders = await Order.find();
      res.send(getAllOrders);
    } catch(e){
      next(e);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const getOrder = await Order.findById(req.params.id);
      res.send(getOrder);
    } catch(e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const editOrder = await OrderService.edit(req.params.id, req.body)
      res.send(editOrder);
    } catch(e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
    const deleteOrder = await OrderService.delete(req.params.id, req.body)
    res.send(deleteOrder);
  } catch(e) {
    next(e);
  }});
  