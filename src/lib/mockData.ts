import type { Job } from '../payload-types';

// Mock job data for demo purposes when database is not available
export const mockJobs: Job[] = [
  {
    id: 'mock-1',
    title: 'Bar Staff Needed - Craft Beer Bar',
    jobType: 'bar',
    description: [
      {
        type: 'paragraph',
        children: [
          { text: 'Busy craft beer bar in Maxvorstadt looking for enthusiastic bar staff. No experience needed - we train you!' }
        ]
      },
      {
        type: 'paragraph',
        children: [
          { text: 'Flexible hours, great team atmosphere, and free drinks after your shift.' }
        ]
      }
    ],
    district: 'maxvorstadt',
    hourlyRate: 13,
    hoursPerWeek: '15-25',
    contactWhatsApp: '+4915112345678',
    contactEmail: 'jobs@craftbeerbar.de',
    status: 'active',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-2',
    title: 'Kitchen Helper - Italian Restaurant',
    jobType: 'kitchen',
    description: [
      {
        type: 'paragraph',
        children: [
          { text: 'Looking for reliable kitchen helper for our busy Italian restaurant in Schwabing.' }
        ]
      },
      {
        type: 'paragraph',
        children: [
          { text: 'Tasks include prep work, dishwashing, and basic cooking. Great way to learn Italian cuisine!' }
        ]
      }
    ],
    district: 'schwabing-west',
    address: 'Leopoldstraße 123, 80802 München',
    hourlyRate: 12.50,
    hoursPerWeek: '20-30',
    contactWhatsApp: '+4915123456789',
    status: 'active',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-3',
    title: 'Delivery Driver - Bike Courier',
    jobType: 'delivery',
    description: [
      {
        type: 'paragraph',
        children: [
          { text: 'Join our team of bike couriers delivering food across Munich city center!' }
        ]
      },
      {
        type: 'paragraph',
        children: [
          { text: 'Requirements: own bike, smartphone, fitness. You choose your own hours!' }
        ]
      }
    ],
    district: 'altstadt-lehel',
    hourlyRate: 14,
    hoursPerWeek: 'Flexible',
    contactWhatsApp: '+4915198765432',
    contactEmail: 'apply@bikecourier.com',
    status: 'active',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-4',
    title: 'Event Staff - Oktoberfest Season',
    jobType: 'event',
    description: [
      {
        type: 'paragraph',
        children: [
          { text: 'Event agency needs reliable staff for various events across Munich!' }
        ]
      },
      {
        type: 'ul',
        children: [
          {
            type: 'listItem',
            children: [
              {
                children: [{ text: 'Set up and breakdown' }]
              }
            ]
          },
          {
            type: 'listItem',
            children: [
              {
                children: [{ text: 'Guest services' }]
              }
            ]
          },
          {
            type: 'listItem',
            children: [
              {
                children: [{ text: 'Bar support' }]
              }
            ]
          }
        ]
      }
    ],
    district: 'ludwigsvorstadt-isarvorstadt',
    hourlyRate: 15,
    hoursPerWeek: '10-40',
    contactWhatsApp: '+4915187654321',
    status: 'active',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-5',
    title: 'Cleaning Staff - Office Building',
    jobType: 'cleaning',
    description: [
      {
        type: 'paragraph',
        children: [
          { text: 'Cleaning company seeks reliable staff for office building in Giesing.' }
        ]
      },
      {
        type: 'paragraph',
        children: [
          { text: 'Evening hours (18:00-22:00), Monday to Friday. Quiet, independent work.' }
        ]
      }
    ],
    district: 'giesing',
    hourlyRate: 13.50,
    hoursPerWeek: '20',
    contactWhatsApp: '+4915156781234',
    status: 'active',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-6',
    title: 'Warehouse Worker - E-Commerce',
    jobType: 'warehouse',
    description: [
      {
        type: 'paragraph',
        children: [
          { text: 'Growing e-commerce company needs warehouse help in Moosach.' }
        ]
      },
      {
        type: 'paragraph',
        children: [
          { text: 'Picking, packing, and shipping orders. Early morning shifts available (6:00-12:00).' }
        ]
      }
    ],
    district: 'moosach',
    address: 'Moosacher Straße 85, 80809 München',
    hourlyRate: 13,
    hoursPerWeek: '15-30',
    contactWhatsApp: '+4915143218765',
    status: 'active',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-7',
    title: 'Bartender - Late Night Cocktail Bar',
    jobType: 'bar',
    description: [
      {
        type: 'paragraph',
        children: [
          { text: 'Trendy cocktail bar in Au-Haidhausen seeking experienced bartender.' }
        ]
      },
      {
        type: 'paragraph',
        children: [
          { text: 'Thursday-Saturday nights. Cocktail knowledge preferred but not required. Good tips!' }
        ]
      }
    ],
    district: 'au-haidhausen',
    hourlyRate: 14.50,
    hoursPerWeek: '12-18',
    contactWhatsApp: '+4915167894321',
    contactEmail: 'jobs@cocktailbar.de',
    status: 'active',
    createdAt: new Date().toISOString(), // Today
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'mock-8',
    title: 'Student Helper - Café',
    jobType: 'other',
    description: [
      {
        type: 'paragraph',
        children: [
          { text: 'Small independent café in Neuhausen looking for friendly student help.' }
        ]
      },
      {
        type: 'paragraph',
        children: [
          { text: 'Serving coffee, preparing simple food, cashier duties. Perfect for students!' }
        ]
      }
    ],
    district: 'neuhausen-nymphenburg',
    hourlyRate: 12,
    hoursPerWeek: '10-15',
    contactWhatsApp: '+4915134567812',
    status: 'active',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export function getMockJobById(id: string): Job | undefined {
  return mockJobs.find(job => job.id === id);
}

export function filterMockJobs(params?: {
  jobType?: string;
  district?: string;
  status?: string;
}): Job[] {
  let filtered = [...mockJobs];

  if (params?.jobType) {
    filtered = filtered.filter(job => job.jobType === params.jobType);
  }

  if (params?.district) {
    filtered = filtered.filter(job => job.district === params.district);
  }

  if (params?.status) {
    filtered = filtered.filter(job => job.status === params.status);
  } else {
    // Default to active jobs only
    filtered = filtered.filter(job => job.status === 'active');
  }

  return filtered;
}
