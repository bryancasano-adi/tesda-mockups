import { useNavigate } from 'react-router';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="p-6 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center">
        <div className="text-6xl mb-4">📄</div>
        <h1 className="text-2xl font-semibold text-[#333] mb-2">Page Not Found</h1>
        <p className="text-sm text-[#666] mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0] transition-colors"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
