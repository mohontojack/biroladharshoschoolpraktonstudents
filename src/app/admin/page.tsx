"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Search,
  Users,
  User,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  MessageSquare,
  Shield,
  Lock,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Registration {
  id: string;
  name: string;
  batch: string;
  phone: string;
  email: string | null;
  profession: string | null;
  location: string | null;
  attending: string;
  guests: number;
  message: string | null;
  createdAt: string;
}

interface ServerStats {
  total: number;
  attending: number;
  notAttending: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [authError, setAuthError] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 1,
  });
  const [stats, setStats] = useState<ServerStats>({
    total: 0,
    attending: 0,
    notAttending: 0,
  });
  const [search, setSearch] = useState("");
  const [batchFilter, setBatchFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const fetchRegistrations = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "50",
          api_key: apiKey,
        });
        if (search) params.set("search", search);
        if (batchFilter) params.set("batch", batchFilter);

        const res = await fetch(`/api/registrations?${params}`);

        if (res.status === 401) {
          setIsAuthenticated(false);
          setAuthError("Invalid API key");
          return;
        }

        const data = await res.json();

        if (data.success) {
          setRegistrations(data.data);
          setPagination(data.pagination);
          if (data.stats) {
            setStats(data.stats);
          }
        }
      } catch (err) {
        console.error("Failed to fetch registrations:", err);
      } finally {
        setLoading(false);
      }
    },
    [search, batchFilter, apiKey]
  );

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
    }
  }, [fetchRegistrations, isAuthenticated]);

  // Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedReg) {
        setSelectedReg(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedReg]);

  // Auth form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-forest/5 shadow-xl max-w-md w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-forest" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-forest-dark">Admin Login</h1>
              <p className="text-muted-foreground text-sm">Enter your API key to continue</p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (apiKey.trim()) {
                setIsAuthenticated(true);
                setAuthError("");
              }
            }}
          >
            <Input
              type="password"
              placeholder="Enter admin API key"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setAuthError("");
              }}
              className="h-12 bg-cream/50 border-forest/10 focus:border-forest/30 mb-4"
              autoFocus
            />
            {authError && (
              <p className="text-destructive text-sm mb-4">{authError}</p>
            )}
            <Button
              type="submit"
              className="w-full h-12 bg-forest hover:bg-forest-light text-white font-semibold rounded-xl"
              disabled={!apiKey.trim()}
            >
              Access Admin Panel
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-forest text-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Shield className="w-6 h-6 text-gold" />
                <h1 className="text-2xl font-bold">Admin Panel</h1>
              </div>
              <p className="text-white/60 text-sm">
                Biral Adarsha High School — Alumni Eid Reunion & Farewell 2026
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsAuthenticated(false)}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Logout
              </button>
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Go to Website
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats - from server, accurate across all pages */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-forest/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="text-2xl font-bold text-forest-dark">
                  {stats.total}
                </p>
                <p className="text-muted-foreground text-sm">Total Registered</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-forest/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-forest-dark">
                  {stats.attending}
                </p>
                <p className="text-muted-foreground text-sm">Attending</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-forest/5 col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <UserX className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-forest-dark">
                  {stats.notAttending}
                </p>
                <p className="text-muted-foreground text-sm">Not Attending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 pl-10 bg-white border-forest/10"
              onKeyDown={(e) => e.key === "Enter" && fetchRegistrations(1)}
            />
          </div>
          <Input
            placeholder="Filter by batch..."
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
            className="h-11 bg-white border-forest/10 sm:w-48"
            onKeyDown={(e) => e.key === "Enter" && fetchRegistrations(1)}
          />
          <Button
            onClick={() => fetchRegistrations(1)}
            variant="outline"
            className="h-11 border-forest/10 hover:bg-forest hover:text-white"
          >
            Search
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-forest/5 overflow-hidden">
          {/* Mobile Cards */}
          <div className="md:hidden">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-cream rounded w-3/4 mx-auto" />
                  <div className="h-3 bg-cream rounded w-1/2 mx-auto" />
                  <div className="h-3 bg-cream rounded w-2/3 mx-auto" />
                </div>
              </div>
            ) : registrations.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No registrations found
              </div>
            ) : (
              <div className="divide-y divide-forest/5">
                {registrations.map((reg) => (
                  <button
                    key={reg.id}
                    onClick={() => setSelectedReg(reg)}
                    className="w-full text-left p-4 hover:bg-cream transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-forest-dark">
                        {reg.name}
                      </span>
                      <Badge
                        variant={reg.attending === "yes" ? "default" : "secondary"}
                        className={
                          reg.attending === "yes"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-red-50 text-red-600 hover:bg-red-50"
                        }
                      >
                        {reg.attending === "yes" ? "Attending" : "Not Attending"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5" />
                        {reg.batch}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        {reg.phone}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-cream/50 border-b border-forest/5">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-forest-dark">#</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-forest-dark">Name</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-forest-dark">Batch</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-forest-dark">Phone</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-forest-dark">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-forest-dark">Guests</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-forest-dark">Date</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-forest-dark">Details</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-muted-foreground">
                      <div className="animate-pulse flex justify-center gap-2">
                        <div className="h-3 bg-cream rounded w-16" />
                        <div className="h-3 bg-cream rounded w-24" />
                        <div className="h-3 bg-cream rounded w-12" />
                      </div>
                    </td>
                  </tr>
                ) : registrations.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-muted-foreground">
                      No registrations found
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg, index) => (
                    <tr
                      key={reg.id}
                      className="border-b border-forest/5 hover:bg-cream/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {(pagination.page - 1) * pagination.limit + index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-forest-dark">{reg.name}</span>
                      </td>
                      <td className="px-6 py-4 text-sm">{reg.batch}</td>
                      <td className="px-6 py-4 text-sm">{reg.phone}</td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={reg.attending === "yes" ? "default" : "secondary"}
                          className={
                            reg.attending === "yes"
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-red-50 text-red-600 hover:bg-red-50"
                          }
                        >
                          {reg.attending === "yes" ? "Attending" : "Not Attending"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm">{reg.guests}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(reg.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedReg(reg)}
                          className="text-forest hover:text-forest-dark hover:bg-forest/5"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-forest/5">
              <p className="text-sm text-muted-foreground">
                Total {pagination.total} registrations
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page <= 1}
                  onClick={() => fetchRegistrations(pagination.page - 1)}
                  className="border-forest/10"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm px-3">
                  {pagination.page} / {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => fetchRegistrations(pagination.page + 1)}
                  className="border-forest/10"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal with Escape key + focus management */}
      {selectedReg && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedReg(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Registration details"
        >
          <div
            ref={modalRef}
            className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-forest-dark">
                Registration Details
              </h3>
              <button
                onClick={() => setSelectedReg(null)}
                className="w-8 h-8 rounded-lg bg-cream hover:bg-cream-dark flex items-center justify-center text-muted-foreground transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <DetailRow icon={User} label="Name" value={selectedReg.name} />
              <DetailRow icon={GraduationCap} label="Batch" value={selectedReg.batch} />
              <DetailRow icon={Phone} label="Phone" value={selectedReg.phone} />
              {selectedReg.email && (
                <DetailRow icon={Mail} label="Email" value={selectedReg.email} />
              )}
              {selectedReg.profession && (
                <DetailRow icon={Briefcase} label="Profession" value={selectedReg.profession} />
              )}
              {selectedReg.location && (
                <DetailRow icon={MapPin} label="Location" value={selectedReg.location} />
              )}
              <DetailRow
                icon={UserCheck}
                label="Attending"
                value={selectedReg.attending === "yes" ? "Yes" : "No"}
              />
              <DetailRow
                icon={Users}
                label="Guests"
                value={selectedReg.guests.toString()}
              />
              {selectedReg.message && (
                <DetailRow
                  icon={MessageSquare}
                  label="Message"
                  value={selectedReg.message}
                  isLong
                />
              )}
              <DetailRow
                label="Registered On"
                value={new Date(selectedReg.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              />
            </div>

            <div className="mt-6 pt-4 border-t border-forest/5">
              <p className="text-xs text-muted-foreground text-center">
                ID: {selectedReg.id}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
  isLong,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  isLong?: boolean;
}) {
  return (
    <div
      className={`flex ${isLong ? "flex-col gap-1" : "items-center justify-between"} gap-1 py-2`}
    >
      <span className="text-sm text-muted-foreground flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4" />}
        {label}
      </span>
      <span className={`font-medium text-forest-dark ${isLong ? "text-sm bg-cream p-3 rounded-lg" : ""}`}>
        {value}
      </span>
    </div>
  );
}
