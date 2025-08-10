export type ResultInquiryForm = {
  legalName: string;
  birthdate: string;
  phoneNo: string;
  telecom: string;
  loginTypeLevel: string;
  startDate: string;
  endDate: string;
}

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
}

export type CheckupResultPayload = AuthPayload & {
  isContinue: string;
  multiFactorInfo: {
    jobIndex: number;
    threadIndex: number;
    transactionId: string;
    multiFactorTimestamp: number;
  }
}

export type CheckupResultData = {
  patientName: string;
  overviewList: Record<string, any>[];
  referenceList: Record<string, any>[];
  resultList: Record<string, any>[];
};
