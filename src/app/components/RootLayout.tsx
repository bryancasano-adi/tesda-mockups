import { Outlet, useNavigate, useLocation } from 'react-router';

export function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Top Navigation */}
      <div className="bg-white border-b border-[#E0E0E0] px-6 py-3 sticky top-0 z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1976D2] flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-[#1976D2] font-semibold text-base">K-GALING</span>
          </div>
          <button className="bg-[#DC3545] text-white px-5 py-2 rounded text-sm font-medium hover:bg-[#c82333] transition-colors">
            Sign Out
          </button>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-57px)]">
        {/* Left Sidebar */}
        <div className="w-60 bg-white border-r border-[#E0E0E0] flex-shrink-0">
          <nav className="py-4">
            <div
              onClick={() => navigate('/')}
              className={`px-6 py-3 flex items-center gap-3 cursor-pointer text-sm transition-all ${
                isActive('/')
                  ? 'bg-[#E3F2FD] text-[#1976D2] font-medium border-l-[3px] border-[#1976D2]'
                  : 'text-[#666] border-l-[3px] border-transparent hover:bg-[#F5F5F5] hover:text-[#333]'
              }`}
            >
              <span className="text-xl">📊</span>
              <span>Sectors</span>
            </div>
            <div className="px-6 py-3 flex items-center gap-3 cursor-pointer text-sm text-[#666] border-l-[3px] border-transparent hover:bg-[#F5F5F5] hover:text-[#333] transition-all">
              <span className="text-xl">📄</span>
              <span>Documents</span>
            </div>
            <div className="px-6 py-3 flex items-center gap-3 cursor-pointer text-sm text-[#666] border-l-[3px] border-transparent hover:bg-[#F5F5F5] hover:text-[#333] transition-all">
              <span className="text-xl">🔄</span>
              <span>Adopt and Adapt</span>
            </div>
            <div className="px-6 py-3 flex items-center gap-3 cursor-pointer text-sm text-[#666] border-l-[3px] border-transparent hover:bg-[#F5F5F5] hover:text-[#333] transition-all">
              <span className="text-xl">🛒</span>
              <span>Supermarket of Competencies</span>
            </div>
            <div className="px-6 py-3 flex items-center gap-3 cursor-pointer text-sm text-[#666] border-l-[3px] border-transparent hover:bg-[#F5F5F5] hover:text-[#333] transition-all">
              <span className="text-xl">📞</span>
              <span>Contact Us</span>
            </div>
            <div className="px-6 py-3 flex items-center gap-3 cursor-pointer text-sm text-[#666] border-l-[3px] border-transparent hover:bg-[#F5F5F5] hover:text-[#333] transition-all">
              <span className="text-xl">❓</span>
              <span>FAQs</span>
            </div>
            <div className="px-6 py-3 flex items-center gap-3 cursor-pointer text-sm text-[#666] border-l-[3px] border-transparent hover:bg-[#F5F5F5] hover:text-[#333] transition-all">
              <span className="text-xl">📋</span>
              <span>T&Cs</span>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
