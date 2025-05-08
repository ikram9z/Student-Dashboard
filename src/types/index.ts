export interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;
  grade?: string;
  imageUrl?: string;
}

export interface Course {
  id: string;
  name: string;
}

export interface AuthContextType {
  currentUser: any;
  loading: boolean;
}

export interface StudentFormData {
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;
}
