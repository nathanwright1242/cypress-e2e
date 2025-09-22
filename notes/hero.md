```
// HeroImage.scss
.hero-image {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a 0%, #064e3b 25%, #10b981 50%, #34d399 75%, #6ee7b7 100%);
  background-size: 400% 400%;
  animation: gradient-flow 8s ease infinite;

  @keyframes gradient-flow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 800px;
  padding: 2rem;
}

.hero-svg-container {
  width: 600px;
  height: 400px;
  margin: 0 auto 2rem;
  position: relative;

  svg {
    width: 100%;
    height: 100%;
  }
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.floating-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  animation: float-around 20s infinite ease-in-out;

  &:nth-child(1) {
    width: 80px;
    height: 80px;
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    width: 60px;
    height: 60px;
    top: 20%;
    right: 15%;
    animation-delay: 3s;
  }

  &:nth-child(3) {
    width: 100px;
    height: 100px;
    bottom: 15%;
    left: 20%;
    animation-delay: 6s;
  }

  &:nth-child(4) {
    width: 40px;
    height: 40px;
    bottom: 25%;
    right: 10%;
    animation-delay: 9s;
  }

  @keyframes float-around {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(30px, -20px) rotate(90deg); }
    50% { transform: translate(-20px, 30px) rotate(180deg); }
    75% { transform: translate(20px, 20px) rotate(270deg); }
  }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff, #d1fae5, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  border: 2px solid rgba(16, 185, 129, 0.3);
  border-radius: 50%;
  animation: pulse-expand 3s infinite ease-out;

  &:nth-child(2) {
    animation-delay: 1s;
    width: 400px;
    height: 400px;
  }

  &:nth-child(3) {
    animation-delay: 2s;
    width: 500px;
    height: 500px;
  }

  @keyframes pulse-expand {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(0.5);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1);
    }
  }
}

// Responsive design
@media (max-width: 768px) {
  .hero-svg-container {
    width: 90%;
    height: 300px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-content {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }

  .floating-circle {
    display: none; // Hide floating elements on very small screens
  }
}
```

