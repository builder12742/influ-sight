import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SiteNav from './SiteNav'

type Metric = {
  label: string
  description: string
  creator: number
  bau: number
  format: 'currency' | 'number' | 'percent'
  difference?: 'points'
}

/** Demo values for the Incremental Revenue / ROI card */
const INCREMENTAL_REVENUE = 400_000
const INFLUENCER_SPEND = 500_000
const INCREMENTAL_ROI = INCREMENTAL_REVENUE / INFLUENCER_SPEND
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

function PlatformPage() {
  const isPositiveRoi = INCREMENTAL_ROI >= 1
  const location = useLocation()

  useEffect(() => {
    if (location.hash !== '#why-influ-sight') return
    const target = document.getElementById('why-influ-sight')
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash])

  return (
    <div className="page">
      <div className="shell">
        <SiteNav showDemoBadge />

        <header className="header">
          <h1>
            Stop guessing your influencer ROI. Start tracking it with
            InfluSight.
          </h1>
          <p className="header-subhead">
            One ROI number can&apos;t tell you the whole story. InfluSight&apos;s
            analytics uncovers the unique value of your influencer-acquired
            customers, so you can stand behind your influencer spend to
            leadership.
          </p>
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
            </div>

            <div
              className={`roas-panel${isPositiveRoi ? ' is-positive' : ' is-negative'}`}
              aria-label="Incremental ROI"
            >
              <div className="roas-panel-header">
                <p className="roas-label">Incremental ROI</p>
                <span className="roas-direction" aria-hidden="true">
                  {isPositiveRoi ? '↑' : '↓'}
                </span>
              </div>
              <p className="roas-value">{INCREMENTAL_ROI.toFixed(1)}x</p>
              <p className="roas-caption">
                {currencyCompact(INCREMENTAL_ROI)} back for every $1 spent
              </p>
              <p className="spend-static">
                Influencer spend: {currency(INFLUENCER_SPEND)}
              </p>
            </div>
          </div>
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
                  <th scope="col">Influencer-acquired</th>
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
                    <dt>Influencer-acquired</dt>
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
            Average customer includes non-influencer new customers acquired
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

        <section
          className="section why-section"
          id="why-influ-sight"
          aria-labelledby="why-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">FAQ</p>
              <h2 id="why-heading">Why brands use InfluSight</h2>
            </div>
          </div>

          <div className="faq-list">
            <details className="faq-item" open>
              <summary>How does InfluSight measure ROI?</summary>
              <p>
                [Placeholder] InfluSight compares influencer-acquired customers
                to your average customers on revenue, repeat behavior, and related
                quality metrics — then connects that to your influencer spend.
              </p>
            </details>
            <details className="faq-item">
              <summary>What data do I need to get started?</summary>
              <p>
                [Placeholder] Typically a sales export plus influencer attribution
                (promo codes, links, or UTM tags). No software install required for
                an initial analysis.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                Is this different from what my influencer platform already shows
                me?
              </summary>
              <p>
                [Placeholder] Most platforms report clicks, reach, and attributed
                sales. InfluSight focuses on whether those customers are more
                valuable over time than the rest of your base.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PlatformPage
