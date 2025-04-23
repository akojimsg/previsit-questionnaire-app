import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow">
        <div className="max-w-5xl mx-auto text-lg font-semibold">
          Previsit Questionnaire
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto">{children}</div>
      </main>

      {/* Footer */}
      <footer className="text-sm text-gray-500 p-4 text-center">
        © {new Date().getFullYear()} Previsit Health
      </footer>
    </div>
  );
}
