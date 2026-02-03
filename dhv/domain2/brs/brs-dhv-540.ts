
import { BRSData } from '../../../types';
import { contentDhvRequestContractInput, contentDhvContractOutput } from '../../content-dhv-domain-2';

export const brsDhv540: BRSData = {
  id: "BRS-DHV-540",
  title: "The retailer requests customer delivery contract information",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "This BRS describes how a retailer requests customer delivery contract information. This BRS is intended to be used when a retailer is uncertain of what customer delivery contract information is registered in the data hub.",
  actors: [
    { role: "Initiator", description: "Retailer" },
    { role: "Mottagare", description: "Data hub" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-540: Retailer requests contract info
    participant Ret as Retailer
    participant DHV as Data hub

    Ret->>DHV: Requests contract info
    activate DHV
    DHV->>DHV: Validation OK
    DHV-->>Ret: Contract information
    deactivate DHV`,
  preConditions: [
    { id: "BRS540-1a", description: "A retailer has requested the latest version of a specific customer delivery contract" },
    { id: "BRS540-1b", description: "A retailer has requested a specific version of a specific customer delivery contract" }
  ],
  postConditions: {
    accepted: [
      { id: "BRS540-2a", description: "The latest version of a specific customer delivery contract information has been distributed to the retailer" },
      { id: "BRS540-2b", description: "The specific version of a specific customer delivery contract information has been distributed to the retailer" }
    ],
    rejected: [
      { id: "BRS540-3", description: "The data hub has responded with an error message according to the business rules" }
    ]
  },
  businessRules: [
    { id: "BRS540-11", description: "The accounting point must exist in the data hub", errorCode: "The specified accounting point does not exist in the data hub" },
    { id: "BRS540-12", description: "The retailer must be connected to the specified delivery", errorCode: "The retailer is not connected to the specified delivery" },
    { id: "BRS540-13", description: "The delivery identifier must exist in the data hub", errorCode: "The specified delivery ID does not exist in the data hub" }
  ],
  process: [
    { id: "BRS540-20", description: "The retailer requests customer delivery contract information" },
    { id: "BRS540-21", description: "The retailer receives customer delivery contract information" },
    { id: "BRS540-22", description: "The data hub responds with an error message according to the business rule" }
  ],
  infoObjects: [contentDhvRequestContractInput, contentDhvContractOutput]
};
