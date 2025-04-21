// models/mealSchema.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IMeal extends Document {
  name: string;
  description?: string;
  category: string;
  isVegan?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  imageUrl?: string;
  dateAvailable?: Date;
  diningLocation?: string;
  dateAdded?: Date; // defaults to current date
  createdBy?: mongoose.Types.ObjectId; // references User
  nutrients: {
    name: string;
    unit: string;
    amount: number;
  }[];
  tags?: string[];
}

const MealSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    category: { type: String, required: true }, // e.g. Breakfast, Lunch
    isVegan: { type: Boolean, default: false },
    isVegetarian: { type: Boolean, default: false },
    isGlutenFree: { type: Boolean, default: false },
    imageUrl: String,
    dateAvailable: Date,
    dateAdded: { type: Date, default: Date.now },
    diningLocation: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, // null if official meal
    nutrients: [
      {
        name: { type: String, required: true },
        unit: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Meal || mongoose.model<IMeal>('Meal', MealSchema);
