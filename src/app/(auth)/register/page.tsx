// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { useSignUp } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Eye, EyeOff, Mail, Lock, User, CheckCircle2, AlertCircle } from "lucide-react";
// import { registerSchema, RegisterInput } from "@/lib/validations";
// import Button from "@/components/ui/Button";
// import Input from "@/components/ui/Input";

// export default function RegisterPage() {
//   const { signUp, setActive, isLoaded } = useSignUp();
//   const router = useRouter();
//   const [showPassword, setShowPassword]   = useState(false);
//   const [serverError, setServerError]     = useState("");
//   const [isLoading, setIsLoading]         = useState(false);
//   const [verifying, setVerifying]         = useState(false);
//   const [code, setCode]                   = useState("");
//   const [codeError, setCodeError]         = useState("");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

//   const onSubmit = async (data: RegisterInput) => {
//     if (!isLoaded || !signUp) {
//       setServerError("Auth is still loading. Please wait and try again.");
//       return;
//     }

//     setIsLoading(true);
//     setServerError("");

//     try {
//       await signUp.create({
//         firstName:    data.name.split(" ")[0],
//         lastName:     data.name.split(" ").slice(1).join(" ") || "",
//         emailAddress: data.email,
//         password:     data.password,
//       });

//       await signUp.prepareEmailAddressVerification({
//         strategy: "email_code",
//       });

//       setVerifying(true);
//     } catch (err: unknown) {
//       const error = err as { errors?: { message: string; longMessage?: string }[] };
//       setServerError(
//         error.errors?.[0]?.longMessage ||
//         error.errors?.[0]?.message ||
//         "Registration failed. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerify = async () => {
//     if (!isLoaded || !signUp) return;
//     setIsLoading(true);
//     setCodeError("");

//     try {
//       const result = await signUp.attemptEmailAddressVerification({ code });

//       if (result.status === "complete") {
//         // Critical — set the active session after verification
//         await setActive({ session: result.createdSessionId });
//         router.push("/");
//       } else {
//         setCodeError(`Verification incomplete. Status: ${result.status}`);
//       }
//     } catch (err: unknown) {
//       const error = err as { errors?: { message: string; longMessage?: string }[] };
//       setCodeError(
//         error.errors?.[0]?.longMessage ||
//         error.errors?.[0]?.message ||
//         "Invalid code. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSignUp = async () => {
//     if (!isLoaded || !signUp) return;
//     try {
//       await signUp.authenticateWithRedirect({
//         strategy:            "oauth_google",
//         redirectUrl:         `${window.location.origin}/sso-callback`,
//         redirectUrlComplete: "/",
//       });
//     } catch (err) {
//       console.error("Google signup error:", err);
//     }
//   };

//   /* ── Verification screen ── */
//   if (verifying) {
//     return (
//       <div className="flex flex-col gap-6">
//         <div className="flex flex-col items-center text-center gap-3">
//           <div
//             className="w-14 h-14 rounded-2xl flex items-center justify-center"
//             style={{ backgroundColor: "#E1F5EE" }}
//           >
//             <CheckCircle2 size={28} style={{ color: "var(--color-secondary)" }} />
//           </div>
//           <h1 className="text-2xl font-bold text-stone-900 dark:text-white">
//             Check your email
//           </h1>
//           <p className="text-stone-500 dark:text-stone-400 text-sm">
//             We sent a 6-digit verification code to your email.
//           </p>
//         </div>

//         {codeError && (
//           <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
//             <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
//             {codeError}
//           </div>
//         )}

//         <div className="flex flex-col gap-4">
//           <Input
//             label="Verification code"
//             placeholder="Enter 6-digit code"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             maxLength={6}
//           />
//           <Button
//             type="button"
//             onClick={handleVerify}
//             variant="primary"
//             size="lg"
//             loading={isLoading}
//             className="w-full"
//           >
//             Verify Email
//           </Button>
//           <button
//             type="button"
//             onClick={() => setVerifying(false)}
//             className="text-sm text-center text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 cursor-pointer"
//           >
//             Back to registration
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* ── Registration screen ── */
//   return (
//     <div className="flex flex-col gap-6">
//       <div>
//         <h1 className="text-2xl font-bold text-stone-900 dark:text-white mb-1">
//           Create your account
//         </h1>
//         <p className="text-stone-500 dark:text-stone-400 text-sm">
//           Join FoodieAI and discover amazing restaurants
//         </p>
//       </div>

