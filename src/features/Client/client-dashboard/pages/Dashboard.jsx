// import { motion } from "framer-motion";
// import * as LottieReact from "lottie-react";
// import { TypeAnimation } from "react-type-animation";
// import confetti from "canvas-confetti";
// import { Rocket, Sparkles, Briefcase, ArrowLeft } from "lucide-react";

// // Import Lottie JSON as an object (works with many bundlers)
// import heroAnim from "../../../../assets/lottie/Business.json";
// import step1Anim from "../../../../assets/lottie/Freelancer.json";
// import step2Anim from "../../../../assets/lottie/Money.json";
// import step3Anim from "../../../../assets/lottie/roborthi.json";
// import ctaAnim from "../../../../assets/lottie/robotworking.json";

// import "../styles/DashboardStyle.css";

// /**
//  * Note:
//  * - We pick the exported component from lottie-react in a flexible way so this file
//  *   works whether the package exports a default or a named Lottie component.
//  * - We also compute a URL for each json (new URL(..., import.meta.url).href) and pass it
//  *   as `src` along with `animationData`. Many versions accept one or the other.
//  * - Ensure you restart Vite after changing imports.
//  */

// const LottieComp = LottieReact.default || LottieReact.Lottie || LottieReact;

// function Dashboard() {
 

//   // compute file URLs (Vite-friendly)
//   const heroAnimUrl = new URL("../../../../assets/lottie/Business.json", import.meta.url).href;
//   const step1AnimUrl = new URL("../../../../assets/lottie/Freelancer.json", import.meta.url).href;
//   const step2AnimUrl = new URL("../../../../assets/lottie/Money.json", import.meta.url).href;
//   const step3AnimUrl = new URL("../../../../assets/lottie/roborthi.json", import.meta.url).href;
//   const ctaAnimUrl = new URL("../../../../assets/lottie/robotworking.json", import.meta.url).href;

//   const handleLaunchProject = () => {
//     confetti({
//       particleCount: 120,
//       spread: 70,
//       origin: { y: 0.6 },
//     });
//     // navigate("createproject");
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.25 },
//     },
//   };

//   const fadeInUp = {
//     hidden: { y: 30, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
//   };

//   // Inline styles to ensure the Lottie containers are visible (adjust as needed)
//   const heroLottieStyle = { width: 420, height: 420, maxWidth: "100%" };
//   const cardLottieStyle = { width: 220, height: 220, maxWidth: "100%" };
//   const ctaLottieStyle = { width: 340, height: 340, maxWidth: "100%" };

//   return (
//     <div className="welcome-wrapper" dir="ltr">
//       {/* Animated gradient glow backgrounds */}
//       <div className="bg-glow blob-1"></div>
//       <div className="bg-glow blob-2"></div>

//       {/* 1. Hero Section */}
//       <section className="hero-section">
//         <motion.div
//           className="hero-content"
//           initial={{ opacity: 0, x: 40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="badge">
//             <Sparkles size={16} /> Leading Freelance Hiring Platform
//           </div>

//           <h1>
//             Build your professional team for <br />
//             <TypeAnimation
//               sequence={[
//                 "Web Development",
//                 2000,
//                 "UI/UX Design",
//                 2000,
//                 "Mobile Applications",
//                 2000,
//                 "Software Project Management",
//                 2000,
//               ]}
//               wrapper="span"
//               speed={50}
//               className="typed-text"
//               repeat={Infinity}
//             />
//           </h1>

//           <p className="hero-subtitle">
//             We connect you with top freelancers and engineers to deliver high-quality projects on time.
//           </p>

//           <div className="hero-actions">
//             <button className="btn-primary" onClick={handleLaunchProject}>
//               <Rocket size={18} /> Post Your First Project
//             </button>
//             <button className="btn-secondary">
//               Browse Freelancers <ArrowLeft size={18} />
//             </button>
//           </div>
//         </motion.div>

