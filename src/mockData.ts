import { Employee, Department, LeaveRequest, PayrollRecord, PerformanceReview, AttendanceRecord, Role, BranchPerformance, ShiftRequest } from './types';

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
    avatar: 'https://picsum.photos/seed/sarah/100/100',
    currentShift: 'Morning Shift'
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
    avatar: 'https://picsum.photos/seed/michael/100/100',
    currentShift: 'Evening Shift'
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
    avatar: 'https://picsum.photos/seed/elena/100/100',
    currentShift: 'Morning Shift'
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
    avatar: 'https://picsum.photos/seed/david/100/100',
    currentShift: 'Weekend Morning'
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
  },
  {
    id: '6',
    name: 'James Miller',
    email: 'j.miller@nexushrm.com',
    role: 'Backend Developer',
    department: 'Engineering',
    status: 'Active',
    joinDate: '2023-03-10',
    salary: 88000,
    avatar: 'https://picsum.photos/seed/james/100/100'
  },
  {
    id: '7',
    name: 'Sophia Garcia',
    email: 's.garcia@nexushrm.com',
    role: 'UI Designer',
    department: 'Design',
    status: 'Active',
    joinDate: '2023-05-12',
    salary: 75000,
    avatar: 'https://picsum.photos/seed/sophia/100/100'
  },
  {
    id: '8',
    name: 'Liam Martinez',
    email: 'l.martinez@nexushrm.com',
    role: 'Content Writer',
    department: 'Marketing',
    status: 'Active',
    joinDate: '2023-02-20',
    salary: 58000,
    avatar: 'https://picsum.photos/seed/liam/100/100'
  },
  {
    id: '9',
    name: 'Isabella Brown',
    email: 'i.brown@nexushrm.com',
    role: 'HR Coordinator',
    department: 'Human Resources',
    status: 'Active',
    joinDate: '2023-06-01',
    salary: 55000,
    avatar: 'https://picsum.photos/seed/isabella/100/100'
  },
  {
    id: '10',
    name: 'Noah Davis',
    email: 'n.davis@nexushrm.com',
    role: 'DevOps Engineer',
    department: 'Engineering',
    status: 'Active',
    joinDate: '2022-12-15',
    salary: 92000,
    avatar: 'https://picsum.photos/seed/noah/100/100'
  },
  {
    id: '11',
    name: 'Olivia Taylor',
    email: 'o.taylor@nexushrm.com',
    role: 'Brand Manager',
    department: 'Marketing',
    status: 'Active',
    joinDate: '2022-10-10',
    salary: 78000,
    avatar: 'https://picsum.photos/seed/olivia/100/100'
  },
  {
    id: '12',
    name: 'Ethan Moore',
    email: 'e.moore@nexushrm.com',
    role: 'Frontend Developer',
    department: 'Engineering',
    status: 'Active',
    joinDate: '2023-01-25',
    salary: 82000,
    avatar: 'https://picsum.photos/seed/ethan/100/100'
  },
  {
    id: '13',
    name: 'Ava Anderson',
    email: 'ava.a@nexushrm.com',
    role: 'UX Researcher',
    department: 'Design',
    status: 'Active',
    joinDate: '2023-04-05',
    salary: 72000,
    avatar: 'https://picsum.photos/seed/ava/100/100'
  },
  {
    id: '14',
    name: 'Lucas Thomas',
    email: 'l.thomas@nexushrm.com',
    role: 'SEO Specialist',
    department: 'Marketing',
    status: 'Active',
    joinDate: '2023-07-15',
    salary: 60000,
    avatar: 'https://picsum.photos/seed/lucas/100/100'
  },
  {
    id: '15',
    name: 'Mia Jackson',
    email: 'mia.j@nexushrm.com',
    role: 'Recruiter',
    department: 'Human Resources',
    status: 'Active',
    joinDate: '2023-08-20',
    salary: 65000,
    avatar: 'https://picsum.photos/seed/mia/100/100'
  },
  {
    id: '16',
    name: 'Benjamin White',
    email: 'b.white@nexushrm.com',
    role: 'Mobile Developer',
    department: 'Engineering',
    status: 'Active',
    joinDate: '2022-11-30',
    salary: 87000,
    avatar: 'https://picsum.photos/seed/benjamin/100/100'
  },
  {
    id: '17',
    name: 'Charlotte Harris',
    email: 'c.harris@nexushrm.com',
    role: 'Graphic Designer',
    department: 'Design',
    status: 'Active',
    joinDate: '2023-02-10',
    salary: 68000,
    avatar: 'https://picsum.photos/seed/charlotte/100/100'
  },
  {
    id: '18',
    name: 'William Martin',
    email: 'w.martin@nexushrm.com',
    role: 'Social Media Manager',
    department: 'Marketing',
    status: 'Active',
    joinDate: '2023-05-25',
    salary: 63000,
    avatar: 'https://picsum.photos/seed/william/100/100'
  },
  {
    id: '19',
    name: 'Amelia Thompson',
    email: 'a.thompson@nexushrm.com',
    role: 'Payroll Specialist',
    department: 'Human Resources',
    status: 'Active',
    joinDate: '2023-09-10',
    salary: 58000,
    avatar: 'https://picsum.photos/seed/amelia/100/100'
  },
  {
    id: '20',
    name: 'James Garcia',
    email: 'j.garcia@nexushrm.com',
    role: 'Security Engineer',
    department: 'Engineering',
    status: 'Active',
    joinDate: '2023-01-05',
    salary: 95000,
    avatar: 'https://picsum.photos/seed/jgarcia/100/100'
  },
  {
    id: '21',
    name: 'Harper Martinez',
    email: 'h.martinez@nexushrm.com',
    role: 'Motion Designer',
    department: 'Design',
    status: 'Active',
    joinDate: '2023-04-18',
    salary: 74000,
    avatar: 'https://picsum.photos/seed/harper/100/100'
  },
  {
    id: '22',
    name: 'Logan Robinson',
    email: 'l.robinson@nexushrm.com',
    role: 'Data Analyst',
    department: 'Marketing',
    status: 'Active',
    joinDate: '2023-06-22',
    salary: 70000,
    avatar: 'https://picsum.photos/seed/logan/100/100'
  },
  {
    id: '23',
    name: 'Evelyn Clark',
    email: 'e.clark@nexushrm.com',
    role: 'Training Manager',
    department: 'Human Resources',
    status: 'Active',
    joinDate: '2023-08-05',
    salary: 72000,
    avatar: 'https://picsum.photos/seed/evelyn/100/100'
  },
  {
    id: '24',
    name: 'Alexander Lewis',
    email: 'a.lewis@nexushrm.com',
    role: 'System Architect',
    department: 'Engineering',
    status: 'Active',
    joinDate: '2022-10-15',
    salary: 110000,
    avatar: 'https://picsum.photos/seed/alexander/100/100'
  },
  {
    id: '25',
    name: 'Abigail Walker',
    email: 'a.walker@nexushrm.com',
    role: 'PR Specialist',
    department: 'Marketing',
    status: 'Active',
    joinDate: '2023-03-28',
    salary: 64000,
    avatar: 'https://picsum.photos/seed/abigail/100/100'
  }
];

