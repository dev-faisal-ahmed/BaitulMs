import { model, Schema } from 'mongoose';
import { TSubject } from './interface';

const SubjectSchema = new Schema<TSubject>({
  name: { type: String, required: true, unique: true },
});

export const Subject = model<TSubject>('subject', SubjectSchema);
