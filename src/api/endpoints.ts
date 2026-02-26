export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REQUEST_RESET: "/auth/request-reset",
    RESET_PASSWORD: "/auth/reset-password",
  },

  USER: {
    DASHBOARD: "/me/dashboard",
    GROUPS: "/me/groups",
    ME: "/me",
  },

  GROUP: {
    CREATE: "/groups",
    JOIN: (id: string) => `/groups/join/${id}`,
    DETAILS: (id: string) => `/groups/${id}`,
    CONTRIBUTE: (id: string) => `/groups/${id}/contribute`,
    CONTRIBUTIONS: (id: string) => `/groups/${id}/contributions`,
    PAYOUT: (id: string) => `/groups/${id}/payout`,
    SUMMARY: (id: string) => `/groups/${id}/summary`,
  },

  ADMIN: {
    LEDGER_ENTRIES: "/admin/ledger/entries",
    LEDGER_SUMMARY: "/admin/ledger/summary",
    RECONCILE: "/admin/ledger/reconcile",
    DASHBOARD: "/admin/ledger/dashboard",
  },
};