export const MOCK_SHIFTS = [
  { id: 'SH001', name: 'Morning Shift', startTime: '08:00', endTime: '16:00', employees: 51, status: 'Active', type: 'Regular', notes: 'Standard morning operations. Requires 2 floor supervisors.' },
  { id: 'SH002', name: 'Evening Shift', startTime: '16:00', endTime: '00:00', employees: 37, status: 'Active', type: 'Regular', notes: 'Closing procedures must be followed strictly.' },
  { id: 'SH003', name: 'Night Shift', startTime: '00:00', endTime: '08:00', employees: 22, status: 'Active', type: 'Regular', notes: 'Security protocols active. Limited access to main office.' },
  { id: 'SH004', name: 'Weekend Morning', startTime: '09:00', endTime: '17:00', employees: 15, status: 'Active', type: 'Weekend', notes: 'Weekend skeleton crew. Focus on customer support.' },
  { id: 'SH005', name: 'On-Call Support', startTime: '00:00', endTime: '23:59', employees: 7, status: 'Inactive', type: 'Special', notes: 'Emergency response only. Remote availability required.' },
];

export const MOCK_SHIFT_REQUESTS: ShiftRequest[] = [
  {
    id: '1',
    type: 'Swap',
    date: '2024-04-15',
    requestFromId: '1',
    requestFromName: 'Sarah Johnson',
    shiftId: 'SH001',
    shiftName: 'Morning Shift',
    requestToId: '2',
    requestToName: 'Michael Chen',
    remarks: 'Need to attend a family event',
    status: 'Pending',
    createdAt: '2024-04-10T10:00:00Z',
    isAdminCreated: true
  },
  {
    id: '2',
    type: 'Change',
    date: '2024-04-20',
    requestFromId: '3',
    requestFromName: 'Elena Rodriguez',
    shiftId: 'SH001',
    shiftName: 'Morning Shift',
    newShiftId: 'SH002',
    newShiftName: 'Evening Shift',
    remarks: 'Prefer evening hours for personal reasons',
    status: 'Pending',
    createdAt: '2024-04-11T09:30:00Z',
    isAdminCreated: true
  },
  {
    id: '3',
    type: 'Swap',
    date: '2024-04-18',
    requestFromId: '5',
    requestFromName: 'Aisha Khan',
    shiftId: 'SH003',
    shiftName: 'Night Shift',
    requestToId: '6',
    requestToName: 'James Miller',
    remarks: 'Doctor appointment in the evening',
    status: 'Pending',
    createdAt: '2024-04-12T14:20:00Z'
  },
  {
    id: '4',
    type: 'Change',
    date: '2024-05-01',
    requestFromId: '7',
    requestFromName: 'Sophia Garcia',
    shiftId: 'SH001',
    shiftName: 'Morning Shift',
    newShiftId: 'SH003',
    newShiftName: 'Night Shift',
    remarks: 'Switching to night shift for better focus',
    status: 'Pending',
    createdAt: '2024-04-12T11:00:00Z'
  },
  {
    id: '5',
    type: 'Swap',
    date: '2024-04-08',
    requestFromId: '8',
    requestFromName: 'Liam Martinez',
    shiftId: 'SH002',
    shiftName: 'Evening Shift',
    requestToId: '9',
    requestToName: 'Isabella Brown',
    remarks: 'Need to swap for a concert',
    status: 'Approved',
    createdAt: '2024-04-05T16:45:00Z'
  },
  {
    id: '6',
    type: 'Change',
    date: '2024-04-01',
    requestFromId: '10',
    requestFromName: 'Noah Davis',
    shiftId: 'SH002',
    shiftName: 'Evening Shift',
    newShiftId: 'SH001',
    newShiftName: 'Morning Shift',
    remarks: 'Moving to morning shift permanently',
    status: 'Approved',
    createdAt: '2024-03-25T10:15:00Z'
  },
  {
    id: '7',
    type: 'Swap',
    date: '2024-04-05',
    requestFromId: '11',
    requestFromName: 'Olivia Taylor',
    shiftId: 'SH001',
    shiftName: 'Morning Shift',
    requestToId: '12',
    requestToName: 'Ethan Moore',
    remarks: 'Family emergency',
    status: 'Rejected',
    createdAt: '2024-04-03T08:00:00Z'
  },
  {
    id: '8',
    type: 'Change',
    date: '2024-04-10',
    requestFromId: '13',
    requestFromName: 'Ava Anderson',
    shiftId: 'SH003',
    shiftName: 'Night Shift',
    newShiftId: 'SH002',
    newShiftName: 'Evening Shift',
    remarks: 'Night shift is affecting sleep',
    status: 'Rejected',
    createdAt: '2024-04-05T13:30:00Z'
  }
];

