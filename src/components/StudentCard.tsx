import { Student } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil } from "lucide-react";

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/students/${student.id}`);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <div className="h-36 bg-slate-100 flex items-center justify-center">
          {student.imageUrl ? (
            <img
              src={student.imageUrl}
              alt={student.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-slate-300 flex items-center justify-center">
              <span className="text-2xl font-bold text-slate-600">
                {student.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{student.name}</h3>
        <p className="text-sm text-slate-500 mb-2">{student.email}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs bg-slate-100 rounded-full px-2 py-1">
            {student.course}
          </span>
          {student.grade && (
            <span className="text-xs font-semibold bg-blue-100 text-blue-800 rounded-full px-2 py-1">
              Grade: {student.grade}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t p-3 bg-slate-50 flex justify-end gap-2">
        <Button
          size="sm"
          variant="outline"
          className="gap-1"
          onClick={handleViewDetails}
        >
          <Eye className="h-4 w-4" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudentCard;
