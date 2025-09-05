export default function Loading() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-dark-text mb-2">Loading Know Your Rights Bot</h2>
        <p className="text-gray-400">Preparing your workplace rights education...</p>
      </div>
    </div>
  );
}
