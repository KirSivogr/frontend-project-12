import {Link} from "react-router-dom";

export default () => {
    return (
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
                <Link to="/" className="navbar-brand">Chat</Link>
                <button type="button" className="btn btn-primary">Выйти</button>
            </div>
        </nav>
    );
};