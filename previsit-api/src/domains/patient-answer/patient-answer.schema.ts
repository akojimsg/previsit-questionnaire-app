import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatientAnswerDocument = PatientAnswer & Document;

@Schema({ timestamps: true })
export class PatientAnswer {
  @Prop({ required: true }) tenantId!: string;

  @Prop({ required: true }) questionnaireName!: string;

  @Prop({ required: true }) patientId!: string;

  @Prop({ type: Map, of: String, required: true })
  answers!: Record<string, string>;

  @Prop({ default: Date.now })
  submittedAt!: Date;
}

export const PatientAnswerSchema = SchemaFactory.createForClass(PatientAnswer);
