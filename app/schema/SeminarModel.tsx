import mongoose, { Document, Model, Schema } from "mongoose";

// Define TypeScript interface for Type Safety
interface ISeminar extends Document {
  topic: string;
  category: string;
  student1: string;
  student2?: string;
}

// Define the Schema
const SeminarSchema: Schema = new Schema(
  {
    topic: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    student1: { type: String, required: true, trim: true },
    student2: { type: String, trim: true, default: null },
  },
  { timestamps: true }
);

// Ensure the model is not redefined
const SeminarModel: Model<ISeminar> =
  mongoose.models.Seminar || mongoose.model<ISeminar>("Seminar", SeminarSchema);

export default SeminarModel;
