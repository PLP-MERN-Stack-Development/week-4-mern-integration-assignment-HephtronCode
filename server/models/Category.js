import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter a category name"],
			trim: true,
			unique: true,
		},
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			trim: true,
		},
	},
	{ timestamps: true }
);

CategorySchema.pre("save", function (next) {
	if (!this.isModified("name")) {
		return next();
	}
	this.slug = this.name
		.toLowerCase()
		.replace(/ & /g, "-and-")
		.replace(/[^\w-]+/g, "")
		.replace(/--+/g, "-");
	next();
});

const Category =
	mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
