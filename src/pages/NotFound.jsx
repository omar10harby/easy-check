import { AlertCircle, Home, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className=" bg-primary flex items-center justify-center min-h-screen p-3 sm:py-8">
      <div className="w-full max-w-lg">
        <div className="bg-light rounded-3xl shadow-2xl border border-light-gray p-2 sm:p-4 text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
            </div>
          </div>

          {/* Error Code */}
          <h1 className="text-5xl sm:text-7xl font-black text-primary mb-4 tracking-tighter">
            404
          </h1>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-3 uppercase tracking-tight">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-primary/70 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-primary text-light font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </button>

            <button
              onClick={() => navigate('/imei-checker')}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-light-gray text-primary font-bold rounded-xl hover:bg-medium-gray transition-all border border-medium-gray active:scale-95"
            >
              <Search className="w-5 h-5" />
              <span>Check Device</span>
            </button>
          </div>

          {/* Decorative Element */}
          <div className="mt-6 pt-2 border-t border-light-gray">
            <p className="text-xs text-primary/40 font-medium">
              Error Code: 404 • Page Not Found
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default NotFound
