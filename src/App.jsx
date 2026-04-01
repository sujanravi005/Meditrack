import { useState,useEffect } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Nunito:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #f7f4ef;
  --surface: #ffffff;
  --card: #ffffff;
  --border: #e4ddd3;
  --border2: #d0c8bc;
  --accent: #2d7a5f;
  --accent-light: #e8f4f0;
  --accent2: #1a5fa8;
  --danger: #c0392b;
  --danger-light: #fdf0ee;
  --warn: #b8651a;
  --warn-light: #fdf4e7;
  --safe: #2d7a5f;
  --safe-light: #e8f4f0;
  --text: #2c2825;
  --text2: #5a524a;
  --muted: #9a8e83;
  --mono: 'JetBrains Mono', monospace;
  --serif: 'Lora', serif;
  --sans: 'Nunito', sans-serif;
  --shadow: 0 2px 16px rgba(44,40,37,.08);
  --shadow-md: 0 6px 28px rgba(44,40,37,.12);
}

body { background: var(--bg); color: var(--text); font-family: var(--sans); min-height: 100vh; }
.app { min-height: 100vh; display: flex; flex-direction: column; }

.header {
  background: var(--surface); border-bottom: 1px solid var(--border);
  padding: 0 32px; display: flex; align-items: center; justify-content: space-between;
  height: 64px; position: sticky; top: 0; z-index: 50;
  box-shadow: 0 1px 8px rgba(44,40,37,.06);
}
.logo { display: flex; align-items: center; gap: 10px; }
.logo-mark { width: 34px; height: 34px; border-radius: 10px; background: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 1rem; }
.logo-name { font-family: var(--serif); font-size: 1.1rem; font-weight: 600; color: var(--text); }
.logo-tagline { font-size: 0.68rem; color: var(--muted); font-family: var(--mono); }
.nav { display: flex; gap: 4px; }
.nav-btn {
  background: none; border: none; cursor: pointer; padding: 8px 16px;
  border-radius: 8px; font-family: var(--sans); font-size: 0.85rem; color: var(--text2);
  font-weight: 500; transition: all .18s; display: flex; align-items: center; gap: 6px;
}
.nav-btn:hover { background: var(--bg); color: var(--text); }
.nav-btn.active { background: var(--accent-light); color: var(--accent); font-weight: 700; }
.nav-badge { background: var(--danger); color: #fff; font-size: 0.65rem; font-family: var(--mono); padding: 1px 6px; border-radius: 10px; }

.main { flex: 1; padding: 36px 32px; max-width: 1100px; margin: 0 auto; width: 100%; }

.page-title { font-family: var(--serif); font-size: 1.75rem; font-weight: 600; color: var(--text); }
.page-sub { font-size: 0.88rem; color: var(--muted); margin-top: 4px; margin-bottom: 28px; }

.form-wrap { max-width: 640px; margin: 0 auto; }
.form-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 36px; box-shadow: var(--shadow-md); }

