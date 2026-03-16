"use client";

import {
  Video,
  FileText,
  TrendingUp,
  Sparkles,
  Upload,
  Wand2,
  ArrowUpRight,
  Eye,
  Clock,
  MousePointerClick,
  Heart,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { mockVideos, mockFeedback, mockInspirationNotes } from "@/lib/mock-data";

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const stats = [
  {
    label: "Vidéos ingérées",
    value: mockVideos.length,
    change: 12,
    icon: Video,
    color: "var(--accent-primary)",
    bg: "var(--accent-muted)",
  },
  {
    label: "Scripts générés",
    value: 3,
    change: 50,
    icon: FileText,
    color: "var(--success)",
    bg: "var(--success-muted)",
  },
  {
    label: "Engagement moyen",
    value: "8.2%",
    change: 1.4,
    icon: TrendingUp,
    color: "var(--warning)",
    bg: "var(--warning-muted)",
  },
  {
    label: "Insights IA",
    value: mockFeedback.filter((f) => !f.isRead).length,
    change: -1,
    icon: Sparkles,
    color: "#ec4899",
    bg: "rgba(236, 72, 153, 0.15)",
  },
];

export default function DashboardPage() {
  const recentVideos = mockVideos.slice(0, 4);
  const unreadFeedback = mockFeedback.filter((f) => !f.isRead);

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">
          Bienvenue, <span className="gradient-text">Uprising</span>
        </h1>
        <p className="page-subtitle">
          Votre moteur de contenu IA — Vue d&apos;ensemble
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid-stats" style={{ marginBottom: 32 }}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="solid-card"
              style={{ padding: "20px 24px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "var(--radius-md)",
                    background: stat.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={20} style={{ color: stat.color }} />
                </div>
                {stat.change !== undefined && (
                  <span
                    className={`badge ${stat.change > 0 ? "badge-success" : "badge-error"}`}
                  >
                    {stat.change > 0 ? "+" : ""}
                    {stat.change}%
                  </span>
                )}
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  marginBottom: 4,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: 32 }}>
        <h2 className="section-title">Actions rapides</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/library" style={{ textDecoration: "none" }}>
            <button className="btn-primary">
              <Upload size={16} />
              Ingérer une vidéo
            </button>
          </Link>
          <Link href="/scripts" style={{ textDecoration: "none" }}>
            <button className="btn-secondary">
              <Wand2 size={16} />
              Générer un script
            </button>
          </Link>
          <Link href="/analytics" style={{ textDecoration: "none" }}>
            <button className="btn-secondary">
              <TrendingUp size={16} />
              Voir les analytics
            </button>
          </Link>
        </div>
      </div>

      {/* Two column layout */}
      <div className="grid-2col">
        {/* Recent Videos */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <h2 className="section-title" style={{ margin: 0 }}>
              Vidéos récentes
            </h2>
            <Link
              href="/library"
              className="btn-ghost"
              style={{ textDecoration: "none", fontSize: 13 }}
            >
              Voir tout <ArrowUpRight size={14} />
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {recentVideos.map((video) => (
              <div
                key={video.id}
                className="solid-card"
                style={{
                  padding: 14,
                  display: "flex",
                  gap: 14,
                  cursor: "pointer",
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: 120,
                    minWidth: 120,
                    aspectRatio: "16/9",
                    borderRadius: "var(--radius-sm)",
                    background: `linear-gradient(135deg, var(--bg-tertiary), var(--bg-elevated))`,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    className="duration-badge"
                  >
                    {formatDuration(video.duration)}
                  </div>
                </div>
                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      marginBottom: 6,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {video.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-tertiary)",
                      marginBottom: 8,
                    }}
                  >
                    {video.channelName}
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span
                      className={`badge ${video.platform === "youtube" ? "badge-youtube" : "badge-instagram"}`}
                    >
                      {video.platform}
                    </span>
                    <span
                      className={`badge ${
                        video.status === "publié"
                          ? "badge-success"
                          : video.status === "scripté"
                            ? "badge-accent"
                            : video.status === "inspiration"
                              ? "badge-warning"
                              : "badge-error"
                      }`}
                    >
                      {video.status.replace("_", " ")}
                    </span>
                  </div>
                  {video.viewCount && (
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        marginTop: 8,
                        fontSize: 12,
                        color: "var(--text-tertiary)",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Eye size={12} /> {formatNumber(video.viewCount)}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Heart size={12} /> {formatNumber(video.likeCount || 0)}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <MousePointerClick size={12} />{" "}
                        {video.engagementRate?.toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <h2 className="section-title" style={{ margin: 0 }}>
              <Sparkles
                size={18}
                style={{
                  display: "inline",
                  verticalAlign: "middle",
                  marginRight: 8,
                  color: "var(--accent-primary)",
                }}
              />
              Insights IA
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {unreadFeedback.map((fb) => (
              <div
                key={fb.id}
                className="glass-card"
                style={{
                  padding: 16,
                  cursor: "pointer",
                  borderLeft: `3px solid ${
                    fb.type === "alert"
                      ? "var(--warning)"
                      : fb.type === "recommendation"
                        ? "var(--accent-primary)"
                        : "var(--info)"
                  }`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  {fb.type === "alert" ? (
                    <AlertTriangle size={16} color="var(--warning)" />
                  ) : fb.type === "recommendation" ? (
                    <Lightbulb size={16} color="var(--accent-primary)" />
                  ) : (
                    <CheckCircle2 size={16} color="var(--info)" />
                  )}
                  <span
                    style={{ fontSize: 14, fontWeight: 600 }}
                  >
                    {fb.title}
                  </span>
                  <span
                    className={`badge ${
                      fb.severity === "high"
                        ? "badge-error"
                        : fb.severity === "medium"
                          ? "badge-warning"
                          : "badge-accent"
                    }`}
                    style={{ marginLeft: "auto" }}
                  >
                    {fb.severity}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {fb.message}
                </p>
                {fb.actionSuggestion && (
                  <div
                    style={{
                      marginTop: 10,
                      padding: "8px 12px",
                      background: "var(--accent-muted)",
                      borderRadius: "var(--radius-sm)",
                      fontSize: 12,
                      color: "var(--accent-secondary)",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Wand2 size={12} />
                    {fb.actionSuggestion}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* REGAIN Framework highlight */}
          {mockInspirationNotes.length > 0 && (
            <div
              className="glass-card animate-pulse-glow"
              style={{
                padding: 16,
                marginTop: 16,
                border: "1px solid var(--border-accent)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 10,
                }}
              >
                <Sparkles size={16} color="var(--accent-primary)" />
                <span style={{ fontSize: 14, fontWeight: 700 }} className="gradient-text">
                  Framework REGAIN
                </span>
                <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>
                  via Grow with Alex
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {mockInspirationNotes[0].frameworks[0].steps.map((step, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 12,
                      color: "var(--text-secondary)",
                      padding: "6px 10px",
                      background: "var(--bg-tertiary)",
                      borderRadius: "var(--radius-sm)",
                      lineHeight: 1.4,
                    }}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
