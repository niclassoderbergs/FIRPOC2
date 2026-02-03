
import { BRSData } from '../../types';
import { content622Input, content622Output } from '../../content-definitions';

export const brsFlex622: BRSData = {
  id: "BRS-FLEX-624", // Updated from 622
  previousId: "BRS-FLEX-622",
  title: "Begär mätpunkts-mätvärden",
  purpose: "Att förse behöriga aktörer med officiella, kvalitetssäkrade mätvärden för en specifik period för att användas vid analys eller verifiering.",
  actors: [
    { role: "Initiator", description: "SP / TSO / DSO / BRP / Elleverantör" },
    { role: "Mellanhand", description: "FIS (Proxy)" },
    { role: "Källa", description: "DHV (Datahub)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-624: Begär mätpunkts-mätvärden
    participant Req as Berättigad Aktör
    participant FIS as FIS
    participant DHV as Datahub (DHV)

    Req->>FIS: RequestMeterPointData (Mätpunkts-ID, Period)
    activate FIS
    FIS->>FIS: Validera behörighet (Ägarskap/Fullmakt)
    
    alt Behörig
        FIS->>DHV: GetMeasuredData (Mätpunkts-ID, Period)
        activate DHV
        alt DHV Svarar OK
            DHV-->>FIS: MeasuredData (Värden, Kvalitet)
            FIS-->>Req: MeterDataResponse (Värden, Kvalitet)
        else DHV Fel
            DHV-->>FIS: Error
            FIS-->>Req: Error (DHV Unavailable)
        end
        deactivate DHV
    else Ej Behörig
        FIS-->>Req: Error (Unauthorized)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX624-1", description: "En SP har begärt mätvärden för CU:s bakomliggande mätpunkt." },
    { id: "BRSFLEX624-2", description: "En TSO har begärt mätvärden för CU:s bakomliggande mätpunkt." },
    { id: "BRSFLEX624-3", description: "En DSO har begärt mätvärden för CU:s bakomliggande mätpunkt." },
    { id: "BRSFLEX624-4", description: "En BRP har begärt mätvärden för CU:s bakomliggande mätpunkt." },
    { id: "BRSFLEX624-5", description: "En elleverantör har begärt mätvärden för CU:s bakomliggande mätpunkt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX624-6", description: "FIS har hämtat officiella mätvärden från DHV." },
      { id: "BRSFLEX624-7", description: "FIS har levererat officiella mätvärden från DHV till SP." },
      { id: "BRSFLEX624-8", description: "FIS har levererat officiella mätvärden från DHV till TSO." },
      { id: "BRSFLEX624-9", description: "FIS har levererat officiella mätvärden från DHV till DSO." },
      { id: "BRSFLEX624-10", description: "FIS har levererat officiella mätvärden från DHV till BRP." },
      { id: "BRSFLEX624-11", description: "FIS har levererat officiella mätvärden från DHV till elleverantör." }
    ],
    rejected: [
      { id: "BRSFLEX624-12", description: "Ingen data levererad." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX624-13", description: "SP får endast hämta data för perioder där de har ett aktivt Flexavtal (BRS-FLEX-201).", errorCode: "E_624_UNAUTHORIZED_PERIOD" },
    { id: "BRSFLEX624-14", description: "Om DHV inte svarar eller saknar data ska detta meddelas tydligt.", errorCode: "E_624_DHV_UNAVAILABLE" }
  ],
  process: [
    { id: "BRSFLEX624-15", description: "Aktör begär officiella mätvärden för en mätpunkt." },
    { id: "BRSFLEX624-16", description: "FIS hämtar data från Datahubben och skickar till aktören." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX624-17", description: "FIS returnerar ett felmeddelande enligt affärsregel." }
  ],
  infoObjects: [content622Input, content622Output]
};
