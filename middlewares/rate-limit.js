import rateLimit from "express-rate-limit";
import { HttpCode } from "../lib/constants";

const limiter = (duration, limit) => {
  return rateLimit({
    windowMs: duration, // 15 minutes
    max: limit, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res, next) => {
      return res.status(HttpCode.TOO_MANY_REQUEST).json({
        status: "error",
        code: HttpCode.TOO_MANY_REQUEST,
        message: "To many request,please try again later(Status 429)",
      });
    },
  });
};

export default limiter;
