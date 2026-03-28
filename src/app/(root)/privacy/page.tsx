export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-20 bg-[var(--color-warm)] dark:bg-stone-950">
      <div className="container-pad py-16 max-w-3xl">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-white mb-2">Privacy Policy</h1>
        <p className="text-stone-400 text-sm mb-10">Last updated: March 1, 2025</p>
        {[
          { title: "Information We Collect", content: "We collect information you provide directly to us, such as your name, email address, and dining preferences when you register for an account. We also collect information about your use of our services including restaurant searches, bookings, and reviews." },
          { title: "How We Use Your Information", content: "We use the information we collect to provide, maintain, and improve our services, process bookings, send you updates and promotional communications (with your consent), and personalize your restaurant recommendations using AI." },
          { title: "Information Sharing", content: "We do not sell, trade, or rent your personal information to third parties. We may share your information with restaurants when you make a booking, and with service providers who assist us in operating our platform." },
          { title: "Data Security", content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction." },
          { title: "Your Rights", content: "You have the right to access, correct, or delete your personal information at any time through your account settings. You may also opt out of promotional emails by clicking the unsubscribe link." },
          { title: "Contact Us", content: "If you have any questions about this Privacy Policy, please contact us at privacy@foodieai.com or at our office address: 123 Food Street, Gulshan, Dhaka 1212." },
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