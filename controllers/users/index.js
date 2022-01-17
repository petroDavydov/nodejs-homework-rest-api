import repositoryContacts from "../../repository/contacts";
import { HttpCode } from "../../lib/constants";
import {
  AvatarStorage,
//   CloudFileStorage,
  LocalFileStorage,
} from "../../service/file-storage";

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

export { aggregation, uploadAvatar };