export const MOCK_DEPARTMENTS: Department[] = [
  { id: '1', name: 'Engineering', manager: 'Michael Chen', employeeCount: 18, budget: 1500000 },
  { id: '2', name: 'Design', manager: 'Sarah Johnson', employeeCount: 9, budget: 650000 },
  { id: '3', name: 'Marketing', manager: 'David Wilson', employeeCount: 14, budget: 850000 },
  { id: '4', name: 'Human Resources', manager: 'Elena Rodriguez', employeeCount: 8, budget: 450000 }
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
  },
  {
    id: '3',
    employeeId: '3',
    employeeName: 'Elena Rodriguez',
    month: 'March',
    year: 2024,
    basicSalary: 6500,
    bonus: 0,
    deductions: 1100,
    netPay: 5400,
    status: 'Paid'
  },
  {
    id: '4',
    employeeId: '4',
    employeeName: 'David Wilson',
    month: 'March',
    year: 2024,
    basicSalary: 5166,
    bonus: 250,
    deductions: 900,
    netPay: 4516,
    status: 'Paid'
  },
  {
    id: '5',
    employeeId: '5',
    employeeName: 'Aisha Khan',
    month: 'March',
    year: 2024,
    basicSalary: 6000,
    bonus: 300,
    deductions: 1000,
    netPay: 5300,
    status: 'Pending'
  },
  {
    id: '6',
    employeeId: '6',
    employeeName: 'James Miller',
    month: 'March',
    year: 2024,
    basicSalary: 7333,
    bonus: 0,
    deductions: 1300,
    netPay: 6033,
    status: 'Pending'
  },
  {
    id: '7',
    employeeId: '7',
    employeeName: 'Sophia Garcia',
    month: 'March',
    year: 2024,
    basicSalary: 6250,
    bonus: 400,
    deductions: 1050,
    netPay: 5600,
    status: 'Pending'
  },
  {
    id: '8',
    employeeId: '8',
    employeeName: 'Liam Martinez',
    month: 'March',
    year: 2024,
    basicSalary: 4833,
    bonus: 150,
    deductions: 800,
    netPay: 4183,
    status: 'Paid'
  },
  {
    id: '9',
    employeeId: '9',
    employeeName: 'Isabella Brown',
    month: 'March',
    year: 2024,
    basicSalary: 4583,
    bonus: 0,
    deductions: 750,
    netPay: 3833,
    status: 'Paid'
  },
  {
    id: '10',
    employeeId: '10',
    employeeName: 'Noah Davis',
    month: 'March',
    year: 2024,
    basicSalary: 7666,
    bonus: 600,
    deductions: 1400,
    netPay: 6866,
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
    checkOut: '05:15 PM',
    status: 'Present',
    location: 'Office'
  },
  {
    id: '4',
    employeeId: '4',
    employeeName: 'David Wilson',
    date: '2024-04-08',
    checkIn: null,
    checkOut: null,
    status: 'Absent',
    location: 'N/A'
  },
  {
    id: '5',
    employeeId: '5',
    employeeName: 'Aisha Khan',
    date: '2024-04-08',
    checkIn: '09:00 AM',
    checkOut: '05:00 PM',
    status: 'Present',
    location: 'Office'
  },
  {
    id: '6',
    employeeId: '6',
    employeeName: 'James Miller',
    date: '2024-04-08',
    checkIn: '08:30 AM',
    checkOut: '04:30 PM',
    status: 'Present',
    location: 'Remote'
  },
  {
    id: '7',
    employeeId: '7',
    employeeName: 'Sophia Garcia',
    date: '2024-04-08',
    checkIn: '09:30 AM',
    checkOut: '06:30 PM',
    status: 'Late',
    location: 'Office'
  },
  {
    id: '8',
    employeeId: '8',
    employeeName: 'Liam Martinez',
    date: '2024-04-08',
    checkIn: '08:50 AM',
    checkOut: '05:50 PM',
    status: 'Present',
    location: 'Office'
  },
  {
    id: '9',
    employeeId: '9',
    employeeName: 'Isabella Brown',
    date: '2024-04-08',
    checkIn: '09:05 AM',
    checkOut: '05:05 PM',
    status: 'Present',
    location: 'Remote'
  },
  {
    id: '10',
    employeeId: '10',
    employeeName: 'Noah Davis',
    date: '2024-04-08',
    checkIn: '08:40 AM',
    checkOut: '05:40 PM',
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
