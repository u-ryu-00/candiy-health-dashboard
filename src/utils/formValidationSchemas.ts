import { z } from 'zod';

import dayjs from 'dayjs';

export enum ValidationError {
  LegalNameRequired = '이름을 입력해주세요',
  LegalNameMinLength = '이름은 2자 이상이어야 합니다',
  LegalNameMaxLength = '이름은 10자 이하여야 합니다',

  BirthdateRequired = '생년월일을 입력해주세요',
  BirthdateFormat = '생년월일은 8자리 숫자로 입력해주세요',
  BirthdateInvalid = '올바른 날짜를 입력해주세요',

  PhoneNoRequired = '전화번호를 입력해주세요',
  PhoneNoFormat = '전화번호는 숫자만 입력해주세요',

  TelecomRequired = '통신사를 선택해주세요',

  LoginTypeLevelRequired = '간편인증 방식을 선택해주세요',

  StartDateRequired = '조회 시작 연도를 입력해주세요',
  StartDateFormat = '연도는 4자리 숫자로 입력해주세요',
  StartDateInvalid = '올바른 연도를 입력해주세요',

  EndDateRequired = '조회 종료 연도를 입력해주세요',
  EndDateFormat = '연도는 4자리 숫자로 입력해주세요',
  EndDateInvalid = '올바른 연도를 입력해주세요',

  DateRangeInvalid = '조회 종료 연도는 조회 시작 연도보다 크거나 같아야 합니다',
}

export const HealthCheckupSchema = z.object({
  legalName: z.string().trim()
    .nonempty(ValidationError.LegalNameRequired)
    .min(2, ValidationError.LegalNameMinLength)
    .max(10, ValidationError.LegalNameMaxLength),

  birthdate: z.string().trim()
    .nonempty(ValidationError.BirthdateRequired)
    .regex(/^\d{8}$/, ValidationError.BirthdateFormat)
    .refine((value) => {
      const date = dayjs(value, 'YYYYMMDD', true);
      return date.isValid() && date.format('YYYYMMDD') === value;
    }, ValidationError.BirthdateInvalid),

  phoneNo: z.string().trim()
    .nonempty(ValidationError.PhoneNoRequired)
    .regex(/^\d+$/, ValidationError.PhoneNoFormat),

  telecom: z.string().trim()
    .nonempty(ValidationError.TelecomRequired),

  loginTypeLevel: z.string().trim()
    .nonempty(ValidationError.LoginTypeLevelRequired),

  startDate: z.string().trim()
    .nonempty(ValidationError.StartDateRequired)
    .regex(/^\d{4}$/, ValidationError.StartDateFormat)
    .refine((value) => {
      const year = parseInt(value, 10);
      return year > 0 && year <= dayjs().year();
    }, ValidationError.StartDateInvalid),

  endDate: z.string().trim()
    .nonempty(ValidationError.EndDateRequired)
    .regex(/^\d{4}$/, ValidationError.EndDateFormat)
    .refine((value) => {
      const year = parseInt(value, 10);
      return year > 0 && year <= dayjs().year();
    }, ValidationError.EndDateInvalid),
}).refine((data) => {
  const startYear = dayjs(data.startDate, 'YYYY').year();
  const endYear = dayjs(data.endDate, 'YYYY').year();
  return startYear <= endYear;
}, {
  message: ValidationError.DateRangeInvalid,
  path: ['endDate'],
});

export type HealthCheckupSchema = z.infer<typeof HealthCheckupSchema>;
