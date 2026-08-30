import HeroSlider from '../components/HeroSlider'
import AboutSection from '../components/AboutSection'
import PartnerSection from '../components/PartnerSection'
import CausesSection from '../components/CausesSection'
import FeaturesSection from '../components/FeaturesSection'
import CounterSection from '../components/CounterSection'
import TeamGallerySection from '../components/TeamGallerySection'

export default function Home() {
  return (
    <>
      <HeroSlider />
      <AboutSection />
      <PartnerSection />
      <CausesSection limit={3} showStats={false} />
      <CounterSection />
      <FeaturesSection />
      <TeamGallerySection />
    </>
  )
}
