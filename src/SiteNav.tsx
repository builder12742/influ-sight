import { Link, NavLink } from 'react-router-dom'

type SiteNavProps = {
  showDemoBadge?: boolean
}

function SiteNav({ showDemoBadge = false }: SiteNavProps) {
  return (
    <nav className="nav" aria-label="Primary navigation">
      <Link className="brand" to="/" aria-label="InfluSight home">
        Influ<span>Sight</span>
      </Link>
      <div className="nav-right">
        <NavLink
          to="/why"
          className={({ isActive }) =>
            `nav-link${isActive ? ' is-active' : ''}`
          }
        >
          Why InfluSight
        </NavLink>
        {showDemoBadge ? (
          <div className="nav-meta">
            <span className="status-dot" aria-hidden="true" />
            Demo store
          </div>
        ) : null}
      </div>
    </nav>
  )
}

export default SiteNav
