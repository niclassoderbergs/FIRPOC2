
import { InfoObject } from '../types';

// Gemensamma output för fel/kvittens
export const contentDhvGenericOutput: InfoObject = {
  title: "Till Aktör",
  attributes: [
    { attribute: "Response", description: "Svar med data eller felmeddelande.", article: "-" }
  ]
};

// 741: Retailer requests correction settlement results
export const contentDhv741Input: InfoObject = {
  title: "Från Elleverantör",
  attributes: [
    { attribute: "Retailer ID", description: "ID för elleverantören.", article: "R" },
    { attribute: "Bidding area ID", description: "Elområde.", article: "R" },
    { attribute: "Period start", description: "Startdatum (första dagen i månaden).", article: "R" },
    { attribute: "Period end", description: "Slutdatum (sista dagen i månaden).", article: "R" },
    { attribute: "Verification ID", description: "Specifikt verifierings-ID (valfritt).", article: "O" }
  ]
};

export const contentDhv741Output: InfoObject = {
  title: "Till Elleverantör",
  attributes: [
    { attribute: "Calculation time", description: "Tidpunkt för beräkning.", article: "R" },
    { attribute: "Verification ID", description: "ID för körningen.", article: "R" },
    { attribute: "Correction bought production", description: "Korrigerad köpt produktion.", article: "R" },
    { attribute: "Correction sold production", description: "Korrigerad såld produktion.", article: "R" },
    { attribute: "Correction bought consumption", description: "Korrigerad köpt konsumtion.", article: "R" },
    { attribute: "Correction sold consumption", description: "Korrigerad såld konsumtion.", article: "R" },
    { attribute: "Correction cost/income", description: "Ekonomiska belopp.", article: "R" }
  ]
};

// 743: Retailer requests aggregated metered data
export const contentDhv743Input: InfoObject = {
  title: "Från Elleverantör",
  attributes: [
    { attribute: "Retailer ID", description: "ID för elleverantören.", article: "R" },
    { attribute: "Period start", description: "Starttid.", article: "R" },
    { attribute: "Period end", description: "Sluttid.", article: "R" },
    { attribute: "Grid Area ID", description: "Nätområde.", article: "O" },
    { attribute: "Type of aggregation", description: "Typ av data (t.ex. MGA consumption).", article: "O" }
  ]
};

export const contentDhvAggregatedDataOutput: InfoObject = {
  title: "Till Aktör",
  attributes: [
    { attribute: "Energy quantity", description: "Aggregerad volym.", article: "R" },
    { attribute: "Quality", description: "Kvalitet (Calculated/Measured).", article: "R" },
    { attribute: "Period", description: "Tidsintervall.", article: "R" }
  ]
};

// 744 & 763: Request metered data on accounting points without contract
export const contentDhvNoContractInput: InfoObject = {
  title: "Från Aktör",
  attributes: [
    { attribute: "Actor ID", description: "ID på förfrågande part.", article: "R" },
    { attribute: "Period start", description: "Starttid.", article: "R" },
    { attribute: "Period end", description: "Sluttid.", article: "R" }
  ]
};

export const contentDhvNoContractOutput: InfoObject = {
  title: "Till Aktör",
  attributes: [
    { attribute: "Accounting Point ID", description: "Anläggnings-ID.", article: "R" },
    { attribute: "Energy quantity", description: "Uppmätt volym.", article: "R" }
  ]
};

// 7000: Convert hourly to quarterly (Internal)
export const contentDhv7000Input: InfoObject = {
  title: "Input (Internt)",
  attributes: [
    { attribute: "Hourly Energy Quantity", description: "Mätvärde per timme.", article: "R" },
    { attribute: "Metering Point Type", description: "Production / Exchange.", article: "R" }
  ]
};

export const contentDhv7000Output: InfoObject = {
  title: "Output (Internt)",
  attributes: [
    { attribute: "Quarterly Energy Quantity", description: "Mätvärde per kvart (Hourly / 4).", article: "R" },
    { attribute: "Status", description: "Sätts till 'Calculated'.", article: "R" }
  ]
};

// Statistics & QA Output
export const contentDhvStatsOutput: InfoObject = {
  title: "Statistikdata",
  attributes: [
    { attribute: "Area", description: "MGA / MBA / SWE.", article: "R" },
    { attribute: "Aggregation Type", description: "Production / Consumption / Loss.", article: "R" },
    { attribute: "Value", description: "Energivolym.", article: "R" },
    { attribute: "Imbalance", description: "Diff (vid QA).", article: "R" }
  ]
};
