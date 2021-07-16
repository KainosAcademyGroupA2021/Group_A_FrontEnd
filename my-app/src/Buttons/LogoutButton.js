import { useAuth0 } from '@auth0/auth0-react';


const LogoutButton = () => {
    const { logout }  = useAuth0();

    const opts = {
        returnTo: window.location.origin
    }
    return <button onClick={() => logout(opts)}>Logout</button>;
}

export default LogoutButton;