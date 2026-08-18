import * as LottieReact from "lottie-react";
import welcomeAnim from "../../../../assets/lottie/robotworking.json";
import "../styles/FreelancerHome.css";

const LottieComp = LottieReact.default || LottieReact.Lottie || LottieReact;

export default function FreelancerHome() {
  const welcomeAnimUrl = new URL(
    "../../../../assets/lottie/robotworking.json",
    import.meta.url
  ).href;

  return (
    <div className="freelancer-welcome-card">
      <div className="freelancer-welcome-text">
        <h1>Welcome back !</h1>

        <p>
          Welcome to FreeLink. Explore available projects, respond to
          client invitations, and start building your freelance career
          today.
        </p>
      </div>

      <div className="freelancer-welcome-lottie">
        <LottieComp
          animationData={welcomeAnim}
          src={welcomeAnimUrl}
          loop={true}
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
