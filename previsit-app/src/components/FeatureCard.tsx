import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  linkText?: string;
  href?: string;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  linkText,
  href,
}: FeatureCardProps) {
  return (
    <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition">
      <div className="mb-4 text-blue-600">
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {href && linkText && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          {linkText} →
        </a>
      )}
    </div>
  );
}
