import { useState } from 'react'
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
const INCREMENTAL_REVENUE = 850_000
const CREATOR_REVENUE_PER_CUSTOMER = 310
const AVERAGE_CUSTOMER_REVENUE = 140
const CREATOR_CUSTOMERS = 5_000
const DEFAULT_AMBASSADOR_SPEND = 500_000
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

const productHalo = {
  creatorRevenuePerCustomer: 64.5,
  bauRevenuePerCustomer: 43,
  creatorCrossCategoryRate: 29,
  bauCrossCategoryRate: 17,
  creatorProductsPurchased: 2.4,
  bauProductsPurchased: 1.7,
}

const haloLift =
  productHalo.creatorRevenuePerCustomer / productHalo.bauRevenuePerCustomer

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

const integer = (n: number) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n)

const formatMetric = (value: number, format: Metric['format']) => {
  if (format === 'currency') return currency(value)
  if (format === 'percent') return `${value}%`
  return value.toFixed(value % 1 === 0 ? 0 : 2)
}

const parseSpendInput = (value: string) => {
  const digits = value.replace(/[^\d.]/g, '')
  if (!digits) return 0
  return Number(digits)
}

const CONTACT_EMAIL = 'hello@influ-sight.com'

function App() {
  const [ambassadorSpend, setAmbassadorSpend] = useState(DEFAULT_AMBASSADOR_SPEND)
  const [spendDraft, setSpendDraft] = useState(String(DEFAULT_AMBASSADOR_SPEND))

  const incrementalRoas =
    ambassadorSpend > 0 ? INCREMENTAL_REVENUE / ambassadorSpend : 0
  const isPositiveRoas = incrementalRoas >= 1

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
          <div>
            <h1>Stop guessing your influencer ROI.</h1>
          </div>
          <div className="report-period">
            <span>Analysis window</span>
            <strong>Last 12 months</strong>
          </div>
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
              <p className="roas-value">
                {ambassadorSpend > 0 ? `${incrementalRoas.toFixed(1)}x` : '—'}
              </p>
              <p className="roas-caption">
                {ambassadorSpend > 0
                  ? `${currencyCompact(incrementalRoas)} back for every $1 spent`
                  : 'Enter ambassador spend to calculate ROAS'}
              </p>
              <label className="spend-field">
                <span>Ambassador spend</span>
                <div className="spend-input-wrap">
                  <span aria-hidden="true">$</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={spendDraft}
                    onChange={(event) => {
                      const next = event.target.value.replace(/[^\d.]/g, '')
                      setSpendDraft(next)
                      setAmbassadorSpend(parseSpendInput(next))
                    }}
                    onBlur={() => {
                      setSpendDraft(
                        ambassadorSpend > 0 ? String(Math.round(ambassadorSpend)) : '',
                      )
                    }}
                    aria-describedby="spend-help"
                  />
                </div>
                <small id="spend-help">
                  Manually entered — not pulled from Shopify
                </small>
              </label>
              <p className="roas-formula">
                Incremental revenue ÷ ambassador spend = incremental ROAS
              </p>
            </div>
          </div>

          <div className="hero-formula" aria-label="Incremental revenue calculation">
            <div>
              <span>Creator revenue / customer</span>
              <strong>{currency(CREATOR_REVENUE_PER_CUSTOMER)}</strong>
            </div>
            <span className="calculation-symbol">−</span>
            <div>
              <span>Average customer revenue</span>
              <strong>{currency(AVERAGE_CUSTOMER_REVENUE)}</strong>
            </div>
            <span className="calculation-symbol">×</span>
            <div>
              <span>Creator customers</span>
              <strong>{integer(CREATOR_CUSTOMERS)}</strong>
            </div>
          </div>
        </section>

        <p className="roas-bridge">
          Measuring exact ROI is hard. A single ROAS number doesn&apos;t capture
          the full picture. Here&apos;s how ambassador-acquired customers compare
          to your average customer on the metrics that matter long term.
        </p>

        <section className="section comparison-section" aria-labelledby="comparison-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Supporting evidence</p>
              <h2 id="comparison-heading">Customer quality comparison</h2>
            </div>
            <span className="matched-badge">Same acquisition period · 12-month window</span>
          </div>
          <div className="table-wrap metric-table">
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
                {metrics.map((metric) => {
                  const percentageLift = Math.round(
                    ((metric.creator - metric.bau) / metric.bau) * 100,
                  )
                  const difference =
                    metric.difference === 'points'
                      ? `+${metric.creator - metric.bau} pts`
                      : `+${percentageLift}%`

                  return (
                  <tr key={metric.label}>
                    <th scope="row">
                      <span className="metric-name">{metric.label}</span>
                      <small>{metric.description}</small>
                    </th>
                    <td className="creator-value">
                      <strong>{formatMetric(metric.creator, metric.format)}</strong>
                    </td>
                    <td><strong>{formatMetric(metric.bau, metric.format)}</strong></td>
                    <td><span className="lift-pill">{difference}</span></td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
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
              <p className="eyebrow">Product halo</p>
              <h2 id="halo-heading">Do creator customers explore the catalog?</h2>
            </div>
          </div>
          <div className="halo-panel">
            <div className="halo-hero">
              <span className="halo-value">{haloLift.toFixed(1)}×</span>
              <strong>more non-promoted product revenue per customer</strong>
              <p>
                Ambassador-acquired customers generated{' '}
                {currency(productHalo.creatorRevenuePerCustomer)} per customer
                outside promoted products, compared with{' '}
                {currency(productHalo.bauRevenuePerCustomer)} for the average
                customer.
              </p>
            </div>
            <div className="halo-bars" aria-label="Non-promoted revenue comparison">
              <div className="bar-row">
                <div className="bar-label">
                  <span>Ambassador-acquired</span>
                  <strong>{currency(productHalo.creatorRevenuePerCustomer)}</strong>
                </div>
                <div className="bar-track">
                  <span className="bar-fill creator-fill" style={{ width: '100%' }} />
                </div>
              </div>
              <div className="bar-row">
                <div className="bar-label">
                  <span>Average customer</span>
                  <strong>{currency(productHalo.bauRevenuePerCustomer)}</strong>
                </div>
                <div className="bar-track">
                  <span className="bar-fill bau-fill" style={{ width: `${(productHalo.bauRevenuePerCustomer / productHalo.creatorRevenuePerCustomer) * 100}%` }} />
                </div>
              </div>
            </div>
            <dl className="halo-stats">
              <div>
                <dt>Cross-category purchase rate</dt>
                <dd>
                  {productHalo.creatorCrossCategoryRate}%{' '}
                  <span>vs {productHalo.bauCrossCategoryRate}% average</span>
                </dd>
              </div>
              <div>
                <dt>Distinct products purchased</dt>
                <dd>
                  {productHalo.creatorProductsPurchased}{' '}
                  <span>vs {productHalo.bauProductsPurchased} average</span>
                </dd>
              </div>
            </dl>
          </div>
          <p className="table-note">
            “Non-promoted” excludes the product or category featured in the
            attributed creator campaign. This is observed behavior, not proof of causation.
          </p>
        </section>

        <footer className="cta">
          <div>
            <p className="eyebrow">Your data, your answer</p>
            <h2>Want to see what your ambassadors are actually worth?</h2>
            <p>We’ll build this comparison from your sales and attribution data.</p>
          </div>
          <a className="cta-link" href={`mailto:${CONTACT_EMAIL}?subject=InfluSight%20cohort%20analysis`}>
            Analyze my ambassador program
          </a>
        </footer>
      </div>
    </div>
  )
}

export default App
