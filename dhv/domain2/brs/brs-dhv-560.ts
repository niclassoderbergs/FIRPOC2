
import { BRSData } from '../../../types';
import { contentDhvRequestContractInput, contentDhvContractOutput } from '../../content-dhv-domain-2';

export const brsDhv560: BRSData = {
  id: "BRS-DHV-560",
  title: "The grid owner requests customer delivery contract information",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "This BRS describes how a grid owner requests customer delivery contract information, e.g. when a grid owner needs the customer's contact adress when a customer moves in. This BRS is intended to be used when a grid owner either receives information of a move in, retailer switch or when a customer delivery contract has been added or renewed, or when they need to verify that their information is up to date.",
  actors: [
    { role: "Initiator", description: "Grid owner" },
    { role: "Mottagare", description: "Data hub" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-560: Grid owner requests contract info
    participant GO as Grid owner
    participant DHV as Data hub

    GO->>DHV: Requests contract info
    activate DHV
    DHV->>DHV: Validation OK
    DHV-->>GO: Contract information
    deactivate DHV`,
  preConditions: [
    { id: "BRS560-1a", description: "A grid owner has requested the latest version of a specific customer delivery contract" },
    { id: "BRS560-1b", description: "A grid owner has requested a specific version of a specific customer delivery contract" },
    { id: "BRS560-1c", description: "A grid owner has requested all customer delivery contracts for an accounting point" }
  ],
  postConditions: {
    accepted: [
      { id: "BRS560-2d", description: "The latest version of a specific customer delivery contract information has been distributed to the grid owner" },
      { id: "BRS560-2e", description: "The specific version of a specific customer delivery contract information has been distributed to the grid owner" },
      { id: "BRS560-2f", description: "Latest version of each customer delivery contract information registered for an accounting point has been distributed to the grid owner" }
    ],
    rejected: [
      { id: "BRS560-3", description: "The data hub has responded with an error message according to the business rules" }
    ]
  },
  businessRules: [
    { id: "BRS560-11", description: "The accounting point must exist in the data hub", errorCode: "The specified accounting point does not exist in the data hub" },
    { id: "BRS560-13", description: "The grid owner must be the owner of the metering grid area for which the specified accounting point is registered in", errorCode: "The specified grid owner is not the owner of the metering grid area for which the specified metering point is registered in" }
  ],
  process: [
    { id: "BRS560-20", description: "The grid owner requests customer delivery contract information" },
    { id: "BRS560-21", description: "The grid owner receives customer delivery contract information" },
    { id: "BRS560-22", description: "The data hub responds with an error message according to the business rule" }
  ],
  infoObjects: [contentDhvRequestContractInput, contentDhvContractOutput]
};
