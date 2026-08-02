import './App.css'

type Metric = {
  label: string
  description: string
  creator: number
  bau: number
  format: 'currency' | 'number' | 'percent'
  difference?: 'points'
}

/** Demo values for the Incremental Revenue / ROAS card */
const INCREMENTAL_REVENUE = 400_000
const AMBASSADOR_SPEND = 500_000
const INCREMENTAL_ROAS = INCREMENTAL_REVENUE / AMBASSADOR_SPEND
const ANALYSIS_WINDOW_LABEL = '12-month window, Jan 1, 2025 – Dec 31, 2025'

const metrics: Metric[] = [
  {
    label: 'Revenue per customer',
    description: 'Revenue generated within 12 months of first purchase',
    creator: 310,
    bau: 140,
    format: 'currency',
  },
  {
    label: 'Orders per customer',
    description: 'Average orders placed within the observation window',
    creator: 1.5,
    bau: 1.31,
    format: 'number',
  },
  {
    label: 'Repeat customer rate',
    description: 'Customers who placed at least one additional order',
    creator: 35,
    bau: 21,
    format: 'percent',
    difference: 'points',
  },
  {
    label: 'First-purchase AOV',
    description: 'Average value of the customer’s first order',
    creator: 112,
    bau: 98,
    format: 'currency',
  },
  {
    label: 'Repeat-purchase AOV',
    description: 'Average value of orders placed after the first purchase',
    creator: 160,
    bau: 128,
    format: 'currency',
  },
  {
    label: 'Repeat revenue per customer',
    description: 'Repeat-order revenue spread across the full cohort',
    creator: 80,
    bau: 40,
    format: 'currency',
  },
]

const featuredProductLift = 40
const restOfStoreLift = 20
const featuredVsStoreRatio = featuredProductLift / restOfStoreLift

const currency = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: n % 1 === 0 ? 0 : 2,
  }).format(n)

const currencyCompact = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(n)

const formatMetric = (value: number, format: Metric['format']) => {
  if (format === 'currency') return currency(value)
  if (format === 'percent') return `${value}%`
  return value.toFixed(value % 1 === 0 ? 0 : 2)
}

const formatDifference = (metric: Metric) => {
  if (metric.difference === 'points') {
    return `+${metric.creator - metric.bau} pts`
  }
  const percentageLift = Math.round(
    ((metric.creator - metric.bau) / metric.bau) * 100,
  )
  return `+${percentageLift}%`
}

