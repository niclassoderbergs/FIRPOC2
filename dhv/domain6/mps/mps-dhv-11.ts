
import { MPSData } from '../../../types';

export const mpsDhv11: MPSData = {
  id: "MPS-DHV-11",
  title: "Begär mätvärden",
  domain: "Domän 6: Mätvärden",
  purpose: "Denna process beskriver hur en aktör begär mätvärden i datahubben för en specifik mätpunkt och period.",
  trigger: "Aktör begär mätvärden.",
  scenarios: [
    {
      id: "MPS-DHV-11-Sc1",
      title: "Scenario 1 - En elleverantör begär mätvärden för en specifik avräkningspunkt",
      description: "Elleverantörsfråga via Avräkningspunkts-ID.",
      steps: [
        { stepId: "6644 - Sc-1.1", role: "Elleverantör", action: "Begär mätvärden", description: "Elleverantören begär mätvärden (Start av process).", refBRS: "BRS-DHV-644", refRule: "BRS644-1a" },
        { stepId: "6614 - Sc-1.2", role: "Datahubben", action: "Svara", description: "Datahubben har svarat med begärda mätvärden (Slut på process).", refBRS: "BRS-DHV-644", refRule: "BRS614-3a" }
      ]
    },
    {
      id: "MPS-DHV-11-Sc2",
      title: "Scenario 2 - En elleverantör begär mätvärden för en specifik mätpunkt",
      description: "Elleverantörsfråga via Mätpunkts-ID.",
      steps: [
        { stepId: "6644 - Sc-2.1", role: "Elleverantör", action: "Begär mätvärden", description: "Elleverantören begär mätvärden (Start av process).", refBRS: "BRS-DHV-644", refRule: "BRS644-1b" },
        { stepId: "6614 - Sc-2.2", role: "Datahubben", action: "Svara", description: "Datahubben har svarat med begärda mätvärden (Slut på process).", refBRS: "BRS-DHV-644", refRule: "BRS614-3b" }
      ]
    },
    {
      id: "MPS-DHV-11-Sc3",
      title: "Scenario 3 - En elleverantör begär mätvärden för en specifik mätpunkt och avräkningspunkt",
      description: "Elleverantörsfråga via båda ID:n.",
      steps: [
        { stepId: "6644 - Sc-3.1", role: "Elleverantör", action: "Begär mätvärden", description: "Elleverantören begär mätvärden (Start av process).", refBRS: "BRS-DHV-644", refRule: "BRS644-1c" },
        { stepId: "6614 - Sc-3.2", role: "Datahubben", action: "Svara", description: "Datahubben har svarat med begärda mätvärden (Slut på process).", refBRS: "BRS-DHV-644", refRule: "BRS614-3c" }
      ]
    },
    {
      id: "MPS-DHV-11-Sc4",
      title: "Scenario 4 - En nätägare begär mätvärden för en specifik avräkningspunkt",
      description: "Nätägarfråga via Avräkningspunkts-ID.",
      steps: [
        { stepId: "6644 - Sc-4.1", role: "Nätägare", action: "Begär mätvärden", description: "Nätägaren begär mätvärden (Start av process).", refBRS: "BRS-DHV-664", refRule: "BRS664-1a" },
        { stepId: "6644 - Sc-4.2", role: "Datahubben", action: "Svara", description: "Datahubben har svarat med begärda mätvärden (Slut på process).", refBRS: "BRS-DHV-664", refRule: "BRS664-3a" }
      ]
    },
    {
      id: "MPS-DHV-11-Sc5",
      title: "Scenario 5 - En nätägare begär mätvärden för en specifik mätpunkt",
      description: "Nätägarfråga via Mätpunkts-ID.",
      steps: [
        { stepId: "6644 - Sc-5.1", role: "Nätägare", action: "Begär mätvärden", description: "Nätägaren begär mätvärden (Start av process).", refBRS: "BRS-DHV-664", refRule: "BRS664-1b" },
        { stepId: "6644 - Sc-5.2", role: "Datahubben", action: "Svara", description: "Datahubben har svarat med begärda mätvärden (Slut på process).", refBRS: "BRS-DHV-664", refRule: "BRS664-3b" }
      ]
    },
    {
      id: "MPS-DHV-11-Sc6",
      title: "Scenario 6 - En nätägare begär mätvärden för en specifik mätpunkt och avräkningspunkt",
      description: "Nätägarfråga via båda ID:n.",
      steps: [
        { stepId: "6644 - Sc-6.1", role: "Nätägare", action: "Begär mätvärden", description: "Nätägaren begär mätvärden (Start av process).", refBRS: "BRS-DHV-664", refRule: "BRS664-1c" },
        { stepId: "6644 - Sc-6.2", role: "Datahubben", action: "Svara", description: "Datahubben har svarat med begärda mätvärden (Slut på process).", refBRS: "BRS-DHV-664", refRule: "BRS664-3c" }
      ]
    },
    {
      id: "MPS-DHV-11-Sc7",
      title: "Scenario 7 - En angränsande nätägare begär mätvärden",
      description: "Fråga från angränsande nätägare.",
      steps: [
        { stepId: "6644 - Sc-7.1", role: "Nätägare", action: "Begär mätvärden", description: "Nätägaren begär mätvärden (Start av process).", refBRS: "BRS-DHV-664", refRule: "BRS664-2" },
        { stepId: "6644 - Sc-7.2", role: "Datahubben", action: "Svara", description: "Datahubben har svarat med begärda mätvärden (Slut på process).", refBRS: "BRS-DHV-664", refRule: "BRS664-3" }
      ]
    },
    {
      id: "MPS-DHV-11-Sc8",
      title: "Scenario 8 - ESCO begär mätvärden",
      description: "Fråga från ESCO.",
      steps: [
        { stepId: "6644 - Sc-8.1", role: "ESCO", action: "Begär mätvärden", description: "ESCO begär mätvärden (Start av process).", refBRS: "BRS-DHV-684", refRule: "BRS684-1" },
        { stepId: "6644 - Sc-8.2", role: "Datahubben", action: "Svara", description: "Datahubben har svarat med begärda mätvärden (Slut på process).", refBRS: "BRS-DHV-684", refRule: "BRS684-2" }
      ]
    }
  ]
};