//       {/* Google */}
//       <button
//         type="button"
//         onClick={handleGoogleSignUp}
//         disabled={!isLoaded}
//         className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer disabled:opacity-50"
//       >
//         <svg width="18" height="18" viewBox="0 0 24 24">
//           <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//           <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//           <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//           <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//         </svg>
//         Continue with Google
//       </button>

//       {/* Divider */}
//       <div className="flex items-center gap-3">
//         <div className="flex-1 h-px bg-stone-200 dark:bg-stone-800" />
//         <span className="text-xs text-stone-400">or register with email</span>
//         <div className="flex-1 h-px bg-stone-200 dark:bg-stone-800" />
//       </div>

//       {serverError && (
//         <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
//           <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
//           {serverError}
//         </div>
//       )}

//       <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
//         <Input
//           label="Full name"
//           type="text"
//           placeholder="Your full name"
//           icon={<User size={16} />}
//           error={errors.name?.message}
//           {...register("name")}
//         />

//         <Input
//           label="Email address"
//           type="email"
//           placeholder="you@example.com"
//           icon={<Mail size={16} />}
//           error={errors.email?.message}
//           {...register("email")}
//         />

//         <div className="relative">
//           <Input
//             label="Password"
//             type={showPassword ? "text" : "password"}
//             placeholder="At least 6 characters"
//             icon={<Lock size={16} />}
//             error={errors.password?.message}
//             {...register("password")}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-[38px] text-stone-400 hover:text-stone-600 cursor-pointer"
//           >
//             {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//           </button>
//         </div>

//         <Input
//           label="Confirm password"
//           type="password"
//           placeholder="Repeat your password"
//           icon={<Lock size={16} />}
//           error={errors.confirmPassword?.message}
//           {...register("confirmPassword")}
//         />

//         <Button
//           type="submit"
//           variant="primary"
//           size="lg"
//           loading={isLoading}
//           disabled={!isLoaded || isLoading}
//           className="w-full mt-1"
//         >
//           {isLoading ? "Creating account..." : "Create Account"}
//         </Button>
//       </form>

//       <p className="text-center text-sm text-stone-500 dark:text-stone-400">
//         Already have an account?{" "}
//         <Link
//           href="/login"
//           className="font-medium hover:underline"
//           style={{ color: "var(--color-primary)" }}
//         >
//           Sign in
//         </Link>
//       </p>
//     </div>
//   );
// }



import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <SignUp
      routing="hash"
      afterSignUpUrl="/"
      signInUrl="/login"
      appearance={{
        variables: {
          colorPrimary: "#E8593C",
          borderRadius: "0.75rem",
          fontFamily: "inherit",
        },
        elements: {
          rootBox: "w-full",
          card: "shadow-none border border-stone-200 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-900 w-full p-6",
          headerTitle: "text-stone-900 dark:text-white font-bold",
          headerSubtitle: "text-stone-500 dark:text-stone-400",
          formButtonPrimary: "rounded-xl text-sm normal-case font-medium hover:opacity-90",
          formFieldInput: "rounded-xl border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 dark:text-white text-sm",
          formFieldLabel: "text-stone-700 dark:text-stone-300 text-sm font-medium",
          footerActionLink: "text-[#E8593C] hover:text-[#D14B30] font-medium",
          socialButtonsBlockButton: "rounded-xl border-stone-200 dark:border-stone-700 dark:bg-stone-800 dark:text-white hover:bg-stone-50 dark:hover:bg-stone-700",
          socialButtonsBlockButtonText: "text-sm font-medium",
          dividerLine: "bg-stone-200 dark:bg-stone-700",
          dividerText: "text-stone-400 text-xs",
          alertText: "text-sm",
        },
      }}
    />
  );
}
