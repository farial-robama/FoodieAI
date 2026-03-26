import Link from "next/link";
import { UtensilsCrossed, Mail, Phone, MapPin, Github, Twitter, Instagram, Facebook } from "lucide-react";
import { NAV_LINKS, CUISINES } from "@/constants";

export default function Footer() {
  return (
    <footer className="bg-stone-900 dark:bg-stone-950 text-stone-400">
      <div className="container-pad py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "var(--color-primary)" }}>
                <UtensilsCrossed size={16} className="text-white" />
              </div>
              Foodie<span style={{ color: "var(--color-primary)" }}>AI</span>
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              Discover the best restaurants near you. Powered by AI to give you personalized food recommendations.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: "https://github.com" },
                { icon: Twitter, href: "https://twitter.com" },
                { icon: Instagram, href: "https://instagram.com" },
                { icon: Facebook, href: "https://facebook.com" },
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-[var(--color-primary)] flex items-center justify-center transition-colors duration-200">
                  <Icon size={15} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/dashboard" className="text-sm hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Cuisines */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explore Cuisines</h4>
            <ul className="space-y-2.5">
              {CUISINES.slice(0, 7).map((cuisine) => (
                <li key={cuisine}>
                  <Link href={`/explore?cuisine=${cuisine}`}
                    className="text-sm hover:text-white transition-colors">
                    {cuisine}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-primary)" }} />
                <span>123 Food Street, Gulshan, Dhaka 1212</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Phone size={15} style={{ color: "var(--color-primary)" }} />
                <a href="tel:+8801700000000" className="hover:text-white transition-colors">
                  +880 1700 000000
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Mail size={15} style={{ color: "var(--color-primary)" }} />
                <a href="mailto:hello@foodieai.com" className="hover:text-white transition-colors">
                  hello@foodieai.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="container-pad py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} FoodieAI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}