export interface AttendancePolicyRecord {
  id: string;
  name: string;
  countType: 'Daily basis' | 'Hourly basis';
  considerableValue: number;
  adjustedValue: number;
  considerDeduction: boolean;
  considerCumulativeDeduction: boolean;
  deductFromSalary: boolean;
  description: string;
}
