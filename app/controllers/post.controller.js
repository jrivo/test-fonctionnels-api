const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAll = (req, res) => {
  prisma.post
    .findMany()
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.getById = (req, res) => {
  prisma.post
    .findUnique({
      where: { id: parseInt(req.params.id) },
    })
    .then((post) => {
      res.status(200).send(post);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.create = (req, res) => {
  prisma.post
    .create({
      data: {
        title: req.body.title,
        content: req.body.content,
        category: {
          connect: {
            id: parseInt(req.body.categoryId),
          },
        },
        author: { connect: { id: parseInt(req.userId) } },
      },
    })
    .then((post) => {
      res.status(201).send(post);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.update = async (req, res) => {
  prisma.post
    .update({
      where: { id: parseInt(req.params.id) },
      data: {
        title: req.body.title,
        content: req.body.content,
        category: {
          connect: {
            id: parseInt(req.body.categoryId),
          },
        },
      },
    })
    .then((post) => {
      res.status(200).send(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

exports.delete = async (req, res) => {
  prisma.post
    .delete({
      where: { id: parseInt(req.params.id) },
    })
    .then((post) => {
      res.status(200).send(post);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