//         <motion.div
//           className="hero-lottie-container"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8 }}
//           style={heroLottieStyle}
//         >
//           {/* Pass both animationData and src — one of them should work depending on lottie-react version */}
//           <LottieComp
//             animationData={heroAnim}
//             src={heroAnimUrl}
//             loop={true}
//             autoplay
//             style={{ width: "100%", height: "100%" }}
//           />
//         </motion.div>
//       </section>

//       {/* 2. Steps Section */}
//       <section className="steps-section">
//         <motion.div
//           className="section-header"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//         >
//           <h2>How the platform works</h2>
//           <p>Three simple steps to turn your idea into a finished project</p>
//         </motion.div>

//         <motion.div
//           className="steps-grid"
//           variants={staggerContainer}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           {/* Step 1 */}
//           <motion.div className="step-card" variants={fadeInUp} whileHover={{ y: -8 }}>
//             <div className="card-lottie" style={cardLottieStyle}>
//               <LottieComp
//                 animationData={step1Anim}
//                 src={step1AnimUrl}
//                 loop={true}
//                 autoplay
//                 style={{ width: "100%", height: "100%" }}
//               />
//             </div>
//             <div className="step-number">01</div>
//             <h3>Add project details</h3>
//             <p>Specify requirements, budget, and required skills to attract the right talent.</p>
//           </motion.div>

//           {/* Step 2 */}
//           <motion.div className="step-card" variants={fadeInUp} whileHover={{ y: -8 }}>
//             <div className="card-lottie" style={cardLottieStyle}>
//               <LottieComp
//                 animationData={step2Anim}
//                 src={step2AnimUrl}
//                 loop={true}
//                 autoplay
//                 style={{ width: "100%", height: "100%" }}
//               />
//             </div>
//             <div className="step-number">02</div>
//             <h3>Receive and compare proposals</h3>
//             <p>Review freelancers' proposals, portfolios, and past ratings to make an informed choice.</p>
//           </motion.div>

//           {/* Step 3 */}
//           <motion.div className="step-card" variants={fadeInUp} whileHover={{ y: -8 }}>
//             <div className="card-lottie" style={cardLottieStyle}>
//               <LottieComp
//                 animationData={step3Anim}
//                 src={step3AnimUrl}
//                 loop={true}
//                 autoplay
//                 style={{ width: "100%", height: "100%" }}
//               />
//             </div>
//             <div className="step-number">03</div>
//             <h3>Hire and deliver</h3>
//             <p>Choose the best freelancer, track progress on the platform, and receive your completed project.</p>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* 3. CTA Banner */}
//       <motion.section
//         className="cta-banner"
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.7 }}
//       >
//         <div className="cta-text">
//           <h2>Ready to start your next project?</h2>
//           <p>Join hundreds of companies and clients who trust our platform to get work done.</p>
//           <button className="btn-primary" onClick={handleLaunchProject}>
//             <Briefcase size={18} /> Start Now for Free
//           </button>
//         </div>
//         <div className="cta-lottie" style={ctaLottieStyle}>
//           <LottieComp
//             animationData={ctaAnim}
//             src={ctaAnimUrl}
//             loop={true}
//             autoplay
//             style={{ width: "100%", height: "100%" }}
//           />
//         </div>
//       </motion.section>
//     </div>
//   );
// }

// export default Dashboard;
import { motion } from "framer-motion";
import * as LottieReact from "lottie-react";
import { TypeAnimation } from "react-type-animation";
import confetti from "canvas-confetti";
import { Rocket, Sparkles, ArrowLeft } from "lucide-react";

// Import Lottie JSON as an object (works with many bundlers)
import heroAnim from "../../../../assets/lottie/Business.json";
import step1Anim from "../../../../assets/lottie/Freelancer.json";
import step2Anim from "../../../../assets/lottie/Money.json";
import step3Anim from "../../../../assets/lottie/roborthi.json";

import "../styles/DashboardStyle.css";

/**
 * Note:
 * - We pick the exported component from lottie-react in a flexible way so this file
 *   works whether the package exports a default or a named Lottie component.
 * - We also compute a URL for each json (new URL(..., import.meta.url).href) and pass it
 *   as `src` along with `animationData`. Many versions accept one or the other.
 * - Ensure you restart Vite after changing imports.
 */

