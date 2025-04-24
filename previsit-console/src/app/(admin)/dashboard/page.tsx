"use client";

import Link from "next/link";
import { FileText, HelpCircle, Share2, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SECTIONS = [
  {
    label: "Questionnaires",
    href: "/questionnaires",
    icon: FileText,
    description: "Manage previsit forms",
    count: 12,
  },
  {
    label: "Questions",
    href: "/questions",
    icon: HelpCircle,
    description: "Configure reusable questions",
    count: 24,
  },
  {
    label: "EHR Mappings",
    href: "/ehr-mappings",
    icon: Share2,
    description: "Map questions to EHR fields",
    count: 18,
  },
  {
    label: "Assessments",
    href: "/assessments",
    icon: Users,
    description: "View submitted responses",
    count: 103,
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SECTIONS.map(({ label, href, icon: Icon, description, count }) => (
          <Link key={href} href={href}>
            <Card className="hover:shadow-md hover:ring-2 hover:ring-primary transition-all cursor-pointer">
              <CardContent className="relative p-4 space-y-2">
                <span className="absolute top-2 right-2 inline-flex items-center justify-center rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs font-semibold">
                  {count}
                </span>
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6 text-muted-foreground" />
                  <span className="text-lg font-semibold">{label}</span>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

    </div>
  );
}
