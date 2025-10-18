"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { PricingCard } from "./pricing-card"

gsap.registerPlugin(ScrollTrigger)

// Particle properties interface
interface ParticleProps {
  left: string;
  top: string;
  width: string;
  height: string;
  background: string;
}

// Generate particle properties (only called client-side)
const generateParticleProps = (count: number): ParticleProps[] => {
  return Array.from({ length: count }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width: `${2 + Math.random() * 4}px`,
    height: `${2 + Math.random() * 4}px`,
    background: `linear-gradient(135deg, ${
      i % 3 === 0 ? '#a78bfa' : i % 3 === 1 ? '#60a5fa' : '#f472b6'
    }, transparent)`,
  }))
}

export default function BillingSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const bgCircle1 = useRef<HTMLDivElement>(null)
  const bgCircle2 = useRef<HTMLDivElement>(null)
  const bgCircle3 = useRef<HTMLDivElement>(null)
  const particleRefs = useRef<(HTMLDivElement | null)[]>([])
  const [currentConfigName, setCurrentConfigName] = useState("Quantum")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particleProps, setParticleProps] = useState<ParticleProps[]>([]) // Initialize empty

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
  ]

  // Generate particle props client-side after mount
  useEffect(() => {
    setParticleProps(generateParticleProps(30))
  }, [])

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 2
      const y = (clientY / innerHeight - 0.5) * 2
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smoother background circles with custom easing
      gsap.to(bgCircle1.current, {
        x: mousePosition.x * 50,
        y: mousePosition.y * 50,
        scale: 1.2,
        duration: 1.8,
        ease: "power3.inOut",
      })

      gsap.to(bgCircle2.current, {
        x: mousePosition.x * -40,
        y: mousePosition.y * -40,
        scale: 1.1,
        duration: 2.2,
        ease: "power3.inOut",
      })

      gsap.to(bgCircle3.current, {
        x: mousePosition.x * 60,
        y: mousePosition.y * -60,
        scale: 1.15,
        duration: 2,
        ease: "power3.inOut",
      })

      // Pulsing opacity with smoother sine
      gsap.to([bgCircle1.current, bgCircle2.current, bgCircle3.current], {
        opacity: 0.3,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.8,
        ease: "sine.inOut",
      })
    }, containerRef)

    return () => ctx.revert()
  }, [mousePosition])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated background circles with smoother motion
      const tl = gsap.timeline({ repeat: -1, yoyo: true })
      tl.to(bgCircle1.current, {
        x: 100,
        y: -50,
        scale: 1.3,
        rotation: 45,
        duration: 7,
        ease: "power2.inOut",
      })

      gsap.to(bgCircle2.current, {
        x: -80,
        y: 60,
        scale: 1.4,
        rotation: -45,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })

      gsap.to(bgCircle3.current, {
        x: 50,
        y: -80,
        scale: 1.2,
        rotation: 90,
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })

      gsap.fromTo(
        iconRef.current,
        { 
          scale: 0, 
          rotationY: -180,
          rotationX: 90,
          opacity: 0 
        },
        {
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          opacity: 1,
          duration: 1.4,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          onComplete: () => {
            gsap.to(iconRef.current, {
              boxShadow: "0 0 20px rgba(255, 0, 255, 0.5)",
              duration: 1.8,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            })
          }
        },
      )

      if (titleRef.current) {
        const chars = titleRef.current.textContent?.split("") || []
        titleRef.current.innerHTML = ""
        
        chars.forEach((char) => {
          const span = document.createElement("span")
          span.textContent = char === " " ? "\u00A0" : char
          span.style.display = "inline-block"
          titleRef.current?.appendChild(span)
        })

        gsap.fromTo(
          titleRef.current.children,
          { 
            opacity: 0, 
            y: 80,
            rotationX: -90,
            transformOrigin: "50% 50%"
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.3,
            stagger: 0.04,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      gsap.fromTo(
        descRef.current,
        { 
          opacity: 0, 
          y: 40,
          filter: "blur(8px)",
          letterSpacing: "0.4em"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          letterSpacing: "0em",
          duration: 1.1,
          delay: 0.3,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        buttonRef.current,
        { 
          opacity: 0, 
          scale: 0.6,
          rotationY: -180
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.9,
          delay: 0.5,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      )

      if (linksRef.current) {
        const links = linksRef.current.querySelectorAll("li")
        gsap.fromTo(
          links,
          { 
            opacity: 0, 
            x: -40,
            rotationY: -45,
            transformOrigin: "left center"
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 0.9,
            stagger: 0.12,
            delay: 0.7,
            ease: "power4.out",
            scrollTrigger: {
              trigger: linksRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
      gsap.fromTo(
        cardRef.current,
        { 
          opacity: 0, 
          x: 120, 
          rotationY: -20,
          rotationX: 12,
          scale: 0.85
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 1.6,
          delay: 0.3,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.to(cardRef.current, {
        y: -12,
        rotation: 1.5,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      particleRefs.current.forEach((particle, i) => {
        if (particle && particleProps[i]) {
          const { left, top, width, height } = particleProps[i]
          gsap.set(particle, { left, top, width, height })
          
          gsap.to(particle, {
            y: -60 - Math.random() * 40,
            x: (Math.random() - 0.5) * 80,
            opacity: 0,
            duration: 4 + Math.random() * 8,
            delay: Math.random() * 4,
            repeat: -1,
            ease: `power${Math.floor(Math.random() * 3) + 1}.inOut`,
          })

          gsap.to(particle, {
            backgroundColor: i % 3 === 0 ? "#60a5fa" : i % 3 === 1 ? "#f472b6" : "#a78bfa",
            duration: (4 + Math.random() * 8) / 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          })
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [particleProps])

  // Update title with smoother transition
  useEffect(() => {
    if (titleRef.current) {
      gsap.to(titleRef.current.children, {
        opacity: 0,
        y: -15,
        duration: 0.25,
        stagger: 0.015,
        ease: "power3.in",
        onComplete: () => {
          if (titleRef.current) {
            titleRef.current.textContent = currentConfigName
            const chars = currentConfigName.split("")
            titleRef.current.innerHTML = ""
            
            chars.forEach((char) => {
              const span = document.createElement("span")
              span.textContent = char === " " ? "\u00A0" : char
              span.style.display = "inline-block"
              titleRef.current?.appendChild(span)
            })

            gsap.fromTo(
              titleRef.current.children,
              { opacity: 0, y: 15 },
              {
                opacity: 1,
                y: 0,
                duration: 0.25,
                stagger: 0.015,
                ease: "power3.out",
              }
            )
          }
        },
      })
    }
  }, [currentConfigName])

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    gsap.to(button, {
      x: x * 0.25,
      y: y * 0.25,
      scale: 1.08,
      duration: 0.4,
      ease: "power3.out",
    })
  }

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    })
  }

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30"
    >
      <div
        ref={bgCircle1}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-400 via-purple-300 to-pink-300 rounded-full blur-3xl opacity-20"
        style={{ transform: "translateZ(0)" }}
      />
      <div
        ref={bgCircle2}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-300 rounded-full blur-3xl opacity-20"
        style={{ transform: "translateZ(0)" }}
      />
      <div
        ref={bgCircle3}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 rounded-full blur-3xl opacity-15"
        style={{ transform: "translateZ(0)" }}
      />

      {particleProps.length > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particleProps.map((props, i) => (
            <div
              key={i}
              ref={(el) => {
                particleRefs.current[i] = el
              }}
              className="absolute rounded-full opacity-40 transition-opacity duration-500"
              style={{
                left: props.left,
                top: props.top,
                width: props.width,
                height: props.height,
                background: props.background,
              }}
            />
          ))}
        </div>
      )}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
          <div className="md:col-span-2 space-y-6 text-center md:text-left flex flex-col justify-center">
            <div className="flex justify-center md:justify-start items-center gap-2 sm:gap-3">
              <div 
                ref={iconRef} 
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 shadow-lg shadow-purple-500/50" />
                <div className="absolute inset-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 animate-ping opacity-40" />
                <div className="absolute inset-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 blur-md opacity-50" />
              </div>
              <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">Billing</span>
            </div>

            <div className="space-y-4">
              <h2 
                ref={titleRef} 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight"
                style={{ transformStyle: "preserve-3d" }}
              >
                {currentConfigName}
                <span className="block bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent">
                  revenue
                </span>
              </h2>
              <p 
                ref={descRef} 
                className="text-base md:text-lg text-slate-600 leading-relaxed"
              >
                Manage flat rate, usage-based, and hybrid pricing models, minimize churn, and automate finance
                operations with ease.
              </p>
            </div>

            <button
              ref={buttonRef}
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white font-bold rounded-full overflow-hidden transition-all duration-300 shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/50 mx-auto md:mx-0"
              style={{ transformStyle: "preserve-3d" }}
            >
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
              <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </button>

            <div 
              ref={linksRef} 
              className="pt-8 border-t-2 border-slate-200 space-y-4"
              style={{ transformStyle: "preserve-3d" }}
            >
              <p className="text-sm font-bold text-slate-900 uppercase tracking-wide">See Also</p>
              <ul className="space-y-4">
                {[
                  { title: "Invoicing", desc: "for invoice creation, collection, and tracking" },
                  { title: "Usage-based billing", desc: "for metering, billing, and consumption insights" },
                  { title: "Stripe Sigma", desc: "for custom revenue reports — no SQL required" },
                ].map((item) => (
                  <li key={item.title} className="group" style={{ transformStyle: "preserve-3d" }}>
                    <a
                      href="#"
                      className="relative text-purple-600 hover:text-purple-800 font-semibold text-base transition-all duration-300 inline-flex items-center gap-2"
                    >
                      {item.title}
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-800 group-hover:w-full transition-all duration-300" />
                    </a>
                    <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div 
            ref={cardRef} 
            className="md:col-span-3 relative flex items-center justify-center" 
            style={{ 
              perspective: "2000px",
              transformStyle: "preserve-3d"
            }}
          >
            <PricingCard tiers={pricingTiers} onConfigChange={setCurrentConfigName} />
          
            <svg
              className="absolute -bottom-24 -right-24 w-48 h-48 text-purple-400 opacity-10 animate-spin-slow pointer-events-none"
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="100" cy="100" r="80" />
              <circle cx="100" cy="100" r="60" />
              <circle cx="100" cy="100" r="40" />
            </svg>
            
            <div className="absolute -top-12 -left-12 w-24 h-24 border-4 border-purple-300/30 rounded-full animate-pulse pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 border-4 border-blue-300/30 rounded-full animate-pulse pointer-events-none" style={{ animationDelay: "0.8s" }} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 18s linear infinite;
        }
      `}</style>
    </section>
  )
}