# ENV

```tsx
NODE_ENV = 'development';
PORT = '5000';
MONGO_URI = '';
JWT_SECRET = 'you-are-not-allowed';
BCRYPT_SALT = '10';
```

---

# Authorization Token

```tsx
headers.authorization : `Bearer ${token}`
```

---

# **Response**

### Success.

```tsx
type TSuccessResponse = {
  ok: true;
  data: any;
  message: string;
};
```

### Error

```tsx
type TErrorResponse = {
  ok: false;
  error: any;
  message: string;
};
```

---

# Models

## Global

```tsx
export type TStatus = 'ACTIVE' | 'INACTIVE';

export type TSection = 'BOY' | 'GIRL';

export type TAddress = {
  villageOrStreetAddress: string;
  postOffice: string;
  thana: string;
  district: string;
};

export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';
```

## User

```tsx
export type TUser = {
  _id: Schema.Types.ObjectId;
  name: string;
  role: TRole;
  userId: string;
  password: string;
  shouldPasswordChange: boolean;
};

export type TRole = 'STUDENT' | 'TEACHER';
```

## Admin

```tsx
export type TAdmin = {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  role: 'ADMIN';
};
```

## Student

```tsx
export type TStudent = {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  studentId: string;
  birthCertification: string;
  name: TStudentName;
  section: TSection;
  type: TStudentType;
  image: string;
  class: TStudentClass;
  dateOfBirth: Date;
  bloodGroup: TBloodGroup;
  parents: TParents;
  guardian: TGuardian;
  address: TAddress;
  status: TStatus;
};

export type TStudentName = {
  bengaliName: string;
  englishName: string;
};

export type TStudentClass = {
  arabic: string;
  general: string;
};

export type TStudentType = 'REGULAR' | 'IRREGULAR';

export type TParents = {
  father: TPerson;
  mother: TPerson;
};

export type TPerson = {
  name: string;
  phone: string;
  nid: string;
};

export type TGuardian = {
  name: string;
  relation: string;
  address: string;
  nid: string;
  number: string;
};

export type TAddress = {
  villageOrStreetAddress: string;
  postOffice: string;
  thana: string;
  district: string;
};
```

---

## Teacher

```tsx
export type TTeacherAddress = {
  present: TAddress;
  permanent: TAddress;
};

export type TTeacher = {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  teacherId: string;
  name: string;
  nid: string;
  status: TStatus;
  number: string;
  section: TSection;
  salary: number;
  dateOfBirth: Date;
  dateOfJoining: Date;
  nationality: string;
  image: string;
  address: TTeacherAddress;
};
```

---

## Expense Category

```tsx
export type TExpenseCategory = {
  _id: Schema.Types.ObjectId;
  name: string;
  isDeleted: boolean;
};
```

---

## Transaction

```tsx
export type TTransaction = {
  _id: Schema.Types.ObjectId;
  type: TTransactionType;
  payment?: TPayment;
  salary?: TSalary;
  expenseCategoryId?: Schema.Types.ObjectId;
  forDate: Date;
  amount: number;
};

export type TPayment = {
  studentId: Schema.Types.ObjectId;
  type: TPaymentType;
};

export type TSalary = {
  teacherId: Schema.Types.ObjectId;
  type: TSalary;
};

export type TTransactionType = 'PAYMENT' | 'SALARY' | 'EXPENSE';
export type TPaymentType = 'MONTHLY_FEE' | 'ADMISSION_FEE' | 'OTHERS';
export type TSalaryType = 'SALARY' | 'OTHERS';
```

---

## Attendance

```tsx
export type TAttendance = {
  _id: Schema.Types.ObjectId;
  studentId: Schema.Types.ObjectId;
  date: Date;
};
```

---

## DateTracker

```tsx
export type TDateStatus = 'HOLIDAY' | 'ACTIVE_DAY';

export type TDateTracker = {
  _id: Schema.Types.ObjectId;
  date: Date;
  status: TDateStatus;
};
```

---

## Exam

```tsx
export type TExam = {
  _id: Schema.Types.ObjectId;
  name: string;
  fullMarks: number;
  year: string;
  status: TExamStatus;
};

export type TExamStatus = 'UPCOMING' | 'ONGOING' | 'FINISHED';
```

