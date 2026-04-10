export interface LeaveTypeRecord {
  id: string;
  name: string;
  countType: 'Daily basis' | 'Hourly basis';
  paymentType: 'Paid' | 'Unpaid';
  isMaternity: boolean;
  isParental: boolean;
  isEducation: boolean;
}

export interface LeaveGroupRecord {
  id: string;
  name: string;
  leaveTypes: string[];
  totalLeave: number;
  employeeCount: number;
}

export interface HolidayRecord {
  id: string;
  description: string;
  department: string;
  fromDate: string;
  toDate: string;
  oneDayLeave?: boolean;
}

export interface LeavePolicyRecord {
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