.step-bar { display: flex; align-items: flex-start; margin-bottom: 36px; }
.step-item { flex: 1; display: flex; flex-direction: column; align-items: center; }
.step-connector { flex: 1; height: 2px; background: var(--border); margin-top: 14px; transition: background .3s; align-self: flex-start; }
.step-connector.done { background: var(--accent); }
.step-circle {
  width: 30px; height: 30px; border-radius: 50%; border: 2px solid var(--border);
  background: var(--bg); color: var(--muted); font-size: 0.72rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center; z-index: 1; transition: all .25s;
  font-family: var(--mono);
}
.step-circle.active { border-color: var(--accent); color: var(--accent); background: var(--accent-light); box-shadow: 0 0 0 4px rgba(45,122,95,.1); }
.step-circle.done { border-color: var(--accent); background: var(--accent); color: #fff; }
.step-lbl { font-size: 0.62rem; color: var(--muted); margin-top: 6px; text-align: center; white-space: nowrap; font-weight: 500; }
.step-lbl.active { color: var(--accent); font-weight: 700; }

.field { margin-bottom: 20px; }
.field label { display: block; font-size: 0.82rem; font-weight: 600; color: var(--text2); margin-bottom: 6px; }
.field input, .field select, .field textarea {
  width: 100%; background: var(--bg); border: 1.5px solid var(--border);
  border-radius: 9px; padding: 10px 13px; color: var(--text); font-family: var(--sans);
  font-size: 0.88rem; outline: none; transition: border-color .18s, box-shadow .18s;
}
.field input:focus, .field select:focus, .field textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(45,122,95,.1); }
.field textarea { resize: vertical; min-height: 80px; }
.field select option { background: #fff; }
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.field-hint { font-size: 0.72rem; color: var(--muted); margin-top: 5px; }

.pain-wrap { margin-bottom: 20px; }
.pain-wrap > label { font-size: 0.82rem; font-weight: 600; color: var(--text2); display: block; margin-bottom: 10px; }
.pain-body { display: flex; align-items: center; gap: 14px; }
.pain-rail-wrap { flex: 1; }
.pain-rail-track { position: relative; height: 8px; border-radius: 4px; background: linear-gradient(90deg, #2d7a5f, #e6a817, #c0392b); }
input[type=range].pain-range { position: absolute; inset: 0; width: 100%; opacity: 0; cursor: pointer; height: 8px; z-index: 2; }
.pain-labels { display: flex; justify-content: space-between; margin-top: 7px; }
.pain-labels span { font-size: 0.68rem; color: var(--muted); }
.pain-badge { width: 52px; height: 52px; border-radius: 50%; border: 2.5px solid; display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 1.15rem; font-weight: 700; transition: all .2s; flex-shrink: 0; }

.add-row { display: flex; gap: 8px; margin-bottom: 10px; }
.add-row input, .add-row select { background: var(--bg); border: 1.5px solid var(--border); border-radius: 9px; padding: 9px 13px; font-family: var(--sans); font-size: 0.85rem; color: var(--text); outline: none; transition: border-color .18s; flex: 1; }
.add-row input:focus, .add-row select:focus { border-color: var(--accent); }
.add-row select { flex: 0 0 auto; }
.add-btn { background: var(--accent); color: #fff; border: none; border-radius: 9px; padding: 9px 16px; font-family: var(--sans); font-size: 0.82rem; font-weight: 700; cursor: pointer; white-space: nowrap; transition: opacity .18s; }
.add-btn:hover { opacity: 0.85; }
.add-btn:disabled { opacity: 0.35; cursor: default; }

.med-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.med-pill { background: var(--bg); border: 1.5px solid var(--border); border-radius: 9px; padding: 10px 14px; display: flex; align-items: center; gap: 10px; }
.med-pill-name { font-size: 0.85rem; font-weight: 600; flex: 1; }
.med-pill-dose { font-family: var(--mono); font-size: 0.7rem; color: var(--muted); }
.med-remove { background: none; border: none; color: var(--muted); cursor: pointer; font-size: 1rem; padding: 2px 6px; border-radius: 5px; transition: color .15s; }
.med-remove:hover { color: var(--danger); }

.sym-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; min-height: 36px; }
.sym-tag { display: flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; border: 1.5px solid var(--border); background: var(--bg); color: var(--text2); }
.sym-tag.danger { border-color: #f0b8b2; background: var(--danger-light); color: var(--danger); }
.sym-tag-x { background: none; border: none; cursor: pointer; color: inherit; font-size: 0.8rem; opacity: 0.6; padding: 0; line-height: 1; }
.sym-tag-x:hover { opacity: 1; }
.sym-suggestions { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 4px; }
.sym-suggest-btn { padding: 4px 12px; border-radius: 16px; border: 1.5px solid var(--border); background: transparent; font-size: 0.75rem; color: var(--text2); cursor: pointer; transition: all .15s; font-family: var(--sans); }
.sym-suggest-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-light); }
.sym-suggest-btn.danger { border-color: #f0b8b2; color: var(--danger); }
.sym-suggest-btn.danger:hover { background: var(--danger-light); }
.sym-suggest-label { font-size: 0.72rem; color: var(--muted); margin-bottom: 8px; font-weight: 600; }

.empty-hint { font-size: 0.82rem; color: var(--muted); font-style: italic; padding: 14px; text-align: center; border: 1.5px dashed var(--border); border-radius: 9px; margin-bottom: 12px; }

.review-block { background: var(--bg); border: 1.5px solid var(--border); border-radius: 10px; padding: 16px; margin-bottom: 12px; }
.review-lbl { font-size: 0.72rem; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .06em; margin-bottom: 8px; }

.btn-row { display: flex; justify-content: space-between; gap: 10px; margin-top: 28px; }
.btn { padding: 11px 22px; border-radius: 9px; border: none; cursor: pointer; font-family: var(--sans); font-size: 0.85rem; font-weight: 700; transition: all .18s; }
.btn-back { background: var(--bg); border: 1.5px solid var(--border); color: var(--text2); }
.btn-back:hover { border-color: var(--border2); color: var(--text); }
.btn-next { background: var(--accent); color: #fff; }
.btn-next:hover { opacity: 0.88; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(45,122,95,.3); }

.success-card { text-align: center; padding: 48px 24px; }
.success-emoji { font-size: 3.5rem; margin-bottom: 16px; }
.success-title { font-family: var(--serif); font-size: 1.6rem; font-weight: 600; }
.success-sub { font-size: 0.88rem; color: var(--muted); margin-top: 10px; line-height: 1.7; }
.success-actions { margin-top: 28px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }

.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 28px; }
.stat-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 20px; box-shadow: var(--shadow); }
.stat-lbl { font-size: 0.73rem; color: var(--muted); font-weight: 600; }
.stat-val { font-family: var(--mono); font-size: 2rem; font-weight: 700; margin-top: 6px; line-height: 1; }
.stat-val.d { color: var(--danger); }
.stat-val.w { color: var(--warn); }
.stat-val.s { color: var(--safe); }
.stat-val.a { color: var(--accent2); }
.stat-sub { font-size: 0.7rem; color: var(--muted); margin-top: 4px; }

.section-divider { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; margin-top: 24px; }
.section-divider-line { flex: 1; height: 1px; background: var(--border); }
.section-divider-label { font-size: 0.75rem; font-weight: 700; color: var(--muted); white-space: nowrap; display: flex; align-items: center; gap: 6px; }

.patient-card {
  background: var(--card); border: 1px solid var(--border); border-radius: 12px;
  padding: 16px 20px; margin-bottom: 10px; display: grid;
  grid-template-columns: 36px 1fr auto auto; align-items: center; gap: 16px;
  transition: box-shadow .18s, border-color .18s; box-shadow: var(--shadow);
}
.patient-card:hover { box-shadow: var(--shadow-md); border-color: var(--border2); }
.patient-card.critical { border-left: 4px solid var(--danger); }
.patient-card.moderate { border-left: 4px solid #e6a817; }
.patient-card.stable { border-left: 4px solid var(--safe); }
.patient-card.new-entry { animation: slideIn .4s ease; }
@keyframes slideIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }

.rank-bubble { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 0.78rem; font-weight: 700; }
.rank-bubble.critical { background: var(--danger-light); color: var(--danger); }
.rank-bubble.moderate { background: var(--warn-light); color: var(--warn); }
.rank-bubble.stable { background: var(--safe-light); color: var(--safe); }

.pt-name { font-weight: 700; font-size: 0.92rem; }
.pt-meta { font-size: 0.76rem; color: var(--text2); margin-top: 2px; }
.pt-tags { display: flex; gap: 5px; margin-top: 6px; flex-wrap: wrap; }
.pt-tag { font-size: 0.68rem; padding: 2px 9px; border-radius: 10px; font-weight: 600; }
.pt-tag.new-tag { background: rgba(26,95,168,.12); color: var(--accent2); }
.pt-tag.sym { background: var(--danger-light); color: var(--danger); }

.pain-badge-sm { display: flex; align-items: center; gap: 5px; padding: 5px 11px; border-radius: 20px; font-family: var(--mono); font-size: 0.75rem; font-weight: 700; border: 1.5px solid; }
.pain-badge-sm.critical { border-color: #f0b8b2; color: var(--danger); background: var(--danger-light); }
.pain-badge-sm.moderate { border-color: #f0d8a8; color: var(--warn); background: var(--warn-light); }
.pain-badge-sm.stable { border-color: #a8d8c8; color: var(--safe); background: var(--safe-light); }

.med-badge { font-size: 0.72rem; font-weight: 600; }
.med-badge.ok { color: var(--safe); }
.med-badge.miss { color: var(--muted); }

.empty-portal { text-align: center; padding: 48px; color: var(--muted); font-size: 0.88rem; border: 1.5px dashed var(--border); border-radius: 12px; }

.security-intro { background: linear-gradient(135deg, rgba(26,95,168,.07), rgba(45,122,95,.05)); border: 1px solid rgba(26,95,168,.2); border-radius: 12px; padding: 20px 24px; margin-bottom: 24px; display: flex; gap: 14px; align-items: flex-start; }
.security-intro-text { font-size: 0.88rem; line-height: 1.65; color: var(--text2); }
.security-intro-text strong { color: var(--text); }
.security-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.sec-panel { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 22px; box-shadow: var(--shadow); }
.sec-panel.vuln { border-top: 3px solid var(--danger); }
.sec-panel.rec { border-top: 3px solid var(--safe); }
.sec-panel-title { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; margin-bottom: 18px; }
.sec-panel.vuln .sec-panel-title { color: var(--danger); }
.sec-panel.rec .sec-panel-title { color: var(--safe); }
.sec-item { display: flex; gap: 10px; margin-bottom: 16px; }
.sec-item-icon { font-size: 1.05rem; flex-shrink: 0; padding-top: 1px; }
.sec-item-body { flex: 1; }
.sec-item-title { font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.sec-item-desc { font-size: 0.79rem; color: var(--text2); line-height: 1.55; margin-top: 3px; }
.sec-item-detail { font-family: var(--mono); font-size: 0.65rem; color: var(--muted); margin-top: 4px; }
.sev-tag { font-size: 0.6rem; padding: 2px 7px; border-radius: 4px; font-weight: 700; font-family: var(--mono); }
.sev-tag.critical { background: var(--danger-light); color: var(--danger); }
.sev-tag.high { background: var(--warn-light); color: var(--warn); }

@media (max-width: 680px) {
  .stats-row { grid-template-columns: 1fr 1fr; }
  .security-cols { grid-template-columns: 1fr; }
  .field-row { grid-template-columns: 1fr; }
  .patient-card { grid-template-columns: 34px 1fr; }
  .main { padding: 20px 16px; }
  .form-card { padding: 20px; }
  .header { padding: 0 16px; }
}
`;

const getPainClass = p => p >= 7 ? "critical" : p >= 4 ? "moderate" : "stable";
const getPainColor = p => p >= 7 ? "#c0392b" : p >= 4 ? "#b8651a" : "#2d7a5f";
const getDaysPost = surgDate => {
  if (!surgDate) return "?";
  const diff = Math.floor((Date.now() - new Date(surgDate)) / 86400000);
  return diff >= 0 ? diff : "?";
};

const STEPS = ["Info", "Pain & Vitals", "Medications", "Symptoms", "Review"];

const SUGGESTED_SYMPTOMS = [
  { label: "Fever", danger: true }, { label: "Swelling", danger: true },
  { label: "Bleeding", danger: true }, { label: "Shortness of breath", danger: true },
  { label: "Nausea", danger: false }, { label: "Fatigue", danger: false },
  { label: "Dizziness", danger: false }, { label: "Redness at incision", danger: false },
  { label: "Constipation", danger: false }, { label: "Insomnia", danger: false },
];

const DEMO_PATIENTS = [
  { id: 1, name: "Anjali Mehra", surgery: "Total Knee Replacement", surgDate: "2026-03-25", pain: 9, medications: [{ name: "Paracetamol 500mg", schedule: "4× daily" }], symptoms: ["Fever", "Swelling"], isNew: false },
  { id: 2, name: "Ravi Sharma", surgery: "Appendectomy", surgDate: "2026-03-23", pain: 7, medications: [{ name: "Amoxicillin 250mg", schedule: "3× daily" }], symptoms: ["Nausea"], isNew: false },
  { id: 3, name: "Priya Nair", surgery: "Cholecystectomy", surgDate: "2026-03-21", pain: 5, medications: [{ name: "Omeprazole 20mg", schedule: "1× daily" }], symptoms: ["Fatigue"], isNew: false },
  { id: 4, name: "Suresh Iyer", surgery: "Hernia Repair", surgDate: "2026-03-18", pain: 4, medications: [], symptoms: [], isNew: false },
  { id: 5, name: "Deepa Rao", surgery: "Cataract Surgery", surgDate: "2026-03-14", pain: 2, medications: [{ name: "Eye drops", schedule: "4× daily" }], symptoms: [], isNew: false },
];

function isDangerSym(s) {
  return SUGGESTED_SYMPTOMS.some(x => x.danger && x.label.toLowerCase() === s.toLowerCase());
}

// ── Step 1 ────────────────────────────────────────────────────────────────────
function StepInfo({ data, setData }) {
  return (
    <>
      <div className="field-row">
        <div className="field">
          <label>Full name</label>
          <input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} placeholder="e.g. Priya Nair" />
        </div>
        <div className="field">
          <label>Date of birth</label>
          <input type="date" value={data.dob} onChange={e => setData({ ...data, dob: e.target.value })} />
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label>Patient ID</label>
          <input value={data.pid} onChange={e => setData({ ...data, pid: e.target.value })} placeholder="e.g. PT-2026-001" />
        </div>
        <div className="field">
          <label>Surgery type</label>
          <select value={data.surgery} onChange={e => setData({ ...data, surgery: e.target.value })}>
            <option value="">Choose one…</option>
            <option>Total Knee Replacement</option>
            <option>Appendectomy</option>
            <option>Laparoscopic Cholecystectomy</option>
            <option>Hernia Repair</option>
            <option>Cataract Surgery</option>
            <option>Cardiac Bypass</option>
            <option>Tonsillectomy</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label>Surgery date</label>
        <input type="date" value={data.surgDate} onChange={e => setData({ ...data, surgDate: e.target.value })} />
        <div className="field-hint">We use this to calculate how many days post-op you are.</div>
      </div>
    </>
  );
}

// ── Step 2 ────────────────────────────────────────────────────────────────────
function StepPainVitals({ data, setData }) {
  const color = getPainColor(data.pain);
  return (
    <>
      <div className="pain-wrap">
        <label>How would you rate your pain right now? <span style={{ color, fontWeight: 700 }}>{data.pain} / 10</span></label>
        <div className="pain-body">
          <div className="pain-rail-wrap">
            <div className="pain-rail-track" style={{ position: "relative" }}>
              <input type="range" className="pain-range" min={0} max={10} value={data.pain}
                onChange={e => setData({ ...data, pain: +e.target.value })} />
            </div>
            <div className="pain-labels"><span>No pain</span><span>Moderate</span><span>Worst</span></div>
          </div>
          <div className="pain-badge" style={{ borderColor: color, color, background: color + "18" }}>{data.pain}</div>
        </div>
      </div>
      <div className="field-row">
        <div className="field"><label>Temperature (°C)</label><input type="number" step="0.1" value={data.temp} onChange={e => setData({ ...data, temp: e.target.value })} placeholder="37.0" /></div>
        <div className="field"><label>Heart rate (bpm)</label><input type="number" value={data.hr} onChange={e => setData({ ...data, hr: e.target.value })} placeholder="72" /></div>
      </div>
      <div className="field-row">
        <div className="field"><label>Blood pressure</label><input value={data.bp} onChange={e => setData({ ...data, bp: e.target.value })} placeholder="120/80 mmHg" /></div>
        <div className="field"><label>SpO₂ (%)</label><input type="number" value={data.spo2} onChange={e => setData({ ...data, spo2: e.target.value })} placeholder="98" /></div>
      </div>
      <div className="field">
        <label>How are you feeling overall?</label>
        <select value={data.wellbeing} onChange={e => setData({ ...data, wellbeing: e.target.value })}>
          <option value="">Choose one…</option>
          <option>Much better than yesterday</option>
          <option>A little better</option>
          <option>About the same</option>
          <option>A little worse</option>
          <option>Much worse</option>
        </select>
      </div>
    </>
  );
}

// ── Step 3 — Add medications ──────────────────────────────────────────────────
function StepMedications({ data, setData }) {
  const [medName, setMedName] = useState("");
  const [medSchedule, setMedSchedule] = useState("Once daily");
  const meds = data.medications || [];

  const add = () => {
    if (!medName.trim()) return;
    setData({ ...data, medications: [...meds, { name: medName.trim(), schedule: medSchedule }] });
    setMedName("");
  };

  const remove = i => setData({ ...data, medications: meds.filter((_, idx) => idx !== i) });

  return (
    <>
      <div className="field">
        <label>Add a medication you're currently taking</label>
        <div className="add-row">
          <input value={medName} onChange={e => setMedName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && add()}
            placeholder="e.g. Paracetamol 500mg" />
          <select value={medSchedule} onChange={e => setMedSchedule(e.target.value)}>
            <option>Once daily</option>
            <option>Twice daily</option>
            <option>3× daily</option>
            <option>4× daily</option>
            <option>As needed</option>
          </select>
          <button className="add-btn" onClick={add} disabled={!medName.trim()}>+ Add</button>
        </div>
        <div className="field-hint">Press Enter or click Add. Repeat for each medication.</div>
      </div>

      {meds.length === 0
        ? <div className="empty-hint">No medications added yet — type above to get started.</div>
        : <div className="med-list">
            {meds.map((m, i) => (
              <div key={i} className="med-pill">
                <span>💊</span>
                <span className="med-pill-name">{m.name}</span>
                <span className="med-pill-dose">{m.schedule}</span>
                <button className="med-remove" onClick={() => remove(i)}>✕</button>
              </div>
            ))}
          </div>
      }

      <div className="field" style={{ marginTop: 8 }}>
        <label>Any missed doses or concerns?</label>
        <textarea value={data.missedReason} onChange={e => setData({ ...data, missedReason: e.target.value })}
          placeholder="Leave blank if all's fine. Otherwise describe here…" />
      </div>
    </>
  );
}

// ── Step 4 — Add symptoms ─────────────────────────────────────────────────────
function StepSymptoms({ data, setData }) {
  const [input, setInput] = useState("");
  const syms = data.symptoms || [];

  const add = (label) => {
    if (!label.trim() || syms.includes(label.trim())) return;
    setData({ ...data, symptoms: [...syms, label.trim()] });
    setInput("");
  };

  const remove = s => setData({ ...data, symptoms: syms.filter(x => x !== s) });
  const available = SUGGESTED_SYMPTOMS.filter(s => !syms.includes(s.label));

  return (
    <>
      <div className="field">
        <label>Type a symptom and press Enter, or pick from the list below</label>
        <div className="add-row">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && input.trim()) add(input); }}
            placeholder="e.g. Headache, Itching, Back pain…" />
          <button className="add-btn" onClick={() => add(input)} disabled={!input.trim()}>+ Add</button>
        </div>
      </div>

      {syms.length > 0 && (
        <div className="sym-tags">
          {syms.map(s => (
            <span key={s} className={`sym-tag ${isDangerSym(s) ? "danger" : ""}`}>
              {isDangerSym(s) ? "⚠ " : ""}{s}
              <button className="sym-tag-x" onClick={() => remove(s)}>✕</button>
            </span>
          ))}
        </div>
      )}

      {syms.length === 0 && (
        <div className="empty-hint">No symptoms added yet — that's a good sign! 🙂 Add any you're experiencing.</div>
      )}

      {available.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <div className="sym-suggest-label">Common post-op symptoms — click to add quickly:</div>
          <div className="sym-suggestions">
            {available.map(s => (
              <button key={s.label} className={`sym-suggest-btn ${s.danger ? "danger" : ""}`} onClick={() => add(s.label)}>
                {s.danger ? "⚠ " : ""}{s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="field">
        <label>Anything else for your doctor to know?</label>
        <textarea value={data.notes} onChange={e => setData({ ...data, notes: e.target.value })}
          placeholder="Wound appearance, mood, sleep quality, anything unusual…" />
      </div>
    </>
  );
}

// ── Step 5 — Review ───────────────────────────────────────────────────────────
function StepReview({ formData }) {
  const color = getPainColor(formData.pain);
  const pc = getPainClass(formData.pain);
  return (
    <div>
      <div className="review-block">
        <div className="review-lbl">Patient</div>
        <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{formData.name || "—"}</div>
        <div style={{ fontSize: "0.78rem", color: "var(--text2)", marginTop: 2 }}>
          {formData.surgery || "—"} · Surgery on {formData.surgDate || "—"} · Day {getDaysPost(formData.surgDate)} post-op
        </div>
      </div>
      <div className="review-block" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <div>
          <div className="review-lbl">Pain</div>
          <span style={{ fontFamily: "var(--mono)", fontSize: "1.4rem", fontWeight: 700, color }}>{formData.pain}/10</span>
          <span style={{ fontFamily: "var(--mono)", fontSize: "0.7rem", color, marginLeft: 8 }}>{pc.toUpperCase()}</span>
        </div>
        <div>
          <div className="review-lbl">Vitals</div>
          <div style={{ fontSize: "0.82rem", color: "var(--text2)" }}>
            {[formData.temp && `${formData.temp}°C`, formData.hr && `${formData.hr} bpm`, formData.bp, formData.spo2 && `SpO₂ ${formData.spo2}%`].filter(Boolean).join(" · ") || "—"}
          </div>
        </div>
        <div>
          <div className="review-lbl">Wellbeing</div>
          <div style={{ fontSize: "0.82rem", color: "var(--text2)" }}>{formData.wellbeing || "—"}</div>
        </div>
      </div>
      <div className="review-block">
        <div className="review-lbl">Medications ({(formData.medications || []).length})</div>
        {!(formData.medications || []).length
          ? <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>None added</div>
          : formData.medications.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 8, fontSize: "0.85rem", marginBottom: 4 }}>
                <span>💊</span>
                <span style={{ fontWeight: 600 }}>{m.name}</span>
                <span style={{ color: "var(--muted)", fontSize: "0.78rem" }}>{m.schedule}</span>
              </div>
            ))
        }
      </div>
      <div className="review-block">
        <div className="review-lbl">Symptoms ({(formData.symptoms || []).length})</div>
        {!(formData.symptoms || []).length
          ? <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>None reported</div>
          : <div className="sym-tags" style={{ marginBottom: 0 }}>
              {formData.symptoms.map(s => (
                <span key={s} className={`sym-tag ${isDangerSym(s) ? "danger" : ""}`}>
                  {isDangerSym(s) ? "⚠ " : ""}{s}
                </span>
              ))}
            </div>
        }
      </div>
      {formData.notes && (
        <div className="review-block">
          <div className="review-lbl">Notes</div>
          <div style={{ fontSize: "0.84rem", color: "var(--text2)", lineHeight: 1.55 }}>{formData.notes}</div>
        </div>
      )}
    </div>
  );
}

// ── Form Shell ────────────────────────────────────────────────────────────────
const BLANK = { name:"", dob:"", pid:"", surgery:"", surgDate:"", pain:3, temp:"", hr:"", bp:"", spo2:"", wellbeing:"", medications:[], missedReason:"", symptoms:[], notes:"" };

function PatientForm({ onSubmit }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [fd, setFd] = useState({ ...BLANK });

  const submit = () => {
    onSubmit({ ...fd, id: Date.now(), isNew: true });
    setSubmittedName(fd.name);
    setDone(true);
  };

  const reset = () => { setFd({ ...BLANK }); setStep(0); setDone(false); };

  if (done) return (
    <div className="form-wrap">
      <div className="form-card">
        <div className="success-card">
          <div className="success-emoji">🩺</div>
          <div className="success-title">Report submitted</div>
          <div className="success-sub">
            {submittedName ? `${submittedName}'s` : "Your"} daily check-in has been sent to the care team.<br />
            A nurse will follow up if your readings need attention.
          </div>
          <div className="success-actions">
            <button className="btn btn-next" onClick={reset}>Submit another report</button>
            <button className="btn btn-back" onClick={reset}>Done</button>
          </div>
        </div>
      </div>
    </div>
  );

  const steps = [
    <StepInfo data={fd} setData={setFd} />,
    <StepPainVitals data={fd} setData={setFd} />,
    <StepMedications data={fd} setData={setFd} />,
    <StepSymptoms data={fd} setData={setFd} />,
    <StepReview formData={fd} />,
  ];

  return (
    <div className="form-wrap">
      <div className="page-title">Daily recovery check-in</div>
      <div className="page-sub">Takes about 3 minutes. Your doctor reviews this every morning.</div>
      <div className="form-card">
        {/* Step bar */}
        <div className="step-bar">
          {STEPS.map((s, i) => (
            <div key={i} className="step-item" style={{ flexDirection: "row", flex: i === 0 ? 0 : 1, alignItems: "center" }}>
              {i > 0 && <div className={`step-connector ${i <= step ? "done" : ""}`} />}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className={`step-circle ${i < step ? "done" : i === step ? "active" : ""}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <div className={`step-lbl ${i === step ? "active" : ""}`}>{s}</div>
              </div>
            </div>
          ))}
        </div>

        {steps[step]}

        <div className="btn-row">
          {step > 0 ? <button className="btn btn-back" onClick={() => setStep(s => s - 1)}>← Back</button> : <span />}
          {step < STEPS.length - 1
            ? <button className="btn btn-next" onClick={() => setStep(s => s + 1)}>Continue →</button>
            : <button className="btn btn-next" onClick={submit}>Submit report ✓</button>
          }
        </div>
      </div>
    </div>
  );
}

// ── Clinical Portal ───────────────────────────────────────────────────────────
function ClinicalPortal({ patients }) {
  const sorted = [...patients].sort((a, b) => b.pain - a.pain);
  const critical = sorted.filter(p => getPainClass(p.pain) === "critical");
  const moderate = sorted.filter(p => getPainClass(p.pain) === "moderate");
  const stable = sorted.filter(p => getPainClass(p.pain) === "stable");

  function Group({ emoji, label, list }) {
    if (!list.length) return null;
    return (
      <>
        <div className="section-divider">
          <div className="section-divider-label">{emoji} {label}</div>
          <div className="section-divider-line" />
          <span style={{ fontFamily: "var(--mono)", fontSize: "0.7rem", color: "var(--muted)" }}>{list.length}</span>
        </div>
        {list.map((p, i) => {
          const pc = getPainClass(p.pain);
          return (
            <div key={p.id} className={`patient-card ${pc} ${p.isNew ? "new-entry" : ""}`}>
              <div className={`rank-bubble ${pc}`}>{i + 1}</div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="pt-name">{p.name}</span>
                  {p.isNew && <span className="pt-tag new-tag">New</span>}
                </div>
                <div className="pt-meta">{p.surgery} · Day {getDaysPost(p.surgDate)} post-op</div>
                {(p.symptoms || []).length > 0 && (
                  <div className="pt-tags">
                    {p.symptoms.map(s => <span key={s} className="pt-tag sym">⚠ {s}</span>)}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                <div className={`pain-badge-sm ${pc}`}>● {p.pain}/10</div>
                <div className={`med-badge ${(p.medications || []).length > 0 ? "ok" : "miss"}`}>
                  {(p.medications || []).length > 0
                    ? `✓ ${p.medications.length} med${p.medications.length > 1 ? "s" : ""} logged`
                    : "No meds logged"}
                </div>
              </div>
              <button style={{ padding: "7px 14px", borderRadius: 8, border: "1.5px solid var(--border)", background: "transparent", color: "var(--text2)", fontSize: "0.78rem", fontFamily: "var(--sans)", fontWeight: 600, cursor: "pointer" }}>
                Contact
              </button>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
        <div>
          <div className="page-title">Clinical priority queue</div>
          <div className="page-sub" style={{ marginBottom: 0 }}>Patients ranked by reported pain severity · Updates when a new report is submitted</div>
        </div>
        <span style={{ fontFamily: "var(--mono)", fontSize: "0.7rem", color: "var(--muted)", paddingTop: 6 }}>{new Date().toLocaleString()}</span>
      </div>
      <div className="stats-row">
        <div className="stat-card"><div className="stat-lbl">All patients</div><div className="stat-val a">{patients.length}</div><div className="stat-sub">Monitored today</div></div>
        <div className="stat-card"><div className="stat-lbl">Critical · Pain ≥7</div><div className="stat-val d">{critical.length}</div><div className="stat-sub">Needs attention</div></div>
        <div className="stat-card"><div className="stat-lbl">Moderate · 4–6</div><div className="stat-val w">{moderate.length}</div><div className="stat-sub">Keep an eye on</div></div>
        <div className="stat-card"><div className="stat-lbl">Stable · ≤3</div><div className="stat-val s">{stable.length}</div><div className="stat-sub">Recovering well</div></div>
      </div>
      {patients.length === 0
        ? <div className="empty-portal">No reports yet. Submit one from the Patient Report tab and it'll appear here instantly.</div>
        : <>
            <Group emoji="🔴" label="Critical Priority" list={critical} />
            <Group emoji="🟡" label="Moderate Priority" list={moderate} />
            <Group emoji="🟢" label="Stable" list={stable} />
          </>
      }
    </div>
  );
}


// ── Root ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("form");

  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem("patients");
    return saved ? JSON.parse(saved) : DEMO_PATIENTS;
  });

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  const handleSubmit = entry => setPatients(prev => [entry, ...prev]);

  const critCount = patients.filter(p => getPainClass(p.pain) === "critical").length;

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <header className="header">
          <div className="logo">
            <div className="logo-mark">🩺</div>
            <div>
              <div className="logo-name">MediTrack Remote</div>
              <div className="logo-tagline">post-operative monitoring</div>
            </div>
          </div>

          <nav className="nav">
            <button className={`nav-btn ${view === "form" ? "active" : ""}`} onClick={() => setView("form")}>
              📝 Patient Report
            </button>

            <button className={`nav-btn ${view === "portal" ? "active" : ""}`} onClick={() => setView("portal")}>
              🏥 Clinical Portal {critCount > 0 && <span className="nav-badge">{critCount}</span>}
            </button>
          </nav>
        </header>

        <main className="main">
          {view === "form" && <PatientForm onSubmit={handleSubmit} />}
          {view === "portal" && <ClinicalPortal patients={patients} />}
        </main>
      </div>
    </>
  );
}