---

# APIS

---

# Auth

## Login

**url** : http://localhost:5000/api/v1/auth/login

method : **POST**

### Request

```tsx
type TPayload = {
  userId: string;
  password: string;
};
```

### Response

```tsx
{
    "ok": true,
    "message": "Login Was Successful",
    "data": {
        "token": ""
    }
}
```

## Admin Login

**url** : http://localhost:5000/api/v1/auth/login/admin

method : **POST**

### Request

```tsx
type TPayload = {
  email: string;
};
```

### Response

```tsx
{
    "ok": true,
    "message": "Login Was Successful",
    "data": {
        "token": ""
    }
}
```

# Student

## Create Student

**url** : http://localhost:5000/api/v1/student

method : **POST**

authorizationToken : admin

### Request

```tsx
type TPayload = {
  birthCertification: string;
  name: TStudentName;
  section: TSection;
  type: TStudentType;
  image: string;
  class: TStudentClass;
  dateOfBirth: Date;
  bloodGroup: TBloodGroup;
  parents: TParents;
  guardian: TGuardian;
  address: TAddress;
  status: TStatus;
};
```

### Response

```tsx
{
    "ok": true,
    "message": "Student Created Successfully",
    "data": {
        "studentId": "B-24-001",
        "userId": "667afc35c35ee238bf4c33e8",
        "birthCertification": "1234567891",
        "name": {
            "bengaliName": "জন ডো",
            "englishName": "John Doe"
        },
        "section": "BOY",
        "type": "REGULAR",
        "image": "http://example.com/image.jpg",
        "class": {
            "arabic": "5",
            "general": "5"
        },
        "dateOfBirth": "2010-05-15T00:00:00.000Z",
        "bloodGroup": "A+",
        "parents": {
            "father": {
                "name": "Father Doe",
                "nid": "9876543210",
                "phone": "0123456789"
            },
            "mother": {
                "name": "Mother Doe",
                "nid": "0123456789",
                "phone": "0987654321"
            }
        },
        "guardian": {
            "name": "Guardian Doe",
            "nid": "1122334455",
            "number": "01987654321",
            "address": "123 Guardian St, Guardian City",
            "relation": "Uncle"
        },
        "address": {
            "villageOrStreetAddress": "123 Main St",
            "postOffice": "Main PO",
            "thana": "Main Thana",
            "district": "Main District"
        },
        "status": "ACTIVE",
        "_id": "667afc36c35ee238bf4c33ea",
        "createdAt": "2024-06-25T17:19:50.038Z",
        "updatedAt": "2024-06-25T17:19:50.038Z",
        "__v": 0
    }
}
```

---

# Teacher

## Add Teacher

**url** : http://localhost:5000/api/v1/teacher

method : **POST**

authorizationToken : admin

### Request

```tsx
type TPayload = {
  name: string;
  nid: string;
  number: string;
  section: TSection;
  salary: number;
  dateOfBirth: Date;
  dateOfJoining: Date;
  nationality: string;
  image: string;
  address: TTeacherAddress;
};
```

### Response

```tsx
{
    "ok": true,
    "message": "Teacher created successfully",
    "data": {
        "teacherId": "T-01",
        "userId": "667b24cb7734a6e4eee5f9f4",
        "name": "Jane Doe",
        "nid": "9876543210",
        "status": "ACTIVE",
        "number": "0123456789",
        "section": "BOY",
        "salary": 1000,
        "dateOfBirth": "1980-05-15T00:00:00.000Z",
        "dateOfJoining": "2020-01-01T00:00:00.000Z",
        "nationality": "Bangladeshi",
        "image": "http://example.com/image.jpg",
        "address": {
            "present": {
                "villageOrStreetAddress": "123 Present St",
                "postOffice": "Present PO",
                "thana": "Present Thana",
                "district": "Present District"
            },
            "permanent": {
                "villageOrStreetAddress": "456 Permanent St",
                "postOffice": "Permanent PO",
                "thana": "Permanent Thana",
                "district": "Permanent District"
            }
        },
        "_id": "667b24cb7734a6e4eee5f9f6",
        "createdAt": "2024-06-25T20:12:59.468Z",
        "updatedAt": "2024-06-25T20:12:59.468Z",
        "__v": 0
    }
}
```

