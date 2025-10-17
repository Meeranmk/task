"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { PricingCard } from "./pricing-card"

gsap.registerPlugin(ScrollTrigger)

// Main BillingSection Component
export default function BillingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgCircle1 = useRef<HTMLDivElement>(null);
  const bgCircle2 = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);

  const pricingTiers = [
    {
      name: "Standard",
      users: "Up to 5 users",
      price: "49",
      currency: "kr",
      period: "/month",
      popular: false,
      features: ["12 months historical data", "4 hr data refresh", "500+ third party integrations"],
    },
    {
      name: "Professional",
      users: "Up to 25 users",
      price: "149",
      currency: "kr",
      period: "/month",
      popular: true,
      features: [
        "24 months historical data",
        "1 hr data refresh",
        "1,000+ third party integrations",
        "Simple reporting",
      ],
    },
    {
      name: "Enterprise",
      users: "Unlimited users",
      price: "299",
      currency: "kr",
      period: "/month",
      popular: false,
      features: [
        "Unlimited historical data",
        "15 min data refresh",
        "2,000+ third party integrations",
        "Advanced reporting",
        "Priority support",
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated background circles
      gsap.to(bgCircle1.current, {
        x: 100,
        y: -50,
        scale: 1.2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(bgCircle2.current, {
        x: -80,
        y: 60,
        scale: 1.3,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Icon animation
      gsap.fromTo(
        iconRef.current,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );

      // Title animation with split text effect
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      // Description animation
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
      // Button animation
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.4,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
      // Links animation
      if (linksRef.current) {
        const links = linksRef.current.querySelectorAll('li');
        gsap.fromTo(
          links,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: linksRef.current,
              start: "top 85%",
            }
          }
        );
      }
      // Card animation
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: 100, rotateY: -15 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1.2,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }, containerRef);

    // Apply random styles to particles on client-side
    particleRefs.current.forEach((particle) => {
      if (particle) {
        const left = `${Math.random() * 100}%`;
        const top = `${Math.random() * 100}%`;
        const duration = 5 + Math.random() * 10;
        const delay = Math.random() * 5;
        gsap.set(particle, {
          left,
          top,
          animation: `float ${duration}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div 
        ref={bgCircle1}
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 via-purple-300 to-pink-300 rounded-full blur-3xl opacity-20" 
      />
      <div 
        ref={bgCircle2}
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-300 rounded-full blur-3xl opacity-20" 
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            ref={el => { particleRefs.current[i] = el; }}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30"
            // Initial static styles for server rendering
            style={{ left: "0%", top: "0%" }} // Default values for SSR
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 h-full flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start flex-grow">
          <div className="md:col-span-2 space-y-6 text-center md:text-left flex flex-col justify-center">
            <div className="flex justify-center md:justify-start items-center gap-2 sm:gap-3">
              <div ref={iconRef} className="relative">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 shadow-lg" />
                <div className="absolute inset-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 animate-ping opacity-40" />
              </div>
              <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">Billing</span>
            </div>
            
            <div className="space-y-4">
              <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                Capture recurring
                <span className="block bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent">
                  revenue
                </span>
              </h2>
              <p ref={descRef} className="text-base md:text-lg text-slate-600 leading-relaxed">
                Manage flat rate, usage-based, and hybrid pricing models, minimize churn, and automate finance operations with ease.
              </p>
            </div>

            <button ref={buttonRef} className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white font-bold rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
              <span className="relative z-10">Start with Billing</span>
              <svg 
                className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </button>

            <div ref={linksRef} className="pt-8 border-t-2 border-slate-200 space-y-4">
              <p className="text-sm font-bold text-slate-900 uppercase tracking-wide">See Also</p>
              <ul className="space-y-4">
                {[
                  { title: "Invoicing", desc: "for invoice creation, collection, and tracking" },
                  { title: "Usage-based billing", desc: "for metering, billing, and consumption insights" },
                  { title: "Stripe Sigma", desc: "for custom revenue reports – no SQL required" }
                ].map((item) => (
                  <li key={item.title} className="group">
                    <a href="#" className="relative text-purple-600 hover:text-purple-800 font-semibold text-base transition-colors inline-flex items-center gap-2">
                      {item.title}
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300" />
                    </a>
                    <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div ref={cardRef} className="md:col-span-3 relative flex items-center" style={{ perspective: "1500px" }}>
            <PricingCard tiers={pricingTiers} />
            <svg
              className="absolute -bottom-24 -right-24 w-48 h-48 text-purple-400 opacity-10 animate-spin-slow"
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="100" cy="100" r="80" />
              <circle cx="100" cy="100" r="60" />
              <circle cx="100" cy="100" r="40" />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}