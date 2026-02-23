
function GlobalLoader({ message = "Loading..." }) {
    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-light fixed inset-0 z-50">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-dark-bg font-bold text-lg animate-pulse">{message}</p>
            </div>
        </div>
    );
}

export default GlobalLoader;