function App() {
  const isPositiveRoas = INCREMENTAL_ROAS >= 1

  return (
    <div className="page">
      <div className="shell">
        <nav className="nav" aria-label="Primary navigation">
          <a className="brand" href="/" aria-label="InfluSight home">
            Influ<span>Sight</span>
          </a>
          <div className="nav-meta">
            <span className="status-dot" aria-hidden="true" />
            Demo store
          </div>
        </nav>

        <header className="header">
          <h1>
            Stop guessing your influencer ROI. Start tracking it with
            InfluSight.
          </h1>
        </header>

        <div className="sample-banner" role="status">
          <strong>Sample data for illustration.</strong>
          <span>Built with your real sales data on request.</span>
        </div>

        <section className="hero" aria-label="Incremental revenue">
          <div className="hero-top">
            <div className="hero-primary">
              <p className="hero-label">Incremental Revenue</p>
              <p className="hero-value">+{currency(INCREMENTAL_REVENUE)}</p>
              <p className="hero-window">{ANALYSIS_WINDOW_LABEL}</p>
              <p className="hero-detail">
                Estimated additional revenue from creator-acquired customers
                after normalizing for cohort size.
              </p>
            </div>

            <div
              className={`roas-panel${isPositiveRoas ? ' is-positive' : ' is-negative'}`}
              aria-label="Incremental ROAS"
            >
              <div className="roas-panel-header">
                <p className="roas-label">Incremental ROAS</p>
                <span className="roas-direction" aria-hidden="true">
                  {isPositiveRoas ? '↑' : '↓'}
                </span>
              </div>
              <p className="roas-value">{INCREMENTAL_ROAS.toFixed(1)}x</p>
              <p className="roas-caption">
                {currencyCompact(INCREMENTAL_ROAS)} back for every $1 spent
              </p>
              <p className="spend-static">
                Ambassador spend: {currency(AMBASSADOR_SPEND)}
              </p>
            </div>
          </div>

          <p className="roas-bridge">
            Measuring exact ROI is hard. A single ROAS number doesn&apos;t capture
            the full picture. Here&apos;s how ambassador-acquired customers compare
            to your average customer on the metrics that matter long term.
          </p>
        </section>

        <section className="section comparison-section" aria-labelledby="comparison-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Supporting evidence</p>
              <h2 id="comparison-heading">Customer quality comparison</h2>
            </div>
            <span className="matched-badge">Same acquisition period · 12-month window</span>
          </div>
          <div className="table-wrap metric-table desktop-only">
            <table>
              <thead>
                <tr>
                  <th scope="col">Metric</th>
                  <th scope="col">Ambassador-acquired</th>
                  <th scope="col">Average customer</th>
                  <th scope="col">Difference</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric) => (
                  <tr key={metric.label}>
                    <th scope="row">
                      <span className="metric-name">{metric.label}</span>
                      <small>{metric.description}</small>
                    </th>
                    <td className="creator-value">
                      <strong>{formatMetric(metric.creator, metric.format)}</strong>
                    </td>
                    <td>
                      <strong>{formatMetric(metric.bau, metric.format)}</strong>
                    </td>
                    <td>
                      <span className="lift-pill">{formatDifference(metric)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="metric-cards mobile-only" aria-label="Customer quality metrics">
            {metrics.map((metric) => (
              <article key={metric.label} className="metric-card">
                <header>
                  <h3>{metric.label}</h3>
                  <p>{metric.description}</p>
                </header>
                <dl className="metric-card-values">
                  <div>
                    <dt>Ambassador-acquired</dt>
                    <dd>{formatMetric(metric.creator, metric.format)}</dd>
                  </div>
                  <div>
                    <dt>Average customer</dt>
                    <dd>{formatMetric(metric.bau, metric.format)}</dd>
                  </div>
                </dl>
                <span className="lift-pill">{formatDifference(metric)}</span>
              </article>
            ))}
          </div>
          <p className="table-note">
            Average customer includes non-ambassador new customers acquired
            during the same period. Repeat-purchase AOV only includes customers
            who returned; repeat revenue per customer accounts for the full cohort.
          </p>
        </section>

        <section className="section" aria-labelledby="halo-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Featured product lift</p>
              <h2 id="halo-heading">
                Did the featured product outperform the rest of the store?
              </h2>
            </div>
          </div>
          <div className="halo-panel">
            <div className="halo-hero">
              <span className="halo-value">{featuredVsStoreRatio.toFixed(0)}x</span>
              <strong>
                featured product lift vs. rest-of-store lift
              </strong>
              <p>
                Featured product saw a {featuredProductLift}% sales lift during
                the campaign window, compared to {restOfStoreLift}% for the rest
                of the store.
              </p>
            </div>
            <div className="lift-cards" aria-label="Featured product vs rest of store">
              <article className="lift-card is-featured">
                <p className="lift-card-label">Featured product</p>
                <p className="lift-card-value">+{featuredProductLift}%</p>
              </article>
              <article className="lift-card is-store">
                <p className="lift-card-label">Rest of store</p>
                <p className="lift-card-value">+{restOfStoreLift}%</p>
              </article>
            </div>
          </div>
          <p className="table-note">
            This is another directional signal, not proof of causation — useful
            alongside the other metrics on this page, not a standalone conclusion.
          </p>
        </section>
      </div>
    </div>
  )
}

export default App
