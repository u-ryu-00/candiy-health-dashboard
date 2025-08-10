export type ResultInquiryForm = {
  legalName: string;
  birthdate: string;
  phoneNo: string;
  telecom: string;
  loginTypeLevel: string;
  startDate: string;
  endDate: string;
};

export type AuthPayload = {
  id: string;
  legalName: string;
  birthdate: string;
  phoneNo: string;
  telecom: string;
  loginTypeLevel: string;
  startDate: string;
  endDate: string;
  inquiryType: string;
};

export type CheckupResultPayload = AuthPayload & {
  isContinue: string;
  multiFactorInfo: {
    jobIndex: number;
    threadIndex: number;
    transactionId: string;
    multiFactorTimestamp: number;
  };
};

export type OverviewList = Record<string, any>[];

export type ReferenceList = Record<string, any>[];

export type ResultList = Record<string, any>[];

export type CheckupResultData = {
  patientName: string;
  overviewList: OverviewList;
  referenceList: ReferenceList;
  resultList: ResultList;
};

export const EVALUATION_STATUS = {
  normal: '정상',
  warning: '주의',
  danger: '의심',
  other: '기타',
};
