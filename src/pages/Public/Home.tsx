// src/pages/Home.tsx  
// Import CSS module
import styles from './Home.module.css';
import HeroSection from "./HomeComponents/HeroSection";
import LiveActivitiesSection from "./HomeComponents/LiveActivitiesSection";
import Testimonials from "./HomeComponents/Testimonials";
import StatsBarWIthAnimationsWIth from "./HomeComponents/StatsBarWIthAnimations";
import PersonalisedSavingsCalculator from "./HomeComponents/PersonalisedSavingsCalculator";
import InteractWithAppPreview from "./HomeComponents/InteractWithAppPreview";
import AnimatedPatnersCarosel from "./HomeComponents/AnimatedPatnersCarosel";
import SecuritySection from "./HomeComponents/SecuritySection";
import CTASection from "./HomeComponents/CTASection";
import SupportBar from "./HomeComponents/SupportBar";

// Mock Link component with proper typing
interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const Link = ({ to, children, className }: LinkProps) => (
  <a href={to} className={className}>{children}</a>
);

export default function Landing() {
  // const [currentSlide, setCurrentSlide] = useState(0);
  // const [transferAmount, setTransferAmount] = useState(1000);
  // const [fromCurrency, setFromCurrency] = useState("USD");
  // const [toCurrency, setToCurrency] = useState("GBP"); 
  return (
    <div className={styles.container}>
      <HeroSection /> 
      <LiveActivitiesSection />
       <StatsBarWIthAnimationsWIth />
      <PersonalisedSavingsCalculator />
      <InteractWithAppPreview />
       <AnimatedPatnersCarosel />
      <SecuritySection />
      <Testimonials />
      <CTASection />
      <SupportBar />  
    </div>
  );
}

