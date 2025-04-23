import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string | number;
  color?: "default" | "success" | "warning" | "danger";
}

const colorMap = {
  default: "text-foreground",
  success: "text-green-600",
  warning: "text-yellow-600",
  danger: "text-red-600",
};

export function StatCard({ label, value, color = "default" }: StatCardProps) {
  return (
    <Card className="bg-muted/10 border-none shadow-none">
      <CardContent className="p-4 flex flex-col items-start space-y-1">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className={`text-2xl font-bold ${colorMap[color]}`}>{value}</div>
      </CardContent>
    </Card>
  );
}
