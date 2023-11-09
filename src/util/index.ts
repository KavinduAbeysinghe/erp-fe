import dayjs from "dayjs";

export interface OptionIn {
  label: string | number;
  value: string | number;
}

export const employees = [
  {
    empId: 1,
    name: "Alex Lee",
    username: "alexLee",
    password: "alexLee@2001",
    designation: "Associate Software Engineer",
    departmentId: 1,
    profileImg: require("../assets/images/person.jpg"),
    empNo: "EMP007777",
    mobile: "+94-76-223-9975",
    telephone: "+11-234-123-134",
    dob: "1990-08-22",
    nic: "123456789V",
    nicIssuedDate: "2010-01-01",
    nationality: "Sri Lankan",
    religion: "Buddhism",
    civilStatus: "Unmarried",
    gender: "Male",
    bloodGroup: "A+",
    email: "alex.l@biznexa.com",
    personalEmail: "alex.l@gmail.com",
    address: "No.213, Eksath Mw, Rajagiriya",
    hiredDate: "1990-12-12",
  },
  {
    empId: 2,
    name: "Emily Johnson",
    username: "emilyJohnson",
    password: "emily@1234",
    designation: "Senior Project Manager",
    departmentId: 2,
    profileImg: require("../assets/images/person2.jpg"),
    empNo: "EMP009999",
    mobile: "+1-123-456-7890",
    telephone: "+1-987-654-3210",
    dob: "1985-05-15",
    nic: "987654321W",
    nicIssuedDate: "2005-03-10",
    nationality: "American",
    religion: "Christianity",
    civilStatus: "Married",
    gender: "Female",
    bloodGroup: "B-",
    email: "emily.j@companyxyz.com",
    personalEmail: "emily.j@gmail.com",
    address: "123 Main St, New York, USA",
    hiredDate: "2001-01-12",
  },
  {
    empId: 3,
    name: "John Smith",
    username: "johnSmith",
    password: "john@7890",
    designation: "Sales Representative",
    departmentId: 3,
    profileImg: require("../assets/images/person3.jpg"),
    empNo: "EMP005555",
    mobile: "+44-777-555-1234",
    telephone: "+44-20-1234-5678",
    dob: "1988-12-10",
    nic: "112233445S",
    nicIssuedDate: "2007-06-30",
    nationality: "British",
    religion: "Atheist",
    civilStatus: "Divorced",
    gender: "Male",
    bloodGroup: "O+",
    email: "john.s@salesco.com",
    personalEmail: "john.s@gmail.com",
    address: "45 High St, London, UK",
    hiredDate: "2006-04-15",
  },
  {
    empId: 4,
    name: "Linda Martinez",
    username: "lindaMartinez",
    password: "linda#5678",
    designation: "Human Resources Manager",
    departmentId: 4,
    profileImg: require("../assets/images/person4.jpg"),
    empNo: "EMP004444",
    mobile: "+1-234-567-8901",
    telephone: "+1-987-654-3210",
    dob: "1987-07-05",
    nic: "987654321A",
    nicIssuedDate: "2006-04-20",
    nationality: "American",
    religion: "Catholicism",
    civilStatus: "Married",
    gender: "Female",
    bloodGroup: "A-",
    email: "linda.m@hrworld.com",
    personalEmail: "linda.m@gmail.com",
    address: "789 Oak St, Los Angeles, USA",
    hiredDate: "2000-10-10",
  },
  {
    empId: 5,
    name: "Michael Chen",
    username: "michaelChen",
    password: "mike123",
    designation: "IT Support Specialist",
    departmentId: 5,
    profileImg: require("../assets/images/person5.jpg"),
    empNo: "EMP003333",
    mobile: "+86-138-9876-5432",
    telephone: "+86-10-5678-1234",
    dob: "1992-03-30",
    nic: "554433221B",
    nicIssuedDate: "2012-02-15",
    nationality: "Chinese",
    religion: "Non-religious",
    civilStatus: "Single",
    gender: "Male",
    bloodGroup: "AB+",
    email: "michael.c@techco.cn",
    personalEmail: "michael.c@gmail.com",
    address: "56 Technology Rd, Beijing, China",
    hiredDate: "2015-05-28",
  },
];

export const months: Array<string> = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const currentUser = {
  empId: 5,
  name: "Alex Lee",
  username: "alexLee",
  password: "alexLee@2001",
  designation: "Associate Software Engineer",
  department: "",
  profileImg: "",
  empNo: "EMP007777",
  mobile: "+94-76-223-9975",
  telephone: "+11-234-123-134",
  dob: "1990-08-22",
  nic: "123456789V",
  nicIssuedDate: "2010-01-01",
  nationality: "Sri Lankan",
  religion: "Buddhism",
  civilStatus: "Unmarried",
  gender: "Male",
  bloodGroup: "A+",
  email: "alex.l@biznexa.com",
  personalEmail: "alex.l@gmail.com",
  address: "No.213, Eksath Mw, Rajagiriya",
};

