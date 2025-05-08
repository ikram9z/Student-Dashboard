import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Student } from "@/types";
import {
  getAllStudents,
  filterStudentsByCourse,
} from "@/services/studentService";
import StudentCard from "@/components/StudentCard";
import FilterBar from "@/components/FilterBar";
import { Loader2 } from "lucide-react";

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const data = await getAllStudents();
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const applyFilters = async () => {
      setLoading(true);
      try {
        let filtered: Student[];

        // Apply course filter
        if (courseFilter === "all") {
          filtered = [...students];
        } else {
          filtered = await filterStudentsByCourse(courseFilter);
        }

        // Apply search query if it exists
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (student) =>
              student.name.toLowerCase().includes(query) ||
              student.email.toLowerCase().includes(query),
          );
        }

        setFilteredStudents(filtered);
      } catch (error) {
        console.error("Error applying filters:", error);
      } finally {
        setLoading(false);
      }
    };

    applyFilters();
  }, [courseFilter, searchQuery, students]);

  const handleFilterChange = (course: string) => {
    setCourseFilter(course);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Students</h1>
          <p className="text-slate-500 mt-1">
            View and manage all student records
          </p>
        </div>

        <FilterBar
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center border">
            <h3 className="text-lg font-medium mb-2">No students found</h3>
            <p className="text-slate-500">
              {searchQuery
                ? `No results matching "${searchQuery}"`
                : "No students available for this course"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentList;
