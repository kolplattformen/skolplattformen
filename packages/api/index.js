import OpenAPIBackend from 'openapi-backend';

// create api with your definition file or object
const api = new OpenAPIBackend({ definition: './petstore.yml' });

// register your framework specific request handlers here
api.register({
  getPets: (c, req, res) => res.status(200).json({ result: 'ok' }),
  getPetById: (c, req, res) => res.status(200).json({ result: 'ok' }),
  validationFail: (c, req, res) => res.status(400).json({ err: c.validation.errors }),
  notFound: (c, req, res) => res.status(404).json({ err: 'not found' }),
});

// initalize the backend
api.init();