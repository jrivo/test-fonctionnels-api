const controller = require("../controllers/category.controller");

describe("alltests", function () {
  // mock response
  const res = {
      status: 200,
      send: jest.fn(),
    },
    req = {};

  beforeAll(() => {
    // resetModules
    jest.clearAllMocks();
    jest.resetModules();
    jest.mock("../controllers/category.controller", () => mock);
  });

  it("get's all categories", function () {
    controller.getAll({}, {});

    // console.log(res);
  });
});
