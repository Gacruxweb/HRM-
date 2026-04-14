export interface SalaryComponentRecord {
  id: string;
  name: string;
  type: 'Earning' | 'Deduction';
  calculationType: 'Flat' | 'Percentage';
  value: number;
  description: string;
}

export interface PayrollCycleRecord {
  id: string;
  name: string;
  frequency: 'Monthly' | 'Bi-weekly' | 'Weekly';
  payDay: number;
  isDefault: boolean;
}

export interface TaxRuleRecord {
  id: string;
  name: string;
  minIncome: number;
  maxIncome: number | null;
  taxRate: number;
  description: string;
}

export interface PayrollPolicyRecord {
  id: string;
  name: string;
  category: 'Deduction' | 'Overtime' | 'Allowance' | 'Other';
  countType: 'Daily basis' | 'Hourly basis' | 'Flat amount';
  considerableValue: number;
  adjustedValue: number;
  description: string;
}
