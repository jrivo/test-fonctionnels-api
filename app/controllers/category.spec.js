const category = require("./category.controller");

const record = {
  id: 1,
  name: "test",
  createdAt: "2020-01-01",
  updatedAt: "2020-01-01",
};

const records = [record];

const mock = {
  category: {
    findMany: jest.fn().mockResolvedValue(records),
    findUnique: jest.fn().mockResolvedValue(record),
    create: jest.fn().mockResolvedValue(record),
    update: jest.fn().mockResolvedValue(record),
    delete: jest.fn(),
  },
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.send = jest.fn();
  return res;
};

describe("Unit tests", () => {
  const res = mockResponse();
  // console.log(res)
  beforeAll(() => {
    jest.resetModules();
    jest.mock("../prisma-client", () => mock);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //////////// GET ALL ////////////

  it("should get all categories", () => {
    category.getAll({}, res).then(() => {
      expect(mock.findMany).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.status.send).toHaveBeenCalledWith(records);
    });
  });

  it("should return empty categories", () => {
    mock.category.findMany.mockResolvedValue([]);
    category.getAll({}, res).then(() => {
      expect(mock.findMany).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith([]);
    });
  });

  it("get all should return error", () => {
    mock.category.findMany.mockRejectedValue("error");
    category.getAll({}, res).then(() => {
      expect(mock.findMany).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("error");
    });
  });

  //////////// GET BY ID ////////////

  it("should get category by id", () => {
    category.getById({ params: { id: 1 } }, res).then(() => {
      expect(mock.findUnique).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(record);
    });
  });

  it("should return 404", () => {
    mock.category.findUnique.mockResolvedValue(null);
    category
      .getById(
        {
          params: {
            id: 1,
          },
        },
        res
      )
      .then(() => {
        expect(mock.findUnique).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith("Category not found");
      });
  });

  it("get by id should return an error", () => {
    mock.category.findUnique.mockRejectedValue("error");
    category
      .getById(
        {
          params: { id: 1 },
        },
        res
      )
      .then(() => {
        expect(mock.findUnique).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("error");
      });
  });

  //////////// CREATE ////////////

  it("should create a category", () => {
    category.create({ body: { name: "test" } }, res).then(() => {
      expect(mock.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(record);
    });
  });

  it("create should return an error", () => {
    mock.create.mockRejectedValue("error");
    category.create({ body: { name: "test" } }, res).then(() => {
      expect(mock.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("error");
    });
  });

  //////////// UPDATE ////////////

  it("should update a category", () => {
    category
      .update({ body: { name: "test" }, params: { id: 1 } }, res)
      .then(() => {
        expect(mock.update).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(record);
      });
  });

  it("update should return an error", () => {
    mock.update.mockRejectedValue("error");
    category
      .update({ body: { name: "test" }, params: { id: 1 } }, res)
      .then(() => {
        expect(mock.update).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("error");
      });
  });

  //////////// DELETE ////////////

  it("should delete a category", () => {
    category.delete({ params: { id: 1 } }, res).then(() => {
      expect(mock.delete).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalledWith(null);
    });
  })

  it("delete should return an error", () => {
    mock.delete.mockRejectedValue("error");
    category.delete({ params: { id: 1 } }, res).then(() => {
      expect(mock.delete).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("error");
    });
  })
});

describe("Functional tests", () => {});
