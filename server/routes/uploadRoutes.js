import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// --- Multer Configuration ---
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "uploads/"); // The folder where files will be saved
	},
	filename(req, file, cb) {
		// Create a unique filename to avoid naming conflicts
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

function checkFileType(file, cb) {
	const filetypes = /jpg|jpeg|png/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb("Error: Images Only!");
	}
}

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
});

// --- The Route Definition ---
// This route expects a single file in a form field named 'image'
router.post("/", upload.single("image"), (req, res) => {
	// If upload is successful, req.file will contain file details
	res.send({
		message: "Image Uploaded Successfully",
		image: `/${req.file.path.replace(/\\/g, "/")}`, // Standardize path for web
	});
});

export default router;
