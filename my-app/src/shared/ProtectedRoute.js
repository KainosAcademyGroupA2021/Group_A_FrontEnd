import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Route } from 'react-router-dom';


const ProtectedRoute = ({ component, ...args}) => {
    const render = (props) => {
        const Component = withAuthenticationRequired(component);
        return <Component {...props}/>
    }

    return <Route render={render} {...args}/>
}

export default ProtectedRoute;
