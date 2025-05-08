import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import StudentForm, { StudentFormValues } from "@/components/StudentForm";
import { addStudent } from "@/services/studentService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AddStudent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: StudentFormValues) => {
    try {
      await addStudent(data);
      toast({
        title: "Student added",
        description: "The student has been added successfully",
        variant: "default",
      });
      navigate("/students");
    } catch (error) {
      console.error("Error adding student:", error);
      setError("Failed to add student. Please try again.");
      toast({
        title: "Error",
        description: "Failed to add student. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Add New Student</CardTitle>
            <CardDescription>
              Create a new student record in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
                {error}
              </div>
            )}
            <StudentForm onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AddStudent;
