import { Link, NavLink, useLocation } from 'react-router-dom'

function SiteNav() {
  const location = useLocation()
  const whyActive =
    location.pathname === '/' && location.hash === '#why-influ-sight'

  return (
    <div className="nav-sticky">
      <div className="nav-sticky-inner">
        <nav className="nav" aria-label="Primary navigation">
          <div className="nav-left">
            <Link className="brand" to="/" aria-label="InfluSight home">
              Influ<span>Sight</span>
            </Link>
            <div className="nav-links">
              <a
                href="/#why-influ-sight"
                className={`nav-link${whyActive ? ' is-active' : ''}`}
                onClick={(event) => {
                  if (location.pathname === '/') {
                    event.preventDefault()
                    document
                      .getElementById('why-influ-sight')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    window.history.replaceState(null, '', '/#why-influ-sight')
                  }
                }}
              >
                Why InfluSight
              </a>
              <NavLink
                to="/why"
                className={({ isActive }) =>
                  `nav-link${isActive ? ' is-active' : ''}`
                }
              >
                About Us
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default SiteNav
