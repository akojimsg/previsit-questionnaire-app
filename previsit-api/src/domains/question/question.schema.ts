import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true })
  tenantId!: string;

  @Prop({ required: true, unique: true })
  questionKey!: string;

  // Localized question text
  // e.g., { en: "What is your name?", es: "¿Cuál es tu nombre?" }
  @Prop({ type: Map, of: String, required: true })
  text!: Record<string, string>;

  @Prop({ type: Map, of: String })
  description?: Record<string, string>; // Optional, localized

  @Prop({ enum: ['text', 'radio', 'checkbox', 'date'], default: 'text' })
  type!: string;

  // Options with localized labels
  // e.g., { en: "Yes", es: "Sí" }
  @Prop({
    type: [
      {
        value: { type: String, required: true },
        label: { type: Map, of: String, required: true },
      },
    ],
  })
  options?: { value: string; label: Record<string, string> }[];

  // Optional, localized
  @Prop({ type: Map, of: String })
  category?: Record<string, string>;

  @Prop({ default: true })
  isRequired!: boolean;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
