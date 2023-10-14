import { Schema, model } from 'mongoose';
export interface wordType {
  word: string;
  source_language: string; //Can be enum
  destination_language: string; //Can be enum
  translation: string;
}

const TranslationSchema = new Schema<wordType>({
  word: {
    type: String,
  },
  source_language: {
    type: String,
  },
  destination_language: {
    type: String,
  },
  translation: {
    type: String,
  },
});

const Translation = model<wordType>('word', TranslationSchema);
export default Translation;
