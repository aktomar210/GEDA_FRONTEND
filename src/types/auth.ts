export type UserRole = 'SUPER_ADMIN' | 'DISCOM_ADMIN' | 'PLANT_OPERATOR' | 'VIEWER'

export interface UserSummaryDto {
  id: number
  username: string
  fullName: string
  role: UserRole
  orgUnitId: number | null
}

export interface LoginRequest {
  username: string
  password: string
}

/**
 * The backend returns one of two shapes for the same endpoint:
 *  - MFA required: { mfaRequired: true, pendingToken }
 *  - MFA not required: { accessToken, user } (mfaRequired absent or false)
 * `devOtpCode` may additionally be present alongside the MFA-required shape
 * when the backend's dev profile has OTP auto-expose enabled.
 */
export interface LoginResponse {
  mfaRequired?: boolean
  pendingToken?: string
  accessToken?: string
  user?: UserSummaryDto
  devOtpCode?: string
}

export interface OtpVerifyRequest {
  pendingToken: string
  otpCode: string
}

export interface OtpVerifyResponse {
  accessToken: string
  refreshToken?: string
  user: UserSummaryDto
}

export interface ForgotPasswordRequest {
  username: string
}

export interface ForgotPasswordResponse {
  message: string
}
