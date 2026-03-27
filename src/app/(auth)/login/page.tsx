// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { useSignIn } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Eye, EyeOff, Mail, Lock, Zap, AlertCircle, CheckCircle2 } from "lucide-react";
// import { loginSchema, LoginInput } from "@/lib/validations";
// import Button from "@/components/ui/Button";
// import Input from "@/components/ui/Input";

// export default function LoginPage() {
//   const { signIn, setActive, isLoaded } = useSignIn();
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [serverError, setServerError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

//   const onSubmit = async (data: LoginInput) => {
//     if (!isLoaded || !signIn) {
//       setServerError("Auth is still loading. Please wait and try again.");
//       return;
//     }

//     setIsLoading(true);
//     setServerError("");
//     setSuccessMsg("");

//     try {
//       const result = await signIn.create({
//         identifier: data.email,
//         password: data.password,
//       });

//       if (result.status === "complete") {
//         // This is the critical step — set the active session
//         await setActive({ session: result.createdSessionId });
//         setSuccessMsg("Login successful! Redirecting...");
//         router.push("/");
//       } else {
//         setServerError("Sign in incomplete. Please try again.");
//       }
//     } catch (err: unknown) {
//       const error = err as { errors?: { message: string; longMessage?: string }[] };
//       const msg =
//         error.errors?.[0]?.longMessage ||
//         error.errors?.[0]?.message ||
//         "Invalid email or password.";
//       setServerError(msg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fillDemo = (role: "user" | "admin") => {
//     const credentials = {
//       user:  { email: "user@example.com",  password: "123456" },
//       admin: { email: "admin@example.com", password: "123456" },
//     };
//     setValue("email",    credentials[role].email,    { shouldValidate: true });
//     setValue("password", credentials[role].password, { shouldValidate: true });
//   };

//   const handleGoogleLogin = async () => {
//     if (!isLoaded || !signIn) return;
//     try {
//       await signIn.authenticateWithRedirect({
//         strategy: "oauth_google",
//         redirectUrl: `${window.location.origin}/sso-callback`,
//         redirectUrlComplete: "/",
//       });
//     } catch (err) {
//       console.error("Google login error:", err);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-6">
//       <div>
//         <h1 className="text-2xl font-bold text-stone-900 dark:text-white mb-1">
//           Welcome back
//         </h1>
//         <p className="text-stone-500 dark:text-stone-400 text-sm">
//           Sign in to your FoodieAI account
//         </p>
//       </div>

//       {/* Demo buttons */}
//       <div className="flex flex-col gap-2">
//         <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">
//           Quick demo access — click then Sign In
//         </p>
//         <div className="grid grid-cols-2 gap-2">
//           {(["user", "admin"] as const).map((role) => (
//             <button
//               key={role}
//               type="button"
//               onClick={() => fillDemo(role)}
//               className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm font-medium text-stone-700 dark:text-stone-300 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
//             >
//               <Zap size={14} />
//               {role === "user" ? "User Demo" : "Admin Demo"}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Google */}
//       <button
//         type="button"
//         onClick={handleGoogleLogin}
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
//         <span className="text-xs text-stone-400">or continue with email</span>
//         <div className="flex-1 h-px bg-stone-200 dark:bg-stone-800" />
//       </div>

//       {/* Alerts */}
//       {serverError && (
//         <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
//           <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
//           {serverError}
//         </div>
//       )}
//       {successMsg && (
//         <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 text-sm">
//           <CheckCircle2 size={16} />
//           {successMsg}
//         </div>
//       )}

//       {/* Form */}
//       <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
//             placeholder="Enter your password"
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

//         <Button
//           type="submit"
//           variant="primary"
//           size="lg"
//           loading={isLoading}
//           disabled={!isLoaded || isLoading}
//           className="w-full mt-1"
//         >
//           {isLoading ? "Signing in..." : "Sign In"}
//         </Button>
//       </form>

//       <p className="text-center text-sm text-stone-500 dark:text-stone-400">
//         Don't have an account?{" "}
//         <Link
//           href="/register"
//           className="font-medium hover:underline"
//           style={{ color: "var(--color-primary)" }}
//         >
//           Sign up free
//         </Link>
//       </p>
//     </div>
//   );
// }


import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <SignIn
      routing="hash"
      afterSignInUrl="/"
      signUpUrl="/register"
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
          identityPreviewText: "text-stone-700 dark:text-stone-300",
          identityPreviewEditButton: "text-[#E8593C]",
          alertText: "text-sm",
          formFieldSuccessText: "text-sm",
        },
      }}
    />
  );
}