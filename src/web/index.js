/**
 * Orca Web Package
 * ================
 * 
 * Web framework utilities for creating Express applications with Orca integration.
 * Provides standard endpoints, middleware, and app factory functions.
 */

const { createOrcaApp } = require('./app-factory');
const { addStandardEndpoints } = require('./endpoints');

module.exports = {
  createOrcaApp,
  addStandardEndpoints
};






