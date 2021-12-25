import {Link, NavLink} from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <Link className="navbar-brand" to="/">React Query</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink activeClassName={'active'} className="nav-link" to='/'>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName={'active'} className="nav-link" to='/about'>About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName={'active'} className="nav-link" to='/contact'>Contact</NavLink>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header
