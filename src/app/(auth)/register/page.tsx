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
          card: "shadow-none p-0 bg-transparent border-0",
          headerTitle: "text-stone-900 dark:text-white font-bold text-xl",
          headerSubtitle: "text-stone-500 dark:text-stone-400 text-sm",
          formButtonPrimary: "rounded-xl text-sm normal-case font-medium hover:opacity-90",
          formFieldInput: "rounded-xl border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 dark:text-white text-sm",
          formFieldLabel: "text-stone-700 dark:text-stone-300 text-sm font-medium",
          footerActionLink: "text-[#E8593C] hover:text-[#D14B30] font-medium",
          socialButtonsBlockButton: "rounded-xl border-stone-200 dark:border-stone-700 dark:bg-stone-800 dark:text-white",
          socialButtonsBlockButtonText: "text-sm font-medium",
          dividerLine: "bg-stone-200 dark:bg-stone-700",
          dividerText: "text-stone-400 text-xs",
          alertText: "text-sm",
          footer: "hidden",
        },
      }}
    />
  );
}


