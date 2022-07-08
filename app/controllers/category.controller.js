// const { PrismaClient } = require("@prisma/client");
const prisma = require("../prisma-client");

exports.getAll = (req, res) => {
  return prisma.category
    .findMany()
    .then((categories) => {
      res.status(200).send(categories);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.getById = (req, res) => {
  return prisma.category
    .findUnique({
      where: { id: parseInt(req.params.id) },
    })
    .then((category) => {
      if (!category) {
        res.status(404).send("Category not found");
      }
      res.status(200).send(category);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.create = (req, res) => {
  return prisma.category
    .create({
      data: {
        name: req.body.name,
      },
    })
    .then((category) => {
      res.status(201).send(category);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.update = async (req, res) => {
  return prisma.category
    .update({
      where: { id: parseInt(req.params.id) },
      data: {
        name: req.body.name,
      },
    })
    .then((category) => {
      res.status(200).send(category);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.delete = async (req, res) => {
  return prisma.category
    .delete({
      where: { id: parseInt(req.params.id) },
    })
    .then(() => {
      res.status(204);
    })
    .catch((err) => {
      res.status(204).send(err);
    });
};

exports.prisma = prisma;
