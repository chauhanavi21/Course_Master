import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import {getAllCompanions, getRecentSessions} from "@/lib/actions/companion.actions";
import {getSubjectColor} from "@/lib/utils";
import Link from "next/link";

export const dynamic = 'force-dynamic';

const Page = async () => {
    const companions = await getAllCompanions({ limit: 3 });
    const recentSessionsCompanions = await getRecentSessions(10);

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Learn Through <span className="text-primary">Voice Conversations</span>
          </h1>
          <p className="hero-description">
            Build personalized AI companions and learn any subject through natural, engaging voice conversations that feel fun and intuitive.
          </p>
          <Link href="/companions/new" className="hero-cta">
            <span>Create Your First Companion</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* Popular Companions Section */}
      <section className="section-wrapper">
        <div className="section-header">
          <h2 className="section-title">Popular Companions</h2>
          <Link href="/companions" className="section-link">
            View All
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        <div className="companions-grid">
          {companions.length > 0 ? (
            companions.map((companion) => (
              <CompanionCard
                key={companion.id}
                {...companion}
                color={getSubjectColor(companion.subject)}
              />
            ))
          ) : (
            <div className="empty-state">
              <p>No companions available yet. Be the first to create one!</p>
            </div>
          )}
        </div>
      </section>

      {/* Recent Sessions & CTA Section */}
      <section className="home-section">
        {recentSessionsCompanions && recentSessionsCompanions.length > 0 && (
          <CompanionsList
            title="Recently Completed Sessions"
            companions={recentSessionsCompanions}
            classNames="w-2/3 max-lg:w-full"
          />
        )}
        <CTA />
      </section>
    </main>
  )
}

export default Page