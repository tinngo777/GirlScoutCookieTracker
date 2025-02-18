import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    return(
        <>
            <div>404 Page Not Found</div>
            <Link to="/GirlScoutCookieTracker/">Home</Link>
        </>
    );
}