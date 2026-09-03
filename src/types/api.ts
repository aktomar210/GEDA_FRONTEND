export interface ApiError {
  code: string
  message: string
}

/** Envelope every backend response is wrapped in. Unwrapped by src/api/client.ts. */
export interface ApiEnvelope<T> {
  success: boolean
  data: T | null
  error: ApiError | null
}
