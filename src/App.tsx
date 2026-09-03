import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { theme } from './theme/theme'
import { AuthProvider, useAuth } from './auth/AuthContext'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { LoginPage } from './pages/login/LoginPage'
import { AppLayout } from './layout/AppLayout'
import { DashboardTabs } from './pages/dashboard/DashboardTabs'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { GenerationAnalyticsPage } from './pages/dashboard/GenerationAnalyticsPage'
import { SystemHealthPage } from './pages/dashboard/SystemHealthPage'
import { DevicesPage } from './pages/devices/DevicesPage'
import { ScadaViewPage } from './pages/scada/ScadaViewPage'
import { TagConfigPage } from './pages/tagconfig/TagConfigPage'
import { AlertsPage } from './pages/alerts/AlertsPage'
import { ReportsPage } from './pages/reports/ReportsPage'
import { BillingPage } from './pages/billing/BillingPage'
import { UsersRolesPage } from './pages/usersroles/UsersRolesPage'
import { DataExportPage } from './pages/dataexport/DataExportPage'

function LoginRoute() {
  const { isAuthenticated, isInitializing } = useAuth()
  if (isInitializing) return null
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  return <LoginPage />
}

function CatchAllRoute() {
  const { isAuthenticated, isInitializing } = useAuth()
  if (isInitializing) return null
  return <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardTabs />}>
          <Route index element={<DashboardPage />} />
          <Route path="generation" element={<GenerationAnalyticsPage />} />
          <Route path="health" element={<SystemHealthPage />} />
        </Route>
        <Route path="devices" element={<DevicesPage />} />
        <Route path="scada-view" element={<ScadaViewPage />} />
        <Route path="tag-config" element={<TagConfigPage />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="users-roles" element={<UsersRolesPage />} />
        <Route path="data-export" element={<DataExportPage />} />
      </Route>
      <Route path="*" element={<CatchAllRoute />} />
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
