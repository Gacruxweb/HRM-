import { Employee, Department, LeaveRequest, PayrollRecord, PerformanceReview, AttendanceRecord, Role, BranchPerformance } from './types';

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@nexushrm.com',
    role: 'Senior Product Designer',
    department: 'Design',
    status: 'Active',
    joinDate: '2022-03-15',
    salary: 85000,
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'm.chen@nexushrm.com',
    role: 'Full Stack Developer',
    department: 'Engineering',
    status: 'Active',
    joinDate: '2021-11-10',
    salary: 95000,
    avatar: 'https://picsum.photos/seed/michael/100/100'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    email: 'elena.r@nexushrm.com',
    role: 'HR Manager',
    department: 'Human Resources',
    status: 'Active',
    joinDate: '2020-05-20',
    salary: 78000,
    avatar: 'https://picsum.photos/seed/elena/100/100'
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'd.wilson@nexushrm.com',
    role: 'Marketing Specialist',
    department: 'Marketing',
    status: 'On Leave',
    joinDate: '2023-01-15',
    salary: 62000,
    avatar: 'https://picsum.photos/seed/david/100/100'
  },
  {
    id: '5',
    name: 'Aisha Khan',
    email: 'aisha.k@nexushrm.com',
    role: 'QA Engineer',
    department: 'Engineering',
    status: 'Active',
    joinDate: '2022-08-01',
    salary: 72000,
    avatar: 'https://picsum.photos/seed/aisha/100/100'
  }
];

export const MOCK_DEPARTMENTS: Department[] = [
  { id: '1', name: 'Engineering', manager: 'Michael Chen', employeeCount: 12, budget: 1200000 },
  { id: '2', name: 'Design', manager: 'Sarah Johnson', employeeCount: 5, budget: 450000 },
  { id: '3', name: 'Marketing', manager: 'David Wilson', employeeCount: 8, budget: 600000 },
  { id: '4', name: 'Human Resources', manager: 'Elena Rodriguez', employeeCount: 3, budget: 250000 }
];

export const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: '1',
    employeeId: '4',
    employeeName: 'David Wilson',
    type: 'Annual',
    startDate: '2024-04-10',
    endDate: '2024-04-15',
    status: 'Approved',
    reason: 'Family vacation'
  },
  {
    id: '2',
    employeeId: '2',
    employeeName: 'Michael Chen',
    type: 'Sick',
    startDate: '2024-04-05',
    endDate: '2024-04-06',
    status: 'Approved',
    reason: 'Flu'
  },
  {
    id: '3',
    employeeId: '1',
    employeeName: 'Sarah Johnson',
    type: 'Annual',
    startDate: '2024-05-20',
    endDate: '2024-05-25',
    status: 'Pending',
    reason: 'Personal trip'
  }
];

export const MOCK_PAYROLL: PayrollRecord[] = [
  {
    id: '1',
    employeeId: '1',
    employeeName: 'Sarah Johnson',
    month: 'March',
    year: 2024,
    basicSalary: 7083,
    bonus: 500,
    deductions: 1200,
    netPay: 6383,
    status: 'Paid'
  },
  {
    id: '2',
    employeeId: '2',
    employeeName: 'Michael Chen',
    month: 'March',
    year: 2024,
    basicSalary: 7916,
    bonus: 1000,
    deductions: 1500,
    netPay: 7416,
    status: 'Paid'
  }
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: '1',
    employeeId: '1',
    employeeName: 'Sarah Johnson',
    date: '2024-04-08',
    checkIn: '08:55 AM',
    checkOut: '05:30 PM',
    status: 'Present',
    location: 'Office'
  },
  {
    id: '2',
    employeeId: '2',
    employeeName: 'Michael Chen',
    date: '2024-04-08',
    checkIn: '09:15 AM',
    checkOut: '06:00 PM',
    status: 'Late',
    location: 'Remote'
  },
  {
    id: '3',
    employeeId: '3',
    employeeName: 'Elena Rodriguez',
    date: '2024-04-08',
    checkIn: '08:45 AM',
    checkOut: null,
    status: 'Present',
    location: 'Office'
  },
  {
    id: '4',
    employeeId: '5',
    employeeName: 'Aisha Khan',
    date: '2024-04-08',
    checkIn: '09:00 AM',
    checkOut: '05:00 PM',
    status: 'Present',
    location: 'Office'
  }
];

