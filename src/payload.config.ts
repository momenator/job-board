import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      access: {
        create: () => true,
        read: () => true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      slug: 'jobs',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'jobType', 'district', 'status', 'createdAt'],
      },
      access: {
        read: () => true, // Public can read jobs
        create: ({ req: { user } }) => !!user, // Only authenticated users can create
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Job Title',
        },
        {
          name: 'jobType',
          type: 'select',
          required: true,
          label: 'Job Type',
          options: [
            { label: 'Bar Staff', value: 'bar' },
            { label: 'Kitchen Helper', value: 'kitchen' },
            { label: 'Delivery', value: 'delivery' },
            { label: 'Cleaning', value: 'cleaning' },
            { label: 'Warehouse', value: 'warehouse' },
            { label: 'Event Staff', value: 'event' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
          label: 'Job Description',
        },
        {
          name: 'district',
          type: 'select',
          required: true,
          label: 'District',
          options: [
            { label: 'Altstadt-Lehel', value: 'altstadt-lehel' },
            { label: 'Ludwigsvorstadt-Isarvorstadt', value: 'ludwigsvorstadt-isarvorstadt' },
            { label: 'Maxvorstadt', value: 'maxvorstadt' },
            { label: 'Schwabing-West', value: 'schwabing-west' },
            { label: 'Schwabing-Freimann', value: 'schwabing-freimann' },
            { label: 'Au-Haidhausen', value: 'au-haidhausen' },
            { label: 'Sendling', value: 'sendling' },
            { label: 'Sendling-Westpark', value: 'sendling-westpark' },
            { label: 'Schwanthalerhöhe', value: 'schwanthalerhoehe' },
            { label: 'Neuhausen-Nymphenburg', value: 'neuhausen-nymphenburg' },
            { label: 'Moosach', value: 'moosach' },
            { label: 'Milbertshofen-Am Hart', value: 'milbertshofen-am-hart' },
            { label: 'Giesing', value: 'giesing' },
            { label: 'Bogenhausen', value: 'bogenhausen' },
            { label: 'Pasing-Obermenzing', value: 'pasing-obermenzing' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'address',
          type: 'text',
          label: 'Address (optional)',
        },
        {
          name: 'hourlyRate',
          type: 'number',
          label: 'Hourly Rate (€)',
          required: true,
          min: 0,
        },
        {
          name: 'hoursPerWeek',
          type: 'text',
          label: 'Hours per Week',
          required: true,
        },
        {
          name: 'contactWhatsApp',
          type: 'text',
          label: 'WhatsApp Number',
          required: true,
        },
        {
          name: 'contactEmail',
          type: 'email',
          label: 'Contact Email (optional)',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Job Image',
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'active',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Filled', value: 'filled' },
            { label: 'Expired', value: 'expired' },
          ],
        },
        {
          name: 'expiresAt',
          type: 'date',
          label: 'Expires At',
          admin: {
            description: 'Job will be automatically hidden after this date',
          },
        },
      ],
    },
    {
      slug: 'media',
      upload: {
        staticDir: path.resolve(dirname, '../public/uploads'),
        imageSizes: [
          {
            name: 'thumbnail',
            width: 400,
            height: 300,
            position: 'centre',
          },
          {
            name: 'card',
            width: 768,
            height: 576,
            position: 'centre',
          },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
        },
      ],
    },
  ],
  editor: slateEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/munich-job-board',
  }),
});
