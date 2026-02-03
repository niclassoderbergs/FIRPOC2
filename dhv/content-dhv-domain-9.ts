
import { InfoObject } from '../types';

// Gemensamma attribut för Tariff
const tariffAttributes = [
  { attribute: "Grid tariff ID", description: "Unikt ID för tariffen.", article: "M" },
  { attribute: "Grid tariff name", description: "Namn på tariffen.", article: "M" },
  { attribute: "Validity date - start", description: "Startdatum.", article: "M" },
  { attribute: "Validity date - end", description: "Slutdatum.", article: "O" },
  { attribute: "Additional information", description: "Övrig info.", article: "O" },
  { attribute: "Grid tariff element ID", description: "ID på tariffelement (prisrad).", article: "M" },
  { attribute: "Grid tariff element name", description: "Namn på element.", article: "M" },
  { attribute: "Unit price", description: "Pris.", article: "M" },
  { attribute: "Price unit", description: "Valuta/Enhet.", article: "M" },
  { attribute: "VAT rate", description: "Moms.", article: "M" },
  { attribute: "Calendar function", description: "Kalenderstyrning.", article: "M" }
];

// 815 & 816 Input
export const contentDhv815Input: InfoObject = {
  title: "Från Nätägare",
  attributes: tariffAttributes
};

export const contentDhvGenericOutput: InfoObject = {
  title: "Till Aktör",
  attributes: [
    { attribute: "Response", description: "Bekräftelse eller felmeddelande.", article: "-" }
  ]
};

// 819 Input
export const contentDhv819Input: InfoObject = {
  title: "Från Nätägare",
  attributes: [
    { attribute: "Grid tariff ID", description: "ID på tariffen.", article: "M" },
    { attribute: "Metering grid area ID", description: "Nätområde(n) att koppla till.", article: "M" },
    { attribute: "Validity date - start", description: "Startdatum.", article: "M" },
    { attribute: "Validity date - end", description: "Slutdatum.", article: "O" }
  ]
};

// 845 & 881 Output (Distribution)
export const contentDhvTariffDistOutput: InfoObject = {
  title: "Till Mottagare (Lev/ESCO)",
  attributes: tariffAttributes
};

// 846, 864, 882 Input (Request)
export const contentDhvTariffRequestInput: InfoObject = {
  title: "Från Aktör",
  attributes: [
    { attribute: "Grid tariff ID", description: "Specifikt tariff-ID.", article: "O" },
    { attribute: "Metering grid area ID", description: "Nätområde.", article: "O" }
  ]
};

export const contentDhvTariffRequestOutput: InfoObject = {
  title: "Till Aktör",
  attributes: tariffAttributes
};

// --- GRID FEE (Nätavgifter) ---

// 811: Registrera nätavgift (Input)
export const contentDhv811Input: InfoObject = {
  title: "Från Nätägare",
  attributes: [
    { attribute: "Accounting point ID", description: "Anläggnings-ID.", article: "M" },
    { attribute: "Invoice line ID", description: "Unikt ID för fakturaraden.", article: "M" },
    { attribute: "Invoice line period start", description: "Startdatum.", article: "M" },
    { attribute: "Invoice line period end", description: "Slutdatum.", article: "M" },
    { attribute: "Grid tariff ID", description: "Tariff-ID.", article: "M" },
    { attribute: "Grid tariff name", description: "Namn på tariff.", article: "M" },
    { attribute: "Grid tariff element ID", description: "Element-ID.", article: "M" },
    { attribute: "Grid tariff element name", description: "Elementnamn.", article: "M" },
    { attribute: "Debit / Credit", description: "Debet eller Kredit.", article: "M" },
    { attribute: "Reference to invoice line ID", description: "Referens till annan rad (vid kreditering).", article: "O" },
    { attribute: "Invoice line text", description: "Textbeskrivning.", article: "M" },
    { attribute: "Unit price", description: "A-pris.", article: "M" },
    { attribute: "Price unit", description: "Enhet för pris.", article: "M" },
    { attribute: "Quantity", description: "Kvantitet.", article: "M" },
    { attribute: "Quantity unit", description: "Enhet för kvantitet.", article: "M" },
    { attribute: "Amount excluding VAT", description: "Belopp exkl moms.", article: "M" },
    { attribute: "VAT rate", description: "Momssats.", article: "M" },
    { attribute: "Specification", description: "Specifikation.", article: "O" }
  ]
};

// 841: Distribuera nätavgift (Output)
export const contentDhv841Output: InfoObject = {
  title: "Till Elleverantör",
  attributes: contentDhv811Input.attributes
};

// 842 & 861: Begär nätavgift (Input)
export const contentDhvFeeRequestInput: InfoObject = {
  title: "Från Aktör",
  attributes: [
    { attribute: "Accounting point ID", description: "Anläggnings-ID.", article: "M" },
    { attribute: "Invoice line date", description: "Datum för att identifiera fakturarad.", article: "M" }
  ]
};

// 843 & 862: Begär aggregerade nätavgifter (Input)
export const contentDhvAggFeeRequestInput: InfoObject = {
  title: "Från Aktör",
  attributes: [
    { attribute: "Counterpart ID", description: "Motpart (Nätägare eller Elleverantör).", article: "M" },
    { attribute: "Calculation month", description: "Månad för aggregering.", article: "M" }
  ]
};

// 844, 863, 8000: Aggregerade nätavgifter (Output)
export const contentDhvAggFeeOutput: InfoObject = {
  title: "Till Aktör / System",
  attributes: [
    { attribute: "Aggregation ID", description: "Unikt ID för aggregeringen.", article: "M" },
    { attribute: "Grid owner ID", description: "Nätägare.", article: "M" },
    { attribute: "Retailer ID", description: "Elleverantör.", article: "M" },
    { attribute: "Calculation month", description: "Månad.", article: "M" },
    { attribute: "Grid tariff ID", description: "Tariff-ID.", article: "M" },
    { attribute: "Grid tariff name", description: "Tariffnamn.", article: "M" },
    { attribute: "Grid tariff element ID", description: "Element-ID.", article: "M" },
    { attribute: "Grid tariff element name", description: "Elementnamn.", article: "M" },
    { attribute: "Aggregated amount excluding VAT", description: "Totalt belopp.", article: "M" },
    { attribute: "VAT rate", description: "Momssats.", article: "M" },
    { attribute: "Invoice line ID", description: "Lista på ingående fakturarader.", article: "M" }
  ]
};
