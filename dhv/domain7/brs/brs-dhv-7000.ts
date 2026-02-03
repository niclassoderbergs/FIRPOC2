
import { BRSData } from '../../../types';
import { contentDhv7000Input, contentDhv7000Output } from '../../content-dhv-domain-7';

export const brsDhv7000: BRSData = {
  id: "BRS-DHV-7000",
  title: "Konvertera timvärden till kvartsvärden",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beskriver funktionen för att konvertera dagligen registrerade timvärden för produktion och utbyte till kvartsupplösning. Resultatet är en tidsserie med kvartsupplösning som används för att beräkna residualen.",
  actors: [
    { role: "Initiator", description: "System (Datahub)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-7000: Konvertera Timme till Kvart
    participant Sys as System
    participant Calc as Beräkning

    Sys->>Calc: Input (Timvärden)
    Calc->>Calc: Dela varje timme i 4 lika delar
    Calc-->>Sys: Output (Kvartsvärden)
    Note right of Calc: 28 kWh/h -> 7 kWh/15min`,
  preConditions: [
    { id: "BRS7000-1", description: "BRS-SE-6001 Validera mätvärde har exekverats." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS7000-2", description: "Datahubben har konverterat alla registrerade timvärden till kvartsupplösning." },
      { id: "BRS7000-3", description: "Datahubben har lagrat de konverterade värdena." }
    ],
    rejected: []
  },
  businessRules: [
    { id: "BRS7000-7", description: "Dela timperioden i fyra kvartar med samma totala tid.", errorCode: "-" },
    { id: "BRS7000-8", description: "Konvertera energimängd genom att multiplicera timvärdet med 1/4.", errorCode: "-" },
    { id: "BRS7000-9", description: "Sätt status till 'Calculated' för kvartsvärdena.", errorCode: "-" },
    { id: "BRS7000-10", description: "Summan av de fyra kvartarna måste vara lika med ursprungligt timvärde.", errorCode: "-" },
    { id: "BRS7000-11", description: "Resultatet får inte ha decimaler (avrundning krävs).", errorCode: "-" },
    { id: "BRS7000-12", description: "Värden ska lagras i Wh.", errorCode: "-" }
  ],
  process: [
    { id: "BRS7000-4", description: "Systemklockan startar processen." },
    { id: "BRS7000-17", description: "Datahubben lagrar tidsserier för utbytespunkter med kvartsupplösning." },
    { id: "BRS7000-18", description: "Datahubben lagrar tidsserier för produktionspunkter med kvartsupplösning." }
  ],
  infoObjects: [contentDhv7000Input, contentDhv7000Output]
};
