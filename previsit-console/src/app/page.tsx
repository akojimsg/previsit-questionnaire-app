"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !tenantId) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userData = { email, tenantId };
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        sessionStorage.setItem("user", JSON.stringify(userData));
      }

      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-white p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-gray-200"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">
            Admin Console
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to manage your clinic setup
          </p>
        </div>

        {error && (
          <div className="text-red-600 bg-red-100 px-3 py-2 rounded text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tenantId">Tenant ID</Label>
          <Input
            id="tenantId"
            placeholder="clinic-123"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="rememberMe" className="text-sm">
            Remember me
          </Label>
          <Switch
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={setRememberMe}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </main>
  );
}
