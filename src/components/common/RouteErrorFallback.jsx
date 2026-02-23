import { useRouteError } from 'react-router-dom';
import ErrorFallback from './ErrorFallback';

function RouteErrorFallback() {
    const error = useRouteError();

    return (
        <ErrorFallback
            error={error}
            resetErrorBoundary={() => window.location.href = '/'}
        />
    );
}

export default RouteErrorFallback;

