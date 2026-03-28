"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ContactPage() {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) { setError("Please fill all required fields"); return; }
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
    setName(""); setEmail(""); setSubject(""); setMessage("");
  };

  const contactInfo = [
    { icon: MapPin, label: "Address", value: "123 Food Street, Gulshan, Dhaka 1212" },
    { icon: Phone,  label: "Phone",   value: "+880 1700 000000" },
    { icon: Mail,   label: "Email",   value: "hello@foodieai.com" },
  ];

  return (
    <div className="min-h-screen pt-20 bg-[var(--color-warm)] dark:bg-stone-950">

      {/* Header */}
      <section className="section-pad bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
        <div className="container-pad text-center">
          <h1 className="text-4xl font-bold text-stone-900 dark:text-white mb-3">Contact Us</h1>
          <p className="text-stone-500 dark:text-stone-400 max-w-md mx-auto">
            Have a question or feedback? We'd love to hear from you. Send us a message and we'll respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-pad">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Contact info */}
            <div className="space-y-5">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex gap-4 p-5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#FAECE7" }}
                  >
                    <item.icon size={18} style={{ color: "var(--color-primary)" }} />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 mb-1">{item.label}</p>
                    <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{item.value}</p>
                  </div>
                </div>
              ))}

              <div className="p-5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                <p className="text-sm font-semibold text-stone-900 dark:text-white mb-3">Business Hours</p>
                <div className="space-y-1.5 text-sm text-stone-500 dark:text-stone-400">
                  <div className="flex justify-between">
                    <span>Monday – Friday</span><span className="font-medium">9am – 6pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span><span className="font-medium">10am – 4pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span><span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-white mb-5">Send a Message</h2>

              {success ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <CheckCircle2 size={28} className="text-green-600 dark:text-green-400" />
                  </div>
                  <p className="font-semibold text-stone-900 dark:text-white">Message Sent!</p>
                  <p className="text-sm text-stone-500 text-center">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setSuccess(false)} variant="outline" size="sm">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Name *"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                      label="Email Address *"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Input
                    label="Subject"
                    placeholder="What is this about?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-stone-700 dark:text-stone-300">
                      Message *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message here..."
                      rows={5}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white text-sm outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
                    />
                  </div>

                  {error && <p className="text-sm text-red-500">{error}</p>}

                  <Button type="submit" variant="primary" size="md" loading={loading}>
                    <Send size={15} />
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}