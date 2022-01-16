import { v2 as cloudinary } from "cloudinary";
import { promisify } from "util";
import Users from "../../repository/users";
import { CLOUD_FOLDER_AVATARS } from "../../lib/constants";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});
class CloudStorage {
  constructor(file, user) {
    this.userId = user.userId;
    this.filePath = file.path;
    this.idAvatarCloud = user.idAvatarCloud;
    this.folderAvatars = CLOUD_FOLDER_AVATARS;
    this.uploadCloud = promisify(cloudinary.uploader.upload);
  }

  async save() {
    
	const {
      public_id: returnedIdAvatarCloud,
      secure_url: avatarUrl,
    } = await this.uploadCloud(this.filePath, {
      public_id: this.idAvatarCloud,
      folder: this.folderAvatars,
    });
    const newIdAvatarCloud = returnedIdAvatarCloud.replace(
      `${this.folderAvatars}/`,
      ""
    );

    await Users.updateAvatar(this.userId, avatarUrl, newIdAvatarCloud);
    return avatarUrl;
  }
}

export default CloudStorage;