export const MOCK_REVIEWS: PerformanceReview[] = [
  {
    id: '1',
    employeeId: '2',
    employeeName: 'Michael Chen',
    reviewerId: '3',
    reviewerName: 'Elena Rodriguez',
    date: '2024-01-15',
    rating: 4.8,
    feedback: 'Michael has shown exceptional leadership in the recent project migration. His technical skills are top-notch.',
    goals: ['Lead the next major release', 'Mentor 2 junior developers'],
    spe: 12500,
    atv: 45.5,
    csat: 4.9,
    salesTarget: 10000,
    actualSales: 12500,
    commission: 625
  },
  {
    id: '2',
    employeeId: '4',
    employeeName: 'David Wilson',
    reviewerId: '3',
    reviewerName: 'Elena Rodriguez',
    date: '2024-03-20',
    rating: 4.2,
    feedback: 'David is performing well in marketing campaigns, consistently hitting sales targets.',
    goals: ['Increase campaign reach by 20%', 'Optimize ad spend'],
    spe: 8500,
    atv: 38.2,
    csat: 4.5,
    salesTarget: 8000,
    actualSales: 8500,
    commission: 425
  }
];

export const MOCK_BRANCH_PERFORMANCE: BranchPerformance[] = [
  {
    id: '1',
    branchName: 'Downtown Supercenter',
    inventoryShrinkage: 1.2,
    turnoverRate: 8.5,
    avgCsat: 4.7,
    behavioralAssessment: 'High team morale, excellent customer service focus.',
    goalSetting: 'Reduce shrinkage to <1.0%, increase ATV by 5%.',
    date: '2024-03-31'
  },
  {
    id: '2',
    branchName: 'Westside Mall Outlet',
    inventoryShrinkage: 2.1,
    turnoverRate: 12.4,
    avgCsat: 4.2,
    behavioralAssessment: 'Needs improvement in inventory management protocols.',
    goalSetting: 'Implement stricter stock checks, staff training on loss prevention.',
    date: '2024-03-31'
  }
];

export const MOCK_ROLES: Role[] = [
  {
    id: '1',
    name: 'Senior Product Designer',
    department: 'Design',
    description: 'Responsible for leading the design team and creating user-centered designs.',
    permissions: ['Design Assets', 'User Research', 'Team Management'],
    employeeCount: 1
  },
  {
    id: '2',
    name: 'Full Stack Developer',
    department: 'Engineering',
    description: 'Develops and maintains both front-end and back-end components of the application.',
    permissions: ['Code Access', 'Database Management', 'Deployment'],
    employeeCount: 1
  },
  {
    id: '3',
    name: 'HR Manager',
    department: 'Human Resources',
    description: 'Manages employee relations, recruitment, and organizational policies.',
    permissions: ['Employee Records', 'Payroll Access', 'Recruitment'],
    employeeCount: 1
  },
  {
    id: '4',
    name: 'Marketing Specialist',
    department: 'Marketing',
    description: 'Executes marketing campaigns and analyzes market trends.',
    permissions: ['Social Media', 'Analytics', 'Campaign Management'],
    employeeCount: 1
  },
  {
    id: '5',
    name: 'QA Engineer',
    department: 'Engineering',
    description: 'Ensures the quality of the software through automated and manual testing.',
    permissions: ['Testing Tools', 'Bug Tracking', 'Release Validation'],
    employeeCount: 1
  }
];
