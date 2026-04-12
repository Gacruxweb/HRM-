export type EmployeeStatus = 'Active' | 'On Leave' | 'Terminated';

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: EmployeeStatus;
  joinDate: string;
  salary: number;
  avatar?: string;
  currentShift?: string;
}

export interface Department {
  id: string;
  name: string;
  manager: string;
  employeeCount: number;
  budget: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'Annual' | 'Sick' | 'Maternity' | 'Paternity' | 'Unpaid';
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  year: number;
  basicSalary: number;
  bonus: number;
  deductions: number;
  netPay: number;
  status: 'Paid' | 'Pending';
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day';
  location: 'Office' | 'Remote' | 'N/A';
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewerId: string;
  reviewerName: string;
  date: string;
  rating: number; // 1-5
  feedback: string;
  goals: string[];
  // Super Shop specific metrics
  spe?: number; // Sales Per Employee
  atv?: number; // Average Transaction Value
  csat?: number; // Customer Satisfaction Score
  salesTarget?: number;
  actualSales?: number;
  commission?: number;
}

export interface BranchPerformance {
  id: string;
  branchName: string;
  inventoryShrinkage: number;
  turnoverRate: number;
  avgCsat: number;
  behavioralAssessment: string;
  goalSetting: string;
  date: string;
}

export interface Role {
  id: string;
  name: string;
  department: string;
  description: string;
  permissions: string[];
  employeeCount: number;
}

export interface EventRecord {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: 'Meeting' | 'Workshop' | 'Holiday' | 'Deadline' | 'Other';
  description?: string;
}

export interface ShiftRequest {
  id: string;
  type: 'Swap' | 'Change';
  date: string;
  requestFromId: string;
  requestFromName: string;
  shiftId: string;
  shiftName: string;
  requestToId?: string; // For Swap
  requestToName?: string; // For Swap
  newShiftId?: string; // For Change
  newShiftName?: string; // For Change
  remarks?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
  isAdminCreated?: boolean;
}
