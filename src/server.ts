import express from 'express';
import payload from 'payload';

require('dotenv/config');

const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET!,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, async () => {
    payload.logger.info(
      `Payload CMS is running on http://localhost:${PORT}`
    );
    payload.logger.info(
      `Admin panel: http://localhost:${PORT}/admin`
    );
  });
};

start();