const LottieComp = LottieReact.default || LottieReact.Lottie || LottieReact;

function Dashboard() {
  // compute file URLs (Vite-friendly)
  const heroAnimUrl = new URL("../../../../assets/lottie/Business.json", import.meta.url).href;
  const step1AnimUrl = new URL("../../../../assets/lottie/Freelancer.json", import.meta.url).href;
  const step2AnimUrl = new URL("../../../../assets/lottie/Money.json", import.meta.url).href;
  const step3AnimUrl = new URL("../../../../assets/lottie/roborthi.json", import.meta.url).href;

  const handleLaunchProject = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
    // navigate("createproject");
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  // Inline styles to ensure the Lottie containers are visible (adjust as needed)
  const heroLottieStyle = { width: 420, height: 420, maxWidth: "100%" };
  const cardLottieStyle = { width: 220, height: 220, maxWidth: "100%" };

  return (
    <div className="welcome-wrapper" dir="ltr">
      {/* Animated gradient glow backgrounds */}
      <div className="bg-glow blob-1"></div>
      <div className="bg-glow blob-2"></div>

      {/* 1. Hero Section */}
      <section className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="badge">
            <Sparkles size={16} /> Leading Freelance Hiring Platform
          </div>

          <h1>
            Build your professional team for <br />
            <TypeAnimation
              sequence={[
                "Web Development",
                2000,
                "UI/UX Design",
                2000,
                "Mobile Applications",
                2000,
                "Software Project Management",
                2000,
              ]}
              wrapper="span"
              speed={50}
              className="typed-text"
              repeat={Infinity}
            />
          </h1>

          <p className="hero-subtitle">
            We connect you with top freelancers and engineers to deliver high-quality projects on time.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={handleLaunchProject}>
              <Rocket size={18} /> Post Your First Project
            </button>
            <button className="btn-secondary">
              Browse Freelancers <ArrowLeft size={18} />
            </button>
          </div>
        </motion.div>

        <motion.div
          className="hero-lottie-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={heroLottieStyle}
        >
          {/* Pass both animationData and src — one of them should work depending on lottie-react version */}
          <LottieComp
            animationData={heroAnim}
            src={heroAnimUrl}
            loop={true}
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>
      </section>

      {/* 2. Steps Section */}
      <section className="steps-section">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>How the platform works</h2>
          <p>Three simple steps to turn your idea into a finished project</p>
        </motion.div>

        <motion.div
          className="steps-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Step 1 */}
          <motion.div className="step-card" variants={fadeInUp} whileHover={{ y: -8 }}>
            <div className="card-lottie" style={cardLottieStyle}>
              <LottieComp
                animationData={step1Anim}
                src={step1AnimUrl}
                loop={true}
                autoplay
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="step-number">01</div>
            <h3>Add project details</h3>
            <p>Specify requirements, budget, and required skills to attract the right talent.</p>
          </motion.div>

          {/* Step 2 */}
          <motion.div className="step-card" variants={fadeInUp} whileHover={{ y: -8 }}>
            <div className="card-lottie" style={cardLottieStyle}>
              <LottieComp
                animationData={step2Anim}
                src={step2AnimUrl}
                loop={true}
                autoplay
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="step-number">02</div>
            <h3>Receive and compare proposals</h3>
            <p>Review freelancers' proposals, portfolios, and past ratings to make an informed choice.</p>
          </motion.div>

          {/* Step 3 */}
          <motion.div className="step-card" variants={fadeInUp} whileHover={{ y: -8 }}>
            <div className="card-lottie" style={cardLottieStyle}>
              <LottieComp
                animationData={step3Anim}
                src={step3AnimUrl}
                loop={true}
                autoplay
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="step-number">03</div>
            <h3>Hire and deliver</h3>
            <p>Choose the best freelancer, track progress on the platform, and receive your completed project.</p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default Dashboard;
