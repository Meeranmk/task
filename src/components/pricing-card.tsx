"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useMediaQuery } from "./use-media-query"

gsap.registerPlugin(ScrollTrigger)

interface Tier {
  name: string
  users: string
  price: string | number
  currency: string
  period: string
  popular?: boolean
  features: string[]
}

interface PricingCardProps {
  tiers: Tier[]
  onConfigChange?: (configName: string) => void
}

export const PricingCard = ({ tiers, onConfigChange }: PricingCardProps) => {
  const [displayTiers, setDisplayTiers] = useState<Tier[]>(tiers)
  const [configIndex, setConfigIndex] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLSpanElement>(null)
  const shuffleIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const configurations = useMemo(
    () => [
      { indices: [0, 1, 2], layout: "lg:grid-cols-3", name: "Quantum" },
      { indices: [1, 2], layout: "lg:grid-cols-2", name: "Abstraction" },
      { indices: [0], layout: "lg:grid-cols-1", name: "Web" },
    ],
    []
  )

  useEffect(() => {
    const currentConfig = configurations[configIndex]
    onConfigChange?.(currentConfig.name)
  }, [configIndex, configurations, onConfigChange])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 80,
              rotateX: -20,
              rotateY: -12,
              scale: 0.85,
              z: -150,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              z: 0,
              duration: 1.3,
              delay: index * 0.25,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          )
          const features = card.querySelectorAll("li")
          features.forEach((feature, featureIndex) => {
            const svg = feature.querySelector("svg")
            if (svg) {
              gsap.fromTo(
                feature,
                { 
                  opacity: 0, 
                  x: -25,
                  rotateY: -40,
                  transformOrigin: "left center"
                },
                {
                  opacity: 1,
                  x: 0,
                  rotateY: 0,
                  duration: 0.8,
                  delay: index * 0.15 + featureIndex * 0.08,
                  ease: "power4.out",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                  },
                  onStart: () => {
                    gsap.fromTo(
                      svg,
                      { scale: 0 },
                      { scale: 1, duration: 0.35, ease: "back.out(1.5)" }
                    )
                  },
                },
              )
            }
          })
          const priceElement = card.querySelector('[data-price]')
          if (priceElement) {
            gsap.fromTo(
              priceElement,
              { 
                scale: 0.6,
                opacity: 0,
                rotateX: 80
              },
              {
                scale: 1,
                opacity: 1,
                rotateX: 0,
                duration: 0.9,
                delay: index * 0.15 + 0.25,
                ease: "bounce.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            )
          }
        }
      })
      const popularCard = cardsRef.current.find((card, idx) => displayTiers[idx]?.popular)
      if (popularCard) {
        gsap.to(popularCard, {
          y: -8,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })

        gsap.to(popularCard, {
          boxShadow: "0 25px 50px rgba(147, 51, 234, 0.35)",
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [displayTiers])

  useEffect(() => {
    const shuffleInterval = isMobile ? 8000 : 5000

    shuffleIntervalRef.current = setInterval(() => {
      gsap.to(cardsRef.current, {
        opacity: 0,
        y: -25,
        rotateX: 20,
        scale: 0.92,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.in",
        onComplete: () => {
          const nextConfigIndex = (configIndex + 1) % configurations.length
          setConfigIndex(nextConfigIndex)

          const nextConfig = configurations[nextConfigIndex]
          const newDisplayTiers = nextConfig.indices.map((i) => tiers[i])
          setDisplayTiers(newDisplayTiers)
          if (titleRef.current) {
            gsap.to(titleRef.current, {
              rotateY: 90,
              opacity: 0,
              duration: 0.25,
              ease: "power3.in",
              onComplete: () => {
                titleRef.current!.textContent = nextConfig.name
                gsap.fromTo(
                  titleRef.current,
                  { rotateY: -90, opacity: 0 },
                  {
                    rotateY: 0,
                    opacity: 1,
                    duration: 0.25,
                    ease: "power3.out",
                  }
                )
              },
            })
          }
          gsap.fromTo(
            cardsRef.current,
            {
              opacity: 0,
              y: 25,
              rotateX: -20,
              scale: 0.92,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power4.out",
            },
          )
        },
      })
    }, shuffleInterval)

    return () => {
      if (shuffleIntervalRef.current) {
        clearInterval(shuffleIntervalRef.current)
      }
    }
  }, [configIndex, tiers, isMobile, configurations])

  const handleCardHover = (index: number, isHovering: boolean) => {
    const card = cardsRef.current[index]
    if (card) {
      if (isHovering) {
        gsap.to(card, {
          y: -15,
          scale: 1.04,
          rotateY: 1.5,
          boxShadow: "0 40px 80px rgba(147, 51, 234, 0.35)",
          duration: 0.4,
          ease: "power4.out",
        })
        const features = card.querySelectorAll("li")
        gsap.to(features, {
          x: 4,
          color: "#9333ea",
          duration: 0.25,
          stagger: 0.02,
          ease: "power3.out",
        })
        gsap.to(card.querySelector('[data-glow]'), {
          opacity: 0.5,
          scale: 1.08,
          duration: 0.4,
          ease: "power3.out",
        })
      } else {
        gsap.to(card, {
          y: displayTiers[index]?.popular ? -8 : 0,
          scale: 1,
          rotateY: 0,
          boxShadow: displayTiers[index]?.popular
            ? "0 25px 50px rgba(147, 51, 234, 0.3)"
            : "0 15px 35px rgba(0, 0, 0, 0.08)",
          duration: 0.4,
          ease: "power4.out",
        })

        const features = card.querySelectorAll("li")
        gsap.to(features, {
          x: 0,
          color: "#334155",
          duration: 0.25,
          ease: "power3.out",
        })

        gsap.to(card.querySelector('[data-glow]'), {
          opacity: 0,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
        })
      }
    }
  }
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index]
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 25
    const rotateY = (centerX - x) / 25

    gsap.to(card, {
      rotateX: -rotateX,
      rotateY: rotateY,
      transformPerspective: 1200,
      duration: 0.25,
      ease: "power3.out",
    })
  }

  const handleCardMouseLeave = (index: number) => {
    const card = cardsRef.current[index]
    if (!card) return

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: "power4.out",
    })
  }

  const currentConfig = configurations[configIndex]

  return (
    <div
      ref={containerRef}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-6 border border-slate-200/50 relative overflow-hidden w-full max-w-sm mx-auto sm:max-w-none"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-8 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 shadow-lg shadow-purple-500/40" />
              <div className="absolute inset-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 animate-ping opacity-20" />
            </div>
            <span 
              ref={titleRef} 
              className="font-bold text-slate-900 text-base sm:text-lg"
              style={{ transformStyle: "preserve-3d" }}
            >
              {currentConfig.name}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
            {["Products", "Pricing", "Contact"].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="relative group hover:text-purple-600 transition-colors font-medium"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-800 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>

        <div
          ref={gridRef}
          className={`grid grid-cols-1 ${currentConfig.layout} gap-4 sm:gap-6 transition-all duration-600 ease-in-out`}
        >
          {displayTiers.map((tier, index) => (
            <div
              key={tier.name}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => {
                handleCardHover(index, false)
                handleCardMouseLeave(index)
              }}
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              className={`relative p-4 sm:p-6 rounded-2xl transition-all duration-400 ease-in-out transform ${
                tier.popular
                  ? "bg-gradient-to-br from-purple-50 via-purple-50 to-purple-100 border-2 border-purple-400 shadow-2xl lg:scale-105 z-10"
                  : "bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 hover:border-purple-300"
              }`}
              style={{ 
                perspective: "1500px",
                transformStyle: "preserve-3d"
              }}
            >
              <div 
                data-glow
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400 via-blue-400 to-pink-400 opacity-0 blur-2xl -z-10 transition-opacity duration-400 ease-in-out"
              />
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="relative inline-block bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white text-xs font-bold px-3 sm:px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                    ⭐ Popular
                    <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
                  </span>
                </div>
              )}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-800 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
              </div>

              <div className="mb-4 relative" style={{ transformStyle: "preserve-3d" }}>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{tier.name}</h3>
                <p className="text-sm text-slate-600 font-medium">{tier.users}</p>
              </div>

              <div className="mb-6 relative" style={{ transformStyle: "preserve-3d" }}>
                <div className="flex items-baseline gap-1">
                  <span 
                    data-price
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-slate-900 via-purple-900 to-slate-700 bg-clip-text text-transparent"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {tier.price}
                  </span>
                  <span className="text-slate-600 font-semibold text-sm">{tier.currency}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1 font-medium">{tier.period}</p>
              </div>

              <button className="relative w-full py-3 px-4 rounded-xl font-semibold transition-all duration-400 ease-in-out text-sm shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:scale-95 bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 overflow-hidden group">
                <span className="relative z-10">Subscribe Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-400 ease-in-out" />
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              </button>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  What&apos;s Included:
                </p>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li 
                      key={feature} 
                      className="flex items-start gap-2 text-xs sm:text-base"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="mt-1 flex-shrink-0 relative">
                        <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="absolute inset-0 blur-sm opacity-50">
                          <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <span className="text-slate-700 font-medium break-words">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-200/20 to-transparent rounded-bl-full opacity-50" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-200/20 to-transparent rounded-tr-full opacity-50" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-10 right-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60" />
      <div className="absolute bottom-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: "0.8s" }} />
    </div>
  )
}