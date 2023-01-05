import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.Product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Sorry !, Server error',
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await prisma.Product.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    const product = await prisma.Product.create({
      data: {
        name: name,
        price: price,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'failed created data',
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  try {
    const product = await prisma.Product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        price,
      },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'failed updated data',
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.Product.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'failed deleted data',
    });
  }
};
