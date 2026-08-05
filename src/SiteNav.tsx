import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useRef } from 'react'

function scrollWindowToTop() {
  const top = 0
  const left = 0

  window.scrollTo(top, left)
  window.scrollTo({ top, left, behavior: 'auto' })

  if (document.scrollingElement) {
    document.scrollingElement.scrollTop = top
  }

  document.documentElement.scrollTop = top
  document.body.scrollTop = top
}

function SiteNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const handledByTouchRef = useRef(false)
  const whyActive =
    location.pathname === '/' && location.hash === '#why-influ-sight'

  const goHome = () => {
    if (location.pathname !== '/' || location.hash) {
      navigate('/')
    }

    scrollWindowToTop()

    // Mobile Safari often needs a deferred retry after navigation / paint.
    window.requestAnimationFrame(() => {
      scrollWindowToTop()
      window.setTimeout(scrollWindowToTop, 0)
      window.setTimeout(scrollWindowToTop, 50)
      window.setTimeout(scrollWindowToTop, 150)
    })
  }

  return (
    <div className="nav-sticky">
      <div className="nav-sticky-inner">
        <nav className="nav" aria-label="Primary navigation">
          <div className="nav-left">
            <Link
              className="brand"
              to="/"
              aria-label="InfluSight home"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()

                if (handledByTouchRef.current) {
                  handledByTouchRef.current = false
                  return
                }

                goHome()
              }}
              onTouchEnd={(event) => {
                // Explicit touch path for mobile Safari same-route cases.
                event.preventDefault()
                handledByTouchRef.current = true
                goHome()
              }}
            >
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
