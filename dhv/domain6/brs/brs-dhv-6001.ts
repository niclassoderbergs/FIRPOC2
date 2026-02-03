
import { BRSData } from '../../../types';
import { contentDhvGenericInput, contentDhvGenericOutput } from '../../content-dhv-domain-6';

export const brsDhv6001: BRSData = {
  id: "BRS-DHV-6001",
  title: "Datahubben validerar mätvärde",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Beskriver hur datahubben validerar inkomna mätvärden. Både konsumtion och produktion måste registreras med icke-negativa värden.",
  actors: [
    { role: "Initiator", description: "Datahubben (System)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-6001: Validera mätvärde
    participant Sys as System
    participant DB as Databas

    Sys->>Sys: Validera regler (Ägare, Tid, Period)
    
    alt Giltig
        Sys->>DB: Spara mätvärden
    else Ogiltig
        Sys->>DB: Spara felmeddelande
    end`,
  preConditions: [
    { id: "BRS6001-1", description: "Nätägaren har registrerat mätvärden via BRS-DHV-611." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS6001-5", description: "Datahubben har lagrat mätvärden för giltiga transaktioner." },
      { id: "BRS6001-6", description: "Datahubben har sparat lyckade svar för giltiga transaktioner." }
    ],
    rejected: [
      { id: "BRS6001-10", description: "Datahubben har sparat felmeddelanden för ogiltiga transaktioner." }
    ]
  },
  businessRules: [
    { id: "BRS6001-19", description: "Transaktions-ID måste vara unikt för nätägaren.", errorCode: "E_MVM_9002_01" },
    { id: "BRS6001-20", description: "Mätpunkten måste existera i datahubben.", errorCode: "E_MVM_4001_01" },
    { id: "BRS6001-21", description: "Nätägaren måste vara ägare av mätpunkten.", errorCode: "E_MVM_3000_06" },
    { id: "BRS6001-45", description: "Registreringstiden kan tidigast vara vid observationens slut.", errorCode: "E_MVM_0004_01" },
    { id: "BRS6001-46", description: "Registreringstiden måste vara i det förflutna.", errorCode: "E_MVM_0004_02" },
    { id: "BRS6001-23", description: "Mätpunkten måste vara ansluten eller frånkopplad under perioden.", errorCode: "E_MVM_9004_01" },
    { id: "BRS6001-26", description: "Starttid måste vara vid dygnsskifte UTC+1.", errorCode: "E_MVM_0007_01" },
    { id: "BRS6001-22", description: "Mätintervallet måste matcha registrerat intervall.", errorCode: "E_MVM_9003_01" },
    { id: "BRS6001-44", description: "Mätvärden måste vara >= 0.", errorCode: "E_SYNTAX" }
  ],
  process: [
    { id: "BRS6001-60", description: "Systemklockan startar processen." }
  ],
  infoObjects: [contentDhvGenericInput, contentDhvGenericOutput]
};
