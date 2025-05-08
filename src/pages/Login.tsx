import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, LogIn, AlertCircle } from "lucide-react";
import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";

interface LocationState {
  from?: {
    pathname: string;
  };
}

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const locationState = location.state as LocationState;
  const from = locationState?.from?.pathname || "/";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "demo@example.com",
      password: "password123",
    },
  });

  const handleSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      let result;

      if (isLogin) {
        result = await loginWithEmailAndPassword(data.email, data.password);
      } else {
        result = await registerWithEmailAndPassword(data.email, data.password);
      }

      if (result.error) {
        throw new Error(result.error.message);
      }

      toast({
        title: isLogin ? "Login successful" : "Registration successful",
        description: isLogin
          ? "Welcome back!"
          : "Your account has been created",
        variant: "default",
      });

      // Redirect to the page they were trying to access, or to the dashboard
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Authentication error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Authentication failed. Please try again.",
      );

      toast({
        title: "Authentication error",
        description:
          error instanceof Error
            ? error.message
            : "Authentication failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    form.reset();
  };

  // For demo purposes, show additional Firebase configuration instructions
  const showFirebaseHelp = () => {
    toast({
      title: "Firebase Configuration",
      description:
        "Create a Firebase project and update the configuration in src/lib/firebase.ts with your project details.",
      variant: "default",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-md mx-auto px-4 py-16">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              {isLogin ? "Sign in to your account" : "Create an account"}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? "Enter your email and password to access the dashboard"
                : "Fill in the details below to create your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
                {error}
              </div>
            )}

            <div className="bg-amber-50 p-4 rounded-md mb-6 text-amber-800 text-sm flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium mb-1">
                  Firebase Configuration Required
                </p>
                <p>To use authentication features, you need to:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>
                    Create a Firebase project at{" "}
                    <a
                      href="https://console.firebase.google.com/"
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      firebase.google.com
                    </a>
                  </li>
                  <li>Enable Authentication with Email/Password</li>
                  <li>Copy your project config to src/lib/firebase.ts</li>
                </ol>
                <Button
                  variant="link"
                  className="p-0 h-auto text-amber-800 underline mt-2"
                  onClick={showFirebaseHelp}
                >
                  Learn more
                </Button>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@example.com"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your password"
                          type="password"
                          autoComplete={
                            isLogin ? "current-password" : "new-password"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      {isLogin ? "Sign In" : "Create Account"}
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="w-full" onClick={toggleAuthMode}>
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Use these demo credentials for testing:</p>
          <p className="mt-1 font-mono">Email: demo@example.com</p>
          <p className="font-mono">Password: password123</p>
        </div>
      </main>
    </div>
  );
};

export default Login;
