import React, { useState, useEffect, memo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

export type CountryStatus = 
  | 'visited-must-return' 
  | 'visited-gladly-return' 
  | 'visited-yuck' 
  | 'want-high' 
  | 'want-medium' 
  | 'want-low' 
  | 'visited-want-cannot' 
  | 'no-opinion';

// Tutaj możesz łatwo edytować swoje państwa!
// Używaj angielskich nazw państw (zgodnych z mapą, np. "United States of America")
export const countryData: Record<string, CountryStatus> = {
  // --- Europa ---
  "Albania": "visited-gladly-return",
  "Andorra": "want-medium",
  "Austria": "visited-must-return",
  "Belarus": "visited-want-cannot",
  "Belgium": "visited-yuck",
  "Bosnia and Herz.": "visited-gladly-return",
  "Bulgaria": "visited-gladly-return",
  "Croatia": "visited-gladly-return",
  "Cyprus": "want-medium",
  "Czechia": "visited-gladly-return",
  "Denmark": "want-medium",
  "Estonia": "visited-gladly-return",
  "Finland": "want-medium",
  "France": "visited-gladly-return",
  "Germany": "visited-gladly-return",
  "Greece": "visited-gladly-return",
  "Hungary": "visited-gladly-return",
  "Iceland": "want-medium",
  "Ireland": "want-high",
  "Italy": "visited-must-return",
  "Kosovo": "want-low",
  "Latvia": "visited-gladly-return",
  "Liechtenstein": "want-medium",
  "Lithuania": "visited-gladly-return",
  "Luxembourg": "want-medium",
  "Malta": "want-medium",
  "Moldova": "want-medium",
  "Monaco": "want-medium",
  "Montenegro": "visited-gladly-return",
  "Netherlands": "visited-gladly-return",
  "Macedonia": "visited-gladly-return",
  "Norway": "want-medium",
  "Poland": "no-opinion",
  "Portugal": "want-medium",
  "Romania": "visited-gladly-return",
  "Russia": "visited-want-cannot",
  "San Marino": "want-medium",
  "Serbia": "visited-gladly-return",
  "Slovakia": "visited-gladly-return",
  "Slovenia": "visited-gladly-return",
  "Spain": "visited-gladly-return",
  "Sweden": "want-medium",
  "Switzerland": "visited-must-return",
  "Ukraine": "visited-want-cannot",
  "United Kingdom": "visited-must-return",
  "Vatican": "visited-gladly-return",

  // --- Ameryka Północna i Środkowa ---
  "Antigua and Barbuda": "no-opinion",
  "Bahamas": "want-medium",
  "Barbados": "no-opinion",
  "Belize": "no-opinion",
  "Canada": "want-medium",
  "Costa Rica": "no-opinion",
  "Cuba": "want-medium",
  "Dominica": "no-opinion",
  "Dominican Republic": "no-opinion",
  "El Salvador": "no-opinion",
  "Grenada": "no-opinion",
  "Guatemala": "no-opinion",
  "Haiti": "no-opinion",
  "Honduras": "no-opinion",
  "Jamaica": "no-opinion",
  "Mexico": "want-medium",
  "Nicaragua": "no-opinion",
  "Panama": "no-opinion",
  "Saint Kitts and Nevis": "no-opinion",
  "Saint Lucia": "no-opinion",
  "Saint Vincent and the Grenadines": "no-opinion",
  "Trinidad and Tobago": "no-opinion",
  "United States of America": "visited-gladly-return",

  // --- Ameryka Południowa ---
  "Argentina": "want-medium",
  "Bolivia": "no-opinion",
  "Brazil": "want-medium",
  "Chile": "want-medium",
  "Colombia": "no-opinion",
  "Ecuador": "no-opinion",
  "Guyana": "no-opinion",
  "Paraguay": "no-opinion",
  "Peru": "no-opinion",
  "Suriname": "no-opinion",
  "Uruguay": "no-opinion",
  "Venezuela": "want-medium",

  // --- Azja ---
  "Afghanistan": "no-opinion",
  "Armenia": "want-medium",
  "Azerbaijan": "want-medium",
  "Bahrain": "no-opinion",
  "Bangladesh": "want-low",
  "Bhutan": "no-opinion",
  "Brunei": "no-opinion",
  "Cambodia": "no-opinion",
  "China": "want-high",
  "Georgia": "want-medium",
  "India": "want-low",
  "Indonesia": "no-opinion",
  "Iran": "want-medium",
  "Iraq": "no-opinion",
  "Israel": "visited-gladly-return",
  "Japan": "want-high",
  "Jordan": "want-medium",
  "Kazakhstan": "visited-gladly-return",
  "Kuwait": "no-opinion",
  "Kyrgyzstan": "want-medium",
  "Laos": "no-opinion",
  "Lebanon": "want-medium",
  "Malaysia": "want-medium",
  "Maldives": "no-opinion",
  "Mongolia": "want-medium",
  "Myanmar": "no-opinion",
  "Nepal": "want-medium",
  "North Korea": "no-opinion",
  "Oman": "want-medium",
  "Pakistan": "no-opinion",
  "Palestine": "visited-gladly-return",
  "Philippines": "want-medium",
  "Qatar": "no-opinion",
  "Saudi Arabia": "want-medium",
  "Singapore": "want-medium",
  "South Korea": "want-medium",
  "Sri Lanka": "no-opinion",
  "Syria": "want-medium",
  "Taiwan": "want-medium",
  "Tajikistan": "no-opinion",
  "Thailand": "want-medium",
  "Timor-Leste": "no-opinion",
  "Turkey": "visited-gladly-return",
  "Turkmenistan": "no-opinion",
  "United Arab Emirates": "visited-gladly-return",
  "Uzbekistan": "want-medium",
  "Vietnam": "want-medium",
  "Yemen": "no-opinion",

  // --- Afryka ---
  "Algeria": "want-medium",
  "Angola": "no-opinion",
  "Benin": "no-opinion",
  "Botswana": "want-medium",
  "Burkina Faso": "no-opinion",
  "Burundi": "no-opinion",
  "Cameroon": "no-opinion",
  "Cape Verde": "no-opinion",
  "Central African Republic": "no-opinion",
  "Chad": "no-opinion",
  "Comoros": "no-opinion",
  "Democratic Republic of the Congo": "no-opinion",
  "Republic of the Congo": "no-opinion",
  "Djibouti": "no-opinion",
  "Egypt": "no-opinion",
  "Equatorial Guinea": "no-opinion",
  "Eritrea": "no-opinion",
  "Eswatini": "no-opinion",
  "Ethiopia": "want-medium",
  "Gabon": "no-opinion",
  "Gambia": "no-opinion",
  "Ghana": "no-opinion",
  "Guinea": "no-opinion",
  "Guinea-Bissau": "no-opinion",
  "Ivory Coast": "no-opinion",
  "Kenya": "want-medium",
  "Lesotho": "no-opinion",
  "Liberia": "no-opinion",
  "Libya": "no-opinion",
  "Madagascar": "want-medium",
  "Malawi": "no-opinion",
  "Mali": "no-opinion",
  "Mauritania": "no-opinion",
  "Mauritius": "no-opinion",
  "Morocco": "want-medium",
  "Mozambique": "no-opinion",
  "Namibia": "no-opinion",
  "Niger": "no-opinion",
  "Nigeria": "want-low",
  "Rwanda": "no-opinion",
  "Sao Tome and Principe": "no-opinion",
  "Senegal": "no-opinion",
  "Seychelles": "no-opinion",
  "Sierra Leone": "no-opinion",
  "Somalia": "no-opinion",
  "South Africa": "want-medium",
  "South Sudan": "no-opinion",
  "Sudan": "no-opinion",
  "Tanzania": "want-medium",
  "Togo": "no-opinion",
  "Tunisia": "no-opinion",
  "Uganda": "no-opinion",
  "Zambia": "no-opinion",
  "Zimbabwe": "no-opinion",

  // --- Australia i Oceania ---
  "Australia": "want-medium",
  "Fiji": "no-opinion",
  "Kiribati": "no-opinion",
  "Marshall Islands": "no-opinion",
  "Micronesia": "no-opinion",
  "Nauru": "no-opinion",
  "New Zealand": "want-medium",
  "Palau": "no-opinion",
  "Papua New Guinea": "no-opinion",
  "Samoa": "no-opinion",
  "Solomon Islands": "no-opinion",
  "Tonga": "no-opinion",
  "Tuvalu": "no-opinion",
  "Vanuatu": "no-opinion"
};

const STATUS_COLORS: Record<CountryStatus, string> = {
  'visited-must-return': '#1C1B1A',      // Ciemny atrament (bardzo wyraźny)
  'visited-gladly-return': '#4A5D23',    // Głęboka zieleń/oliwka
  'visited-yuck': '#8C3A3A',             // Zgaszona czerwień
  'want-high': '#3A5A6B',                // Ciemny morski/niebieski
  'want-medium': '#7A9E9F',              // Jasny morski/niebieski
  'want-low': '#B5B5B5',                 // Neutralny szary
  'visited-want-cannot': '#C28E5C',      // Terakota/zgaszony pomarańcz
  'no-opinion': '#E6E4DD'                // Jasny beż (domyślny)
};

const STATUS_LABELS: Record<CountryStatus, string> = {
  'visited-must-return': 'Byłem tu, muszę wracać (zwariuję od niezrealizowanych planów w głowie)',
  'visited-gladly-return': 'Byłem tu, chętnie wrócę',
  'visited-yuck': 'Niestety tu byłem, tfu. Nie jestem psychopatą, ale tam się nim staję.',
  'want-high': 'Bardzo chcę zobaczyć (zwariuję jeśli nie zobaczę)',
  'want-medium': 'Chcę zobaczyć',
  'want-low': 'Raczej nie chcę się tam znaleźć',
  'visited-want-cannot': 'Byłem tu, lubię te miejsca, niestety nie mogę na razie tam jeździć',
  'no-opinion': 'Brak zdania'
};

const MapChart = memo(({ setTooltipContent }: { setTooltipContent: (content: string) => void }) => {
  return (
    <ComposableMap
      projectionConfig={{
        scale: 140,
        center: [0, 15]
      }}
      width={800}
      height={450}
      style={{ width: "100%", height: "auto" }}
    >
      <ZoomableGroup 
        translateExtent={[[-200, -100], [1000, 600]]}
        maxZoom={5}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name;
              const status = countryData[countryName] || 'no-opinion';
              const color = STATUS_COLORS[status];

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={color}
                  stroke="#F5F4F0"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#D4A373", outline: "none", cursor: "pointer", transition: "all 200ms" },
                    pressed: { outline: "none" },
                  }}
                  onMouseEnter={() => {
                    setTooltipContent(`${countryName} - ${STATUS_LABELS[status]}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  onClick={() => {
                    setTooltipContent(`${countryName} - ${STATUS_LABELS[status]}`);
                  }}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
});

MapChart.displayName = 'MapChart';

export default function TravelMap() {
  const [content, setContent] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-full mt-12 mb-4">
      {/* Legenda */}
      <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8 text-sm bg-white/50 p-6 rounded-2xl border border-[#E6E4DD]">
        <div className="w-full mb-2 text-xs font-medium text-[#8C8B88] uppercase tracking-widest">Legenda mapy</div>
        {(Object.keys(STATUS_LABELS) as CountryStatus[]).map(status => (
          <div key={status} className="flex items-center gap-2.5">
            <div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: STATUS_COLORS[status] }} />
            <span className="text-[#595854] font-light">{STATUS_LABELS[status]}</span>
          </div>
        ))}
      </div>

      {/* Mapa */}
      <div 
        className="bg-white/50 border border-[#E6E4DD] rounded-3xl overflow-hidden shadow-sm relative touch-pan-y"
        data-tooltip-id="map-tooltip"
        data-tooltip-content={content}
      >
        <MapChart setTooltipContent={setContent} />
        <Tooltip 
          id="map-tooltip" 
          float
          style={{ 
            backgroundColor: '#1C1B1A', 
            color: '#F5F4F0', 
            borderRadius: '8px', 
            padding: '8px 12px', 
            fontSize: '14px', 
            zIndex: 100,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300
          }} 
        />
      </div>
      <p className="text-xs text-[#8C8B88] mt-4 text-center italic">
        * Możesz przybliżać i przesuwać mapę. Naciśnij na kraj, aby zobaczyć szczegóły.
        ** Krym mapka pokazuje rosyjski, oczywiście jest ukraiński :)
        *** Niektóre państwa niby chcę zobaczyć i są dodane jako takie, ale w tym momencie oczywiście odwiedzić np. Iran czy Izrael byłoby głupotą.
      </p>
    </div>
  );
}
