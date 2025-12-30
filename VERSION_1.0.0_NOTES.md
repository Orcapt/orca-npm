# Version 1.0.0 Release Notes

## @orcapt/sdk v1.0.0 - Initial Release

**Release Date:** October 12, 2024

This is the **first release** of the @orcapt/sdk npm package, providing a complete JavaScript/Node.js implementation of the Orca platform integration SDK.

**Note:** This is version 1.0.0 as it's the first npm release. The equivalent Python package (orca) is at version 1.2.5, but we start fresh for the npm package.

### 🎉 Features

#### Core Components

- **OrcaHandler**: Unified interface for all Orca platform communication
- **ChatMessage & ChatResponse**: Data models matching Orca's API format
- **Variables Helper**: Easy access to environment variables from requests
- **MemoryHelper**: User memory data access and manipulation
- **APIClient**: HTTP communication with Orca backend
- **CentrifugoClient**: Real-time messaging via Centrifugo
- **DevStreamClient**: In-memory streaming for local development

#### Web Integration

- **createOrcaApp**: Factory function for Express applications
- **addStandardEndpoints**: Add Orca standard endpoints to Express apps
- Optional peer dependency on Express (graceful fallback)

#### Developer Experience

- TypeScript definitions included
- Comprehensive documentation
- Example files and quick start guide
- Test suite included
- ESLint and Prettier configurations

### 🔧 Technical Details

#### Dependencies

- **axios** (^1.6.0): HTTP client for API communication
- **express** (^4.18.0): Optional peer dependency for web features

#### Supported Environments

- Node.js >= 14.0.0
- CommonJS module format
- Works with or without Express

#### Package Size

- Minimal dependencies
- ~50KB unpacked
- Tree-shakeable exports

### 📦 Installation

```bash
npm install @orcapt/sdk
```

With Express:

```bash
npm install @orcapt/sdk express
```

### 🚀 Quick Start

```javascript
const { OrcaHandler } = require('@orcapt/sdk');

const orca = new OrcaHandler();

async function processMessage(data) {
  const response = 'Hello from AI!';
  await orca.completeResponse(data, response);
}
```

### 📚 Documentation

- **README.md**: Complete documentation
- **QUICKSTART.md**: Quick start guide
- **example.js**: Usage examples
- **PYTHON_TO_JS_MAPPING.md**: Python to JavaScript migration guide

### 🔄 Compatibility

This version maintains feature parity with `orca` Python package (currently at v1.2.5):

- ✅ Same API structure
- ✅ Same functionality
- ✅ Same data models
- ✅ Compatible with same Orca platform version

### 🧪 Testing

Run tests:

```bash
node test-package.js
```

Run examples:

```bash
node example.js
```

### 📝 Known Limitations

1. Express is optional peer dependency (must be installed separately for web features)
2. No built-in TypeScript compilation (TypeScript definitions provided)
3. Currently CommonJS only (ESM support planned for future releases)

### 🔮 Future Plans

- Full TypeScript migration
- ESM module support
- WebSocket support for streaming
- Enhanced error handling
- Performance optimizations
- Additional helper utilities
- Browser support (future consideration)

### 🙏 Acknowledgments

This package is a JavaScript port of the Python `orca` package, maintaining API compatibility while following JavaScript/Node.js conventions and best practices.

### 📞 Support

- GitHub Issues: https://github.com/orcapt/orca-npm/issues
- Documentation: https://github.com/orcapt/orca-npm#readme
- npm: https://www.npmjs.com/package/@orcapt/sdk

### 📄 License

MIT License - See LICENSE file for details

---

**Note**: This is the initial release. Feedback and contributions are welcome!
