import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-extrabold text-slate-800">404</h1>
        <h2 className="text-2xl font-bold text-slate-700 mt-4 mb-6">
          Page Not Found
        </h2>
        <p className="mb-8 text-slate-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate("/")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
