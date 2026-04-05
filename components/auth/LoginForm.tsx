"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import SignInWithGoogleButton from "@/components/auth/SignInWithGoogleButton";
import { useRouter } from "next/navigation";
import { useAuthLoading } from "@/context/AuthLoadingContext";
import { Eye, EyeOff } from "lucide-react";

const Login_content = {
  title: "Welcome Back",
  description: "Sign in to your account to continue",
  button: "Sign In",
  linkText: "Don't have an account?",
  linkButton: "Sign Up",
  linkHref: "/signup",
};

export function LoginForm() {
  const { loadingType, setLoadingType } = useAuthLoading();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const isFormLoading = loadingType === "form";
  const isDisabled = loadingType !== null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingType("form");
    const toastId = toast.loading("Signing you in...");
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok || result.error) {
        if (result.code === "EMAIL_NOT_CONFIRMED") {
          toast.error(result.error, { id: toastId });
          setTimeout(() => {
            router.push(`/verify-email?email=${encodeURIComponent(email)}`);
          }, 2000);
        } else {
          toast.error(result.error || "Login failed", { id: toastId });
        }
      } else {
        toast.success("Login successful!", { id: toastId });
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.", {
        id: toastId,
      });
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="w-full max-w-md">
      <section className="space-y-1 px-0 mb-6">
        <CardTitle className="text-3xl font-bold text-white">
          {Login_content.title}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {Login_content.description}
        </CardDescription>
      </section>

      <Card className="bg-form border-0 backdrop-blur-lg p-6">

        <div className="">
          <SignInWithGoogleButton />
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 px-0">
            <div className="grid gap-1.5">
              <Label className="text-xs text-gray-400 uppercase tracking-wider">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="name@company.com"
                required
                disabled={isDisabled}
                className="bg-[#262626] border-white/10 text-white placeholder:text-gray-400 focus:bg-[#3f3e3e]"
              />
            </div>

            <div className="grid gap-1.5">
              <div className="flex justify-between items-center">
                <Label className="text-xs text-gray-400 uppercase tracking-wider">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#FF9062] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  disabled={isDisabled}
                  className="bg-[#262626] border-white/10 text-white pr-10 focus:bg-[#3f3e3e]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 px-0 mt-6">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-black font-bold rounded-full h-12"
              disabled={isDisabled}
            >
              {isFormLoading ? "Signing in..." : Login_content.button}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <p className="text-sm text-gray-500 text-center mt-4">
        {Login_content.linkText}{" "}
        <Link
          href={Login_content.linkHref}
          className="text-[#FF9062] font-semibold hover:underline"
        >
          {Login_content.linkButton}
        </Link>
      </p>
    </div>
  );
}
