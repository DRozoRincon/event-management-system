import path from "path";
import multer, { StorageEngine } from "multer";

export class MulterMiddleware {
  private storage: StorageEngine;

  constructor() {
    this.setStorage();
  }

  private setStorage() {
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "dist/static/");
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    });
  }

  public singleFile(field: string) {
    const upload = multer({ storage: this.storage });

    return upload.single(field);
  }
}
