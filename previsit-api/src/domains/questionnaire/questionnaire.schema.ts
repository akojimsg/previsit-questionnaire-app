import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionnaireDocument = Questionnaire & Document;

@Schema({ timestamps: true })
export class Questionnaire {
  @Prop({ required: true })
  tenantId!: string;

  @Prop({
    type: Map,
    of: String,
    required: true,
  })
  name!: Record<string, string>; // e.g., { en: 'Pre-Visit Survey', es: 'Encuesta Previa a la Visita' }

  @Prop({
    type: Map,
    of: String,
    required: false,
  })
  description?: Record<string, string>; // e.g., { en: 'Answer before your visit.', es: 'Responda antes de su visita.' }

  @Prop({ type: [String], default: [] })
  questionKeys!: string[];

  @Prop({ type: Map, of: String, required: false })
  submitButtonLabel?: string; // e.g., 'Submit', 'Enviar'

  @Prop({ default: true })
  isActive!: boolean;
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
