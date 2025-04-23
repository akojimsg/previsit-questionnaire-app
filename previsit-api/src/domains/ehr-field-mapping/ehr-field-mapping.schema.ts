import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EhrFieldMappingDocument = EhrFieldMapping & Document;

@Schema({ timestamps: true })
export class EhrFieldMapping {
  @Prop({ required: true })
  tenantId!: string;

  // e.g. "athena", "epic"
  // Enable to filter by EHR provider
  @Prop({ required: true, index: true })
  ehrProvider!: string;

  @Prop({ required: true })
  questionKey!: string;

  // e.g. "/family-history", "/symptoms"
  @Prop({ required: true })
  endpoint!: string;

  @Prop({ required: true })
  ehrField!: string;
}

export const EhrFieldMappingSchema =
  SchemaFactory.createForClass(EhrFieldMapping);

// Composite index for fast lookups
EhrFieldMappingSchema.index(
  { tenantId: 1, ehrProvider: 1, questionKey: 1 },
  { unique: true },
);
