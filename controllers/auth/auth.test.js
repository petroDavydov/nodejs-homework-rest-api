import { jest } from "@jest/globals";
import { registration} from "./index";
import { HttpCode } from "../../lib/constants";

import authService from "../../service/auth";

// jest.mock("../../service/auth");

describe("Unit test registration", () => {
  let req, res, next;
  beforeEach(() => {
    req = { body: { email: "test@test.com", password: "12345678" } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn((data) => data) };
    authService.create = jest.fn(async (data) => data);
  });

  test("SingUp new User", async () => {
    authService.isUserExist = jest.fn(async () => false);
    await registration(req, res, next);
  });
  test.todo("SingUp already exist User");
  test.todo("SigUp with error databse");
});
