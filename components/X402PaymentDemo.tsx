'use client';

import { useState } from 'react';
import { useX402Payment } from '@/lib/hooks/useX402Payment';
import { FrameButton } from './FrameButton';
import { CreditCard, CheckCircle, XCircle, Loader2, DollarSign } from 'lucide-react';

interface PaymentResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
  confirmations?: number;
}

export function X402PaymentDemo() {
  const { processPayment, testPaymentFlow, isInitialized, isLoading, error } = useX402Payment();
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; details?: any } | null>(null);

  const handleTestPayment = async () => {
    setPaymentResult(null);
    setTestResult(null);

    try {
      const result = await testPaymentFlow();
      setTestResult(result);
    } catch (err) {
      setTestResult({
        success: false,
        message: err instanceof Error ? err.message : 'Test failed',
      });
    }
  };

  const handleModulePayment = async () => {
    setPaymentResult(null);
    setTestResult(null);

    try {
      const result = await processPayment({
        amount: '0.99',
        recipient: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', // Demo recipient
        description: 'Know Your Rights Module Purchase',
        metadata: {
          moduleId: 'workplace-basics',
          userId: 'demo-user',
        },
      });

      setPaymentResult(result);
    } catch (err) {
      setPaymentResult({
        success: false,
        error: err instanceof Error ? err.message : 'Payment failed',
      });
    }
  };

  const handlePremiumPayment = async () => {
    setPaymentResult(null);
    setTestResult(null);

    try {
      const result = await processPayment({
        amount: '4.99',
        recipient: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', // Demo recipient
        description: 'Know Your Rights Premium Access',
        metadata: {
          plan: 'premium',
          userId: 'demo-user',
        },
      });

      setPaymentResult(result);
    } catch (err) {
      setPaymentResult({
        success: false,
        error: err instanceof Error ? err.message : 'Payment failed',
      });
    }
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center mb-4">
        <CreditCard className="w-6 h-6 text-primary mr-3" />
        <h3 className="text-lg font-semibold text-dark-text">X402 Payment Demo</h3>
      </div>

      <div className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
          <span className="text-sm text-gray-400">Payment Service Status:</span>
          <div className="flex items-center">
            {isInitialized ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-green-500">Connected</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-red-500 mr-2" />
                <span className="text-sm text-red-500">Not Connected</span>
              </>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-900 bg-opacity-20 border border-red-500 rounded-lg">
            <div className="flex items-center">
              <XCircle className="w-4 h-4 text-red-500 mr-2" />
              <span className="text-sm text-red-400">{error}</span>
            </div>
          </div>
        )}

        {/* Test Flow Button */}
        <div className="space-y-2">
          <FrameButton
            onClick={handleTestPayment}
            disabled={!isInitialized || isLoading}
            className="w-full"
            variant="secondary"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              'Test X402 Flow'
            )}
          </FrameButton>
          <p className="text-xs text-gray-500">
            Test the payment flow without making an actual transaction
          </p>
        </div>

        {/* Payment Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <FrameButton
              onClick={handleModulePayment}
              disabled={!isInitialized || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Buy Module ($0.99)
                </>
              )}
            </FrameButton>
            <p className="text-xs text-gray-500">
              Purchase a single learning module
            </p>
          </div>

          <div className="space-y-2">
            <FrameButton
              onClick={handlePremiumPayment}
              disabled={!isInitialized || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Buy Premium ($4.99)
                </>
              )}
            </FrameButton>
            <p className="text-xs text-gray-500">
              Get full access to all modules
            </p>
          </div>
        </div>

        {/* Test Result Display */}
        {testResult && (
          <div className={`p-4 rounded-lg border ${
            testResult.success 
              ? 'bg-green-900 bg-opacity-20 border-green-500' 
              : 'bg-red-900 bg-opacity-20 border-red-500'
          }`}>
            <div className="flex items-start">
              {testResult.success ? (
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
              )}
              <div className="flex-1">
                <h4 className={`font-medium ${
                  testResult.success ? 'text-green-400' : 'text-red-400'
                }`}>
                  Test Result
                </h4>
                <p className={`text-sm mt-1 ${
                  testResult.success ? 'text-green-300' : 'text-red-300'
                }`}>
                  {testResult.message}
                </p>
                {testResult.details && (
                  <div className="mt-2 p-2 bg-gray-800 rounded text-xs">
                    <pre className="text-gray-400 whitespace-pre-wrap">
                      {JSON.stringify(testResult.details, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Payment Result Display */}
        {paymentResult && (
          <div className={`p-4 rounded-lg border ${
            paymentResult.success 
              ? 'bg-green-900 bg-opacity-20 border-green-500' 
              : 'bg-red-900 bg-opacity-20 border-red-500'
          }`}>
            <div className="flex items-start">
              {paymentResult.success ? (
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
              )}
              <div className="flex-1">
                <h4 className={`font-medium ${
                  paymentResult.success ? 'text-green-400' : 'text-red-400'
                }`}>
                  Payment {paymentResult.success ? 'Successful' : 'Failed'}
                </h4>
                {paymentResult.success ? (
                  <div className="text-sm mt-1 text-green-300">
                    <p>Transaction Hash: {paymentResult.transactionHash}</p>
                    <p>Confirmations: {paymentResult.confirmations}</p>
                  </div>
                ) : (
                  <p className="text-sm mt-1 text-red-300">
                    {paymentResult.error}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="p-3 bg-blue-900 bg-opacity-20 border border-blue-500 rounded-lg">
          <div className="text-sm text-blue-300">
            <p className="font-medium mb-1">X402 Payment Flow Features:</p>
            <ul className="text-xs space-y-1 text-blue-400">
              <li>• Uses wagmi useWalletClient for wallet integration</li>
              <li>• USDC payments on Base network</li>
              <li>• Transaction confirmation tracking</li>
              <li>• Error handling and validation</li>
              <li>• End-to-end testing capabilities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