```javascript
import React from 'react';

const HeroImageV0 = () => {
  return (
    <div className="hero-image">
      {/* Floating background elements */}
      <div className="floating-elements">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
      </div>

      {/* Pulse rings */}
      <div className="pulse-ring"></div>
      <div className="pulse-ring"></div>
      <div className="pulse-ring"></div>

      <div className="hero-content">
        <div className="hero-svg-container">
          <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#34d399', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#6ee7b7', stopOpacity: 1 }} />
              </linearGradient>
              
              <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.9 }} />
                <stop offset="100%" style={{ stopColor: '#d1fae5', stopOpacity: 0.7 }} />
              </linearGradient>
              
              <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0 }} />
              </radialGradient>

              {/* Filters */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <filter id="dropshadow">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
              </filter>
            </defs>

            {/* Background glow circles */}
            <circle cx="150" cy="100" r="60" fill="url(#glowGradient)" opacity="0.4">
              <animate attributeName="r" values="60;80;60" dur="4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="450" cy="300" r="70" fill="url(#glowGradient)" opacity="0.3">
              <animate attributeName="r" values="70;90;70" dur="5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="500" cy="120" r="50" fill="url(#glowGradient)" opacity="0.5">
              <animate attributeName="r" values="50;65;50" dur="3s" repeatCount="indefinite"/>
            </circle>

            {/* Central hub */}
            <g transform="translate(300, 200)">
              {/* Main hub circle */}
              <circle cx="0" cy="0" r="40" fill="url(#mainGradient)" filter="url(#glow)">
                <animateTransform attributeName="transform" type="rotate" values="0;360" dur="20s" repeatCount="indefinite"/>
              </circle>
              
              {/* Inner hub detail */}
              <circle cx="0" cy="0" r="25" fill="none" stroke="url(#accentGradient)" strokeWidth="2" opacity="0.8"/>
              <circle cx="0" cy="0" r="15" fill="url(#accentGradient)" opacity="0.3">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/>
              </circle>
              
              {/* Hub icon (lightning bolt) */}
              <path d="M-8,-15 L8,-5 L-2,0 L8,15 L-8,5 L2,0 Z" fill="#ffffff" filter="url(#dropshadow)"/>
            </g>

            {/* Test nodes around the hub */}
            <g className="test-nodes">
              {/* Node 1 */}
              <g transform="translate(150, 80)">
                <circle cx="0" cy="0" r="25" fill="url(#mainGradient)" filter="url(#glow)" opacity="0.9">
                  <animateTransform attributeName="transform" type="rotate" values="0;360" dur="15s" repeatCount="indefinite"/>
                </circle>
                <text x="0" y="8" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">🧪</text>
              </g>

              {/* Node 2 */}
              <g transform="translate(450, 80)">
                <circle cx="0" cy="0" r="25" fill="url(#mainGradient)" filter="url(#glow)" opacity="0.9">
                  <animateTransform attributeName="transform" type="rotate" values="0;-360" dur="18s" repeatCount="indefinite"/>
                </circle>
                <text x="0" y="8" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">🔬</text>
              </g>

              {/* Node 3 */}
              <g transform="translate(520, 250)">
                <circle cx="0" cy="0" r="25" fill="url(#mainGradient)" filter="url(#glow)" opacity="0.9">
                  <animateTransform attributeName="transform" type="rotate" values="0;360" dur="12s" repeatCount="indefinite"/>
                </circle>
                <text x="0" y="8" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">⚗️</text>
              </g>

              {/* Node 4 */}
              <g transform="translate(450, 320)">
                <circle cx="0" cy="0" r="25" fill="url(#mainGradient)" filter="url(#glow)" opacity="0.9">
                  <animateTransform attributeName="transform" type="rotate" values="0;-360" dur="16s" repeatCount="indefinite"/>
                </circle>
                <text x="0" y="8" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">🚀</text>
              </g>

              {/* Node 5 */}
              <g transform="translate(150, 320)">
                <circle cx="0" cy="0" r="25" fill="url(#mainGradient)" filter="url(#glow)" opacity="0.9">
                  <animateTransform attributeName="transform" type="rotate" values="0;360" dur="14s" repeatCount="indefinite"/>
                </circle>
                <text x="0" y="8" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">💻</text>
              </g>

              {/* Node 6 */}
              <g transform="translate(80, 250)">
                <circle cx="0" cy="0" r="25" fill="url(#mainGradient)" filter="url(#glow)" opacity="0.9">
                  <animateTransform attributeName="transform" type="rotate" values="0;-360" dur="13s" repeatCount="indefinite"/>
                </circle>
                <text x="0" y="8" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">🔧</text>
              </g>
            </g>

            {/* Connection lines */}
            <g className="connections" stroke="url(#accentGradient)" strokeWidth="2" fill="none" opacity="0.6">
              <line x1="300" y1="200" x2="150" y2="80">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite"/>
              </line>
              <line x1="300" y1="200" x2="450" y2="80">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3.5s" repeatCount="indefinite"/>
              </line>
              <line x1="300" y1="200" x2="520" y2="250">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite"/>
              </line>
              <line x1="300" y1="200" x2="450" y2="320">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite"/>
              </line>
              <line x1="300" y1="200" x2="150" y2="320">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3.2s" repeatCount="indefinite"/>
              </line>
              <line x1="300" y1="200" x2="80" y2="250">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.8s" repeatCount="indefinite"/>
              </line>
            </g>

            {/* Data packets moving along connections */}
            <g className="data-packets">
              {/* Packet 1 */}
              <circle r="3" fill="#ffffff" opacity="0.9">
                <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#path1"/>
                </animateMotion>
              </circle>
              <path id="path1" d="M300,200 L150,80" stroke="none" fill="none"/>
              
              {/* Packet 2 */}
              <circle r="3" fill="#ffffff" opacity="0.9">
                <animateMotion dur="3s" repeatCount="indefinite" rotate="auto" begin="1s">
                  <mpath href="#path2"/>
                </animateMotion>
              </circle>
              <path id="path2" d="M300,200 L450,80" stroke="none" fill="none"/>
              
              {/* Packet 3 */}
              <circle r="3" fill="#ffffff" opacity="0.9">
                <animateMotion dur="3.5s" repeatCount="indefinite" rotate="auto" begin="2s">
                  <mpath href="#path3"/>
                </animateMotion>
              </circle>
              <path id="path3" d="M300,200 L520,250" stroke="none" fill="none"/>
            </g>

            {/* Performance stats overlay */}
            <g className="stats" transform="translate(450, 30)">
              <rect x="0" y="0" width="140" height="80" rx="8" fill="rgba(0,0,0,0.7)" stroke="rgba(16,185,129,0.5)" strokeWidth="1"/>
              <text x="10" y="20" fill="#10b981" fontSize="12" fontWeight="bold">LIVE STATS</text>
              <text x="10" y="35" fill="white" fontSize="10">Tests/sec: </text>
              <text x="70" y="35" fill="#10b981" fontSize="10" fontFamily="monospace">
                <animate attributeName="fontSize" values="10;12;10" dur="2s" repeatCount="indefinite"/>
                247
              </text>
              <text x="10" y="50" fill="white" fontSize="10">Parallel: </text>
              <text x="70" y="50" fill="#10b981" fontSize="10" fontFamily="monospace">∞</text>
              <text x="10" y="65" fill="white" fontSize="10">Success: </text>
              <text x="70" y="65" fill="#10b981" fontSize="10" fontFamily="monospace">98.7%</text>
            </g>
          </svg>
        </div>

        <h1 className="hero-title">Infinite Testing Power</h1>
        <p className="hero-subtitle">
          Scale your test suite across unlimited parallel instances with zero configuration. 
          Your tests, our infrastructure, infinite possibilities.
        </p>
      </div>
    </div>
  );
};

export default HeroImageV0;
```
