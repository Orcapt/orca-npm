/**
 * Orca Integration Package
 * ========================
 * 
 * Clean, minimal package for Orca platform integration.
 * Contains only essential components for communication.
 */

const VERSION = '1.0.0';

// Core exports
const { ChatResponse, ChatMessage, Variable, Memory } = require('./models');
const { createSuccessResponse } = require('./response-handler');
const { OrcaHandler } = require('./unified-handler');
const { 
  getVariableValue, 
  getOpenAIApiKey, 
  Variables, 
  MemoryHelper 
} = require('./utils');
const { DevStreamClient } = require('./dev-stream-client');

// Web framework utilities (optional)
let createOrcaApp, addStandardEndpoints;
try {
  const web = require('./web');
  createOrcaApp = web.createOrcaApp;
  addStandardEndpoints = web.addStandardEndpoints;
} catch (err) {
  // Web dependencies not available - continue without them
  createOrcaApp = undefined;
  addStandardEndpoints = undefined;
}

module.exports = {
  // Core
  ChatResponse,
  ChatMessage,
  Variable,
  Memory,
  createSuccessResponse,
  OrcaHandler,
  DevStreamClient,
  getVariableValue,
  getOpenAIApiKey,
  Variables,
  MemoryHelper,
  
  // Web (optional)
  createOrcaApp,
  addStandardEndpoints,
  
  // Version
  VERSION
};

