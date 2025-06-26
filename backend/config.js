require('dotenv').config();

const config = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/tasktracker',
  JWT_SECRET: process.env.JWT_SECRET || '3be42ed89402dade5dd058c699cf8820c8fd2e624376a0b61ea640d1d3a59680ab418cf6861df7502bf29493304fe949',
  PORT: process.env.PORT || 5001
};

// Log configuration on startup (excluding sensitive data)
console.log('Configuration:', {
  MONGO_URI: config.MONGO_URI,
  PORT: config.PORT,
  JWT_SECRET: '[HIDDEN]'
});

module.exports = config;