"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail, LogIn, ShieldCheck, Sparkles, Heart } from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { signIn } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";

const benefits = [
  { icon: ShieldCheck, label: "Access your bookings and listings" },
  { icon: Sparkles, label: "Manage your studio spaces" },
  { icon: Heart, label: "Discover amazing studios" },
];

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

    const searchParams = useSearchParams();
    const callbackURL = searchParams.get("callbackURL") || "/";

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    // Extract form data and convert it to an object
    const formData = new FormData(form);
    const user = Object.fromEntries(formData.entries()) as Record<string, string>;

    // Call the signIn function with email and password
    const { error } = await signIn.email({
      email: user.email,
      password: user.password,
      callbackURL,
    });

    if (error) {
      toast.add({
        title: "SignIn failed",
        description: error instanceof Error ? error.message : "Something went wrong while signIn.",
        type: "error",
      });
    }
  };

  // Handle social sign in
  const handleSocialSignIn = async (provider: "google") => {
    const { error } = await signIn.social({
      provider: provider,
      callbackURL,
    });

    if (error) {
      toast.add({
        title: "SignIn failed",
        description: error instanceof Error ? error.message : "Something went wrong while signIn.",
        type: "error",
      });
    }
  };

  return (
    <main className="bg-bg-page px-3 py-3 sm:px-5 sm:py-5 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-330 overflow-hidden rounded-[22px] bg-white shadow-2xl dark:bg-white lg:grid-cols-[1.08fr_0.92fr]">
        {/* Left side */}
        <section className="relative hidden min-h-170 overflow-hidden lg:block">
          <Image src="/images/Login.png" alt="Creative studio with a camera and lighting equipment" fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover object-center" />

          <div className="absolute inset-0 bg-[#003d29]/75" />
          <div className="relative z-10 flex h-full flex-col justify-center p-10 text-white xl:p-14">
            <div className="max-w-md">
              <h1 className="text-5xl font-extrabold leading-[1.02] xl:text-[60px]">
                Welcome
                <br />
                <span className="text-accent-lime">Back!</span>
              </h1>
              <p className="mt-5 max-w-xs text-xl leading-7 text-white/90">Sign in to continue your creative journey.</p>
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

        {/* Right side */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-10 xl:px-14">
          <div className="w-full max-w-112.5">
            <div className="text-center">
              <div className="inline-flex items-center gap-3">
                <Image src="/images/logo.png" alt="" width={52} height={52} className="size-12 rounded-full" />
                <span className="text-2xl font-extrabold tracking-tight text-text-primary dark:text-[#101820]">
                  Studio<span className="text-primary-green dark:text-[#087A43]">Space</span>
                </span>
              </div>
              <div className="mt-7">
                <h2 className="text-3xl font-extrabold leading-tight text-text-primary dark:text-[#101820] sm:text-[32px]">Login to Your Account</h2>
                <p className="mt-3 text-base text-text-secondary dark:text-[#64748B]">Welcome back! Please sign in to continue.</p>
              </div>
            </div>

            <form onSubmit={handleEmailSignIn} className="mt-8 space-y-4">
              <label className="relative block">
                <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-text-secondary dark:text-[#64748B]" />
                <Input type="email" name="email" placeholder="Email address" autoComplete="email" required className="h-12 rounded-full border-border bg-bg-surface pl-12 text-sm dark:border-[#E2E8E5] dark:bg-white dark:text-[#101820] dark:placeholder:text-[#64748B]" />
              </label>

              <label className="relative block">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-text-secondary dark:text-[#64748B]" />
                <Input type={showPassword ? "text" : "password"} name="password" placeholder="Password" autoComplete="current-password" required className="h-12 rounded-full border-border bg-bg-surface pl-12 pr-12 text-sm dark:border-[#E2E8E5] dark:bg-white dark:text-[#101820] dark:placeholder:text-[#64748B]" />
                <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary dark:text-[#64748B] dark:hover:text-[#101820]" aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </label>

              <div className="flex items-center justify-between gap-4 px-1 text-sm">
                <label className="flex items-center gap-2 text-text-primary dark:text-[#101820]">
                  <Checkbox name="remember" className="dark:border-[#94A3B8] dark:bg-[#E2E8E5]/30" />
                  Remember me
                </label>
                <button type="button" className="font-semibold text-primary-green underline underline-offset-2 dark:text-[#087A43]">
                  Forgot password?
                </button>
              </div>

              <Button type="submit" className="h-12 w-full rounded-full bg-primary-green text-base font-semibold text-white hover:bg-dark-green dark:bg-[#087A43] dark:text-white dark:hover:bg-[#064E32]">
                <LogIn className="size-5" />
                Login
              </Button>
            </form>

            <div className="my-7 flex items-center gap-4 text-sm text-text-secondary dark:text-[#64748B]">
              <span className="h-px flex-1 bg-border dark:bg-[#E2E8E5]" />
              or continue with
              <span className="h-px flex-1 bg-border dark:bg-[#E2E8E5]" />
            </div>

            <Button onClick={() => handleSocialSignIn("google")} type="button" variant="outline" className="h-12 w-full rounded-full bg-white text-base text-[#101820] hover:bg-[#F7F9F7] dark:border-[#E2E8E5] dark:bg-white dark:text-[#101820] dark:hover:bg-[#F7F9F7]">
              <FcGoogle className="size-5" />
              Continue with Google
            </Button>

            <p className="mt-7 text-center text-sm text-text-secondary dark:text-[#64748B]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-semibold text-primary-green underline underline-offset-2 dark:text-[#087A43]">
                Register
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};;

export default LoginPage;
