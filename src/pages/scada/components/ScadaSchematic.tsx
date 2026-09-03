import { useState } from 'react'
import { Box, Chip, Paper, Stack, Tooltip, Typography } from '@mui/material'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import SensorsIcon from '@mui/icons-material/Sensors'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import type { DeviceDto } from '../../../types/device'
import type { LiveTagValue } from '../mockData'
import { statusColors } from '../../../theme/theme'

interface ScadaSchematicProps {
  device: DeviceDto
  tags: LiveTagValue[]
}

function findTag(tags: LiveTagValue[], label: string) {
  return tags.find((t) => t.label.toLowerCase() === label.toLowerCase())
}

export function ScadaSchematic({ device, tags }: ScadaSchematicProps) {
  const [activeComponent, setActiveComponent] = useState<string | null>(null)
  const isOnline = device.status === 'ONLINE'

  const dcVoltage = findTag(tags, 'DC Voltage')?.value ?? 596
  const dcCurrent = findTag(tags, 'DC Current')?.value ?? 39.2
  const acPower = findTag(tags, 'AC Power')?.value ?? 23.4
  const gridFreq = findTag(tags, 'Grid Frequency')?.value ?? 49.97
  const inverterTemp = findTag(tags, 'Inverter Temp')?.value ?? 44.5
  const efficiency = findTag(tags, 'Efficiency')?.value ?? 98.7
  const powerFactor = findTag(tags, 'Power Factor')?.value ?? 0.99

  const flowColor = isOnline ? '#10B981' : '#64748B'
  const dcFlowColor = isOnline ? '#F59E0B' : '#64748B'

  return (
    <Paper sx={{ p: 2.5, borderRadius: 3.5, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 2 }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              bgcolor: '#0B2545',
              color: '#F59E0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AccountTreeOutlinedIcon fontSize="small" />
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0B2545', lineHeight: 1.1 }}>
              Industrial Single-Line Diagram (SLD) — {device.deviceCode}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Real-time SCADA schematic: PV Array ➔ AJB ➔ Inverter ➔ Transformer ➔ 11kV Grid
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Chip
            icon={<SensorsIcon style={{ color: isOnline ? '#10B981' : '#EF4444', fontSize: 16 }} />}
            label={isOnline ? 'Telemetry Active' : 'Offline'}
            size="small"
            sx={{
              bgcolor: isOnline ? '#ECFDF5' : '#FEE2E2',
              color: isOnline ? '#047857' : '#B91C1C',
              fontWeight: 800,
              fontSize: 11,
            }}
          />
          <Chip
            icon={<FlashOnIcon style={{ color: '#F59E0B', fontSize: 16 }} />}
            label={`Power: ${acPower.toFixed(1)} kW`}
            size="small"
            sx={{ bgcolor: '#FEF3C7', color: '#B45309', fontWeight: 800, fontSize: 11 }}
          />
        </Stack>
      </Stack>

      <Box sx={{ overflowX: 'auto', p: 1, bgcolor: '#F8FAFC', borderRadius: 3, border: '1px solid #E2E8F0' }}>
        <svg viewBox="0 0 1020 310" width="100%" height="310" style={{ minWidth: 860 }}>
          <defs>
            <style>
              {`
                @keyframes dc-flow-dash {
                  to { stroke-dashoffset: -20; }
                }
                @keyframes ac-flow-dash {
                  to { stroke-dashoffset: -20; }
                }
                .scada-dc-line {
                  stroke-dasharray: 6 5;
                  animation: dc-flow-dash 0.8s linear infinite;
                }
                .scada-ac-line {
                  stroke-dasharray: 6 5;
                  animation: ac-flow-dash 0.8s linear infinite;
                }
                .component-hover {
                  cursor: pointer;
                  transition: all 0.2s ease;
                }
                .component-hover:hover {
                  filter: drop-shadow(0px 4px 8px rgba(11, 37, 69, 0.2));
                }
              `}
            </style>

            {/* Gradients */}
            <linearGradient id="pvGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0B2545" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
            <linearGradient id="invGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F1F5F9" />
            </linearGradient>
            <linearGradient id="transGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          {/* BACKGROUND SCADA GRID LINES */}
          <pattern id="scadaGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="2 2" />
          </pattern>
          <rect width="1020" height="310" fill="url(#scadaGrid)" opacity="0.6" />

          {/* ========================================================
              SECTION 1: PV SOLAR ARRAYS & ARRAY JUNCTION BOX (AJB)
             ======================================================== */}
          <g className="component-hover" onClick={() => setActiveComponent('PV Array & AJB')}>
            {/* PV String 1 */}
            <rect x="25" y="45" width="100" height="60" rx="6" fill="url(#pvGrad)" stroke="#38BDF8" strokeWidth="1.5" />
            {[0, 1].map((r) =>
              [0, 1, 2].map((c) => (
                <rect
                  key={`pv1-${r}-${c}`}
                  x={32 + c * 30}
                  y={52 + r * 25}
                  width="24"
                  height="18"
                  rx="2"
                  fill="#F59E0B"
                  opacity={isOnline ? 0.85 : 0.3}
                />
              )),
            )}

            {/* PV String 2 */}
            <rect x="25" y="125" width="100" height="60" rx="6" fill="url(#pvGrad)" stroke="#38BDF8" strokeWidth="1.5" />
            {[0, 1].map((r) =>
              [0, 1, 2].map((c) => (
                <rect
                  key={`pv2-${r}-${c}`}
                  x={32 + c * 30}
                  y={132 + r * 25}
                  width="24"
                  height="18"
                  rx="2"
                  fill="#F59E0B"
                  opacity={isOnline ? 0.85 : 0.3}
                />
              )),
            )}

            <text x="75" y="32" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0B2545">
              PV String Arrays
            </text>

            {/* String Lines to AJB */}
            <line x1="125" y1="75" x2="165" y2="105" stroke={dcFlowColor} strokeWidth="2" className={isOnline ? 'scada-dc-line' : undefined} />
            <line x1="125" y1="155" x2="165" y2="125" stroke={dcFlowColor} strokeWidth="2" className={isOnline ? 'scada-dc-line' : undefined} />

            {/* Array Junction Box (AJB) */}
            <rect x="165" y="95" width="70" height="40" rx="5" fill="#0B2545" stroke="#F59E0B" strokeWidth="1.5" />
            <circle cx="185" cy="115" r="5" fill={isOnline ? '#10B981' : '#EF4444'} />
            <text x="200" y="119" fontSize="10" fontWeight="800" fill="#FFFFFF">AJB</text>
            <text x="200" y="85" textAnchor="middle" fontSize="10" fontWeight="700" fill="#64748B">Combiner</text>
          </g>

          {/* ========================================================
              SECTION 2: DC ISOLATOR SWITCH & BUS (AJB -> INVERTER)
             ======================================================== */}
          {/* Main DC Line */}
          <line x1="235" y1="115" x2="340" y2="115" stroke={dcFlowColor} strokeWidth="3" className={isOnline ? 'scada-dc-line' : undefined} />

          {/* DC Telemetry Text */}
          <rect x="250" y="88" width="75" height="22" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
          <text x="287" y="103" textAnchor="middle" fontSize="10" fontWeight="800" fill="#D97706">
            {dcVoltage.toFixed(0)}V • {dcCurrent.toFixed(1)}A
          </text>

          {/* DC Isolator Breaker Symbol */}
          <circle cx="340" cy="115" r="8" fill="#FFFFFF" stroke={isOnline ? '#10B981' : '#EF4444'} strokeWidth="2" />
          <path d="M 336 115 L 344 115" stroke={isOnline ? '#10B981' : '#EF4444'} strokeWidth="2.5" />
          <text x="340" y="138" textAnchor="middle" fontSize="9" fontWeight="700" fill="#64748B">DC Switch</text>

          {/* ========================================================
              SECTION 3: CENTRAL SOLAR INVERTER UNIT
             ======================================================== */}
          <g className="component-hover" onClick={() => setActiveComponent('Central Solar Inverter')}>
            <line x1="348" y1="115" x2="385" y2="115" stroke={dcFlowColor} strokeWidth="3" className={isOnline ? 'scada-dc-line' : undefined} />

            {/* Inverter Cabinet Container */}
            <rect
              x="385"
              y="55"
              width="140"
              height="125"
              rx="8"
              fill="url(#invGrad)"
              stroke={isOnline ? statusColors.ONLINE : '#CBD5E1'}
              strokeWidth="2"
            />
            {/* Header Strip */}
            <rect x="385" y="55" width="140" height="26" rx="8" fill="#0B2545" />
            <text x="455" y="72" textAnchor="middle" fontSize="11" fontWeight="800" fill="#FFFFFF">
              INVERTER {device.deviceCode}
            </text>

            {/* Converter Symbol (DC = AC ~) */}
            <rect x="425" y="90" width="60" height="40" rx="4" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="440" y="112" fontSize="11" fontWeight="800" fill="#D97706">DC</text>
            <path d="M 460 115 L 460 95" stroke="#64748B" strokeWidth="1.5" strokeDasharray="2 2" />
            <text x="466" y="112" fontSize="12" fontWeight="800" fill="#10B981">AC ~</text>

            {/* Inverter Metrics Box */}
            <text x="455" y="148" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0B2545">
              P: {acPower.toFixed(1)} kW
            </text>
            <text x="455" y="163" textAnchor="middle" fontSize="9" fontWeight="600" fill="#64748B">
              Eff: {efficiency.toFixed(1)}% • {inverterTemp.toFixed(1)}°C
            </text>
          </g>

          {/* ========================================================
              SECTION 4: AC BREAKER (ACB) & MULTI-FUNCTION METER (MFM)
             ======================================================== */}
          {/* Main AC Line: Inverter -> ACB */}
          <line x1="525" y1="115" x2="600" y2="115" stroke={flowColor} strokeWidth="3.5" className={isOnline ? 'scada-ac-line' : undefined} />

          {/* AC Power Callout */}
          <rect x="535" y="88" width="55" height="22" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
          <text x="562" y="103" textAnchor="middle" fontSize="10" fontWeight="800" fill="#10B981">
            415V AC
          </text>

          {/* AC Breaker (ACB) Symbol */}
          <g className="component-hover" onClick={() => setActiveComponent('AC Circuit Breaker')}>
            <rect x="600" y="100" width="30" height="30" rx="4" fill="#FFFFFF" stroke={isOnline ? '#10B981' : '#EF4444'} strokeWidth="2" />
            <line x1="608" y1="115" x2="622" y2="115" stroke={isOnline ? '#10B981' : '#EF4444'} strokeWidth="3" />
            <text x="615" y="145" textAnchor="middle" fontSize="9" fontWeight="700" fill="#64748B">ACB</text>
          </g>

          <line x1="630" y1="115" x2="670" y2="115" stroke={flowColor} strokeWidth="3.5" className={isOnline ? 'scada-ac-line' : undefined} />

          {/* Multi-Function Meter (MFM) */}
          <g className="component-hover" onClick={() => setActiveComponent('Multi-Function Meter')}>
            <circle cx="670" cy="115" r="14" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
            <text x="670" y="119" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0284C7">MFM</text>
            <text x="670" y="145" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0284C7">PF: {powerFactor}</text>
          </g>

          {/* ========================================================
              SECTION 5: STEP-UP TRANSFORMER (0.415kV / 11kV)
             ======================================================== */}
          <g className="component-hover" onClick={() => setActiveComponent('Step-Up Transformer')}>
            <line x1="684" y1="115" x2="720" y2="115" stroke={flowColor} strokeWidth="3.5" className={isOnline ? 'scada-ac-line' : undefined} />

            {/* Transformer Double Circles Symbol */}
            <circle cx="738" cy="115" r="18" fill="none" stroke="#0B2545" strokeWidth="2.5" />
            <circle cx="758" cy="115" r="18" fill="none" stroke="#0B2545" strokeWidth="2.5" />
            <text x="748" y="148" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0B2545">
              Transformer (11kV)
            </text>
            <text x="748" y="162" textAnchor="middle" fontSize="9" fontWeight="600" fill="#64748B">
              Oil Temp: 52.4°C
            </text>
          </g>

          {/* Vacuum Circuit Breaker (VCB) */}
          <line x1="776" y1="115" x2="820" y2="115" stroke={flowColor} strokeWidth="3.5" className={isOnline ? 'scada-ac-line' : undefined} />
          <g className="component-hover" onClick={() => setActiveComponent('Vacuum Circuit Breaker (VCB)')}>
            <rect x="820" y="100" width="28" height="30" rx="4" fill="#0F172A" stroke="#10B981" strokeWidth="2" />
            <circle cx="834" cy="115" r="4" fill="#10B981" />
            <text x="834" y="145" textAnchor="middle" fontSize="9" fontWeight="700" fill="#64748B">VCB 11kV</text>
          </g>

          {/* ========================================================
              SECTION 6: 3-PHASE HV BUSBAR & GRID UTILITY EXPORT
             ======================================================== */}
          <line x1="848" y1="115" x2="880" y2="115" stroke={flowColor} strokeWidth="4" className={isOnline ? 'scada-ac-line' : undefined} />

          {/* 3-Phase Busbar Vertical Rails (R, Y, B) */}
          <line x1="880" y1="40" x2="880" y2="200" stroke="#EF4444" strokeWidth="3.5" />
          <line x1="886" y1="40" x2="886" y2="200" stroke="#F59E0B" strokeWidth="3.5" />
          <line x1="892" y1="40" x2="892" y2="200" stroke="#0284C7" strokeWidth="3.5" />
          <text x="886" y="30" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0B2545">11kV Busbar</text>

          {/* Busbar to Grid Feeder */}
          <line x1="892" y1="115" x2="930" y2="115" stroke={flowColor} strokeWidth="4" className={isOnline ? 'scada-ac-line' : undefined} />

          {/* Grid Export Tower / Substation Node */}
          <g className="component-hover" onClick={() => setActiveComponent('State Grid Substation Feeder')}>
            <rect x="930" y="60" width="75" height="110" rx="8" fill="#0B2545" stroke="#38BDF8" strokeWidth="2" />
            <path d="M 967 75 L 947 115 L 964 115 L 952 150 L 990 105 L 972 105 Z" fill={isOnline ? '#10B981' : '#94A3B8'} />
            <text x="967" y="185" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0B2545">Grid Feed</text>
            <text x="967" y="198" textAnchor="middle" fontSize="10" fontWeight="700" fill="#10B981">{gridFreq.toFixed(2)} Hz</text>
          </g>

          {/* ========================================================
              SECTION 7: WEATHER & SOLAR RADIATION SENSOR STATION
             ======================================================== */}
          <g transform="translate(680, 205)">
            <rect width="320" height="90" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
            <rect width="320" height="24" rx="8" fill="#F1F5F9" />
            <text x="12" y="16" fontSize="10" fontWeight="800" fill="#0B2545">
              🌤️ Plant Weather &amp; Radiation Sensor Array
            </text>

            <text x="15" y="44" fontSize="10" fontWeight="700" fill="#0F172A">Pyranometer Irradiance:</text>
            <text x="145" y="44" fontSize="11" fontWeight="800" fill="#F59E0B">890 W/m²</text>

            <text x="15" y="62" fontSize="10" fontWeight="700" fill="#0F172A">Ambient Air Temp:</text>
            <text x="145" y="62" fontSize="11" fontWeight="800" fill="#0284C7">32.4 °C</text>

            <text x="15" y="80" fontSize="10" fontWeight="700" fill="#0F172A">Anemometer Wind Speed:</text>
            <text x="145" y="80" fontSize="11" fontWeight="800" fill="#10B981">4.2 m/s</text>
          </g>

          {/* ========================================================
              SECTION 8: SCADA LEGEND
             ======================================================== */}
          <g transform="translate(25, 220)">
            <rect width="450" height="75" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <text x="12" y="18" fontSize="10" fontWeight="800" fill="#0B2545">SCADA SLD Status Legend</text>

            <circle cx="20" cy="38" r="5" fill="#10B981" />
            <text x="32" y="42" fontSize="10" fontWeight="600" fill="#475569">Breaker Closed / Online</text>

            <circle cx="160" cy="38" r="5" fill="#EF4444" />
            <text x="172" y="42" fontSize="10" fontWeight="600" fill="#475569">Breaker Open / Tripped</text>

            <line x1="300" y1="38" x2="330" y2="38" stroke="#F59E0B" strokeWidth="3" strokeDasharray="4 3" />
            <text x="338" y="42" fontSize="10" fontWeight="600" fill="#475569">DC Bus</text>

            <line x1="20" y1="58" x2="50" y2="58" stroke="#10B981" strokeWidth="3" strokeDasharray="4 3" />
            <text x="58" y="62" fontSize="10" fontWeight="600" fill="#475569">415V/11kV AC Flow</text>

            <line x1="160" y1="58" x2="190" y2="58" stroke="#EF4444" strokeWidth="3" />
            <text x="198" y="62" fontSize="10" fontWeight="600" fill="#475569">11kV Busbar (R-Y-B)</text>
          </g>
        </svg>
      </Box>

      {/* Selected Component Modal/Alert Banner */}
      {activeComponent && (
        <Box
          sx={{
            mt: 2,
            p: 1.5,
            borderRadius: 2.5,
            bgcolor: '#E0F2FE',
            border: '1px solid #BAE6FD',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700, color: '#0369A1' }}>
            Selected SCADA Component: <strong>{activeComponent}</strong> • Telemetry Normal
          </Typography>
          <Tooltip title="Clear selection">
            <Typography
              variant="caption"
              onClick={() => setActiveComponent(null)}
              sx={{ cursor: 'pointer', fontWeight: 800, color: '#0284C7', '&:hover': { textDecoration: 'underline' } }}
            >
              Dismiss
            </Typography>
          </Tooltip>
        </Box>
      )}
    </Paper>
  )
}
