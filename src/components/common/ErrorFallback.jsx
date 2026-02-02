import { AlertCircle, Home, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ErrorFallback({ error, resetErrorBoundary }) {
    const navigate = useNavigate();

    const handleGoHome = () => {
        resetErrorBoundary();
        navigate('/');
    };

    return (
        <div
            className="min-h-screen bg-primary flex items-center justify-center p-4"
            role="alert"
            aria-live="assertive"
        >
            <div className="bg-light rounded-3xl shadow-2xl border border-light-gray p-8 sm:p-12 text-center max-w-md w-full">
                {/* Icon */}
                <div
                    className="w-20 h-20 bg-light-gray rounded-full flex items-center justify-center mx-auto mb-6"
                    aria-hidden="true"
                >
                    <AlertCircle className="w-10 h-10 text-primary" />
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-black text-primary mb-3">
                    Something Went Wrong
                </h1>

                {/* Description */}
                <p className="text-primary/70 mb-6 leading-relaxed">
                    We're sorry, but something unexpected happened. Please try again or return to the home page.
                </p>

                {/* Error details for development */}
                {import.meta.env.DEV && error?.message && (
                    <details className="mb-6 text-left bg-light-gray rounded-xl p-4">
                        <summary className="text-sm font-bold text-primary cursor-pointer">
                            Error Details
                        </summary>
                        <pre className="mt-2 text-xs text-primary/70 overflow-auto whitespace-pre-wrap">
                            {error.message}
                        </pre>
                    </details>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={resetErrorBoundary}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-light font-bold rounded-xl hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        aria-label="Try again to reload the page"
                    >
                        <RefreshCw className="w-5 h-5" aria-hidden="true" />
                        <span>Try Again</span>
                    </button>
                    <button
                        onClick={handleGoHome}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-light-gray text-primary font-bold rounded-xl hover:bg-medium-gray transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        aria-label="Return to home page"
                    >
                        <Home className="w-5 h-5" aria-hidden="true" />
                        <span>Go Home</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ErrorFallback;
