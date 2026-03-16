"use client";

import { useState } from "react";
import {
  Wand2,
  Sparkles,
  ChevronRight,
  Copy,
  RotateCcw,
  Clock,
  Zap,
  Target,
  MessageSquare,
  TrendingUp,
  FileText,
  ChevronDown,
} from "lucide-react";
import { mockVideos, mockScripts, mockBrandConfig } from "@/lib/mock-data";

export default function ScriptsPage() {
  const [selectedSourceId, setSelectedSourceId] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<typeof mockScripts[0] | null>(null);
  const [activeTab, setActiveTab] = useState<"generate" | "history">("generate");

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedScript(mockScripts[0]);
    }, 2000);
  };

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">
          <Wand2
            size={28}
            style={{ display: "inline", verticalAlign: "middle", marginRight: 10, color: "var(--accent-primary)" }}
          />
          Génération de Scripts
        </h1>
        <p className="page-subtitle">Créez des scripts optimisés pour la viralité avec l&apos;IA Gemini</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "var(--bg-secondary)", borderRadius: "var(--radius-md)", padding: 4, width: "fit-content" }}>
        <button
          onClick={() => setActiveTab("generate")}
          style={{
            padding: "8px 20px",
            borderRadius: "var(--radius-sm)",
            border: "none",
            background: activeTab === "generate" ? "var(--accent-muted)" : "transparent",
            color: activeTab === "generate" ? "var(--accent-secondary)" : "var(--text-secondary)",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            transition: "all var(--transition-fast)",
          }}
        >
          <Wand2 size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
          Générer
        </button>
        <button
          onClick={() => setActiveTab("history")}
          style={{
            padding: "8px 20px",
            borderRadius: "var(--radius-sm)",
            border: "none",
            background: activeTab === "history" ? "var(--accent-muted)" : "transparent",
            color: activeTab === "history" ? "var(--accent-secondary)" : "var(--text-secondary)",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            transition: "all var(--transition-fast)",
          }}
        >
          <Clock size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
          Historique ({mockScripts.length})
        </button>
      </div>

      {activeTab === "generate" && (
        <div className="grid-2col">
          {/* Generator Form */}
          <div>
            <div className="solid-card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <Sparkles size={18} color="var(--accent-primary)" />
                Paramètres de génération
              </h3>

              {/* Source video */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 8 }}>
                  Vidéo source
                </label>
                <select
                  className="input-field"
                  value={selectedSourceId}
                  onChange={(e) => setSelectedSourceId(e.target.value)}
                  style={{ appearance: "none", cursor: "pointer" }}
                >
                  <option value="">Sélectionner une vidéo...</option>
                  {mockVideos.map(v => (
                    <option key={v.id} value={v.id}>{v.title} ({v.channelName})</option>
                  ))}
                </select>
              </div>

              {/* Reference channel */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 8 }}>
                  Chaîne de référence
                </label>
                <select
                  className="input-field"
                  value={selectedChannel}
                  onChange={(e) => setSelectedChannel(e.target.value)}
                  style={{ appearance: "none", cursor: "pointer" }}
                >
                  <option value="">Choisir un style de référence...</option>
                  {mockBrandConfig.referenceChannels.map(ch => (
                    <option key={ch.id} value={ch.name}>{ch.name} — {ch.strengths.join(", ")}</option>
                  ))}
                </select>
              </div>

              {/* Template */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 8 }}>
                  Template de script
                </label>
                <select
                  className="input-field"
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  style={{ appearance: "none", cursor: "pointer" }}
                >
                  <option value="">Choisir un template...</option>
                  {mockBrandConfig.templates.map(t => (
                    <option key={t.id} value={t.name}>{t.name} — {t.description}</option>
                  ))}
                </select>
              </div>

              {/* Brand voice info */}
              <div style={{ padding: 14, background: "var(--bg-tertiary)", borderRadius: "var(--radius-md)", marginBottom: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent-secondary)", marginBottom: 6 }}>
                  Voix de marque : {mockBrandConfig.brandName}
                </div>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", lineHeight: 1.6, margin: 0 }}>
                  {mockBrandConfig.brandVoice}
                </p>
                <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                  {mockBrandConfig.toneKeywords.map(kw => (
                    <span key={kw} style={{ fontSize: 10, padding: "2px 8px", background: "var(--accent-muted)", borderRadius: "var(--radius-full)", color: "var(--accent-secondary)" }}>
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Generate button */}
              <button
                className="btn-primary"
                onClick={handleGenerate}
                disabled={isGenerating}
                style={{
                  width: "100%",
                  padding: "14px",
                  fontSize: 15,
                  position: "relative",
                  overflow: "hidden",
                  opacity: isGenerating ? 0.7 : 1,
                }}
              >
                {isGenerating ? (
                  <>
                    <div className="shimmer" style={{ position: "absolute", inset: 0 }} />
                    <RotateCcw size={16} style={{ animation: "spin 1s linear infinite" }} />
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <Wand2 size={16} />
                    Générer le script
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Script Output */}
          <div>
            {generatedScript ? (
              <div className="glass-card animate-slide-up" style={{ padding: 24, border: "1px solid var(--border-accent)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{generatedScript.title}</h3>
                  <button className="btn-ghost" style={{ fontSize: 12 }}>
                    <Copy size={14} /> Copier
                  </button>
                </div>

                {/* Virality Score */}
                <div style={{ marginBottom: 24, padding: 16, background: "var(--bg-tertiary)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                      <TrendingUp size={14} color="var(--accent-primary)" />
                      Score de viralité
                    </span>
                    <span style={{ fontSize: 20, fontWeight: 700,  color: generatedScript.viralityScore > 70 ? "var(--success)" : generatedScript.viralityScore > 50 ? "var(--warning)" : "var(--error)" }}>
                      {generatedScript.viralityScore}/100
                    </span>
                  </div>
                  <div className="virality-meter">
                    <div className="virality-meter-fill" style={{ width: `${generatedScript.viralityScore}%` }} />
                  </div>
                </div>

                {/* Script sections */}
                {[
                  { label: "Hook", icon: Zap, content: generatedScript.hook, color: "var(--error)" },
                  { label: "Body", icon: FileText, content: generatedScript.body, color: "var(--accent-primary)" },
                  { label: "CTA", icon: Target, content: generatedScript.cta, color: "var(--success)" },
                ].map(section => {
                  const SIcon = section.icon;
                  return (
                    <div key={section.label} style={{ marginBottom: 20 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "var(--radius-sm)", background: `${section.color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <SIcon size={14} style={{ color: section.color }} />
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 600 }}>{section.label}</span>
                      </div>
                      <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8, padding: "12px 16px", background: "var(--bg-tertiary)", borderRadius: "var(--radius-md)", borderLeft: `3px solid ${section.color}`, whiteSpace: "pre-wrap" }}>
                        {section.content}
                      </div>
                    </div>
                  );
                })}

                {/* AI Notes */}
                <div style={{ padding: 14, background: "var(--accent-muted)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent-secondary)", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                    <Sparkles size={12} /> Notes IA
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                    {generatedScript.aiNotes}
                  </p>
                </div>

                {/* Meta */}
                <div style={{ display: "flex", gap: 12, marginTop: 16, fontSize: 11, color: "var(--text-tertiary)" }}>
                  <span>Template : {generatedScript.templateUsed}</span>
                  <span>•</span>
                  <span>Référence : {generatedScript.referenceChannel}</span>
                  <span>•</span>
                  <span>v{generatedScript.version}</span>
                </div>
              </div>
            ) : (
              <div
                className="solid-card"
                style={{
                  padding: 60,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  minHeight: 400,
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "var(--radius-lg)",
                    background: "var(--accent-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <FileText size={28} color="var(--accent-primary)" />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 8px 0" }}>Aucun script généré</h3>
                <p style={{ fontSize: 13, color: "var(--text-tertiary)", maxWidth: 300 }}>
                  Configurez vos paramètres à gauche et cliquez sur &quot;Générer le script&quot; pour commencer.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {mockScripts.map((script, index) => (
            <div
              key={script.id}
              className="solid-card"
              style={{
                padding: 20,
                cursor: "pointer",
                animation: `slideUp 0.4s ease-out ${index * 80}ms both`,
              }}
              onClick={() => {
                setGeneratedScript(script);
                setActiveTab("generate");
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 6px 0" }}>{script.title}</h3>
                  <div style={{ display: "flex", gap: 8, fontSize: 12, color: "var(--text-tertiary)" }}>
                    <span>v{script.version}</span>
                    <span>•</span>
                    <span>{script.templateUsed}</span>
                    <span>•</span>
                    <span>{script.referenceChannel}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: script.viralityScore > 70 ? "var(--success)" : script.viralityScore > 50 ? "var(--warning)" : "var(--error)",
                  }}>
                    {script.viralityScore}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>/100</div>
                </div>
              </div>

              <div style={{
                fontSize: 13,
                color: "var(--text-secondary)",
                padding: "10px 14px",
                background: "var(--bg-tertiary)",
                borderRadius: "var(--radius-sm)",
                borderLeft: "3px solid var(--error)",
                marginBottom: 10,
              }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--error)", display: "block", marginBottom: 4 }}>Hook</span>
                {script.hook.substring(0, 120)}...
              </div>

              <div className="virality-meter" style={{ marginTop: 8 }}>
                <div className="virality-meter-fill" style={{ width: `${script.viralityScore}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
