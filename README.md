# Orca Platform Integration Package

A clean, minimal Node.js package for seamless integration with the Orca platform. This package provides essential components for AI agents to communicate with Orca while maintaining platform-agnostic design.

## 🚀 Quick Start

### Install from npm (Recommended)

```bash
npm install @orcapt/sdk
```

### Install with Express dependencies

```bash
npm install @orcapt/sdk express
```

### Install from source

```bash
git clone https://github.com/orcapt/orca-npm.git
cd orca-npm
npm install
npm link
```

## 📦 Package Information

- **Package Name**: `@orcapt/sdk`
- **Version**: 1.0.0
- **Node**: >=14.0.0
- **License**: MIT
- **Dependencies**: axios
- **Optional**: express (for web framework integration)

## 🎯 Purpose

This package provides a clean interface for AI agents to communicate with the Orca platform. It handles all Orca-specific communication while keeping your AI agent completely platform-agnostic.

## 🚀 Core Features

- **Real-time streaming** via Centrifugo
- **Backend communication** with Orca API
- **Response formatting** for Orca compatibility
- **Data validation** with class models
- **Error handling** and logging
- **Express integration** with standard endpoints (optional)
- **Dynamic configuration** from request data
- **Header forwarding** (x-tenant, etc.) to Orca API
- **Easy variable access** with Variables helper class
- **User memory handling** with MemoryHelper for personalized responses
- **Dev mode** with in-memory streaming for local development
- **Graceful fallback** when web dependencies aren't available

## 📁 Package Structure

```
@orcapt/sdk/
├── src/
│   ├── index.js               # Package exports with optional web imports
│   ├── models.js              # Orca data models (ChatMessage, ChatResponse, Variable)
│   ├── response-handler.js    # Response creation utilities
│   ├── unified-handler.js     # Main communication interface
│   ├── api-client.js          # HTTP communication with Orca backend
│   ├── centrifugo-client.js   # Real-time updates via Centrifugo
│   ├── dev-stream-client.js   # Dev mode streaming
│   ├── utils.js               # Platform utilities
│   └── web/                   # Express web framework utilities (optional)
│       ├── index.js
│       ├── app-factory.js
│       └── endpoints.js
├── package.json
├── README.md
└── LICENSE
```

**Note**: The `web/` module is optional and will gracefully fall back if Express dependencies aren't available.

## 🚀 Usage Examples

### Basic Usage

```javascript
const { OrcaHandler, ChatMessage } = require('@orcapt/sdk');

// Initialize the handler
const orca = new OrcaHandler();

// Use in your AI agent
async function processMessage(data) {
  // Your AI logic here...
  const response = 'Hello from your AI agent!';
  await orca.completeResponse(data, response);
}
```

### Express Integration

```javascript
const express = require('express');
const { createOrcaApp, addStandardEndpoints, OrcaHandler } = require('@orcapt/sdk');

// Create Express app
const app = createOrcaApp({
  title: 'My AI Agent',
  version: '1.0.0'
});

// Initialize Orca handler
const orca = new OrcaHandler();

// Add standard endpoints
addStandardEndpoints(app, {
  orcaHandler: orca,
  processMessageFunc: yourAIFunction
});

// Start server
app.listen(8000, () => {
  console.log('Server running on port 8000');
});
```

## 🔧 Core Components

### OrcaHandler (Main Interface)

Single, clean interface for all Orca communication:

```javascript
const { OrcaHandler } = require('@orcapt/sdk');

// Initialize with optional dev mode
const orca = new OrcaHandler(); // Auto-detects from ORCA_DEV_MODE env var
// OR
const orca = new OrcaHandler(true); // Explicitly enable dev mode

// Stream AI response chunks
await orca.streamChunk(data, content);

// Complete AI response (handles all Orca communication)
await orca.completeResponse(data, fullResponse);

// Send error messages (with optional trace/exception for logging)
await orca.sendError(data, errorMessage);
// Or with exception for detailed logging:
await orca.sendError(data, errorMessage, null, error);

// Update Centrifugo configuration dynamically
orca.updateCentrifugoConfig(streamUrl, streamToken);

// Headers (like x-tenant) are automatically forwarded to Orca API
// No additional configuration needed - just include headers in your request
```

