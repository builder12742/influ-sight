import SiteNav from './SiteNav'
import headshot from './assets/BrettGutermanHeadshot.jpeg'

function AboutPage() {
  return (
    <div className="page">
      <div className="shell">
        <SiteNav />

        <article className="about">
          <div className="about-layout">
            <div className="about-copy">
              <p className="eyebrow">About</p>
              <h1>Why we started InfluSight</h1>

              <div className="about-body">
                <p>
                  My name is Brett Guterman, and I&apos;m the founder of
                  InfluSight.
                </p>
                <p>
                  I&apos;ve been working in e-commerce and D2C for over 6 years,
                  both as a business owner and an analyst. I&apos;ve seen
                  it&apos;s hard to know whether influencer partnerships are
                  actually paying off. Brands see clicks and impressions, but
                  rarely the real revenue and ROI impact. I&apos;ve also watched
                  brands reach for scattered metrics trying to piece together the
                  full picture. My goal with InfluSight is to centralize
                  everything you&apos;ve ever thought about tracking, in one
                  place, so you can stand behind your results, and make every
                  future partnership a decision, not a gamble.
                </p>
              </div>
            </div>

            <figure className="about-photo">
              <img
                src={headshot}
                alt="Brett Guterman, founder of InfluSight"
                width={320}
                height={320}
              />
            </figure>
          </div>
        </article>
      </div>
    </div>
  )
}

export default AboutPage
