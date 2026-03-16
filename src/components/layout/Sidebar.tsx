"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Library,
  FileText,
  BarChart3,
  Settings,
  Zap,
  Sparkles,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Bibliothèque", href: "/library", icon: Library },
  { label: "Scripts", href: "/scripts", icon: FileText },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Réglages", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: "var(--sidebar-width)",
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border-primary)",
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
        transition: "width var(--transition-base)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "24px 20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderBottom: "1px solid var(--border-primary)",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "var(--radius-md)",
            background:
              "linear-gradient(135deg, var(--accent-primary), #7c3aed)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          <Zap size={18} color="white" />
        </div>
        <div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            Uprising
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--text-tertiary)",
              fontWeight: 500,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Video System
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: "4px" }}>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 14px",
                borderRadius: "var(--radius-md)",
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                color: isActive
                  ? "var(--text-primary)"
                  : "var(--text-secondary)",
                background: isActive ? "var(--accent-muted)" : "transparent",
                textDecoration: "none",
                transition: "all var(--transition-fast)",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "var(--bg-tertiary)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 3,
                    height: 20,
                    borderRadius: "0 4px 4px 0",
                    background: "var(--accent-primary)",
                  }}
                />
              )}
              <Icon
                size={18}
                style={{
                  color: isActive
                    ? "var(--accent-primary)"
                    : "var(--text-tertiary)",
                  transition: "color var(--transition-fast)",
                }}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid var(--border-primary)",
        }}
      >
        <div
          className="glass-card"
          style={{
            padding: "14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "var(--radius-full)",
              background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles size={14} color="white" />
          </div>
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              AI Assistant
            </div>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>
              Gemini connecté
            </div>
          </div>
          <div className="status-dot active" style={{ marginLeft: "auto" }} />
        </div>
      </div>
    </aside>
  );
}
