/**
 * Test file for X402 Payment Service
 * This file contains unit tests to verify the x402 payment flow implementation
 */

import { X402PaymentService } from '../x402-payment';
import { base } from 'viem/chains';

// Mock wallet client for testing
const mockWalletClient = {
  account: {
    address: '0x1234567890123456789012345678901234567890',
  },
  sendTransaction: jest.fn(),
  chain: base,
};

describe('X402PaymentService', () => {
  let paymentService: X402PaymentService;

  beforeEach(() => {
    paymentService = new X402PaymentService();
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    test('should initialize with default config', () => {
      expect(paymentService).toBeDefined();
    });

    test('should initialize with wallet client', () => {
      expect(() => {
        paymentService.initialize(mockWalletClient as any);
      }).not.toThrow();
    });
  });

  describe('Payment Validation', () => {
    beforeEach(() => {
      paymentService.initialize(mockWalletClient as any);
    });

    test('should validate payment request with valid data', async () => {
      const validRequest = {
        amount: '0.99',
        recipient: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        description: 'Test payment',
      };

      // This will test the validation internally
      const result = await paymentService.testPaymentFlow();
      expect(result.success).toBe(true);
    });

    test('should reject invalid amount', async () => {
      const invalidRequest = {
        amount: '0',
        recipient: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        description: 'Test payment',
      };

      const result = await paymentService.processPayment(invalidRequest);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid payment amount');
    });

    test('should reject invalid recipient address', async () => {
      const invalidRequest = {
        amount: '0.99',
        recipient: 'invalid-address',
        description: 'Test payment',
      };

      const result = await paymentService.processPayment(invalidRequest);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid recipient address');
    });
  });

  describe('USDC Amount Parsing', () => {
    test('should correctly parse USDC amounts', () => {
      // Access private method through any casting for testing
      const service = paymentService as any;
      
      // Test various amounts
      expect(service.parseUSDCAmount('1.00')).toBe(BigInt(1000000)); // 1 USDC = 1,000,000 units
      expect(service.parseUSDCAmount('0.99')).toBe(BigInt(990000));   // 0.99 USDC = 990,000 units
      expect(service.parseUSDCAmount('4.99')).toBe(BigInt(4990000));  // 4.99 USDC = 4,990,000 units
    });
  });

  describe('Address Validation', () => {
    test('should validate correct Ethereum addresses', () => {
      const service = paymentService as any;
      
      expect(service.isValidAddress('0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6')).toBe(true);
      expect(service.isValidAddress('0x1234567890123456789012345678901234567890')).toBe(true);
    });

    test('should reject invalid addresses', () => {
      const service = paymentService as any;
      
      expect(service.isValidAddress('invalid')).toBe(false);
      expect(service.isValidAddress('0x123')).toBe(false);
      expect(service.isValidAddress('')).toBe(false);
    });
  });

  describe('Transaction Encoding', () => {
    test('should correctly encode transfer function', () => {
      const service = paymentService as any;
      const recipient = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6';
      const amount = BigInt(990000); // 0.99 USDC

      const encoded = service.encodeTransferFunction(recipient, amount);
      
      // Should start with transfer function selector
      expect(encoded.startsWith('0xa9059cbb')).toBe(true);
      // Should be 138 characters long (0x + 4 bytes selector + 32 bytes address + 32 bytes amount)
      expect(encoded.length).toBe(138);
    });
  });

  describe('Error Handling', () => {
    test('should handle uninitialized wallet client', async () => {
      const uninitializedService = new X402PaymentService();
      
      const result = await uninitializedService.processPayment({
        amount: '0.99',
        recipient: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('Wallet client not initialized');
    });

    test('should handle transaction errors gracefully', async () => {
      const failingWalletClient = {
        ...mockWalletClient,
        sendTransaction: jest.fn().mockRejectedValue(new Error('Transaction failed')),
      };

      paymentService.initialize(failingWalletClient as any);

      const result = await paymentService.processPayment({
        amount: '0.99',
        recipient: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('Transaction failed');
    });
  });

  describe('Configuration', () => {
    test('should use Base network configuration', () => {
      const service = paymentService as any;
      
      expect(service.config.chainId).toBe(base.id);
      expect(service.config.tokenAddress).toBe('0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'); // USDC on Base
    });

    test('should allow custom configuration', () => {
      const customConfig = {
        chainId: 1,
        tokenAddress: '0xCustomToken',
        rpcUrl: 'https://custom-rpc.com',
      };

      const customService = new X402PaymentService(customConfig);
      const config = (customService as any).config;

      expect(config.chainId).toBe(1);
      expect(config.tokenAddress).toBe('0xCustomToken');
      expect(config.rpcUrl).toBe('https://custom-rpc.com');
    });
  });
});

// Integration test helpers
export const testHelpers = {
  createMockWalletClient: () => mockWalletClient,
  createValidPaymentRequest: () => ({
    amount: '0.99',
    recipient: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    description: 'Test payment for x402 flow',
  }),
  createInvalidPaymentRequest: () => ({
    amount: '0',
    recipient: 'invalid-address',
    description: 'Invalid test payment',
  }),
};
