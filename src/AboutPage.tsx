import SiteNav from './SiteNav'

function AboutPage() {
  return (
    <div className="page">
      <div className="shell">
        <SiteNav />

        <article className="about">
          <p className="eyebrow">About</p>
          <h1>Why we started InfluSight</h1>

          <div className="about-body">
            <p>
              My name is Brett Guterman, and I&apos;m the founder of InfluSight.
            </p>
            <p>
              I&apos;ve been working in e-commerce and D2C for over 6 years, both
              as a business owner and an analyst. During my time, I&apos;ve seen
              it&apos;s hard to [PROBLEM — fill in].
            </p>
            <p>
              That&apos;s why I started InfluSight — Influencer Insights.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}

export default AboutPage
