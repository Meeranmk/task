"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// PricingCard Component
interface Tier {
  name: string;
  users: string;
  price: string | number;
  currency: string;
  period: string;
  popular?: boolean;
  features: string[];
}

interface PricingCardProps {
  tiers: Tier[];
}

export const PricingCard = ({ tiers }: PricingCardProps) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 60,
            rotateX: -15,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-6 border border-slate-200/50 relative overflow-hidden w-full max-w-sm mx-auto sm:max-w-none">
     
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-8 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 shadow-lg shadow-purple-500/40" />
              <div className="absolute inset-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 animate-ping opacity-20" />
            </div>
            <span className="font-bold text-slate-900 text-base sm:text-lg">Quantum</span>
          </div>
        
          <div className="sm:hidden">
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
            {["Products", "Pricing", "Contact"].map((item) => (
              <a 
                key={item}
                href="#" 
                className="relative group hover:text-purple-600 transition-colors font-medium"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              ref={el => { cardsRef.current[index] = el; }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative p-4 rounded-2xl transition-all duration-500 transform ${
                tier.popular
                  ? "bg-gradient-to-br from-purple-50 via-purple-50 to-purple-100 border-2 border-purple-400 shadow-2xl scale-105 sm:scale-110 z-10"
                  : "bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 hover:border-purple-300 hover:shadow-2xl"
              } ${hoveredCard === index ? "sm:shadow-2xl sm:-translate-y-2" : ""}`}
              style={{ perspective: "1000px" }}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white text-xs font-bold px-3 sm:px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap animate-pulse">
                    ⭐ Popular
                  </span>
                </div>
              )}
              
             
              {hoveredCard === index && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/20 to-blue-400/20 blur-xl -z-10" />
              )}
              
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{tier.name}</h3>
                <p className="text-sm text-slate-600 font-medium">{tier.users}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-slate-900 via-purple-900 to-slate-700 bg-clip-text text-transparent">
                    {tier.price}
                  </span>
                  <span className="text-slate-600 font-semibold text-sm">{tier.currency}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1 font-medium">{tier.period}</p>
              </div>

              <button
                className="relative w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 text-sm shadow-md hover:shadow-2xl transform hover:-translate-y-1 active:scale-95 bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 overflow-hidden group"
              >
                <span className="relative z-10">Subscribe Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  What&apos;s Included:
                </p>
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li 
                      key={feature} 
                      className="flex items-start gap-2 text-xs sm:text-base"
                    >
                      <div className="mt-1 flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-purple-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-slate-700 font-medium break-words">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};