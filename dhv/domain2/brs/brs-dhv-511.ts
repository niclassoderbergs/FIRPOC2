
import { BRSData } from '../../../types';
import { contentDhv511Input, contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv511: BRSData = {
  id: "BRS-DHV-511",
  title: "Update customer information",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "This BRS describes how a retailer updates customer information. This BRS is intended to be used when a retailer has received information that their customer has passed away.",
  actors: [
    { role: "Initiator", description: "Retailer" },
    { role: "Mottagare", description: "Data hub" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-511: Update customer information
    participant Ret as Retailer
    participant DHV as Data hub

    Ret->>DHV: Updates customer information
    activate DHV
    DHV->>DHV: Validation OK
    DHV-->>Ret: Successful response
    deactivate DHV`,
  preConditions: [
    { id: "BRS511-1", description: "The retailer has updated the customer information" }
  ],
  postConditions: {
    accepted: [
      { id: "BRS511-2", description: "The data hub has updated the customer information" },
      { id: "BRS511-3", description: "The data hub has responded with a successful response" }
    ],
    rejected: [
      { id: "BRS511-4", description: "The data hub has responded with an error message according to the business rule" }
    ]
  },
  businessRules: [
    { id: "BRS511-10", description: "The retailer must have an ongoing or future delivery for the specified customer", errorCode: "No ongoing or future delivery for the specified customer exists in the data hub" }
  ],
  process: [
    { id: "BRS511-15", description: "The retailer updates the customer information" },
    { id: "BRS511-16", description: "The data hub responds with a successful response" },
    { id: "BRS511-17", description: "The data hub responds with an error message according to the business rule" }
  ],
  infoObjects: [contentDhv511Input, contentDhvGenericOutput]
};
