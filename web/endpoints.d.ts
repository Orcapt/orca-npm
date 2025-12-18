/**
 * Add standard Orca endpoints to an Express application.
 * @param {Object} app - Express application instance
 * @param {Object} options - Configuration options
 * @param {Object} options.conversationManager - Optional conversation manager for history endpoints
 * @param {Object} options.orcaHandler - Optional OrcaHandler instance for communication
 * @param {Function} options.processMessageFunc - Optional function to process messages (custom AI logic)
 */
export function addStandardEndpoints(
  app: any,
  options?: {
    conversationManager: any;
    orcaHandler: any;
    processMessageFunc: Function;
  }
): any;
//# sourceMappingURL=endpoints.d.ts.map
