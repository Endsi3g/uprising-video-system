"use client";

import { useState } from "react";
import { Settings, Key, Mic, Globe, Youtube, Instagram, Save, Plus, Trash2, ExternalLink, Sparkles, Shield } from "lucide-react";
import { mockBrandConfig } from "@/lib/mock-data";

export default function SettingsPage() {
  const [brand] = useState(mockBrandConfig);
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <h1 className="page-title"><Settings size={28} style={{display:"inline",verticalAlign:"middle",marginRight:10,color:"var(--accent-primary)"}}/> Réglages</h1>
          <p className="page-subtitle">Configuration des APIs, voix de marque et chaînes de référence</p>
        </div>
        <button className="btn-primary" onClick={handleSave}>
          <Save size={16}/> {saved ? "Sauvegardé ✓" : "Sauvegarder"}
        </button>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:24}}>
        {/* API Keys */}
        <div className="solid-card" style={{padding:24}}>
          <h3 className="section-title" style={{display:"flex",alignItems:"center",gap:8}}><Key size={18} color="var(--accent-primary)"/> Clés API</h3>
          <p style={{fontSize:13,color:"var(--text-tertiary)",marginBottom:20}}>Configurez vos clés API pour activer les intégrations. Les clés sont chiffrées côté serveur.</p>
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {[
              {label:"Google AI (Gemini)",placeholder:"AIza...",icon:Sparkles,desc:"Analyse vidéo, génération de scripts, prédiction viralité"},
              {label:"YouTube Data API v3",placeholder:"AIza...",icon:Youtube,desc:"Métadonnées vidéo, analytics, recherche"},
              {label:"Instagram Graph API",placeholder:"EAAx...",icon:Instagram,desc:"Récupération Reels, métriques, insights"},
              {label:"Google Drive API",placeholder:"(Utilise l'auth Google)",icon:Globe,desc:"Upload/download, organisation dossiers"},
              {label:"OpenAI Whisper",placeholder:"sk-...",icon:Mic,desc:"Transcription audio → texte (optionnel, sinon Whisper local)"},
            ].map(api => (
              <div key={api.label} style={{padding:16,background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <api.icon size={16} color="var(--accent-primary)"/>
                  <span style={{fontSize:14,fontWeight:600}}>{api.label}</span>
                </div>
                <p style={{fontSize:12,color:"var(--text-tertiary)",margin:"0 0 10px 0"}}>{api.desc}</p>
                <div style={{display:"flex",gap:8}}>
                  <input className="input-field" type="password" placeholder={api.placeholder} style={{flex:1,fontFamily:"var(--font-mono)"}}/>
                  <button className="btn-ghost" style={{fontSize:12}}><Shield size={14}/> Test</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Voice */}
        <div className="solid-card" style={{padding:24}}>
          <h3 className="section-title" style={{display:"flex",alignItems:"center",gap:8}}><Mic size={18} color="var(--accent-primary)"/> Voix de marque</h3>
          <div style={{marginBottom:20}}>
            <label style={{fontSize:13,fontWeight:600,color:"var(--text-secondary)",display:"block",marginBottom:8}}>Nom de la marque</label>
            <input className="input-field" defaultValue={brand.brandName}/>
          </div>
          <div style={{marginBottom:20}}>
            <label style={{fontSize:13,fontWeight:600,color:"var(--text-secondary)",display:"block",marginBottom:8}}>Description de la voix</label>
            <textarea className="input-field" rows={4} defaultValue={brand.brandVoice} style={{resize:"vertical",lineHeight:1.7}}/>
          </div>
          <div className="grid-2col">
            <div>
              <label style={{fontSize:13,fontWeight:600,color:"var(--success)",display:"block",marginBottom:8}}>✓ Mots-clés de ton</label>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {brand.toneKeywords.map(kw => (
                  <span key={kw} className="badge badge-success">{kw}</span>
                ))}
                <button className="btn-ghost" style={{padding:"4px 8px",fontSize:11}}><Plus size={12}/></button>
              </div>
            </div>
            <div>
              <label style={{fontSize:13,fontWeight:600,color:"var(--error)",display:"block",marginBottom:8}}>✗ Mots à éviter</label>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {brand.avoidKeywords.map(kw => (
                  <span key={kw} className="badge badge-error">{kw}</span>
                ))}
                <button className="btn-ghost" style={{padding:"4px 8px",fontSize:11}}><Plus size={12}/></button>
              </div>
            </div>
          </div>
        </div>

        {/* Reference Channels */}
        <div className="solid-card" style={{padding:24}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <h3 className="section-title" style={{margin:0,display:"flex",alignItems:"center",gap:8}}><Globe size={18} color="var(--accent-primary)"/> Chaînes de référence</h3>
            <button className="btn-secondary" style={{fontSize:13}}><Plus size={14}/> Ajouter</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {brand.referenceChannels.map(ch => (
              <div key={ch.id} style={{padding:16,background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)",display:"flex",alignItems:"flex-start",gap:14}}>
                <div style={{width:40,height:40,borderRadius:"var(--radius-full)",background:ch.platform==="youtube"?"var(--youtube-muted)":"var(--instagram-muted)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {ch.platform==="youtube"?<Youtube size={18} color="var(--youtube)"/>:<Instagram size={18} color="var(--instagram)"/>}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>{ch.name}</div>
                  <p style={{fontSize:12,color:"var(--text-tertiary)",margin:"0 0 8px 0"}}>{ch.description}</p>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {ch.strengths.map(s => <span key={s} className="badge badge-accent" style={{fontSize:10}}>{s}</span>)}
                  </div>
                </div>
                <div style={{display:"flex",gap:4}}>
                  <a href={ch.url} target="_blank" rel="noreferrer" className="btn-ghost" style={{padding:6}}><ExternalLink size={14}/></a>
                  <button className="btn-ghost" style={{padding:6,color:"var(--error)"}}><Trash2 size={14}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Templates */}
        <div className="solid-card" style={{padding:24}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <h3 className="section-title" style={{margin:0}}>Templates de scripts</h3>
            <button className="btn-secondary" style={{fontSize:13}}><Plus size={14}/> Nouveau</button>
          </div>
          <div className="grid-cards">
            {brand.templates.map(t => (
              <div key={t.id} className="glass-card" style={{padding:18}}>
                <div style={{fontSize:15,fontWeight:600,marginBottom:6}}>{t.name}</div>
                <p style={{fontSize:12,color:"var(--text-tertiary)",lineHeight:1.6,marginBottom:12}}>{t.description}</p>
                <div style={{fontSize:12,color:"var(--text-secondary)",padding:10,background:"var(--bg-tertiary)",borderRadius:"var(--radius-sm)",marginBottom:10,fontFamily:"var(--font-mono)",lineHeight:1.6}}>
                  {t.structure}
                </div>
                <div style={{fontSize:11,color:"var(--accent-secondary)",fontStyle:"italic"}}>
                  Hook: {t.exampleHook}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
