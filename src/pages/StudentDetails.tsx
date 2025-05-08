import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudentById } from "@/services/studentService";
import { Student } from "@/types";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Loader2,
  ArrowLeft,
  Calendar,
  BookOpen,
  Mail,
  User,
} from "lucide-react";

const StudentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const studentData = await getStudentById(id);
        setStudent(studentData);
      } catch (error) {
        console.error("Error fetching student details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Button variant="ghost" onClick={handleBack} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Card className="max-w-3xl mx-auto">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h2 className="text-2xl font-bold mb-2">Student Not Found</h2>
              <p className="text-slate-500 mb-6">
                The student you're looking for doesn't exist or has been
                removed.
              </p>
              <Button onClick={() => navigate("/students")}>
                View All Students
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={handleBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="bg-slate-800 text-white h-32 flex items-center px-8">
              <div className="flex items-center">
                {student.imageUrl ? (
                  <img
                    src={student.imageUrl}
                    alt={student.name}
                    className="w-20 h-20 rounded-full mr-6 border-4 border-white object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full mr-6 bg-slate-100 flex items-center justify-center text-3xl font-bold text-slate-800">
                    {student.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold">{student.name}</h1>
                  <p className="text-slate-300">{student.email}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Student Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <User className="h-5 w-5 mr-2 text-slate-400 mt-1" />
                      <div>
                        <p className="text-sm text-slate-500">Full Name</p>
                        <p className="font-medium">{student.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="h-5 w-5 mr-2 text-slate-400 mt-1" />
                      <div>
                        <p className="text-sm text-slate-500">Email</p>
                        <p className="font-medium">{student.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <BookOpen className="h-5 w-5 mr-2 text-slate-400 mt-1" />
                      <div>
                        <p className="text-sm text-slate-500">Course</p>
                        <p className="font-medium">{student.course}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-2 text-slate-400 mt-1" />
                      <div>
                        <p className="text-sm text-slate-500">
                          Enrollment Date
                        </p>
                        <p className="font-medium">{student.enrollmentDate}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {student.grade && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Academic Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>{student.course}</TableCell>
                          <TableCell>
                            <span className="font-medium">{student.grade}</span>
                          </TableCell>
                          <TableCell>
                            {student.grade.startsWith("A") ? (
                              <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium">
                                Excellent
                              </span>
                            ) : student.grade.startsWith("B") ? (
                              <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded-full text-xs font-medium">
                                Good
                              </span>
                            ) : (
                              <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded-full text-xs font-medium">
                                Satisfactory
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDetails;
