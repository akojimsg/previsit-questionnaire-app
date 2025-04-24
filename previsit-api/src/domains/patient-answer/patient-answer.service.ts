import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PatientAnswer, PatientAnswerDocument } from './patient-answer.schema';
import { Model } from 'mongoose';
import { SubmitResponseDto } from './dtos/create-answer.dto';

@Injectable()
export class PatientAnswerService {
  constructor(
    @InjectModel(PatientAnswer.name)
    private readonly model: Model<PatientAnswerDocument>,
  ) {}

  async create(dto: SubmitResponseDto): Promise<PatientAnswer> {
    const existing = await this.model.findOne({
      tenantId: dto.tenantId,
      patientId: dto.patientId,
      questionnaireName: dto.questionnaireName,
    });

    if (existing) {
      throw new ConflictException(
        `Response already exists for patient ${dto.patientId} on questionnaire "${dto.questionnaireName}"`,
      );
    }

    return this.model.create(dto);
  }

  async findAll(tenantId: string) {
    return this.model.find({ tenantId }).exec();
  }

  // Patient data types can be pulled from standardized data models
  // like FHIR or HL7, or they can be custom data models
  // depending on the specific requirements of the application.
  async findByPatient(tenantId: string, patientId: string) {
    return this.model.find({ tenantId, patientId }).exec();
  }
}
