export default function TermsPage() {
  return (
    <div className="min-h-screen pt-20 bg-[var(--color-warm)] dark:bg-stone-950">
      <div className="container-pad py-16 max-w-3xl">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-white mb-2">Terms of Service</h1>
        <p className="text-stone-400 text-sm mb-10">Last updated: March 1, 2025</p>
        {[
          { title: "Acceptance of Terms", content: "By accessing and using FoodieAI, you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to these terms, please do not use our service." },
          { title: "Use of Service", content: "FoodieAI grants you a limited, non-exclusive, non-transferable license to use the platform for personal, non-commercial purposes. You may not use the service for any unlawful purpose or in any way that could damage or impair the service." },
          { title: "User Accounts", content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account." },
          { title: "Reviews and Content", content: "By submitting reviews or other content, you grant FoodieAI a non-exclusive, royalty-free license to use, display, and distribute your content. You are responsible for ensuring your content is accurate and does not violate any third-party rights." },
          { title: "Bookings and Reservations", content: "FoodieAI facilitates restaurant bookings but is not responsible for the actions of restaurants. Cancellation policies vary by restaurant. Please review the restaurant's policy before making a booking." },
          { title: "Limitation of Liability", content: "FoodieAI shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the service. Our total liability shall not exceed the amount paid by you in the past 12 months." },
        ].map((section) => (
          <div key={section.title} className="mb-8">
            <h2 className="text-lg font-semibold text-stone-900 dark:text-white mb-3">{section.title}</h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}