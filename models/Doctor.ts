import mongoose, { Document, Model } from 'mongoose';

export interface IDoctor extends Document {
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  location: string;
  consultationFee: number;
  availability: string;
  image: string;
  qualifications: string[];
  languages: string[];
  about: string;
  createdAt: Date;
}

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  location: {
    type: String,
    required: true,
  },
  consultationFee: {
    type: Number,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  qualifications: [{
    type: String,
  }],
  languages: [{
    type: String,
  }],
  about: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Doctor: Model<IDoctor> = mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', doctorSchema);

export default Doctor; 