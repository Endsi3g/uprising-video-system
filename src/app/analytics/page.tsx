"use client";

import { Eye, Clock, MousePointerClick, Heart, TrendingUp, BarChart3, Activity, Sparkles, AlertTriangle, Lightbulb, CheckCircle2, Wand2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { mockTimeSeriesViews, mockTimeSeriesEngagement, mockFeedback, mockVideos } from "@/lib/mock-data";

function fmt(n: number) { return n >= 1e6 ? (n/1e6).toFixed(1)+"M" : n >= 1e3 ? (n/1e3).toFixed(1)+"K" : ""+n; }

const stats = [
  { label: "Vues totales", value: "127.9K", change: 24.3, icon: Eye, color: "var(--accent-primary)", bg: "var(--accent-muted)" },
  { label: "Watch Time", value: "1,842 min", change: 18.7, icon: Clock, color: "var(--success)", bg: "var(--success-muted)" },
  { label: "CTR moyen", value: "7.3%", change: -1.2, icon: MousePointerClick, color: "var(--warning)", bg: "var(--warning-muted)" },
  { label: "Engagement", value: "8.2%", change: 5.1, icon: Heart, color: "#ec4899", bg: "rgba(236,72,153,0.15)" },
];
const topVideos = mockVideos.filter(v => v.viewCount).sort((a,b) => (b.viewCount||0) - (a.viewCount||0)).slice(0,5);

export default function AnalyticsPage() {
  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title"><BarChart3 size={28} style={{display:"inline",verticalAlign:"middle",marginRight:10,color:"var(--accent-primary)"}}/> Analytics</h1>
        <p className="page-subtitle">Performance multi-plateforme et insights IA — Mars 2026</p>
      </div>

      <div className="grid-stats" style={{marginBottom:28}}>
        {stats.map(s => { const I = s.icon; const pos = s.change > 0; return (
          <div key={s.label} className="solid-card" style={{padding:"20px 24px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div style={{width:40,height:40,borderRadius:"var(--radius-md)",background:s.bg,display:"flex",alignItems:"center",justifyContent:"center"}}><I size={20} style={{color:s.color}}/></div>
              <span style={{display:"flex",alignItems:"center",gap:3,fontSize:12,fontWeight:600,color:pos?"var(--success)":"var(--error)"}}>
                {pos ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}{pos?"+":""}{s.change}%
              </span>
            </div>
            <div style={{fontSize:26,fontWeight:700,letterSpacing:"-0.02em",marginBottom:4}}>{s.value}</div>
            <div style={{fontSize:13,color:"var(--text-secondary)"}}>{s.label}</div>
          </div>
        );})}
      </div>

      <div className="grid-2col" style={{marginBottom:28}}>
        <div className="solid-card" style={{padding:24}}>
          <h3 className="section-title" style={{display:"flex",alignItems:"center",gap:8}}><Activity size={18} color="var(--accent-primary)"/> Vues par plateforme</h3>
          <div style={{height:280}}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTimeSeriesViews}>
                <defs>
                  <linearGradient id="gYT" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ff0000" stopOpacity={0.3}/><stop offset="95%" stopColor="#ff0000" stopOpacity={0}/></linearGradient>
                  <linearGradient id="gIG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#e4405f" stopOpacity={0.3}/><stop offset="95%" stopColor="#e4405f" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)"/>
                <XAxis dataKey="date" tick={{fontSize:11,fill:"var(--text-tertiary)"}}/>
                <YAxis tick={{fontSize:11,fill:"var(--text-tertiary)"}}/>
                <Tooltip contentStyle={{background:"var(--bg-elevated)",border:"1px solid var(--border-secondary)",borderRadius:8}}/>
                <Legend wrapperStyle={{fontSize:12}}/>
                <Area type="monotone" dataKey="youtube" name="YouTube" stroke="#ff0000" fill="url(#gYT)" strokeWidth={2}/>
                <Area type="monotone" dataKey="instagram" name="Instagram" stroke="#e4405f" fill="url(#gIG)" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="solid-card" style={{padding:24}}>
          <h3 className="section-title" style={{display:"flex",alignItems:"center",gap:8}}><TrendingUp size={18} color="var(--success)"/> CTR & Engagement</h3>
          <div style={{height:280}}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTimeSeriesEngagement}>
                <defs>
                  <linearGradient id="gCTR" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--warning)" stopOpacity={0.3}/><stop offset="95%" stopColor="var(--warning)" stopOpacity={0}/></linearGradient>
                  <linearGradient id="gEng" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/><stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)"/>
                <XAxis dataKey="date" tick={{fontSize:11,fill:"var(--text-tertiary)"}}/>
                <YAxis tick={{fontSize:11,fill:"var(--text-tertiary)"}} unit="%"/>
                <Tooltip contentStyle={{background:"var(--bg-elevated)",border:"1px solid var(--border-secondary)",borderRadius:8}}/>
                <Legend wrapperStyle={{fontSize:12}}/>
                <Area type="monotone" dataKey="ctr" name="CTR" stroke="var(--warning)" fill="url(#gCTR)" strokeWidth={2}/>
                <Area type="monotone" dataKey="engagement" name="Engagement" stroke="var(--accent-primary)" fill="url(#gEng)" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid-2col">
        <div className="solid-card" style={{padding:24}}>
          <h3 className="section-title">Top vidéos</h3>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {topVideos.map((v,i) => (
              <div key={v.id} style={{display:"flex",alignItems:"center",gap:14,padding:"10px 14px",background:i===0?"var(--accent-muted)":"var(--bg-tertiary)",borderRadius:"var(--radius-md)",border:i===0?"1px solid var(--border-accent)":"none"}}>
                <span style={{fontSize:14,fontWeight:700,color:i===0?"var(--accent-primary)":"var(--text-tertiary)",width:24}}>#{i+1}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v.title}</div>
                  <div style={{fontSize:11,color:"var(--text-tertiary)"}}>{v.channelName}</div>
                </div>
                <div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:700}}>{fmt(v.viewCount||0)}</div><div style={{fontSize:11,color:"var(--text-tertiary)"}}>vues</div></div>
                <span className={`badge ${(v.engagementRate||0)>8?"badge-success":"badge-warning"}`}>{v.engagementRate?.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="solid-card" style={{padding:24}}>
          <h3 className="section-title" style={{display:"flex",alignItems:"center",gap:8}}><Sparkles size={18} color="var(--accent-primary)"/> Recommandations IA</h3>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {mockFeedback.map(fb => (
              <div key={fb.id} className="glass-card" style={{padding:14,borderLeft:`3px solid ${fb.type==="alert"?"var(--warning)":fb.type==="recommendation"?"var(--accent-primary)":"var(--info)"}`}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                  {fb.type==="alert"?<AlertTriangle size={14} color="var(--warning)"/>:fb.type==="recommendation"?<Lightbulb size={14} color="var(--accent-primary)"/>:<CheckCircle2 size={14} color="var(--info)"/>}
                  <span style={{fontSize:13,fontWeight:600}}>{fb.title}</span>
                </div>
                <p style={{fontSize:12,color:"var(--text-secondary)",lineHeight:1.6,margin:0}}>{fb.message}</p>
                {fb.actionSuggestion && <div style={{marginTop:8,padding:"6px 10px",background:"var(--accent-muted)",borderRadius:"var(--radius-sm)",fontSize:11,color:"var(--accent-secondary)",display:"flex",alignItems:"center",gap:4}}><Wand2 size={11}/> {fb.actionSuggestion}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
