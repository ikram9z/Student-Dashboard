import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllStudents } from "@/services/studentService";
import { Student } from "@/types";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Users,
  BookOpen,
  GraduationCap,
  PlusCircle,
} from "lucide-react";
import { useAuth } from "@/lib/firebase";

const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Calculate statistics
  const totalStudents = students.length;
  const courses = [...new Set(students.map((student) => student.course))];
  const totalCourses = courses.length;

  // Get course distribution
  const courseDistribution = courses.map((course) => ({
    name: course,
    count: students.filter((student) => student.course === course).length,
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-500 mt-1">
              Overview of your student management system
            </p>
          </div>

          {currentUser && (
            <Button asChild className="mt-4 md:mt-0">
              <Link to="/add-student">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Student
              </Link>
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Students</CardTitle>
                  <CardDescription>Currently enrolled students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-blue-500 mr-3" />
                    <span className="text-3xl font-bold">{totalStudents}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Courses Offered</CardTitle>
                  <CardDescription>Available study programs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <BookOpen className="h-8 w-8 text-emerald-500 mr-3" />
                    <span className="text-3xl font-bold">{totalCourses}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Latest Activity</CardTitle>
                  <CardDescription>Recent system activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <GraduationCap className="h-8 w-8 text-purple-500 mr-3" />
                    <span className="text-sm">
                      Student records last updated today
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Course Distribution</CardTitle>
                <CardDescription>Students enrolled per course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseDistribution.map((course) => (
                    <div key={course.name} className="flex flex-col">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">
                          {course.name}
                        </span>
                        <span className="text-sm text-slate-500">
                          {course.count} students (
                          {Math.round((course.count / totalStudents) * 100)}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{
                            width: `${(course.count / totalStudents) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800">
                Quick Actions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/students">
                <Card className="hover:bg-slate-50 cursor-pointer transition-colors">
                  <CardContent className="flex items-center p-6">
                    <Users className="h-6 w-6 text-blue-500 mr-4" />
                    <div>
                      <h3 className="font-medium">View All Students</h3>
                      <p className="text-slate-500 text-sm">
                        Manage and search student records
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {currentUser ? (
                <Link to="/add-student">
                  <Card className="hover:bg-slate-50 cursor-pointer transition-colors">
                    <CardContent className="flex items-center p-6">
                      <PlusCircle className="h-6 w-6 text-green-500 mr-4" />
                      <div>
                        <h3 className="font-medium">Add New Student</h3>
                        <p className="text-slate-500 text-sm">
                          Create a new student record
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ) : (
                <Link to="/login">
                  <Card className="hover:bg-slate-50 cursor-pointer transition-colors">
                    <CardContent className="flex items-center p-6">
                      <Users className="h-6 w-6 text-orange-500 mr-4" />
                      <div>
                        <h3 className="font-medium">Log In</h3>
                        <p className="text-slate-500 text-sm">
                          Sign in to manage students
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
