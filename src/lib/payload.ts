import type { Job } from '../payload-types';

const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL || 'http://localhost:3000/api';

export interface JobsResponse {
  docs: Job[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export async function getJobs(params?: {
  limit?: number;
  page?: number;
  jobType?: string;
  district?: string;
  status?: string;
}): Promise<JobsResponse> {
  const queryParams = new URLSearchParams();

  if (params?.limit) queryParams.set('limit', params.limit.toString());
  if (params?.page) queryParams.set('page', params.page.toString());

  // Filter by status (default to active)
  const status = params?.status || 'active';
  queryParams.set('where[status][equals]', status);

  // Filter by job type
  if (params?.jobType) {
    queryParams.set('where[jobType][equals]', params.jobType);
  }

  // Filter by district
  if (params?.district) {
    queryParams.set('where[district][equals]', params.district);
  }

  // Sort by newest first
  queryParams.set('sort', '-createdAt');

  const response = await fetch(`${PAYLOAD_API_URL}/jobs?${queryParams.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.statusText}`);
  }

  return response.json();
}

export async function getJobByID(id: string): Promise<Job> {
  const response = await fetch(`${PAYLOAD_API_URL}/jobs/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch job: ${response.statusText}`);
  }

  return response.json();
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  const response = await fetch(`${PAYLOAD_API_URL}/jobs?where[slug][equals]=${slug}&limit=1`);

  if (!response.ok) {
    return null;
  }

  const data: JobsResponse = await response.json();
  return data.docs[0] || null;
}

// Helper to format WhatsApp link
export function getWhatsAppLink(phoneNumber: string, jobTitle: string): string {
  const message = encodeURIComponent(`Hi! I'm interested in the ${jobTitle} position.`);
  // Remove any non-numeric characters from phone number
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${message}`;
}
