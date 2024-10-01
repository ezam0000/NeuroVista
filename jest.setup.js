const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

require('@testing-library/jest-dom');

// Mock mongoose for server tests
// jest.mock('mongoose', () => ({
//   connect: jest.fn().mockResolvedValue(),
//   Schema: jest.fn(),
//   model: jest.fn().mockReturnValue({
//     find: jest.fn().mockResolvedValue([]),
//     create: jest.fn().mockResolvedValue({}),
//   }),
// }));