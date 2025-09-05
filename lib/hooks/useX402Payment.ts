'use client';

import { useEffect, useState } from 'react';
import { useWalletClient } from 'wagmi';
import { x402PaymentService, X402PaymentRequest, X402PaymentResponse } from '../x402-payment';

export interface UseX402PaymentReturn {
  processPayment: (request: X402PaymentRequest) => Promise<X402PaymentResponse>;
  testPaymentFlow: () => Promise<{ success: boolean; message: string; details?: any }>;
  getPaymentStatus: (txHash: string) => Promise<{ status: 'pending' | 'confirmed' | 'failed'; confirmations: number }>;
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * React hook for x402 payment integration with wagmi
 */
export function useX402Payment(): UseX402PaymentReturn {
  const { data: walletClient } = useWalletClient();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize the payment service when wallet client is available
  useEffect(() => {
    if (walletClient) {
      try {
        x402PaymentService.initialize(walletClient);
        setIsInitialized(true);
        setError(null);
        console.log('X402 Payment Service initialized with wallet client');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize payment service');
        setIsInitialized(false);
      }
    } else {
      setIsInitialized(false);
    }
  }, [walletClient]);

  const processPayment = async (request: X402PaymentRequest): Promise<X402PaymentResponse> => {
    if (!isInitialized) {
      return {
        success: false,
        error: 'Payment service not initialized. Please connect your wallet.',
      };
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await x402PaymentService.processPayment(request);
      
      if (!result.success) {
        setError(result.error || 'Payment failed');
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment processing failed';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const testPaymentFlow = async () => {
    if (!isInitialized) {
      return {
        success: false,
        message: 'Payment service not initialized. Please connect your wallet.',
      };
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await x402PaymentService.testPaymentFlow();
      
      if (!result.success) {
        setError(result.message);
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Test failed';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const getPaymentStatus = async (txHash: string) => {
    if (!isInitialized) {
      throw new Error('Payment service not initialized');
    }

    return await x402PaymentService.getPaymentStatus(txHash);
  };

  return {
    processPayment,
    testPaymentFlow,
    getPaymentStatus,
    isInitialized,
    isLoading,
    error,
  };
}
