import { Student } from "@/types";

// Mock student data
const mockStudents: Student[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    course: "Computer Science",
    enrollmentDate: "2023-09-01",
    grade: "A",
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    course: "Data Science",
    enrollmentDate: "2023-09-05",
    grade: "B+",
    imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    course: "Web Development",
    enrollmentDate: "2023-08-15",
    grade: "A-",
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "4",
    name: "Emily Brown",
    email: "emily.brown@example.com",
    course: "Computer Science",
    enrollmentDate: "2023-09-10",
    grade: "B",
    imageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    course: "Cybersecurity",
    enrollmentDate: "2023-08-20",
    grade: "A+",
    imageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

// Available courses
export const courses = [
  { id: "cs", name: "Computer Science" },
  { id: "ds", name: "Data Science" },
  { id: "wd", name: "Web Development" },
  { id: "cy", name: "Cybersecurity" },
];

// Helper function to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Get all students
export const getAllStudents = async (): Promise<Student[]> => {
  console.log("API: Fetching all students...");
  await delay(800); // Simulate network delay
  console.log("API: Students data retrieved successfully");
  return [...mockStudents];
};

// Get student by ID
export const getStudentById = async (id: string): Promise<Student | null> => {
  console.log(`API: Fetching student with ID ${id}...`);
  await delay(600);
  const student = mockStudents.find((s) => s.id === id);
  if (student) {
    console.log(`API: Student ${id} found`);
    return { ...student };
  }
  console.log(`API: Student ${id} not found`);
  return null;
};

// Filter students by course
export const filterStudentsByCourse = async (
  course: string,
): Promise<Student[]> => {
  console.log(`API: Filtering students by course: ${course}...`);
  await delay(500);

  if (!course || course === "all") {
    return getAllStudents();
  }

  const filtered = mockStudents.filter(
    (student) => student.course.toLowerCase() === course.toLowerCase(),
  );

  console.log(`API: Found ${filtered.length} students in course "${course}"`);
  return [...filtered];
};

// Add a new student
export const addStudent = async (
  student: Omit<Student, "id">,
): Promise<Student> => {
  console.log("API: Adding new student...", student);
  await delay(1000);

  const newStudent: Student = {
    ...student,
    id: `${mockStudents.length + 1}`,
    imageUrl: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "men" : "women"}/${mockStudents.length + 1}.jpg`,
  };

  mockStudents.push(newStudent);
  console.log("API: Student added successfully", newStudent);
  return newStudent;
};

// Update an existing student
export const updateStudent = async (
  id: string,
  data: Partial<Student>,
): Promise<Student | null> => {
  console.log(`API: Updating student ${id}...`);
  await delay(800);

  const index = mockStudents.findIndex((s) => s.id === id);
  if (index !== -1) {
    mockStudents[index] = { ...mockStudents[index], ...data };
    console.log(`API: Student ${id} updated successfully`);
    return { ...mockStudents[index] };
  }

  console.log(`API: Student ${id} not found for update`);
  return null;
};

// Delete a student
export const deleteStudent = async (id: string): Promise<boolean> => {
  console.log(`API: Deleting student ${id}...`);
  await delay(700);

  const index = mockStudents.findIndex((s) => s.id === id);
  if (index !== -1) {
    mockStudents.splice(index, 1);
    console.log(`API: Student ${id} deleted successfully`);
    return true;
  }

  console.log(`API: Student ${id} not found for deletion`);
  return false;
};
