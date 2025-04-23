"use client";

import Link from "next/link";
import { FeatureCard } from "@/components/FeatureCard";
import { Paintbrush, Languages, Database, HospitalIcon } from "lucide-react";

const consoleUrl = process.env.NEXT_PUBLIC_CONSOLE_URL || "https://console.previsithealth.com";
const name = "Test visit form";
const encoded = encodeURIComponent(name);

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <section className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simplify Patient Intake
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Collect accurate, EHR-ready data before your patient even steps into
            the room.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href={`/questionnaire/${encoded}?patientId=user-abc-123`}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              View Sample Intake Form
            </Link>

            <a
              href={consoleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
            >
              Go to Admin Console
            </a>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6 space-y-10 text-center">
          <h2 className="text-2xl font-bold">Powerful Features for Clinics</h2>
          <p className="text-gray-600 text-lg">
            Everything you need to streamline intake.
          </p>

          <div className="grid gap-8 md:grid-cols-2 text-left">
            {/* Feature #1: EHR Integration */}
            <FeatureCard
              title="EHR-Ready Responses"
              description="Automatically route patient answers into Athena, Allscripts, and more."
              icon={Database}
            />

            {/* Feature #2: Multi-language Support */}
            <FeatureCard
              title="Multi-language Intake"
              description="Offer forms in Spanish, French, or any language with localization support."
              linkText="See Spanish Example"
              href={`/questionnaire/${encoded}?patientId=user-abc-123&lang=es`}
              icon={Languages}
            />

            {/* Feature #3: Admin Console */}
            <FeatureCard
              title="Admin Console"
              description="Manage form mappings, view patient answers, and edit EHR config."
              icon={HospitalIcon}
            />

            {/* Feature #4: Mobile Friendly */}
            <FeatureCard
              title="White-label Ready"
              description="Customize forms with your logo, colors, and domain — perfect for clinics or platform partners."
              icon={Paintbrush}
            />
          </div>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-400 p-4">
        © {new Date().getFullYear()} Previsit Health. All rights reserved.
      </footer>
    </main>
  );
}
