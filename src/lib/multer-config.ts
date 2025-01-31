// multer-config.ts
import multer from "multer";

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req: any, file: any, cb: any) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG and WEBP are allowed."));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});
