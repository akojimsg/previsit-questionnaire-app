import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EhrFieldMapping,
  EhrFieldMappingDocument,
} from './ehr-field-mapping.schema';
import { EhrResolvedFieldMappingResponseDto } from './dtos/field-mapping-response.dto';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

@Injectable()
export class EhrFieldMappingService {
  constructor(
    @InjectModel(EhrFieldMapping.name)
    private ehrFieldMappingModel: Model<EhrFieldMappingDocument>,
  ) {}

  /**
   * Resolve the mapping for a specific tenant, EHR provider, and question
   */
  async resolveFieldMapping(
    tenantId: string,
    ehrProvider: string | undefined,
    questionKey: string,
  ): Promise<EhrResolvedFieldMappingResponseDto[]> {
    const filter: Record<string, any> = {
      tenantId,
      questionKey,
    };
    if (ehrProvider) {
      filter.ehrProvider = ehrProvider;
    }
    const result = await this.ehrFieldMappingModel.find(filter).exec();
    if (result.length === 0) {
      throw new NotFoundException(
        ehrProvider
          ? `No mapping found for question "${questionKey}" and provider "${ehrProvider}"`
          : `No mappings found for question "${questionKey}"`,
      );
    }
    return result.map(({ ehrProvider, endpoint, ehrField }) => ({
      ehrProvider,
      endpoint,
      ehrField,
    }));
  }

  /**
   * Admin use — Create a new mapping
   */
  async create(
    tenantId: string,
    mapping: Partial<EhrFieldMapping>,
  ): Promise<EhrFieldMapping> {
    if (!tenantId) {
      throw new BadRequestException('Tenant ID is required');
    }
    mapping.tenantId = tenantId;
    return this.ehrFieldMappingModel.create(mapping);
  }

  /**
   * Get all mappings for a tenant
   * @param tenantId tenant ID
   * @description Get all mappings for a tenant
   * @returns an array of ehr field mappings
   * @throws NotFoundException if no mappings are found
   */
  async bulkCreate(
    mappings: Array<{
      tenantId: string;
      questionKey: string;
      ehrProvider: string;
      endpoint: string;
      ehrField: string;
    }>,
  ): Promise<{ success: number; failed: number }> {
    let success = 0;
    let failed = 0;
    const ops = mappings.map((m) => ({
      insertOne: { document: m },
    }));
    const res = await this.ehrFieldMappingModel.bulkWrite(ops, {
      ordered: false, // continue on error
    });
    success = res.insertedCount;
    failed = mappings.length - success;
    return { success, failed };
  }

  /**
   * Get all mappings for a tenant filtered by EHR provider
   * @param tenantId tenant ID
   * @param ehrProvider ehr provider
   * @description Get all mappings for a tenant filtered by EHR provider
   * @returns an array of ehr field mappings
   * @throws NotFoundException if no mappings are found
   */
  async findByEhrTenant(
    tenantId: string,
    ehrProvider?: string,
  ): Promise<EhrFieldMapping[]> {
    const filter: Record<string, any> = { tenantId };
    if (ehrProvider?.trim()) {
      filter.ehrProvider = { $regex: new RegExp(`^${ehrProvider}$`, 'i') };
    }
    const results = await this.ehrFieldMappingModel.find(filter).exec();
    if (!results.length) {
      throw new NotFoundException(
        `No EHR mappings found for provider "${ehrProvider}"`,
      );
    }
    return results;
  }

  /**
   * @param tenantId tenant ID
   * @param updates ehr field mapping updates
   * @throws NotFoundException if the mapping is not found
   * @description Update a mapping by tenant ID, EHR provider, and question key
   * @returns the updated ehr mapping
   */
  async update(
    tenantId: string,
    updates: Partial<EhrFieldMapping>,
  ): Promise<EhrFieldMapping> {
    const { ehrProvider, questionKey } = updates;
    const updated = await this.ehrFieldMappingModel.findOneAndUpdate(
      { tenantId, ehrProvider, questionKey },
      updates,
      { new: true, runValidators: true },
    );

    if (!updated) {
      throw new NotFoundException(
        `Mapping not found for tenant "${tenantId}", provider "${ehrProvider}", question "${questionKey}"`,
      );
    }

    return updated;
  }

  /**
   * Delete a mapping by tenant ID, EHR provider, and question key
   * @param tenantId tenant ID
   * @param ehrProvider ehr provider
   * @param questionKey question key
   * @throws NotFoundException if the mapping is not found
   */
  async deleteByCompositeKey(
    tenantId: string,
    ehrProvider: string,
    questionKey: string,
  ): Promise<void> {
    const result = await this.ehrFieldMappingModel.findOneAndDelete({
      tenantId,
      ehrProvider,
      questionKey,
    });

    if (!result) {
      throw new NotFoundException(
        `Mapping not found for tenant "${tenantId}", provider "${ehrProvider}", question "${questionKey}"`,
      );
    }
  }
}
