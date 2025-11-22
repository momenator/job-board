import type { Job } from '../payload-types';
import { mockJobs, filterMockJobs, getMockJobById } from './mockData';

const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL || 'http://localhost:3000/api';
const USE_MOCK_DATA = process.env.USE_MOCK_DATA === 'true';

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
  // Use mock data if explicitly enabled or if API fails
  if (USE_MOCK_DATA) {
    const filteredJobs = filterMockJobs({
      jobType: params?.jobType,
      district: params?.district,
      status: params?.status,
    });

    return {
      docs: filteredJobs,
      totalDocs: filteredJobs.length,
      limit: params?.limit || 50,
      totalPages: 1,
      page: params?.page || 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    };
  }

  try {
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
  } catch (error) {
    // Fallback to mock data if API fails
    console.warn('API unavailable, using mock data:', error);
    const filteredJobs = filterMockJobs({
      jobType: params?.jobType,
      district: params?.district,
      status: params?.status,
    });

    return {
      docs: filteredJobs,
      totalDocs: filteredJobs.length,
      limit: params?.limit || 50,
      totalPages: 1,
      page: params?.page || 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    };
  }
}

export async function getJobByID(id: string): Promise<Job> {
  // Use mock data if explicitly enabled
  if (USE_MOCK_DATA) {
    const mockJob = getMockJobById(id);
    if (!mockJob) {
      throw new Error('Job not found');
    }
    return mockJob;
  }

  try {
    const response = await fetch(`${PAYLOAD_API_URL}/jobs/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch job: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    // Fallback to mock data if API fails
    console.warn('API unavailable, using mock data:', error);
    const mockJob = getMockJobById(id);
    if (!mockJob) {
      throw new Error('Job not found');
    }
    return mockJob;
  }
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
