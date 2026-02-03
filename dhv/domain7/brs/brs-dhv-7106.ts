
import { BRSData } from '../../../types';
import { contentDhvStatsOutput } from '../../content-dhv-domain-7';

export const brsDhv7106: BRSData = {
  id: "BRS-DHV-7106",
  title: "Datahubben aggregerar MBA load profile",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Aggregerar den totala lastprofilen (profilerad förbrukning) per budområde.",
  actors: [
    { role: "Initiator", description: "System (Datahub)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-7106: MBA Load Profile
    participant Sys as System
    participant Calc as Beräkning

    Sys->>Calc: Hämta MGA Load Profiles
    Calc->>Calc: Summera per MBA
    Calc-->>Sys: MBA Load Profile`,
  preConditions: [
    { id: "BRS7106-1", description: "Lastprofiler per MGA är beräknade (7008)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS7106-2", description: "Aggregerad lastprofil per MBA sparad." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS7106-5", description: "Aggregering av lastprofil." }
  ],
  infoObjects: [contentDhvStatsOutput]
};
