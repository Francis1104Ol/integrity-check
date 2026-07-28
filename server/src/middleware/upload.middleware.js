import multer from "multer";
import path from "path";
import ApiError from "../utils/ApiError.js";
import FILE_TYPES from "../constants/fileTypes.js";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve("uploads"));
  },

  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}`;

    const filename = `${uniqueSuffix}${path.extname(
      file.originalname
    )}`;

    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (FILE_TYPES.includes(file.mimetype)) {
    return cb(null, true);
  }

  return cb(
    new ApiError(
      400,
      "Only CSV and Excel (.xlsx, .xls) files are allowed."
    ),
    false
  );
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

export default upload;