"use client"

import Navbar from "@/components/navbar"
import BillingSection from "@/components/billing-section"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-16">
        <BillingSection />
      </main>
    </>
  )
}
