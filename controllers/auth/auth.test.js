import { jest } from "@jest/globals";
import { registration } from "./index";
import { HttpCode } from "../../lib/constants";
import authService from "../../service/auth";

// jest.mock("../../service/auth");

describe("Unit test registration", () => {
  let req, res, next;
  beforeEach(() => {
    req = { body: { email: "test@test.com", password: "12345678" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
    next = jest.fn();
    authService.create = jest.fn(async (data) => data);
  });

  test("SingUp new User", async () => {
    authService.isUserExist = jest.fn(async () => false);
    await registration(req, res, next);
    expect(authService.isUserExist).toHaveBeenCalledWith(req.body.email);
    expect(res.status).toHaveBeenCalledWith(HttpCode.CREATED);
  });
  test("SingUp already exist User", async () => {
    authService.isUserExist = jest.fn(async () => true);
    await registration(req, res, next);
    expect(authService.isUserExist).toHaveBeenCalledWith(req.body.email);
    expect(res.status).toHaveBeenCalledWith(HttpCode.CONFLICT);
  });

  test("SigUp with error databse", async () => {
    const testError = new Error("Database Error");
    authService.isUserExist = jest.fn(async () => {
      throw testError;
    });
    await registration(req, res, next);
    expect(authService.isUserExist).toHaveBeenCalledWith(req.body.email);
    expect(next).toHaveBeenCalledWith(testError);
  });
});
