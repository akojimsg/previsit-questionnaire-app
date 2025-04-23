export const questionSeedData = [
  {
    tenantId: 'clinic-123',
    questionKey: 'name',
    text: {
      en: 'What is your full name?',
      es: '¿Cuál es su nombre completo?',
    },
    type: 'text',
    category: {
      en: 'Demographics',
      es: 'Demografía',
    },
    isRequired: true,
  },
  {
    tenantId: 'clinic-123',
    questionKey: 'gender',
    text: {
      en: 'What is your gender?',
      es: '¿Cuál es su género?',
    },
    type: 'radio',
    category: {
      en: 'Demographics',
      es: 'Demografía',
    },
    isRequired: true,
    options: [
      {
        value: 'male',
        label: { en: 'Male', es: 'Masculino' },
      },
      {
        value: 'female',
        label: { en: 'Female', es: 'Femenino' },
      },
      {
        value: 'other',
        label: { en: 'Other', es: 'Otro' },
      },
    ],
  },
  {
    tenantId: 'clinic-123',
    questionKey: 'dob',
    text: {
      en: 'What is your date of birth?',
      es: '¿Cuál es su fecha de nacimiento?',
    },
    type: 'date',
    category: {
      en: 'Demographics',
      es: 'Demografía',
    },
    isRequired: true,
  },
  {
    tenantId: 'clinic-123',
    questionKey: 'address',
    text: {
      en: 'What is your current address?',
      es: '¿Cuál es su dirección actual?',
    },
    type: 'text',
    category: {
      en: 'Demographics',
      es: 'Demografía',
    },
    isRequired: true,
  },
  {
    tenantId: 'clinic-123',
    questionKey: 'phone',
    text: {
      en: 'What is your phone number?',
      es: '¿Cuál es su número de teléfono?',
    },
    type: 'text',
    category: {
      en: 'Demographics',
      es: 'Demografía',
    },
    isRequired: true,
  },
  {
    tenantId: 'clinic-123',
    questionKey: 'email',
    text: {
      en: 'What is your email address?',
      es: '¿Cuál es su correo electrónico?',
    },
    type: 'text',
    category: {
      en: 'Demographics',
      es: 'Demografía',
    },
    isRequired: true,
  },
  {
    tenantId: 'clinic-123',
    questionKey: 'emergencyContact',
    text: {
      en: 'Who is your emergency contact?',
      es: '¿Quién es su contacto de emergencia?',
    },
    type: 'text',
    category: {
      en: 'Demographics',
      es: 'Demografía',
    },
    isRequired: false,
  },
  {
    tenantId: 'clinic-123',
    questionKey: 'insuranceProvider',
    text: {
      en: 'Who is your insurance provider?',
      es: '¿Cuál es su proveedor de seguro médico?',
    },
    type: 'text',
    category: {
      en: 'Insurance',
      es: 'Seguro Médico',
    },
    isRequired: false,
  },
  {
    tenantId: 'clinic-123',
    questionKey: 'insurancePolicyNumber',
    text: {
      en: 'What is your insurance policy number?',
      es: '¿Cuál es su número de póliza de seguro?',
    },
    type: 'text',
    category: {
      en: 'Insurance',
      es: 'Seguro Médico',
    },
    isRequired: false,
  },
  {
    tenantId: 'clinic-123',
    questionKey: 'primaryCarePhysician',
    text: {
      en: 'Who is your primary care physician?',
      es: '¿Quién es su médico de atención primaria?',
    },
    type: 'text',
    category: {
      en: 'Demographics',
      es: 'Demografía',
    },
    isRequired: false,
  },
  {
    tenantId: 'clinic-123',
    questionKey: 'allergies',
    text: {
      en: 'Do you have any allergies?',
      es: '¿Tiene alguna alergia?',
    },
    type: 'text',
    category: {
      en: 'Medical History',
      es: 'Historial Médico',
    },
    isRequired: false,
  },
  {
    tenantId: 'clinic-123',
    questionKey: 'currentMedications',
    text: {
      en: 'Are you currently taking any medications?',
      es: '¿Está tomando algún medicamento actualmente?',
    },
    type: 'text',
    category: {
      en: 'Medical History',
      es: 'Historial Médico',
    },
    isRequired: false,
  },
  {
    tenantId: 'clinic-123',
    questionKey: 'medicalHistory',
    text: {
      en: 'Do you have any previously diagnosed medical issues?',
      es: '¿Tiene antecedentes de enfermedades diagnosticadas?',
    },
    type: 'text',
    category: {
      en: 'Medical History',
      es: 'Historial Médico',
    },
    isRequired: false,
  },
  {
    tenantId: 'clinic-123',
    questionKey: 'socialHistory',
    text: {
      en: 'Tell us about your lifestyle and habits (e.g., tobacco, alcohol, travel).',
      es: 'Cuéntenos sobre su estilo de vida y hábitos (por ejemplo, tabaco, alcohol, viajes).',
    },
    type: 'text',
    category: {
      en: 'Social History',
      es: 'Historial Social',
    },
    isRequired: false,
  },
  {
    tenantId: 'clinic-123',
    questionKey: 'familyHistory',
    text: {
      en: 'Does anyone in your family have a history of chronic illnesses?',
      es: '¿Algún miembro de su familia tiene antecedentes de enfermedades crónicas?',
    },
    type: 'text',
    category: {
      en: 'Family History',
      es: 'Historial Familiar',
    },
    isRequired: false,
  },
];
