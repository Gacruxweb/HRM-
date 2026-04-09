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
}
