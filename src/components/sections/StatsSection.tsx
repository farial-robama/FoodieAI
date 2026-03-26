"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 1200, suffix: "+", label: "Restaurants Listed" },
  { value: 50000, suffix: "+", label: "Happy Customers" },
  { value: 4.8, suffix: "", label: "Average Rating", isDecimal: true },
  { value: 80, suffix: "+", label: "Cities Covered" },
];

function CountUp({ target, suffix, isDecimal }: { target: number; suffix: string; isDecimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, isDecimal]);

  return <span ref={ref}>{isDecimal ? count.toFixed(1) : count.toLocaleString()}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="section-pad" style={{ backgroundColor: "var(--color-primary)" }}>
      <div className="container-pad">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <p className="text-4xl sm:text-5xl font-bold">
                <CountUp target={stat.value} suffix={stat.suffix} isDecimal={stat.isDecimal} />
              </p>
              <p className="text-white/80 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}