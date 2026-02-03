
import { BRSData } from '../../../types';
import { contentDhv7000Input, contentDhv7000Output } from '../../content-dhv-domain-7';

export const brsDhv7001: BRSData = {
  id: "BRS-DHV-7001",
  title: "Datahubben aggregerar mätvärden",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beskriver hur datahubben aggregerar energivolymer per typ (produktion, konsumtion, utbyte) och per mätområde (MGA). Detta görs genom att addera konverterade kvartsvärden.",
  actors: [
    { role: "Initiator", description: "System (Datahub)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-7001: Aggregera per MGA
    participant Sys as System
    participant Calc as Beräkning

    Sys->>Calc: Input (Kvartsvärden)
    Calc->>Calc: Summera per Typ & MGA
    Calc-->>Sys: Aggregerade Summor`,
  preConditions: [
    { id: "BRS7001-1", description: "Timvärden har konverterats till kvartsvärden (BRS-DHV-7000)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS7001-2", description: "Datahubben har aggregerat mätvärden för MGA daglig konsumtion." },
      { id: "BRS7001-3", description: "Datahubben har aggregerat mätvärden för MGA produktion." },
      { id: "BRS7001-4", description: "Datahubben har aggregerat mätvärden för MGA utbyte." }
    ],
    rejected: []
  },
  businessRules: [
    { id: "BRS7001-5", description: "Aggregering ska ske per mätområde (MGA).", errorCode: "-" },
    { id: "BRS7001-6", description: "Endast aktiva mätpunkter ska inkluderas.", errorCode: "-" }
  ],
  process: [
    { id: "BRS7001-10", description: "Datahubben aggregerar mätvärden per typ och MGA." },
    { id: "BRS7001-11", description: "Datahubben aggregerar mätvärden per MGA (Total)." }
  ],
  infoObjects: [contentDhv7000Input, contentDhv7000Output]
};
