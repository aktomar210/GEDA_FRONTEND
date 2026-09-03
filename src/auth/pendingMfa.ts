/**
 * Holds transient MFA-step state (pendingToken + optional dev OTP code) in
 * memory only, for the duration of the login -> OTP-verify flow. Never
 * persisted — a page refresh mid-flow simply sends the user back to the
 * password step, which is the desired behavior for a short-lived token.
 */
export interface PendingMfaState {
  pendingToken: string
  devOtpCode: string | null
}

let pendingMfa: PendingMfaState | null = null

export function setPendingMfa(state: PendingMfaState | null): void {
  pendingMfa = state
}

export function getPendingMfa(): PendingMfaState | null {
  return pendingMfa
}
