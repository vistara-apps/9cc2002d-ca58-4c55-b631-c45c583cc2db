# X402 Payment Flow Implementation

This document describes the implementation of the x402 payment flow for the Know Your Rights Bot application.

## Overview

The x402 payment flow enables USDC payments on the Base network using wagmi's `useWalletClient` hook and custom payment processing logic. This implementation provides a complete end-to-end payment solution for purchasing modules and premium access.

## Architecture

### Core Components

1. **X402PaymentService** (`lib/x402-payment.ts`)
   - Main payment processing service
   - Handles USDC transactions on Base network
   - Provides validation, encoding, and confirmation tracking

2. **useX402Payment Hook** (`lib/hooks/useX402Payment.ts`)
   - React hook for integrating payment service with wagmi
   - Manages wallet client initialization
   - Provides loading states and error handling

3. **X402PaymentDemo Component** (`components/X402PaymentDemo.tsx`)
   - UI component demonstrating payment functionality
   - Includes test flow and real payment buttons
   - Shows transaction status and confirmations

## Features Implemented

### ✅ Core Requirements

- [x] **wagmi useWalletClient Integration**: Uses wagmi's `useWalletClient` hook for wallet connectivity
- [x] **x402-axios Package**: Installed and integrated for payment processing
- [x] **USDC on Base**: Configured for USDC token payments on Base network
- [x] **Transaction Confirmations**: Tracks and displays transaction confirmation status
- [x] **Error Handling**: Comprehensive error handling for all payment scenarios

### ✅ Additional Features

- [x] **End-to-End Testing**: Complete test flow without actual transactions
- [x] **Payment Validation**: Input validation for amounts and addresses
- [x] **Transaction Encoding**: Proper ERC-20 transfer function encoding
- [x] **Status Tracking**: Real-time payment status monitoring
- [x] **UI Integration**: Seamless integration with existing app UI

## Technical Implementation

### Payment Service Configuration

```typescript
const X402_CONFIG: X402Config = {
  chainId: base.id, // Base network (8453)
  tokenAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC on Base
  rpcUrl: base.rpcUrls.default.http[0],
};
```

### Key Methods

#### `processPayment(request: X402PaymentRequest)`
- Validates payment request
- Converts USDC amounts to proper decimals (6 decimals)
- Encodes ERC-20 transfer transaction
- Sends transaction via wallet client
- Waits for confirmation

#### `testPaymentFlow()`
- Tests the complete payment flow without sending transactions
- Validates configuration and wallet connectivity
- Returns detailed test results

#### `getPaymentStatus(transactionHash: string)`
- Queries transaction status on blockchain
- Returns confirmation count and status

### Error Handling

The implementation includes comprehensive error handling for:

- Uninitialized wallet clients
- Invalid payment amounts
- Invalid recipient addresses
- Transaction failures
- Network connectivity issues

### Validation

- **Amount Validation**: Ensures positive amounts greater than 0
- **Address Validation**: Validates Ethereum address format
- **Network Validation**: Ensures correct network configuration

## Usage Examples

### Basic Payment Processing

```typescript
import { useX402Payment } from '@/lib/hooks/useX402Payment';

function PaymentComponent() {
  const { processPayment, isInitialized, isLoading } = useX402Payment();

  const handlePayment = async () => {
    const result = await processPayment({
      amount: '0.99',
      recipient: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      description: 'Module purchase',
    });

    if (result.success) {
      console.log('Payment successful:', result.transactionHash);
    } else {
      console.error('Payment failed:', result.error);
    }
  };

  return (
    <button 
      onClick={handlePayment}
      disabled={!isInitialized || isLoading}
    >
      Pay with USDC
    </button>
  );
}
```

### Testing Payment Flow

```typescript
const { testPaymentFlow } = useX402Payment();

const runTest = async () => {
  const result = await testPaymentFlow();
  console.log('Test result:', result);
};
```

## Testing

### Unit Tests

The implementation includes comprehensive unit tests covering:

- Payment validation logic
- USDC amount parsing
- Address validation
- Transaction encoding
- Error handling scenarios
- Configuration management

Run tests with:
```bash
npm test lib/__tests__/x402-payment.test.ts
```

### Integration Testing

The X402PaymentDemo component provides interactive testing:

1. **Test Flow**: Validates configuration without transactions
2. **Module Payment**: Tests $0.99 module purchase
3. **Premium Payment**: Tests $4.99 premium access

## Security Considerations

1. **Input Validation**: All inputs are validated before processing
2. **Address Verification**: Ethereum addresses are validated using regex
3. **Amount Parsing**: Safe BigInt conversion for USDC amounts
4. **Error Boundaries**: Graceful error handling prevents crashes
5. **Transaction Encoding**: Proper ERC-20 function encoding

## Network Configuration

### Base Network Details
- **Chain ID**: 8453
- **USDC Contract**: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **Decimals**: 6 (USDC uses 6 decimal places)
- **RPC URL**: Base network default RPC

### Supported Operations
- ERC-20 token transfers (USDC)
- Transaction confirmation tracking
- Balance queries (future enhancement)
- Gas estimation (future enhancement)

## Future Enhancements

### Planned Features
- [ ] Real-time balance checking
- [ ] Gas estimation and optimization
- [ ] Multi-token support
- [ ] Batch payment processing
- [ ] Payment history tracking
- [ ] Refund processing
- [ ] Subscription payments

### Performance Optimizations
- [ ] Transaction batching
- [ ] Caching payment status
- [ ] Optimistic UI updates
- [ ] Background confirmation polling

## Troubleshooting

### Common Issues

1. **"Wallet client not initialized"**
   - Ensure wallet is connected
   - Check MiniKitProvider configuration

2. **"Invalid payment amount"**
   - Verify amount is greater than 0
   - Check decimal formatting

3. **"Invalid recipient address"**
   - Ensure address is valid Ethereum format
   - Check address checksum

4. **Transaction failures**
   - Verify sufficient USDC balance
   - Check network connectivity
   - Ensure correct network (Base)

### Debug Mode

Enable debug logging by setting:
```typescript
console.log('X402 Payment Service initialized with wallet client');
```

## Dependencies

- `wagmi`: ^2.14.11 - Wallet connectivity
- `viem`: ^2.27.2 - Ethereum interactions
- `@coinbase/onchainkit`: ^0.38.19 - Base network integration
- `@tanstack/react-query`: ^5 - State management
- `x402-axios`: Latest - Payment processing

## Conclusion

The x402 payment flow implementation provides a robust, secure, and user-friendly payment solution for the Know Your Rights Bot application. It successfully integrates with the existing wagmi setup and provides comprehensive error handling and testing capabilities.

The implementation is production-ready and includes all the required features specified in the Linear issue ZAA-1690.
