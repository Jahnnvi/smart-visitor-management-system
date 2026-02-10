import React, { useState, useEffect } from "react";
import inviteGuestPass from "../assets/guest-invite-pass.png";
import logs from "../assets/logs.png";
import checkinIllustration from "../assets/checkin-illustration.png";
import { useNavigate } from "react-router-dom";

export default function About() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  // Auto-cycle through steps every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-page">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-container">
          {/* LEFT TEXT */}
          <div className="hero-text animate-left">
            <h1>
              Visitor Management <br /> Made Simple
            </h1>

            <p>
              VisitorX is a smart visitor management system designed for
              educational institutions and organizations to handle guest visits
              securely and efficiently.
            </p>

            <p>
              Faculty can invite guests in advance, administrators approve
              requests, and security teams verify entries at the gate — all in
              one streamlined platform.
            </p>
          </div>

          {/* RIGHT PHONES */}
          <div className="hero-phones animate-right">
            <div className="phone back">
              <img src={logs} alt="Logs" />
            </div>
            <div className="phone front">
              <img src={inviteGuestPass} alt="Invite Guest" />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION - SINGLE VERSION */}
      <section className="how-it-works">
        <div className="how-it-works-container">
          <h2>How VisitorX Works</h2>

          <div className="steps-grid">
            {/* STEP 1 */}
            <div
              className={`step-card ${activeStep === 0 ? "active" : ""}`}
              key="step-1"
            >
              <div className="step-number">1</div>
              <h3>Invite Guest</h3>
              <p>Faculty sends a guest invitation request</p>
            </div>

            {/* STEP 2 */}
            <div
              className={`step-card ${activeStep === 1 ? "active" : ""}`}
              key="step-2"
            >
              <div className="step-number">2</div>
              <h3>Admin Approval</h3>
              <p>Admin reviews and approves the request</p>
            </div>

            {/* STEP 3 */}
            <div
              className={`step-card ${activeStep === 2 ? "active" : ""}`}
              key="step-3"
            >
              <div className="step-number">3</div>
              <h3>Security Verification</h3>
              <p>Security verifies visitor at the gate</p>
            </div>

            {/* STEP 4 */}
            <div
              className={`step-card ${activeStep === 3 ? "active" : ""}`}
              key="step-4"
            >
              <div className="step-number">4</div>
              <h3>Visitor Logs</h3>
              <p>All entries are logged for records</p>
            </div>
          </div>
        </div>
      </section>

      {/* CHECK-IN SECTION - NEW */}
      <section className="checkin-section">
        <div className="checkin-container">
          {/* LEFT - IMAGE */}
          <div className="checkin-image animate-image-left">
            <img src={checkinIllustration} alt="Swift Check-in" />
          </div>

          {/* RIGHT - TEXT CONTENT */}
          <div className="checkin-content animate-text-right">
            <h2>Check-in your visitors swiftly and safely</h2>
            
            <p className="checkin-description">
              A fully customisable system that suits a wide range of business needs.
            </p>

            <h3 className="checkin-subheading">Register, Display, and Go</h3>
            
            <p className="checkin-supporting">
              Register your institution and generate secure visitor passes in minutes.
            </p>

            <button className="cta-button" onClick={() => navigate("/login")}>Get Started</button>
          </div>
        </div>
      </section>

      {/* CHECK-IN SECTION - NEW */}

      {/* CSS */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          overflow-x: hidden;
        }

        .about-page {
          background: #fafcfc;
          font-family: "Segoe UI", sans-serif;
          width: 100%;
          overflow-x: hidden;
        }

        /* ===== HERO SECTION ===== */
        .hero {
          padding: 80px 24px;
          background: #fafcfc;
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .hero-text {
          animation: slideLeft 1s ease forwards;
        }

        .hero-text h1 {
          font-size: 48px;
          margin-bottom: 24px;
          color: #2a2a2a;
          line-height: 1.2;
          font-weight: 700;
        }

        .hero-text p {
          font-size: 16px;
          line-height: 1.7;
          color: #2a2a2a;
          opacity: 0.85;
          margin-bottom: 18px;
        }

        /* PHONES */
        .hero-phones {
          position: relative;
          width: 100%;
          height: 560px;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: slideRight 1s ease forwards;
        }

        .phone {
          width: 260px;
          padding: 10px;
          background: #222121;
          border-radius: 28px;
          position: absolute;
          box-shadow: 0 20px 50px rgba(0,0,0,0.25);
        }

        .phone img {
          width: 100%;
          border-radius: 20px;
          display: block;
        }

        .phone.back {
          right: 80px;
          top: 40px;
          transform: rotate(6deg);
          opacity: 0.9;
        }

        .phone.front {
          left: 80px;
          top: 0;
          transform: rotate(-6deg);
        }

        /* ===== HOW IT WORKS SECTION ===== */
        .how-it-works {
          padding: 100px 24px;
          background: linear-gradient(180deg, #2a2a2a 0%, #222121 100%);
          text-align: center;
        }

        .how-it-works-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .how-it-works h2 {
          font-size: 42px;
          color: #fafcfc;
          margin-bottom: 60px;
          font-weight: 700;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .step-card {
          background: rgba(255,255,255,0.05);
          padding: 36px 24px;
          border-radius: 16px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(76, 209, 214, 0.2);
          cursor: pointer;
          transition: all 0.4s ease;
          transform: scale(0.95);
          opacity: 0.7;
        }

        .step-card.active {
          background: rgba(76, 209, 214, 0.15);
          border: 2px solid #4CD1D6;
          transform: scale(1.05);
          opacity: 1;
          box-shadow: 0 0 20px rgba(76, 209, 214, 0.3);
          animation: pulse 0.6s ease;
        }

        .step-number {
          font-size: 36px;
          font-weight: 700;
          color: #4CD1D6;
          margin-bottom: 16px;
        }

        .step-card h3 {
          font-size: 20px;
          color: #fafcfc;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .step-card p {
          font-size: 14px;
          color: #fafcfc;
          opacity: 0.8;
          line-height: 1.6;
        }

        /* ===== ANIMATIONS ===== */
        @keyframes slideLeft {
          from {
            transform: translateX(-60px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideRight {
          from {
            transform: translateX(60px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
          100% {
            transform: scale(1.05);
          }
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .hero-phones {
            height: 480px;
          }

          .phone.back {
            right: 40px;
          }

          .phone.front {
            left: 40px;
          }
        }

        @media (max-width: 900px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .hero-text h1 {
            font-size: 38px;
          }

          .hero-phones {
            margin: 40px auto 0;
            height: 420px;
          }

          .phone {
            width: 220px;
          }

          .phone.back {
            right: 30px;
          }

          .phone.front {
            left: 30px;
          }

          .how-it-works h2 {
            font-size: 32px;
          }

          .steps-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 600px) {
          .hero {
            padding: 60px 16px;
          }

          .hero-container {
            gap: 40px;
          }

          .hero-text h1 {
            font-size: 32px;
            margin-bottom: 18px;
          }

          .hero-text p {
            font-size: 15px;
          }

          .hero-phones {
            height: 360px;
          }

          .phone {
            width: 180px;
            padding: 8px;
          }

          .phone.back {
            right: 20px;
            top: 30px;
          }

          .phone.front {
            left: 20px;
            top: 0;
          }

          .how-it-works {
            padding: 60px 16px;
          }

          .how-it-works h2 {
            font-size: 26px;
            margin-bottom: 40px;
          }

          .steps-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .step-card {
            padding: 24px 16px;
          }

          .step-number {
            font-size: 28px;
          }

          .step-card h3 {
            font-size: 18px;
          }

          .step-card p {
            font-size: 13px;
          }

          /* CHECK-IN MOBILE */
          .checkin-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .checkin-image {
            order: 2;
          }

          .checkin-content {
            order: 1;
          }

          .checkin-content h2 {
            font-size: 28px;
          }

          .checkin-description {
            font-size: 14px;
          }

          .checkin-subheading {
            font-size: 18px;
          }

          .checkin-supporting {
            font-size: 13px;
          }

          .cta-button {
            width: 100%;
          }
        }

        /* ===== CHECK-IN SECTION ===== */
        .checkin-section {
          background: linear-gradient(135deg, #ffffff 0%, #e8f8fb 100%);
          padding: 100px 24px;
        }

        .checkin-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .checkin-image {
          position: relative;
          animation: fadeInUp 0.8s ease forwards;
          opacity: 0;
        }

        .checkin-image img {
          width: 100%;
          height: auto;
          display: block;
          animation: float 3s ease-in-out infinite;
        }

        .checkin-content {
          animation: fadeInUp 0.8s ease forwards 0.2s;
          opacity: 0;
        }

        .checkin-content h2 {
          font-size: 42px;
          color: #2a2a2a;
          margin-bottom: 24px;
          line-height: 1.3;
          font-weight: 700;
        }

        .checkin-description {
          font-size: 16px;
          color: #2a2a2a;
          opacity: 0.85;
          line-height: 1.7;
          margin-bottom: 32px;
        }

        .checkin-subheading {
          font-size: 24px;
          color: #2a2a2a;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .checkin-supporting {
          font-size: 15px;
          color: #2a2a2a;
          opacity: 0.8;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .cta-button {
          background-color: #4CD1D6;
          color: white;
          border: none;
          padding: 14px 40px;
          border-radius: 50px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(76, 209, 214, 0.3);
        }

        .cta-button:hover {
          background-color: #3db8c4;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(76, 209, 214, 0.4);
        }

        .cta-button:active {
          transform: translateY(0);
        }

        /* ANIMATIONS FOR CHECK-IN SECTION */
        .animate-image-left {
          animation: slideInLeft 0.8s ease forwards;
          opacity: 0;
        }

        .animate-text-right {
          animation: slideInRight 0.8s ease forwards 0.1s;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-60px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(60px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}