### Data Models

Orca's expected data formats:

```javascript
const { ChatMessage, ChatResponse, Variable, Memory } = require('@orcapt/sdk');

// ChatMessage - Orca's request format with all required fields
// ChatResponse - Orca's expected response format
// Variable - Environment variables from Orca request
// Memory - User memory data from Orca request
```

### Variables Helper

Easy access to environment variables from Orca requests:

```javascript
const { Variables } = require('@orcapt/sdk');

// Create variables helper from request data
const vars = new Variables(data.variables);

// Get any variable by name
const openaiKey = vars.get('OPENAI_API_KEY');
const anthropicKey = vars.get('ANTHROPIC_API_KEY');
const customVar = vars.get('CUSTOM_VAR');

// Check if variable exists
if (vars.has('OPENAI_API_KEY')) {
  const key = vars.get('OPENAI_API_KEY');
}

// Get all variable names
const allNames = vars.listNames(); // ["OPENAI_API_KEY", "ANTHROPIC_API_KEY", ...]

// Convert to plain object
const varsDict = vars.toDict(); // {"OPENAI_API_KEY": "sk-...", ...}
```

### Memory Helper

Easy access to user memory data from Orca requests:

```javascript
const { MemoryHelper } = require('@orcapt/sdk');

// Create memory helper from request data
const memory = new MemoryHelper(data.memory);

// Get user information
const userName = memory.getName();
const userGoals = memory.getGoals();
const userLocation = memory.getLocation();
const userInterests = memory.getInterests();
const userPreferences = memory.getPreferences();
const userExperiences = memory.getPastExperiences();

// Check if memory data exists
if (memory.hasName()) {
  console.log(`User: ${memory.getName()}`);
}
if (memory.hasGoals()) {
  console.log(`Goals: ${memory.getGoals()}`);
}
if (memory.hasLocation()) {
  console.log(`Location: ${memory.getLocation()}`);
}

// Convert to plain object
const memoryDict = memory.toDict();

// Check if memory is empty
if (!memory.isEmpty()) {
  // Process user memory data
}
```

**Supported Memory Formats:**

- `"memory": []` - Empty array (treated as empty memory)
- `"memory": {}` - Empty object (treated as empty memory)
- `"memory": {"name": "John", "goals": [...]}` - Structured memory
- `"memory": null` - Null value (treated as empty memory)

### Response Handler

Create Orca-compatible responses:

```javascript
const { createSuccessResponse } = require('@orcapt/sdk');
const { createCompleteResponse } = require('@orcapt/sdk/src/response-handler');

// Create immediate success response
const response = createSuccessResponse('uuid123', 'thread456');

// Create complete response with usage info (used internally by OrcaHandler)
const completeResponse = createCompleteResponse('uuid123', 'thread456', 'Full AI response', {
  prompt_tokens: 10,
  completion_tokens: 50
});
```

## 💡 Complete Example: AI Agent with Express

