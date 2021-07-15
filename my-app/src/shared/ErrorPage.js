
import { Link } from 'react-router-dom';
import "./ErorrPage.css"

const ErrorPage = (props) => {
    const err = props.error;
    return (
        <div className="err-page">
            <h1>You are not allowed to see the resource</h1>
            <h2>{err}</h2>
            <Link to="/">{"Go back to home page"}</Link>
        </div>
    )
}

export default ErrorPage;