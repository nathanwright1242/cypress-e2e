```
import React, { useState, useEffect } from 'react';

const TestingDashboard = () => {
  // State for live stats
  const [stats, setStats] = useState({
    activeTests: 247,
    passRate: 98.2,
    timeSaved: 3.5
  });

  // State for test grid items
  const [testItems, setTestItems] = useState(
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      state: ['running', 'passed', 'pending'][Math.floor(Math.random() * 3)],
      icon: ['⚡', '✓', '...'][Math.floor(Math.random() * 3)]
    }))
  );

  // Animate stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        activeTests: Math.floor(Math.random() * 300 + 200),
        passRate: Number((Math.random() * 3 + 96).toFixed(1)),
        timeSaved: Number((Math.random() * 2 + 2).toFixed(1))
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Animate test grid
  useEffect(() => {
    const interval = setInterval(() => {
      const states = ['running', 'passed', 'pending'];
      const icons = ['⚡', '✓', '...'];
      
      setTestItems(prevItems => 
        prevItems.map((item, index) => {
          const randomState = Math.floor(Math.random() * 3);
          return {
            id: index,
            state: states[randomState],
            icon: icons[randomState]
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Test engine frameworks
  const testEngines = [
    { name: 'Selenium', color: '#43B02A', abbr: 'Se' },
    { name: 'Cypress', color: '#17202C', abbr: 'Cy' },
    { name: 'Playwright', color: '#45BA4B', abbr: 'Pw' },
    { name: 'Appium', color: '#662D91', abbr: 'Ap' },
    { name: 'WebDriver', color: '#E23237', abbr: 'Wd' },
    { name: 'Puppeteer', color: '#F7B500', abbr: 'Pp' },
    { name: 'Jest', color: '#99425B', abbr: 'Je' },
    { name: 'Custom', color: '#3178C6', abbr: '+' }
  ];

  return (
    <div className="container">
      <style jsx>{`
        .container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
          padding: 2rem;
          background: linear-gradient(135deg, #f6f8fb 0%, #ffffff 100%);
          min-height: 100vh;
        }

        .section {
          max-width: 1200px;
          margin: 0 auto 4rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-subtitle {
          color: #0066ff;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #1a1f36;
        }

        .section-description {
          font-size: 1.1rem;
          color: #64748b;
          line-height: 1.6;
        }

        /* Live Testing Dashboard Styles */
        .dashboard-wrapper {
          display: flex;
          justify-content: center;
          margin: 3rem 0;
          position: relative;
        }

        .testing-dashboard {
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          padding: 1.5rem;
          width: 100%;
          max-width: 600px;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e1e4e8;
        }

        .dashboard-title {
          font-size: 1.1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #1a1f36;
        }

        .status-indicator {
          width: 10px;
          height: 10px;
          background: #00d4aa;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .status-text {
          color: #64748b;
          font-size: 0.9rem;
        }

        .test-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .test-item {
          aspect-ratio: 1;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
          animation: test-run 3s infinite;
          transition: all 0.3s ease;
        }

        .test-item.running {
          background: linear-gradient(135deg, #0066ff, #0052cc);
        }

        .test-item.passed {
          background: linear-gradient(135deg, #00d4aa, #00b894);
        }

        .test-item.pending {
          background: linear-gradient(135deg, #94a3b8, #64748b);
        }

        @keyframes test-run {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 0.7; }
        }

        .dashboard-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .stat-card {
          padding: 1rem;
          background: #f8f9fb;
          border-radius: 8px;
          text-align: center;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #0066ff;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #64748b;
          margin-top: 0.25rem;
        }

        /* Floating Cards */
        .floating-card {
          position: absolute;
          background: white;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          animation: float-card 8s ease-in-out infinite;
        }

        .floating-card.card-1 {
          top: 20%;
          left: -120px;
          animation-delay: 0s;
        }

        .floating-card.card-2 {
          bottom: 20%;
          right: -120px;
          animation-delay: 3s;
        }

        @keyframes float-card {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          75% { transform: translateY(10px) rotate(-1deg); }
        }

        .card-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .card-text {
          font-size: 0.9rem;
          color: #64748b;
        }

        .card-text strong {
          color: #1a1f36;
          display: block;
        }

        /* Test Engines Grid Styles */
        .engines-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .engine-card {
          background: #f8f9fb;
          border-radius: 12px;
          padding: 2rem 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          cursor: pointer;
        }

        .engine-card:hover {
          transform: translateY(-5px);
          border-color: #0066ff;
          box-shadow: 0 10px 30px rgba(0, 102, 255, 0.1);
          background: white;
        }

        .engine-logo {
          width: 60px;
          height: 60px;
          margin: 0 auto 1rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          transition: all 0.3s ease;
        }

        .engine-card:hover .engine-logo {
          transform: scale(1.1);
        }

        .engine-name {
          font-weight: 600;
          color: #1a1f36;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 1.8rem;
          }

          .floating-card {
            display: none;
          }

          .test-grid {
            grid-template-columns: repeat(4, 1fr);
          }

          .engines-grid {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 1rem;
          }

          .engine-card {
            padding: 1.5rem 1rem;
          }
        }
      `}</style>

      {/* Live Testing Dashboard Section */}
      <div className="section">
        <div className="section-header">
          <div className="section-subtitle">Real-Time Testing</div>
          <h2 className="section-title">Watch Your Tests Scale Instantly</h2>
          <p className="section-description">
            See unlimited parallel execution in action. No queues, no waiting.
          </p>
        </div>

        <div className="dashboard-wrapper">
          <div className="testing-dashboard">
            <div className="dashboard-header">
              <div className="dashboard-title">
                <span className="status-indicator"></span>
                Live Testing Dashboard
              </div>
              <span className="status-text">Real-time</span>
            </div>
            
            <div className="test-grid">
              {testItems.map((item, index) => (
                <div 
                  key={item.id}
                  className={`test-item ${item.state}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.icon}
                </div>
              ))}
            </div>

            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-value">{stats.activeTests}</div>
                <div className="stat-label">Active Tests</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.passRate}%</div>
                <div className="stat-label">Pass Rate</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.timeSaved}h</div>
                <div className="stat-label">Time Saved</div>
              </div>
            </div>
          </div>

          <div className="floating-card card-1">
            <div className="card-icon">🚀</div>
            <div className="card-text">
              Selenium Suite
              <strong>247 tests</strong>
            </div>
          </div>

          <div className="floating-card card-2">
            <div className="card-icon">⚡</div>
            <div className="card-text">
              Cypress E2E
              <strong>189 tests</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Bring Your Own Test Engine Section */}
      <div className="section">
        <div className="section-header">
          <div className="section-subtitle">Your Framework, Our Cloud</div>
          <h2 className="section-title">Bring Your Own Test Engine</h2>
          <p className="section-description">
            No vendor lock-in. No rewriting tests. Use the frameworks your team already knows and loves.
          </p>
        </div>

        <div className="engines-grid">
          {testEngines.map((engine) => (
            <div key={engine.name} className="engine-card">
              <div 
                className="engine-logo" 
                style={{ backgroundColor: engine.color }}
              >
                {engine.abbr}
              </div>
              <div className="engine-name">{engine.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestingDashboard;
```
