const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAll = (req, res) => {
  prisma.category
    .findMany()
    .then((categories) => {
      res.status(200).send(categories);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.getById = (req, res) => {
  prisma.category
    .findUnique({
      where: { id: parseInt(req.params.id) },
      include: { activities: true },
    })
    .then((category) => {
      res.status(200).send(category);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.create = (req, res) => {
  prisma.category
    .create({
      data: {
        name: req.body.name,
      },
    })
    .then((category) => {
      res.status(200).send(category);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.update = async (req, res) => {
  prisma.category
    .update({
      where: { id: req.params.id },
      data: {
        name: req.body.name,
      },
    })
    .then((place) => {
      res.status(200).send(place);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.delete = async (req, res) => {
  prisma.place
    .delete({
      where: { id: req.params.id },
    })
    .then((place) => {
      res.status(200).send(place);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
