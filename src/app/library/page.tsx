"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Heart,
  MessageSquare,
  Clock,
  Youtube,
  Instagram,
  Upload,
  Wand2,
  ExternalLink,
  Sparkles,
  Grid3x3,
  List,
  ChevronDown,
} from "lucide-react";
import { mockVideos } from "@/lib/mock-data";
import type { Platform, VideoStatus } from "@/types";

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const platformFilters: { label: string; value: Platform | "all"; icon: typeof Youtube }[] = [
  { label: "Toutes", value: "all", icon: Grid3x3 },
  { label: "YouTube", value: "youtube", icon: Youtube },
  { label: "Instagram", value: "instagram", icon: Instagram },
  { label: "Local", value: "local", icon: Upload },
];

const statusFilters: { label: string; value: VideoStatus | "all" }[] = [
  { label: "Tous", value: "all" },
  { label: "À faire", value: "à_faire" },
  { label: "En cours", value: "en_cours" },
  { label: "Scripté", value: "scripté" },
  { label: "Publié", value: "publié" },
  { label: "Inspiration", value: "inspiration" },
];

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState<Platform | "all">("all");
  const [statusFilter, setStatusFilter] = useState<VideoStatus | "all">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const filtered = mockVideos.filter((v) => {
    if (search && !v.title.toLowerCase().includes(search.toLowerCase()) && !v.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) return false;
    if (platformFilter !== "all" && v.platform !== platformFilter) return false;
    if (statusFilter !== "all" && v.status !== statusFilter) return false;
    return true;
  });

  const selectedVideoData = selectedVideo ? mockVideos.find(v => v.id === selectedVideo) : null;

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 className="page-title">Bibliothèque Vidéo</h1>
          <p className="page-subtitle">{mockVideos.length} vidéos • {filtered.length} affichées</p>
        </div>
        <button className="btn-primary">
          <Upload size={16} />
          Ingérer
        </button>
      </div>

      {/* Filter Bar */}
      <div
        className="glass-card"
        style={{
          padding: "16px 20px",
          marginBottom: 24,
          display: "flex",
          gap: 16,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Search */}
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-tertiary)",
            }}
          />
          <input
            className="input-field"
            placeholder="Rechercher par titre ou tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: 36 }}
          />
        </div>

        {/* Platform filter */}
        <div style={{ display: "flex", gap: 4 }}>
          {platformFilters.map((pf) => {
            const Icon = pf.icon;
            return (
              <button
                key={pf.value}
                onClick={() => setPlatformFilter(pf.value)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 14px",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid",
                  borderColor: platformFilter === pf.value ? "var(--accent-primary)" : "var(--border-primary)",
                  background: platformFilter === pf.value ? "var(--accent-muted)" : "transparent",
                  color: platformFilter === pf.value ? "var(--accent-secondary)" : "var(--text-secondary)",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all var(--transition-fast)",
                }}
              >
                <Icon size={14} />
                {pf.label}
              </button>
            );
          })}
        </div>

        {/* View toggle */}
        <div style={{ display: "flex", gap: 2, background: "var(--bg-tertiary)", borderRadius: "var(--radius-md)", padding: 2 }}>
          <button
            onClick={() => setViewMode("grid")}
            style={{
              padding: "6px 10px",
              borderRadius: "var(--radius-sm)",
              border: "none",
              background: viewMode === "grid" ? "var(--bg-elevated)" : "transparent",
              color: viewMode === "grid" ? "var(--text-primary)" : "var(--text-tertiary)",
              cursor: "pointer",
              transition: "all var(--transition-fast)",
            }}
          >
            <Grid3x3 size={16} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            style={{
              padding: "6px 10px",
              borderRadius: "var(--radius-sm)",
              border: "none",
              background: viewMode === "list" ? "var(--bg-elevated)" : "transparent",
              color: viewMode === "list" ? "var(--text-primary)" : "var(--text-tertiary)",
              cursor: "pointer",
              transition: "all var(--transition-fast)",
            }}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Status tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, overflowX: "auto" }}>
        {statusFilters.map((sf) => (
          <button
            key={sf.value}
            onClick={() => setStatusFilter(sf.value)}
            style={{
              padding: "6px 16px",
              borderRadius: "var(--radius-full)",
              border: "1px solid",
              borderColor: statusFilter === sf.value ? "var(--accent-primary)" : "var(--border-primary)",
              background: statusFilter === sf.value ? "var(--accent-muted)" : "transparent",
              color: statusFilter === sf.value ? "var(--accent-secondary)" : "var(--text-secondary)",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all var(--transition-fast)",
              whiteSpace: "nowrap",
            }}
          >
            {sf.label}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: viewMode === "grid" ? "repeat(auto-fill, minmax(300px, 1fr))" : "1fr",
          gap: viewMode === "grid" ? 20 : 12,
        }}
      >
        {filtered.map((video, index) => (
          <div
            key={video.id}
            className="solid-card"
            onClick={() => setSelectedVideo(video.id === selectedVideo ? null : video.id)}
            style={{
              cursor: "pointer",
              overflow: "hidden",
              animationDelay: `${index * 50}ms`,
              animationFillMode: "both",
              animation: `slideUp 0.4s ease-out ${index * 50}ms both`,
            }}
          >
            {/* Thumbnail */}
            {viewMode === "grid" && (
              <div className="thumbnail-container">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(135deg, ${
                      video.platform === "youtube" ? "rgba(255,0,0,0.15)" : "rgba(228,64,95,0.15)"
                    }, var(--bg-tertiary))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {video.platform === "youtube" ? (
                    <Youtube size={40} style={{ color: "var(--text-tertiary)", opacity: 0.5 }} />
                  ) : (
                    <Instagram size={40} style={{ color: "var(--text-tertiary)", opacity: 0.5 }} />
                  )}
                </div>
                <div className="duration-badge">{formatDuration(video.duration)}</div>
                <div className="thumbnail-overlay">
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn-ghost" style={{ padding: "6px 10px", background: "rgba(0,0,0,0.6)", color: "white", fontSize: 12 }}>
                      <Wand2 size={12} /> Scripter
                    </button>
                    <button className="btn-ghost" style={{ padding: "6px 10px", background: "rgba(0,0,0,0.6)", color: "white", fontSize: 12 }}>
                      <ExternalLink size={12} /> Ouvrir
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Content */}
            <div style={{ padding: viewMode === "grid" ? "14px 16px" : "14px 16px", display: viewMode === "list" ? "flex" : "block", gap: 16 }}>
              {viewMode === "list" && (
                <div style={{ width: 160, minWidth: 160, aspectRatio: "16/9", borderRadius: "var(--radius-sm)", overflow: "hidden", background: "var(--bg-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  {video.platform === "youtube" ? <Youtube size={24} style={{ color: "var(--text-tertiary)", opacity: 0.5 }} /> : <Instagram size={24} style={{ color: "var(--text-tertiary)", opacity: 0.5 }} />}
                  <div className="duration-badge">{formatDuration(video.duration)}</div>
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span className={`badge ${video.platform === "youtube" ? "badge-youtube" : "badge-instagram"}`}>
                    {video.platform}
                  </span>
                  <span className={`badge ${video.status === "publié" ? "badge-success" : video.status === "scripté" ? "badge-accent" : video.status === "inspiration" ? "badge-warning" : "badge-error"}`}>
                    {video.status.replace("_", " ")}
                  </span>
                  {video.aiCategory && (
                    <span className="badge badge-accent" style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <Sparkles size={10} /> {video.aiCategory}
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 6px 0", lineHeight: 1.4 }}>
                  {video.title}
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "0 0 10px 0" }}>
                  {video.channelName}
                </p>
                {video.viewCount !== undefined && (
                  <div style={{ display: "flex", gap: 14, fontSize: 12, color: "var(--text-secondary)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Eye size={13} /> {formatNumber(video.viewCount)}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Heart size={13} /> {formatNumber(video.likeCount || 0)}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <MessageSquare size={13} /> {formatNumber(video.commentCount || 0)}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={13} /> {formatDuration(video.duration)}
                    </span>
                  </div>
                )}
                {/* Tags */}
                <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                  {video.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 11,
                        padding: "3px 8px",
                        background: "var(--bg-tertiary)",
                        borderRadius: "var(--radius-full)",
                        color: "var(--text-tertiary)",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Detail Modal */}
      {selectedVideoData && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
          }}
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="glass-card animate-slide-up"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 680,
              maxHeight: "80vh",
              overflow: "auto",
              padding: 28,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span className={`badge ${selectedVideoData.platform === "youtube" ? "badge-youtube" : "badge-instagram"}`}>
                    {selectedVideoData.platform}
                  </span>
                  <span className={`badge ${selectedVideoData.status === "publié" ? "badge-success" : "badge-accent"}`}>
                    {selectedVideoData.status.replace("_", " ")}
                  </span>
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{selectedVideoData.title}</h2>
                <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 4 }}>{selectedVideoData.channelName}</p>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="btn-ghost"
                style={{ fontSize: 20 }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 20 }}>
              {selectedVideoData.description}
            </p>

            {/* Metrics */}
            <div className="grid-stats" style={{ marginBottom: 20 }}>
              <div style={{ padding: 14, background: "var(--bg-tertiary)", borderRadius: "var(--radius-md)" }}>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Vues</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{formatNumber(selectedVideoData.viewCount || 0)}</div>
              </div>
              <div style={{ padding: 14, background: "var(--bg-tertiary)", borderRadius: "var(--radius-md)" }}>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Engagement</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{selectedVideoData.engagementRate?.toFixed(1)}%</div>
              </div>
              <div style={{ padding: 14, background: "var(--bg-tertiary)", borderRadius: "var(--radius-md)" }}>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Durée</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{formatDuration(selectedVideoData.duration)}</div>
              </div>
            </div>

            {/* Tags */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {selectedVideoData.tags.map(tag => (
                <span key={tag} className="badge badge-accent">#{tag}</span>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-primary"><Wand2 size={16} /> Générer Script</button>
              <button className="btn-secondary"><Sparkles size={16} /> Analyser</button>
              <a href={selectedVideoData.sourceUrl} target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: "none" }}>
                <ExternalLink size={16} /> Source
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
