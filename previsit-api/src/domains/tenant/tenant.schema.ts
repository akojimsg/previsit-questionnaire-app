// This file defines the schema for the Tenant entity in a MongoDB database using Mongoose.

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TenantDocument = Tenant & Document;

@Schema({ timestamps: true })
export class Tenant {
  // Unique identifier used to associate resources with this tenant
  @Prop({ required: true, unique: true, index: true })
  tenantId!: string;

  @Prop({ required: true, unique: true })
  name!: string;

  @Prop()
  description?: string;

  // EHR provider name, e.g., "Athena", "Allscripts"
  // This is extendable to support other EHR providers in the future
  @Prop({ required: true })
  ehrProvider!: string;

  // Additional configuration for the EHR provider
  // This can be a JSON object with key-value pairs
  // For example, { "apiKey": "your-api-key", "endpoint": "https://api.example.com" }
  // This is extendable to support other EHR providers in the future
  @Prop({ type: Map, of: String })
  ehrConfig?: Record<string, string>;

  @Prop({ default: true })
  isActive!: boolean;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
