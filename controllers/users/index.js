import repositoryContacts from "../../repository/contacts";
import repositoryUsers from "../../repository/users";
import { HttpCode } from "../../lib/constants";
import {
  AvatarStorage,
  //   CloudFileStorage,
  LocalFileStorage,
} from "../../service/file-storage";

import {
  EmailService,
  SenderNodemailer,
  SenderSendgrid,
} from "../../service/email";

const aggregation = async (req, res, next) => {
  const { id } = req.params;
  const data = await repositoryContacts.getStatisticsContacts(id);
  if (data) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data });
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
};

const uploadAvatar = async (req, res, next) => {
  const uploadService = new AvatarStorage(LocalFileStorage, req.file, req.user);
  const avatarUrl = await uploadService.updateAvatar();

  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    message: "Success!",
    data: { avatarUrl },
  });
};

const verifyUser = async (req, res, next) => {
  const verifyToken = req.params.token;
  const userFromToken = repositoryUsers.findByVerifyToken(verifyToken);
  if (userFromToken) {
    await repositoryUsers.updateVerify(userFromToken.id, true);
    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { message: "Success" },
    });
  }

  res.status(HttpCode.BAD_REQUEST).json({
    status: "success",
    code: HttpCode.BAD_REQUEST,
    data: { message: "Invalid Token" },
  });
};

const repeatEmailForVerifyUser = async (req, res, next) => {
  const { email } = req.body;
  const { user } = await repositoryUsers.findByEmail(email);
  if (user) {
    const { email, name, verifyTokenEmail } = user;
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new SenderNodemailer()
    );

    const isSend = await emailService.sendVerifyEmail(
      email,
      name,
      verifyTokenEmail
    );

    if (isSend) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: { message: "Success" },
      });
    }

    res.status(HttpCode.UNPROCESSABLE_ENTITY).json({
      status: "error",
      code: HttpCode.UNPROCESSABLE_ENTITY,
      data: { message: "UNPROCESSABLE ENTITY" },
    });
  }
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    data: { message: "User with email not found" },
  });
};

export { aggregation, uploadAvatar, verifyUser, repeatEmailForVerifyUser };
