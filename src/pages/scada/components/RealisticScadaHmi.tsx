import { useState } from 'react'
import { Box, Chip, Paper, Stack, Typography } from '@mui/material'
import type { DeviceDto } from '../../../types/device'
import type { LiveTagValue } from '../mockData'

interface RealisticScadaHmiProps {
  device: DeviceDto
  tags: LiveTagValue[]
}

function findTag(tags: LiveTagValue[], label: string) {
  return tags.find((t) => t.label.toLowerCase() === label.toLowerCase())
}

export function RealisticScadaHmi({ device, tags }: RealisticScadaHmiProps) {
  const [activeDevice, setActiveDevice] = useState<string | null>(null)
  const isOnline = device.status === 'ONLINE'

  const dcVoltage = findTag(tags, 'DC Voltage')?.value ?? 596
  const dcCurrent = findTag(tags, 'DC Current')?.value ?? 39.2
  const acPower = findTag(tags, 'AC Power')?.value ?? 23.4
  const gridFreq = findTag(tags, 'Grid Frequency')?.value ?? 49.97
  const inverterTemp = findTag(tags, 'Inverter Temp')?.value ?? 44.5
  const efficiency = findTag(tags, 'Efficiency')?.value ?? 98.7
  const powerFactor = findTag(tags, 'Power Factor')?.value ?? 0.99
  // Calculate MFM needle rotation angle based on Power Factor (PF: 0.0 to 1.0)
  // Maps 0.0 -> -55deg (left), 0.5 -> 0deg (center), 1.0 -> +55deg (right)
  const mfmNeedleAngle = Math.min(55, Math.max(-55, (powerFactor - 0.5) * 110))

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 3.5,
        bgcolor: '#FFFFFF', // Crisp White SCADA Background Theme
        color: '#0F172A',
        overflow: 'hidden',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* 1. TOP SCADA HMI MACHINERY STATUS HEADER */}
      <Box
        sx={{
          bgcolor: '#F8FAFC',
          px: 2.5,
          py: 1.5,
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' } }}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                bgcolor: '#F26522',
                color: '#FFFFFF',
                px: 1.2,
                py: 0.4,
                borderRadius: 1.5,
                fontWeight: 900,
                fontSize: 12,
                letterSpacing: 1,
              }}
            >
              MACHINERY STATUS
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0B2545', letterSpacing: 0.3 }}>
              Solar SCADA Plant HMI — {device.deviceCode} {device.plantName ? `(${device.plantName})` : ''}
            </Typography>
          </Stack>

          {/* Digital Telemetry Header Gauges */}
          <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Box sx={{ bgcolor: '#FFFFFF', px: 1.5, py: 0.5, borderRadius: 1.5, border: '1px solid #10B981', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10, fontWeight: 700 }}>Inverter Status</Typography>
              <Typography variant="body2" sx={{ color: isOnline ? '#059669' : '#DC2626', fontWeight: 900, fontFamily: 'monospace' }}>
                {isOnline ? 'RUNNING' : 'OFFLINE'}
              </Typography>
            </Box>

            <Box sx={{ bgcolor: '#FFFFFF', px: 1.5, py: 0.5, borderRadius: 1.5, border: '1px solid #0284C7', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10, fontWeight: 700 }}>Irradiance</Typography>
              <Typography variant="body2" sx={{ color: '#0284C7', fontWeight: 900, fontFamily: 'monospace' }}>
                890 W/m²
              </Typography>
            </Box>

            <Box sx={{ bgcolor: '#FFFFFF', px: 1.5, py: 0.5, borderRadius: 1.5, border: '1px solid #D97706', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10, fontWeight: 700 }}>AC Export Power</Typography>
              <Typography variant="body2" sx={{ color: '#D97706', fontWeight: 900, fontFamily: 'monospace' }}>
                {acPower.toFixed(1)} kW
              </Typography>
            </Box>

            <Box sx={{ bgcolor: '#FFFFFF', px: 1.5, py: 0.5, borderRadius: 1.5, border: '1px solid #7C3AED', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10, fontWeight: 700 }}>Grid Freq</Typography>
              <Typography variant="body2" sx={{ color: '#7C3AED', fontWeight: 900, fontFamily: 'monospace' }}>
                {gridFreq.toFixed(2)} Hz
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>

      {/* 2. REALISTIC 3D SCADA GRAPHICAL CANVAS (WHITE MODE) */}
      <Box sx={{ position: 'relative', overflowX: 'auto', p: 1 }}>
        <svg viewBox="0 0 1200 350" width="100%" height="350" style={{ minWidth: 1050 }}>
          <defs>
            <style>
              {`
                @keyframes pipeWaterFlow {
                  to { stroke-dashoffset: -30; }
                }
                .scada-wire-flow {
                  stroke-dasharray: 8 6;
                  animation: pipeWaterFlow 1s linear infinite;
                }
                .hmi-device-hover {
                  cursor: pointer;
                  transition: transform 0.2s ease, filter 0.2s ease;
                }
                .hmi-device-hover:hover {
                  filter: drop-shadow(0px 4px 10px rgba(11, 37, 69, 0.25));
                }
              `}
            </style>

            {/* Realistic metallic and solar panel gradients */}
            <linearGradient id="solarPanelGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="50%" stopColor="#0B2545" />
              <stop offset="100%" stopColor="#030712" />
            </linearGradient>

            <linearGradient id="metalBody" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#64748B" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            <linearGradient id="transBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            {/* Background Grid Pattern */}
            <pattern id="lightGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="0.75" />
            </pattern>
            <linearGradient id="sunBeamGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* INDUSTRIAL SCADA CANVAS BACKGROUND (WHITE / LIGHT GREY GRID) */}
          <rect width="1200" height="350" fill="#FFFFFF" />
          <rect width="1200" height="350" fill="url(#lightGrid)" opacity="0.6" />

          {/* GROUND GRID & CONCRETE PLATFORM */}
          <rect x="20" y="340" width="1160" height="10" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="20" y1="340" x2="1180" y2="340" stroke="#10B981" strokeWidth="2" opacity="0.8" />

          {/* ========================================================
              SUN GRAPHIC & RADIATING SUNBEAM RAYS (BEAMING ON PV ARRAY)
             ======================================================== */}
          <g transform="translate(95, 50)">
            {/* Glowing Sun Core & Outer Halo */}
            <circle cx="0" cy="0" r="16" fill="#F59E0B" />
            <circle cx="0" cy="0" r="25" fill="#FEF3C7" opacity="0.6" />

            {/* 8 Sunburst Radiating Rays */}
            <line x1="0" y1="-26" x2="0" y2="-18" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <line x1="0" y1="18" x2="0" y2="26" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <line x1="-26" y1="0" x2="-18" y2="0" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <line x1="18" y1="0" x2="26" y2="0" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <line x1="-18" y1="-18" x2="-12" y2="-12" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="12" y1="12" x2="18" y2="18" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="12" y1="-12" x2="18" y2="-18" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="-18" y1="18" x2="-12" y2="12" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />

            {/* Translucent Sunbeam Cone & Radiating Light Beams onto Solar Panels */}
            <polygon points="0,16 -55,145 75,145" fill="url(#sunBeamGrad)" />
            <line x1="-5" y1="18" x2="-45" y2="148" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5 4" opacity="0.85" />
            <line x1="0" y1="20" x2="0" y2="148" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="5 4" opacity="0.9" />
            <line x1="5" y1="18" x2="45" y2="148" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5 4" opacity="0.85" />
          </g>

          {/* ========================================================
              DEVICE 1: REALISTIC 3D TILTED SOLAR PV ARRAY FIELD
             ======================================================== */}
          <g className="hmi-device-hover" onClick={() => setActiveDevice('3D Solar PV Panel Array Field')}>
            {/* Ground Racks & Framework */}
            <line x1="45" y1="340" x2="65" y2="240" stroke="#475569" strokeWidth="4" />
            <line x1="125" y1="340" x2="145" y2="240" stroke="#475569" strokeWidth="4" />

            {/* Tilted Solar PV Panels (3D Isometric effect) */}
            <polygon points="30,240 160,200 180,270 50,310" fill="url(#solarPanelGrad)" stroke="#0284C7" strokeWidth="2" />
            {/* Panel Grid Lines */}
            <line x1="80" y1="225" x2="100" y2="295" stroke="#38BDF8" strokeWidth="1" opacity="0.7" />
            <line x1="120" y1="212" x2="140" y2="282" stroke="#38BDF8" strokeWidth="1" opacity="0.7" />
            <line x1="38" y1="260" x2="168" y2="220" stroke="#38BDF8" strokeWidth="1" opacity="0.7" />

            {/* Sun Rays Effect on Panels */}
            <circle cx="105" cy="255" r="22" fill="#F59E0B" opacity="0.2" />

            {/* Label & Parameter Box */}
            <rect x="30" y="165" width="130" height="26" rx="4" fill="#0B2545" stroke="#0284C7" strokeWidth="1.5" />
            <text x="95" y="182" textAnchor="middle" fontSize="11" fontWeight="800" fill="#FFFFFF">
              SOLAR PV ARRAY
            </text>
          </g>

          {/* ========================================================
              DEVICE 2: REALISTIC 3D ARRAY JUNCTION BOX (AJB / COMBINER)
             ======================================================== */}
          <g className="hmi-device-hover" onClick={() => setActiveDevice('Array Junction Box (AJB)')}>
            {/* Cable Conduit: Solar to AJB */}
            <path d="M 180 250 L 225 250 L 225 235" fill="none" stroke="#D97706" strokeWidth="4" className="scada-wire-flow" />

            {/* Bottom Heavy Industrial Cable Glands (4 Entry Grommets) */}
            <rect x="222" y="270" width="6" height="10" rx="1" fill="#1E293B" />
            <rect x="232" y="270" width="6" height="10" rx="1" fill="#1E293B" />
            <rect x="242" y="270" width="6" height="10" rx="1" fill="#1E293B" />
            <rect x="252" y="270" width="6" height="10" rx="1" fill="#1E293B" />

            {/* AJB Outer Weatherproof Enclosure (Polycarbonate Grey) */}
            <rect x="213" y="195" width="54" height="76" rx="5" fill="url(#metalBody)" stroke="#1E293B" strokeWidth="2" />

            {/* Door Frame Inner Layer */}
            <rect x="218" y="200" width="44" height="66" rx="3" fill="#0B2545" stroke="#38BDF8" strokeWidth="1" />

            {/* Transparent Glass Inspection Window */}
            <rect x="223" y="205" width="34" height="28" rx="2" fill="#0F172A" stroke="#0284C7" strokeWidth="1" />

            {/* Internal DIN-Rail String Fuses & SPD LED Indicator Modules */}
            <rect x="226" y="210" width="6" height="18" fill="#DC2626" rx="1" />
            <rect x="234" y="210" width="6" height="18" fill="#DC2626" rx="1" />
            <rect x="242" y="210" width="6" height="18" fill="#DC2626" rx="1" />
            {/* SPD Status LED */}
            <circle cx="252" cy="219" r="3" fill={isOnline ? '#34D399' : '#EF4444'} />

            {/* Red & Yellow Rotary Isolator Switch Knob */}
            <circle cx="240" cy="248" r="9" fill="#F59E0B" stroke="#DC2626" strokeWidth="2.5" />
            <rect x="238" y="241" width="4" height="14" rx="1" fill="#DC2626" transform="rotate(25, 240, 248)" />

            {/* Warning High Voltage Lightning Icon */}
            <text x="226" y="252" fontSize="9" fontWeight="900" fill="#F59E0B">⚡</text>

            {/* Label Box Positioned Cleanly Underneath AJB */}
            <rect x="170" y="292" width="140" height="24" rx="4" fill="#0B2545" stroke="#0284C7" strokeWidth="1.5" />
            <text x="240" y="308" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#FFFFFF">
              ARRAY JUNCTION BOX
            </text>

            {/* Digital Readout Telemetry Box */}
            <rect x="183" y="162" width="114" height="24" rx="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.5" />
            <text x="240" y="178" textAnchor="middle" fontSize="10" fontWeight="900" fill="#D97706" fontFamily="monospace">
              {dcVoltage.toFixed(0)}V • {dcCurrent.toFixed(1)}A DC
            </text>
          </g>

          {/* ========================================================
              DEVICE 3: REALISTIC 3D HEAVY-DUTY DC DISCONNECT ISOLATOR SWITCH
             ======================================================== */}
          <g className="hmi-device-hover" onClick={() => setActiveDevice('DC Isolator Switch & SPD')}>
            <path d="M 267 235 L 340 235" fill="none" stroke="#D97706" strokeWidth="4" className="scada-wire-flow" />

            {/* Industrial Wall-Mount Enclosure Box */}
            <rect x="340" y="200" width="50" height="66" rx="5" fill="url(#metalBody)" stroke="#1E293B" strokeWidth="2" />
            <rect x="344" y="204" width="42" height="58" rx="3" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />

            {/* Corner Mounting Screws */}
            <circle cx="348" cy="208" r="1.5" fill="#475569" />
            <circle cx="382" cy="208" r="1.5" fill="#475569" />
            <circle cx="348" cy="258" r="1.5" fill="#475569" />
            <circle cx="382" cy="258" r="1.5" fill="#475569" />

            {/* Red & Yellow Heavy-Duty Rotary Switch Handle */}
            <circle cx="365" cy="233" r="14" fill="#F59E0B" stroke="#DC2626" strokeWidth="3" />
            <circle cx="365" cy="233" r="6" fill="#DC2626" />
            {/* Switch Lever Arm */}
            <rect x="363" y="221" width="4" height="24" rx="1.5" fill="#DC2626" transform="rotate(30, 365, 233)" />

            {/* LED Status Light Indicator */}
            <circle cx="379" cy="214" r="2.5" fill={isOnline ? '#10B981' : '#EF4444'} />

            {/* ON / OFF Markings */}
            <text x="365" y="215" textAnchor="middle" fontSize="7.5" fontWeight="900" fill="#059669">ON</text>

            {/* Label Underneath (Plain Text) */}
            <text x="365" y="282" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#475569">
              DC Switch
            </text>
          </g>

          {/* ========================================================
              DEVICE 4: REALISTIC 3D CENTRAL INVERTER CABINET
             ======================================================== */}
          <g className="hmi-device-hover" onClick={() => setActiveDevice('Central Inverter Cabinet')}>
            <path d="M 390 235 L 450 235" fill="none" stroke="#D97706" strokeWidth="4" className="scada-wire-flow" />

            {/* Outer Heavy Metallic Cabinet Body */}
            <rect x="450" y="140" width="140" height="170" rx="6" fill="url(#metalBody)" stroke="#1E293B" strokeWidth="2.5" />

            {/* Front Panel Control Box */}
            <rect x="462" y="152" width="116" height="146" fill="#0F172A" rx="4" />

            {/* Cooling Vent Grills */}
            {[0, 1, 2, 3].map((v) => (
              <line key={`vent-${v}`} x1="470" y1={165 + v * 8} x2="570" y2={165 + v * 8} stroke="#334155" strokeWidth="2" />
            ))}

            {/* LCD Digital Control Display Screen */}
            <rect x="472" y="205" width="96" height="45" rx="3" fill="#061D1D" stroke="#38BDF8" strokeWidth="1.5" />
            <text x="520" y="219" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#34D399" fontFamily="monospace">
              P: {acPower.toFixed(1)} kW
            </text>
            <text x="520" y="231" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#38BDF8" fontFamily="monospace">
              EFF: {efficiency.toFixed(1)}%
            </text>
            <text x="520" y="243" textAnchor="middle" fontSize="9" fontWeight="800" fill="#F59E0B" fontFamily="monospace">
              TEMP: {inverterTemp.toFixed(1)}°C
            </text>

            {/* Status Indicator LED lights */}
            <circle cx="485" cy="265" r="4" fill={isOnline ? '#34D399' : '#94A3B8'} />
            <circle cx="500" cy="265" r="4" fill="#F59E0B" />
            <circle cx="515" cy="265" r="4" fill="#60A5FA" />
            <text x="550" y="268" textAnchor="middle" fontSize="9" fontWeight="700" fill="#94A3B8">IGBT Mode</text>

            {/* Label */}
            <rect x="425" y="102" width="190" height="26" rx="4" fill="#0B2545" stroke="#10B981" strokeWidth="1.5" />
            <text x="520" y="119" textAnchor="middle" fontSize="11" fontWeight="800" fill="#34D399">
              INVERTER {device.deviceCode}
            </text>
          </g>

          {/* ========================================================
              DEVICE 5: REALISTIC 3D AIR CIRCUIT BREAKER (ACB 415V)
             ======================================================== */}
          <g className="hmi-device-hover" onClick={() => setActiveDevice('AC Circuit Breaker & MFM')}>
            {/* AC Line: Inverter to ACB */}
            <path d="M 590 235 L 655 235" fill="none" stroke="#059669" strokeWidth="5" className="scada-wire-flow" />

            {/* Industrial ACB Draw-out Cradle Enclosure */}
            <rect x="655" y="196" width="50" height="74" rx="5" fill="url(#metalBody)" stroke="#1E293B" strokeWidth="2" />

            {/* Inner Breaker Panel Front Face */}
            <rect x="659" y="200" width="42" height="66" rx="3" fill="#0B2545" stroke="#059669" strokeWidth="1" />

            {/* Mechanical Push Buttons: TRIP (Red) & CLOSE (Green) */}
            <circle cx="669" cy="212" r="4" fill="#DC2626" stroke="#FFFFFF" strokeWidth="1" />
            <text x="669" y="214.5" textAnchor="middle" fontSize="6" fontWeight="900" fill="#FFFFFF">OFF</text>

            <circle cx="691" cy="212" r="4" fill="#059669" stroke="#FFFFFF" strokeWidth="1" />
            <text x="691" y="214.5" textAnchor="middle" fontSize="6" fontWeight="900" fill="#FFFFFF">ON</text>

            {/* Breaker Position Window & Spring Status Indicator */}
            <rect x="665" y="224" width="30" height="14" rx="2" fill="#0F172A" stroke="#38BDF8" strokeWidth="1" />
            <text x="680" y="234" textAnchor="middle" fontSize="7.5" fontWeight="900" fill={isOnline ? '#34D399' : '#EF4444'}>
              {isOnline ? 'CLOSED' : 'OPEN'}
            </text>

            {/* Racking Mechanism Dial / Spring Charging Handle */}
            <circle cx="680" cy="252" r="7" fill="#64748B" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="680" y1="247" x2="680" y2="257" stroke="#1E293B" strokeWidth="2" />

            {/* Label Underneath (Plain Text) */}
            <text x="680" y="284" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#475569">
              ACB 415V
            </text>
          </g>

          {/* ========================================================
              DEVICE 6: REALISTIC ANALOG DIAL METER (MFM GAUGE)
             ======================================================== */}
          <g className="hmi-device-hover" onClick={() => setActiveDevice('AC Circuit Breaker & MFM')}>
            {/* AC Line: ACB to MFM to Transformer */}
            <path d="M 705 235 L 820 235" fill="none" stroke="#059669" strokeWidth="5" className="scada-wire-flow" />

            {/* Top Digital Telemetry Readout Badge */}
            <rect x="730" y="188" width="50" height="18" rx="3" fill="#FFFFFF" stroke="#D97706" strokeWidth="1" />
            <text x="755" y="200" textAnchor="middle" fontSize="9" fontWeight="900" fill="#D97706">
              PF:{powerFactor}
            </text>

            {/* MFM Meter Outer Bezel Ring & Housing */}
            <circle cx="755" cy="235" r="22" fill="#FFFFFF" stroke="#475569" strokeWidth="2" />
            <circle cx="755" cy="235" r="20" fill="#0F172A" />

            {/* Meter Scale Arc Ticks */}
            <path d="M 738 226 A 18 18 0 0 1 772 226" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 2" />

            {/* Dynamic Moving Needle Pointer (Rotates based on PF reading) */}
            <line
              x1="755"
              y1="235"
              x2="755"
              y2="218"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeLinecap="round"
              transform={`rotate(${mfmNeedleAngle}, 755, 235)`}
              style={{ transition: 'transform 0.5s ease-in-out' }}
            />

            {/* Center Pivot Cap */}
            <circle cx="755" cy="235" r="4" fill="#DC2626" stroke="#FFFFFF" strokeWidth="1" />

            {/* Label Underneath (Plain Text) */}
            <text x="755" y="270" textAnchor="middle" fontSize="10" fontWeight="900" fill="#0284C7">
              MFM
            </text>
          </g>

          {/* ========================================================
              DEVICE 7: REALISTIC 3D STEP-UP SUBSTATION TRANSFORMER
             ======================================================== */}
          <g className="hmi-device-hover" onClick={() => setActiveDevice('3D Step-Up Transformer (0.415kV / 11kV)')}>
            {/* Transformer Main Oil Tank Body */}
            <rect x="820" y="160" width="110" height="140" rx="8" fill="url(#transBody)" stroke="#1E293B" strokeWidth="2.5" />

            {/* Cooling Fins / Radiators on sides */}
            {[0, 1, 2, 3, 4].map((f) => (
              <rect key={`fin-${f}`} x="804" y={175 + f * 22} width="16" height="14" rx="2" fill="#475569" />
            ))}

            {/* High Voltage Bushings on Top */}
            <line x1="845" y1="160" x2="845" y2="135" stroke="#64748B" strokeWidth="5" />
            <line x1="875" y1="160" x2="875" y2="135" stroke="#64748B" strokeWidth="5" />
            <line x1="905" y1="160" x2="905" y2="135" stroke="#64748B" strokeWidth="5" />
            <circle cx="845" cy="130" r="5" fill="#D97706" />
            <circle cx="875" cy="130" r="5" fill="#D97706" />
            <circle cx="905" cy="130" r="5" fill="#D97706" />

            {/* Oil Level Gauge Dial */}
            <circle cx="875" cy="210" r="18" fill="#000000" stroke="#F59E0B" strokeWidth="2" />
            <text x="875" y="214" textAnchor="middle" fontSize="9" fontWeight="900" fill="#F59E0B">52.4°C</text>

            {/* Label (Positioned cleanly below transformer tank) */}
            <rect x="790" y="308" width="170" height="26" rx="4" fill="#0B2545" stroke="#D97706" strokeWidth="1.5" />
            <text x="875" y="325" textAnchor="middle" fontSize="11" fontWeight="800" fill="#F59E0B">
              TRANSFORMER (11kV)
            </text>
          </g>

          {/* ========================================================
              DEVICE 8: 3D HIGH-VOLTAGE TRANSMISSION TOWER & GRID
             ======================================================== */}
          <g className="hmi-device-hover" onClick={() => setActiveDevice('11kV Substation Grid Transmission Feeder')}>
            {/* HV Line: Transformer to Substation */}
            <path d="M 905 130 L 905 60 L 1000 60" fill="none" stroke="#D97706" strokeWidth="4" className="scada-wire-flow" />

            {/* 3-Phase Busbar Vertical Lines (R, Y, B) */}
            <line x1="1000" y1="40" x2="1000" y2="340" stroke="#DC2626" strokeWidth="3.5" />
            <line x1="1008" y1="40" x2="1008" y2="340" stroke="#D97706" strokeWidth="3.5" />
            <line x1="1016" y1="40" x2="1016" y2="340" stroke="#0284C7" strokeWidth="3.5" />
            <text x="1008" y="28" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#F26522">11kV BUSBAR (R-Y-B)</text>

            {/* Connection to Transmission Tower */}
            <path d="M 1016 190 L 1060 190" fill="none" stroke="#059669" strokeWidth="5" className="scada-wire-flow" />

            {/* 3D Metallic Grid Transmission Tower */}
            <polygon points="1105,80 1075,340 1135,340" fill="none" stroke="#334155" strokeWidth="3" />
            {/* Tower Cross Arms */}
            <line x1="1060" y1="120" x2="1150" y2="120" stroke="#334155" strokeWidth="4" />
            <line x1="1070" y1="160" x2="1140" y2="160" stroke="#334155" strokeWidth="4" />
            {/* Lattice Cross Brace Lines */}
            <line x1="1095" y1="120" x2="1115" y2="160" stroke="#64748B" strokeWidth="1.5" />
            <line x1="1115" y1="120" x2="1095" y2="160" stroke="#64748B" strokeWidth="1.5" />
            <line x1="1090" y1="160" x2="1120" y2="240" stroke="#64748B" strokeWidth="1.5" />
            <line x1="1120" y1="160" x2="1090" y2="240" stroke="#64748B" strokeWidth="1.5" />

            {/* Parameter Text (Plain Text) */}
            <text x="1105" y="48" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#059669" fontFamily="monospace">
              GRID: {gridFreq.toFixed(2)} Hz
            </text>
          </g>

          {/* ========================================================
              DEVICE 9: WEATHER & RADIATION SENSOR MAST
             ======================================================== */}
          <g transform="translate(560, 18)">
            <rect width="190" height="60" rx="6" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
            <text x="12" y="16" fontSize="10" fontWeight="800" fill="#0284C7">🌤️ WEATHER MAST SENSORS</text>
            <text x="12" y="34" fontSize="10" fontWeight="700" fill="#0F172A">Pyranometer: 890 W/m²</text>
            <text x="12" y="49" fontSize="10" fontWeight="700" fill="#059669">Wind Speed: 4.2 m/s</text>
          </g>

          {/* ========================================================
              HMI LEGEND BOX (Positioned in Top Open Space)
             ======================================================== */}
          <g transform="translate(300, 18)">
            <rect width="210" height="65" rx="6" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
            <rect width="210" height="20" rx="6" fill="#F8FAFC" />
            <text x="105" y="14" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#0B2545">HMI SYMBOL LEGEND</text>

            <circle cx="15" cy="34" r="4" fill="#059669" />
            <text x="24" y="37" fontSize="9" fontWeight="700" fill="#475569">Online / Closed</text>

            <circle cx="115" cy="34" r="4" fill="#DC2626" />
            <text x="124" y="37" fontSize="9" fontWeight="700" fill="#475569">Fault / Open</text>

            <line x1="10" y1="52" x2="22" y2="52" stroke="#D97706" strokeWidth="3" strokeDasharray="3 2" />
            <text x="26" y="55" fontSize="9" fontWeight="700" fill="#475569">DC Current</text>

            <line x1="110" y1="52" x2="122" y2="52" stroke="#059669" strokeWidth="3" strokeDasharray="3 2" />
            <text x="126" y="55" fontSize="9" fontWeight="700" fill="#475569">AC Current</text>
          </g>

        </svg>
      </Box>

      {/* 3. BOTTOM SUMMARY CARD (Clean Single Row) */}
      <Box
        sx={{
          bgcolor: '#F8FAFC',
          px: 3,
          py: 1.8,
          borderTop: '1px solid #E2E8F0',
        }}
      >
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={2}
          sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', lg: 'center' } }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 900, color: '#0B2545', whiteSpace: 'nowrap', letterSpacing: 0.3 }}>
            Statewide Plant Scope
          </Typography>

          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                px: 1.8,
                py: 0.6,
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, fontSize: 11 }}>
                Covered Substation Nodes:
              </Typography>
              <Typography variant="body2" sx={{ color: '#0284C7', fontWeight: 900, fontSize: 13, fontFamily: 'monospace' }}>
                14
              </Typography>
            </Box>

            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                px: 1.8,
                py: 0.6,
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, fontSize: 11 }}>
                Covered Inverters:
              </Typography>
              <Typography variant="body2" sx={{ color: '#059669', fontWeight: 900, fontSize: 13, fontFamily: 'monospace' }}>
                185
              </Typography>
            </Box>

            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                px: 1.8,
                py: 0.6,
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, fontSize: 11 }}>
                Total Capacity:
              </Typography>
              <Typography variant="body2" sx={{ color: '#D97706', fontWeight: 900, fontSize: 13, fontFamily: 'monospace' }}>
                120 MW
              </Typography>
            </Box>

            {activeDevice && (
              <Chip
                label={`Inspecting: ${activeDevice}`}
                size="small"
                onDelete={() => setActiveDevice(null)}
                sx={{ bgcolor: '#E0F2FE', color: '#0369A1', fontWeight: 900, fontSize: 11 }}
              />
            )}
          </Stack>
        </Stack>
      </Box>
    </Paper>
  )
}
