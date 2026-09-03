import { apiClient } from './client'
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  OtpVerifyRequest,
  OtpVerifyResponse,
  UserSummaryDto,
} from '../types/auth'

export const authApi = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const res = await apiClient.post<LoginResponse>('/auth/login', payload)
    return res.data
  },

  async verifyOtp(payload: OtpVerifyRequest): Promise<OtpVerifyResponse> {
    const res = await apiClient.post<OtpVerifyResponse>(
      '/auth/otp/verify',
      payload,
    )
    return res.data
  },

  async forgotPassword(
    payload: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> {
    const res = await apiClient.post<ForgotPasswordResponse>(
      '/auth/forgot-password',
      payload,
    )
    return res.data
  },

  async me(): Promise<UserSummaryDto> {
    const res = await apiClient.get<UserSummaryDto>('/auth/me')
    return res.data
  },
}
