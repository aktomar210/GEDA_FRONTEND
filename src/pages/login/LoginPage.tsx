import { useState } from 'react'
import { Box, Chip, Container, Grid, Paper, Stack, Typography } from '@mui/material'
import SolarIcon from '@mui/icons-material/WbSunnyOutlined'
import WindIcon from '@mui/icons-material/AirOutlined'
import SecurityIcon from '@mui/icons-material/VerifiedUserOutlined'
import SpeedIcon from '@mui/icons-material/SpeedOutlined'
import { PasswordStep } from './PasswordStep'
import { OtpStep } from './OtpStep'
import { GedaLogo } from '../../components/GedaLogo'

type LoginStep = 'password' | 'otp'

export function LoginPage() {
  const [step, setStep] = useState<LoginStep>('password')

  const handleMfaRequired = () => {
    setStep('otp')
  }

  const handleBackToPassword = () => {
    setStep('password')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(circle at 15% 20%, #13335F 0%, #0B2545 45%, #081B34 100%)',
        position: 'relative',
        overflow: 'hidden',
        p: { xs: 2, md: 4 },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background:
            'radial-gradient(circle, rgba(201, 147, 46, 0.15) 0%, rgba(201, 147, 46, 0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background:
            'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'center' }}>
          {/* Left Column: Branding & Feature Highlights */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ pr: { md: 4 }, color: '#FFFFFF' }}>
              <Chip
                label="Govt. of Gujarat • Renewable Energy Agency"
                sx={{
                  bgcolor: 'rgba(201, 147, 46, 0.2)',
                  color: '#F59E0B',
                  border: '1px solid rgba(201, 147, 46, 0.4)',
                  fontWeight: 800,
                  fontSize: 12,
                  mb: 3,
                }}
              />

              <Box sx={{ mb: 3 }}>
                <GedaLogo variant="full" size="large" colorMode="dark" />
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: '#FFFFFF',
                  mb: 2,
                  fontSize: { xs: 24, md: 30 },
                  lineHeight: 1.2,
                }}
              >
                Statewide Renewable Energy Monitoring Platform
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.75)',
                  mb: 4,
                  fontSize: 15,
                  lineHeight: 1.6,
                }}
              >
                Welcome to Gujarat Energy Development Agency SCADA Portal. Real-time telemetry,
                inverter device management, automated generation billing, and cyber-secured RMS integration.
              </Typography>

              {/* Highlights */}
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        bgcolor: 'rgba(245, 158, 11, 0.15)',
                        color: '#F59E0B',
                        display: 'flex',
                      }}
                    >
                      <SolarIcon fontSize="small" />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#E2E8F0' }}>
                      Solar Inverters
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        bgcolor: 'rgba(16, 185, 129, 0.15)',
                        color: '#10B981',
                        display: 'flex',
                      }}
                    >
                      <WindIcon fontSize="small" />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#E2E8F0' }}>
                      Wind Farms
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        bgcolor: 'rgba(2, 132, 199, 0.15)',
                        color: '#38BDF8',
                        display: 'flex',
                      }}
                    >
                      <SpeedIcon fontSize="small" />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#E2E8F0' }}>
                      Real-time SCADA
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        bgcolor: 'rgba(201, 147, 46, 0.15)',
                        color: '#C9932E',
                        display: 'flex',
                      }}
                    >
                      <SecurityIcon fontSize="small" />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#E2E8F0' }}>
                      mTLS & X.509 Secure
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Right Column: Login Card */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={12}
              sx={{
                p: { xs: 3, sm: 4.5 },
                borderRadius: 4,
                bgcolor: '#FFFFFF',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
              }}
            >
              <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0B2545' }}>
                  Sign In to Solar IoT
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Gujarat Energy Development Agency Portal
                </Typography>
              </Box>

              {step === 'password' ? (
                <PasswordStep onMfaRequired={handleMfaRequired} />
              ) : (
                <OtpStep onBack={handleBackToPassword} />
              )}
            </Paper>

            <Typography
              variant="caption"
              sx={{
                display: 'block',
                textAlign: 'center',
                color: 'rgba(255,255,255,0.5)',
                mt: 3,
                fontSize: 11,
              }}
            >
              Official SCADA Telemetry SaaS System • Built for GEDA by Qpaix Infitech
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