export const departments = [
  {
    departmentId: 1,
    departmentName: "Development",
    numEmployees: 10,
    departmentHead: "Alex Lee",
  },
  {
    departmentId: 2,
    departmentName: "Project Management",
    numEmployees: 5,
    departmentHead: "Emily Johnson",
  },
  {
    departmentId: 3,
    departmentName: "Sales",
    numEmployees: 7,
    departmentHead: "John Smith",
  },
  {
    departmentId: 4,
    departmentName: "Human Resources",
    numEmployees: 3,
    departmentHead: "Linda Martinez",
  },
  {
    departmentId: 5,
    departmentName: "IT Support",
    numEmployees: 4,
    departmentHead: "Michael Chen",
  },
];

export const genders = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export const nationalities = [
  {
    nationalityId: 1,
    nationalityCode: "LK",
    nationality: "Sri Lankan",
  },
  {
    nationalityId: 2,
    nationalityCode: "US",
    nationality: "American",
  },
  {
    nationalityId: 3,
    nationalityCode: "GB",
    nationality: "British",
  },
  {
    nationalityId: 4,
    nationalityCode: "CN",
    nationality: "Chinese",
  },
  {
    nationalityId: 5,
    nationalityCode: "IN",
    nationality: "Indian",
  },
  {
    nationalityId: 6,
    nationalityCode: "JP",
    nationality: "Japanese",
  },
  {
    nationalityId: 7,
    nationalityCode: "BR",
    nationality: "Brazilian",
  },
  {
    nationalityId: 8,
    nationalityCode: "AU",
    nationality: "Australian",
  },
  {
    nationalityId: 9,
    nationalityCode: "FR",
    nationality: "French",
  },
  {
    nationalityId: 10,
    nationalityCode: "DE",
    nationality: "German",
  },
];

export const hiringSources = [
  {
    value: 1,
    label: "Employee Referral",
  },
  {
    value: 2,
    label: "Job Board",
  },
  {
    value: 3,
    label: "Internship Program",
  },
  {
    value: 4,
    label: "Recruitment Agency",
  },
  {
    value: 5,
    label: "Campus Recruitment",
  },
  {
    value: 6,
    label: "Social Media",
  },
  {
    value: 7,
    label: "Career Fair",
  },
  {
    value: 8,
    label: "Networking Event",
  },
  {
    value: 9,
    label: "Company Website",
  },
  {
    value: 10,
    label: "Direct Application",
  },
];

export const civilStatuses = [
  {
    value: 1,
    label: "Single",
  },
  {
    value: 2,
    label: "Married",
  },
  {
    value: 3,
    label: "Divorced",
  },
  {
    value: 4,
    label: "Widowed",
  },
  {
    value: 5,
    label: "Separated",
  },
  {
    value: 6,
    label: "In a Relationship",
  },
];

export const getFormattedDate = (date: any) => {
  if (!date) {
    return "";
  } else {
    return dayjs(date, "DD/MM/YYYY").format().split("T")[0];
  }
};

export const empLeaves = [
  {
    empId: 1,
    leaves: [
      {
        id: 1,
        dateFrom: "2023-05-05",
        dateTo: "2023-05-06",
        appliedDate: "2023-05-01",
        leaveTypeId: 1,
        status: "approved",
        reason: "For a personal matter",
        coveringEmployeeId: 1,
      },
      {
        id: 2,
        dateFrom: "2023-06-10",
        dateTo: "2023-06-15",
        appliedDate: "2023-06-01",
        leaveTypeId: 2,
        status: "pending",
        reason: "Family vacation",
        coveringEmployeeId: 2,
      },
      {
        id: 3,
        dateFrom: "2023-07-20",
        dateTo: "2023-07-25",
        appliedDate: "2023-07-01",
        leaveTypeId: 3,
        status: "rejected",
        reason: "Business trip",
        coveringEmployeeId: 3,
      },
      {
        id: 4,
        dateFrom: "2023-08-30",
        dateTo: "2023-09-05",
        appliedDate: "2023-08-01",
        leaveTypeId: 4,
        status: "approved",
        reason: "Medical leave",
        coveringEmployeeId: 4,
      },
      {
        id: 5,
        dateFrom: "2023-09-15",
        dateTo: "2023-09-20",
        appliedDate: "2023-09-01",
        leaveTypeId: 1,
        status: "approved",
        reason: "Personal development",
        coveringEmployeeId: 5,
      },
    ],
  },
];

export const leave = [
  { label: "Casual", value: 1 },
  { label: "Family & Medical", value: 2 },
  { label: "Study", value: 3 },
  { label: "Bereavement", value: 4 },
];
