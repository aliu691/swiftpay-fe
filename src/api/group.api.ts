import { ApiResponse } from "../types/api";
import api from "./axios";
import { ENDPOINTS } from "./endpoints";
import { GroupStatus } from "./user.api";

/* ======================
   TYPES
====================== */

export interface GroupMember {
  id: string;
  name: string;
  email: string;
}

export interface GroupInvite {
  email: string;
  status: "accepted" | "pending" | "declined";
  createdAt: string;
}

export type ContributionStatus =
  | "active"
  | "completed"
  | "disbursed"
  | "success"
  | "initiated";

export interface GroupDetailsData {
  id: string;
  name: string;
  status: GroupStatus;
  targetAmount: number;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  members: GroupMember[];
  invites: GroupInvite[];
}

export interface ContributionUser {
  id: string;
  name: string;
  email: string;
}

export interface GroupContribution {
  id: string;
  amount: number;
  status: ContributionStatus;
  paymentMethod: string;
  user: ContributionUser;
  createdAt: string;
}

export interface GroupContributionsData {
  totalContributed: number;
  contributions: GroupContribution[];
}

export interface CreateGroupPayload {
  name: string;
  targetAmount: number;
  invitedEmails: string[];
}

export interface CreateGroupResponseData {
  groupId: string;
  invitedCount: number;
}

export interface InvitePreviewData {
  groupName: string;
  targetAmount: number;
  totalContributed: number;
  percentage: number;
  createdBy: string;
}

/* ======================
   GROUP ACTIONS
====================== */

export const createGroup = async (
  data: CreateGroupPayload
): Promise<ApiResponse<CreateGroupResponseData>> => {
  const response = await api.post<ApiResponse<CreateGroupResponseData>>(
    ENDPOINTS.GROUP.CREATE,
    data
  );

  return response.data;
};

export const getGroupDetails = async (
  id: string
): Promise<ApiResponse<GroupDetailsData>> => {
  const response = await api.get<ApiResponse<GroupDetailsData>>(
    ENDPOINTS.GROUP.DETAILS(id)
  );

  return response.data;
};

export const getGroupContributions = async (
  id: string
): Promise<ApiResponse<GroupContributionsData>> => {
  const response = await api.get<ApiResponse<GroupContributionsData>>(
    ENDPOINTS.GROUP.CONTRIBUTIONS(id)
  );

  return response.data;
};

export const getInvitePreview = async (
  token: string
): Promise<ApiResponse<InvitePreviewData>> => {
  const response = await api.get<ApiResponse<InvitePreviewData>>(
    ENDPOINTS.GROUP.PREVIEW(token)
  );

  return response.data;
};

export const joinGroup = async (token: string): Promise<ApiResponse<any>> => {
  const response = await api.post<ApiResponse<any>>(
    ENDPOINTS.GROUP.JOIN(token)
  );

  return response.data;
};

export const contribute = async (
  id: string,
  amount: number
): Promise<ApiResponse<{ authorizationUrl: string; reference: string }>> => {
  const response = await api.post<
    ApiResponse<{ authorizationUrl: string; reference: string }>
  >(ENDPOINTS.GROUP.CONTRIBUTE(id), {
    amount: String(amount), // backend expects string
  });

  return response.data;
};

export const payoutGroup = async (id: string): Promise<ApiResponse<any>> => {
  const response = await api.post<ApiResponse<any>>(ENDPOINTS.GROUP.PAYOUT(id));

  return response.data;
};