```javascript
const express = require('express');
const {
  OrcaHandler,
  Variables,
  MemoryHelper,
  createOrcaApp,
  addStandardEndpoints
} = require('@orcapt/sdk');

// Initialize services
const orca = new OrcaHandler();

// Create Express app
const app = createOrcaApp({
  title: 'My AI Agent',
  version: '1.0.0',
  description: 'Custom AI agent with Orca integration'
});

// Define your AI logic
async function processMessage(data) {
  try {
    // Easy access to environment variables
    const vars = new Variables(data.variables);

    // Easy access to user memory
    const memory = new MemoryHelper(data.memory);

    // Get API keys
    const openaiKey = vars.get('OPENAI_API_KEY');

    // Get user information for personalized responses
    const userName = memory.getName();
    const userGoals = memory.getGoals();

    // Check if required variables exist
    if (!openaiKey) {
      await orca.sendError(data, 'No AI API key provided');
      return;
    }

    // Create personalized response based on user memory
    let response;
    if (memory.hasName()) {
      response = `Hello ${userName}! AI Agent processed: ${data.message}`;
    } else {
      response = `AI Agent processed: ${data.message}`;
    }

    // Add user-specific context if available
    if (memory.hasGoals()) {
      response += `\n\nI see your goals include: ${userGoals.join(', ')}`;
    }

    // Stream response chunks (optional)
    const words = response.split(' ');
    for (const word of words) {
      await orca.streamChunk(data, word + ' ');
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Complete the response
    await orca.completeResponse(data, response);
  } catch (error) {
    // Handle errors appropriately with trace logging
    await orca.sendError(data, `Error processing message: ${error.message}`, null, error);
  }
}

// Add all standard Orca endpoints
addStandardEndpoints(app, {
  conversationManager: null,
  orcaHandler: orca,
  processMessageFunc: processMessage
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## 🔄 Integration Flow

```
Your AI Agent → OrcaHandler → Orca Platform
     ↓              ↓              ↓
  AI/LLM Logic   Communication   Real-time + Backend
```

Your AI agent focuses on AI logic, this package handles all Orca communication complexity behind a clean interface.

## 🧪 Testing

```javascript
const { OrcaHandler } = require('@orcapt/sdk');

// Test basic functionality
const handler = new OrcaHandler();

// Create test data
const testData = {
  thread_id: 'test123',
  model: 'gpt-4',
  message: 'Hello',
  conversation_id: 1,
  response_uuid: 'uuid123',
  message_uuid: 'msg123',
  channel: 'test',
  variables: [],
  url: 'http://test.com'
};

// Test that handler can be created
console.assert(handler !== null);
console.assert(typeof handler.streamChunk === 'function');
console.assert(typeof handler.completeResponse === 'function');
console.assert(typeof handler.sendError === 'function');
console.assert(typeof handler.updateCentrifugoConfig === 'function');
```

## 🚨 Common Issues and Solutions

### Import Error

```
Error: Cannot find module '@orcapt/sdk'
```

**Solution**: Ensure the package is installed: `npm install @orcapt/sdk`

### Missing Dependencies

```
Error: Cannot find module 'express'
```

**Solution**: Install express if using web features: `npm install express`

### Orca Communication Fails

**Solution**: Verify that your environment variables and API keys are properly configured in the Orca request variables.

## 📦 Publishing

### Test npm

```bash
npm pack
# Test the package locally
npm install ./orca-sdk-1.2.5.tgz
```

### Production npm

```bash
npm login
npm publish --access public
```

## 🎯 Design Principles

1. **Single Responsibility**: Each component has one clear purpose
2. **Clean Interface**: Simple, intuitive methods
3. **Platform Agnostic**: Your AI agent doesn't know about Orca internals
4. **Minimal Dependencies**: Only what's absolutely necessary
5. **Easy Testing**: Simple, focused components
6. **Dynamic Configuration**: Adapts to request-specific settings

## 🚀 Benefits

- **Clean separation** between your AI agent and Orca
- **Easy to maintain** - all Orca logic in one place
- **Easy to replace** - switch platforms by replacing this package
- **Professional structure** - clean, organized code
- **Fast development** - no complex integrations to manage
- **Drop-in replacement** - install and start using immediately
- **Dynamic configuration** - adapts to different Orca environments

## 📞 Support

This package is designed to be a drop-in solution - just `npm install @orcapt/sdk` and start building your AI agent! All Orca communication is handled automatically, standard endpoints are provided out-of-the-box, and your AI agent remains completely platform-agnostic.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📚 Documentation

For more detailed documentation, please refer to the inline code comments and examples provided in this README.

## 🔗 Links

- [GitHub Repository](https://github.com/orcapt/orca-npm)
- [npm Package](https://www.npmjs.com/package/@orcapt/sdk)
- [Issue Tracker](https://github.com/orcapt/orca-npm/issues)