---

# Expense Category

## Add Expense

**url** : http://localhost:5000/api/v1/expense-category

method : **POST**

authorizationToken : admin

### Request

```tsx
type TPayload = {
  name: string;
};
```

### Response

```tsx
{
    "ok": true,
    "message": "Expense Category Added Successfully",
    "data": {
        "name": "Current Bill",
        "isDeleted": false,
        "_id": "667bcfd5c799e12c89e8615d",
        "createdAt": "2024-06-26T08:22:45.148Z",
        "updatedAt": "2024-06-26T08:22:45.148Z",
        "__v": 0
    }
}
```

---

# Transaction

## Add Transaction

**url** : http://localhost:5000/api/v1/transaction

method : **POST**

authorizationToken : admin

### Request

```tsx
type TPayload = {
  type: TTransactionType;
  payment?: TPayment;
  salary?: TSalary;
  expenseCategoryId?: Schema.Types.ObjectId;
  forDate: Date;
  amount: number;
};
```

### Response

```tsx
// **Payment**

{
    "ok": true,
    "message": "Transaction added successfully",
    "data": {
        "type": "PAYMENT",
        "payment": {
            "studentId": "667afc36c35ee238bf4c33ea",
            "type": "MONTHLY_FEE"
        },
        "amount": 1000,
        "forDate": "2023-06-15T00:00:00.000Z",
        "_id": "667bccdc871b574446bd6d38",
        "createdAt": "2024-06-26T08:10:04.218Z",
        "updatedAt": "2024-06-26T08:10:04.218Z",
        "__v": 0
    }
}

// **Salary**

{
    "ok": true,
    "message": "Transaction added successfully",
    "data": {
        "type": "SALARY",
        "salary": {
            "teacherId": "667b24cb7734a6e4eee5f9f6",
            "type": "SALARY"
        },
        "amount": 50000,
        "forDate": "2023-06-15T00:00:00.000Z",
        "_id": "667bcd5e871b574446bd6d3c",
        "createdAt": "2024-06-26T08:12:14.527Z",
        "updatedAt": "2024-06-26T08:12:14.527Z",
        "__v": 0
    }
}

// **Expense**

{
    "ok": true,
    "message": "Transaction added successfully",
    "data": {
        "type": "EXPENSE",
        "expenseCategoryId": "667bcfd5c799e12c89e8615d",
        "amount": 2000,
        "forDate": "2023-06-15T00:00:00.000Z",
        "_id": "667bd026c799e12c89e8615f",
        "createdAt": "2024-06-26T08:24:06.359Z",
        "updatedAt": "2024-06-26T08:24:06.359Z",
        "__v": 0
    }
}
```

---

# Attendance

## Add Attendances

**url** : http://localhost:5000/api/v1/transaction

method : **POST**

authorizationToken : admin

### Request

```tsx
{
    "studentIds":["667afc36c35ee238bf4c33ea", "667c1f0a1d3bdecac6418290"]
}
```

### Response

```tsx
{
    "ok": true,
    "message": "Attendances added successfully",
    "data": [
        {
            "studentId": "667afc36c35ee238bf4c33ea",
            "_id": "667c1fa763a9af5208ea10a5",
            "__v": 0,
            "createdAt": "2024-06-26T14:03:19.643Z",
            "updatedAt": "2024-06-26T14:03:19.643Z"
        },
        {
            "studentId": "667c1f0a1d3bdecac6418290",
            "_id": "667c1fa763a9af5208ea10a6",
            "__v": 0,
            "createdAt": "2024-06-26T14:03:19.644Z",
            "updatedAt": "2024-06-26T14:03:19.644Z"
        }
    ]
}
```

---

# Exam

## Add Exam

**url** : http://localhost:5000/api/v1/exam

method : **POST**

authorizationToken : admin

### Request

```tsx
export type TExam = {
  name: string;
  fullMarks: number;
  year: string;
};
```

### Response

```tsx
{
    "ok": true,
    "message": "Exam Added Successfully",
    "data": {
        "name": "1st Tutorial 2024",
        "fullMarks": 30,
        "year": "2024",
        "status": "UPCOMING",
        "_id": "667e7854e876d368c74c6287",
        "__v": 0
    }
}
```
