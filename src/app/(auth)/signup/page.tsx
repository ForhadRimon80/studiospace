"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Image as ImageIcon, LockKeyhole, Mail, UserRound, UserRoundPlus, Zap, Star, Heart } from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { signIn, signUp } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const benefits = [
  { icon: Zap, label: "Access premium studios and spaces" },
  { icon: Star, label: "List your studio and reach more creators" },
  { icon: Heart, label: "Be part of a creative community" },
];

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    // Extract form data and convert it to an object
    const formData = new FormData(form);
    const user = Object.fromEntries(formData.entries()) as Record<string, string>;

    // Validate password
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinimumLength = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !hasMinimumLength) {
      setPasswordError("Password must be at least 6 characters and include an uppercase and lowercase letter.");
      return;
    }

    setPasswordError("");

    if (user.image) {
      try {
        const imageUrl = new URL(user.image);

        if (!["http:", "https:"].includes(imageUrl.protocol)) {
          throw new Error("Invalid image URL");
        }
      } catch {
        toast.add({
          title: "Sign up failed",
          description: "Please provide a valid public image URL.",
          type: "error",
        });

        return;
      }
    }

    const { data, error } = await signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image || undefined,
    });

    if (data) {
      redirect("/login");
    }

    if (error) {
      toast.add({
        title: "Sign up failed",
        description: error instanceof Error ? error.message : "Something went wrong while creating your account.",
        type: "error",
      });
    }
  };

  const handleSocialSignUp = async () => {
    const { error } = await signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.add({
        title: "Sign up failed",
        description: error instanceof Error ? error.message : "Something went wrong while creating your account.",
        type: "error",
      });
    }
  };

  return (
    <main className="bg-bg-page px-3 py-3 sm:px-5 sm:py-5 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-330 overflow-hidden rounded-[22px] bg-white shadow-2xl dark:bg-white lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative hidden min-h-170 overflow-hidden lg:order-2 lg:block">
          <Image src="/images/signup.png" alt="Creative studio with a camera and lighting equipment" fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-[#003d29]/75" />
          <div className="relative z-10 flex h-full flex-col justify-center p-10 text-white xl:p-14">
            <div className="max-w-md mx-9">
              <h1 className="text-5xl font-extrabold leading-[1.02] xl:text-[60px]">
                Join
                <br />
                <span className="text-accent-lime">StudioSpace!</span>
              </h1>
              <p className="mt-5 max-w-sm text-xl leading-7 text-white/90">Create your account and start sharing or booking creative spaces.</p>
              <div className="mt-8 space-y-5">
                {benefits.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-4 text-sm text-white/90">
                    <span className="flex size-8 items-center justify-center rounded-full bg-accent-lime text-dark-green dark:bg-[#B8F36B] dark:text-[#064E32]">
                      <Icon className="size-4" />
                    </span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative flex items-center justify-center overflow-hidden px-6 py-10 sm:px-12 lg:order-1 lg:px-10 xl:px-14">
          <Card className="relative z-10 w-full max-w-112.5 border-0 bg-white text-[#101820] shadow-none ring-0 dark:bg-white dark:text-[#101820]">
            <CardHeader className="px-0 text-center">
              <div className="inline-flex items-center gap-3">
                <Image src="/images/logo.png" alt="" width={52} height={52} className="size-12 rounded-full" />
                <span className="text-2xl font-extrabold tracking-tight text-[#101820]">
                  Studio<span className="text-[#087A43]">Space</span>
                </span>
              </div>
              <CardTitle className="mt-2 text-3xl font-extrabold leading-tight text-[#101820] sm:text-[32px]">Create Account</CardTitle>
              <CardDescription className="text-base text-[#64748B]">Join our creative community today!</CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              <form onSubmit={handleEmailSignUp} className="space-y-3">
                <label className="relative block">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#64748B]" />
                  <Input name="name" placeholder="Full Name" autoComplete="name" required className="h-11 rounded-full border-[#E2E8E5] bg-white pl-12 text-sm text-[#101820] placeholder:text-[#64748B] dark:border-[#E2E8E5] dark:bg-white dark:text-[#101820] dark:placeholder:text-[#64748B]" />
                </label>

                <label className="relative block">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#64748B]" />
                  <Input type="email" name="email" placeholder="Email address" autoComplete="email" required className="h-11 rounded-full border-[#E2E8E5] bg-white pl-12 text-sm text-[#101820] placeholder:text-[#64748B] dark:border-[#E2E8E5] dark:bg-white dark:text-[#101820] dark:placeholder:text-[#64748B]" />
                </label>

                <label className="relative block">
                  <ImageIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#64748B]" />
                  <Input type="url" name="image" placeholder="Photo URL" autoComplete="url" className="h-11 rounded-full border-[#E2E8E5] bg-white pl-12 text-sm text-[#101820] placeholder:text-[#64748B] dark:border-[#E2E8E5] dark:bg-white dark:text-[#101820] dark:placeholder:text-[#64748B]" />
                </label>

                <label className="relative block">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#64748B]" />

                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setPasswordError("");
                    }}
                    minLength={6}
                    required
                    aria-invalid={Boolean(passwordError)}
                    className="h-11 rounded-full border-[#E2E8E5] bg-white pl-12 pr-12 text-sm text-[#101820] placeholder:text-[#64748B] dark:border-[#E2E8E5] dark:bg-white dark:text-[#101820] dark:placeholder:text-[#64748B]"
                  />

                  <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#101820]" aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </label>

                <div className="flex flex-wrap gap-x-2 gap-y-0.5 px-3 text-xs">
                  <span className={password.length >= 6 ? "text-[#16A34A]" : "text-[#64748B]"}>✓ At least 6 characters</span>
                  <span className={/[A-Z]/.test(password) ? "text-[#16A34A]" : "text-[#64748B]"}>✓ One uppercase letter</span>
                  <span className={/[a-z]/.test(password) ? "text-[#16A34A]" : "text-[#64748B]"}>✓ One lowercase letter</span>
                </div>

                {passwordError && (
                  <p className="px-3 text-xs font-medium text-[#DC2626]" role="alert">
                    {passwordError}
                  </p>
                )}
                <Button type="submit" className="h-11 w-full rounded-full bg-[#087A43] text-base font-semibold text-white hover:bg-[#064E32]">
                  <UserRoundPlus className="size-5" />
                  Register
                </Button>
              </form>

              <div className="my-5 flex items-center gap-4 text-sm text-[#64748B]">
                <span className="h-px flex-1 bg-[#E2E8E5]" />
                or continue with
                <span className="h-px flex-1 bg-[#E2E8E5]" />
              </div>
              <Button type="button" variant="outline" onClick={handleSocialSignUp} className="h-11 w-full rounded-full border-[#E2E8E5] bg-white text-base text-[#101820] hover:bg-[#F7F9F7] dark:border-[#E2E8E5] dark:bg-white dark:text-[#101820] dark:hover:bg-[#F7F9F7]">
                <FcGoogle className="size-5" />
                Continue with Google
              </Button>
              <p className="mt-6 text-center text-sm text-[#64748B]">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-[#087A43] underline underline-offset-2">
                  Login
                </Link>
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default SignUpPage;
