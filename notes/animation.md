```javascript
import React from 'react';

const AutomationAssemblySpinner = ({ 
  size = 'large', // 'small', 'medium', 'large'
  speed = 'normal' // 'slow', 'normal', 'fast'
}) => {
  const sizeStyles = {
    small: { width: '128px', height: '48px' },
    medium: { width: '160px', height: '56px' },
    large: { width: '192px', height: '64px' }
  };

  const speedMultipliers = {
    slow: 1.5,
    normal: 1,
    fast: 0.6
  };

  const speedMultiplier = speedMultipliers[speed];

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🏭 Automation Assembly</h3>
      <div style={{...styles.spinnerContainer, ...sizeStyles[size]}}>
        {/* Conveyor belt */}
        <div style={styles.conveyorBelt}>
          {/* Belt movement indicators */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.beltIndicator,
                left: `${i * 12.5}%`,
                animation: `conveyor-move ${2 * speedMultiplier}s linear ${i * 0.1 * speedMultiplier}s infinite`
              }}
            />
          ))}
        </div>
        
        {/* Robotic arms */}
        {[0, 1, 2].map((i) => (
          <div key={i} style={{...styles.robotArmContainer, left: `${20 + i * 40}px`}}>
            <div 
              style={{
                ...styles.robotArm,
                animation: `robot-arm ${3 * speedMultiplier}s ease-in-out ${i * 0.5 * speedMultiplier}s infinite`
              }}
            />
            <div 
              style={{
                ...styles.robotTip,
                animation: `ping 1s cubic-bezier(0, 0, 0.2, 1) ${i * 0.5 * speedMultiplier}s infinite`
              }}
            />
          </div>
        ))}
        
        {/* Code packages moving */}
        {[...Array(3)].map((_, i) => {
          const codeSnippets = ['{ }', '< />', 'fn()'];
          return (
            <div
              key={i}
              style={{
                ...styles.codePackage,
                animation: `package-move ${4 * speedMultiplier}s linear ${i * 1.3 * speedMultiplier}s infinite`
              }}
            >
              <span style={styles.codeText}>
                {codeSnippets[i]}
              </span>
              <div style={{...styles.shimmer, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}} />
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes conveyor-move {
          0% {
            transform: translate(-50%, -50%) translateX(-100px);
          }
          100% {
            transform: translate(-50%, -50%) translateX(200px);
          }
        }
        
        @keyframes robot-arm {
          0%, 100% {
            transform: rotate(-15deg);
          }
          50% {
            transform: rotate(15deg);
          }
        }
        
        @keyframes package-move {
          0% {
            left: -32px;
          }
          100% {
            left: calc(100% + 32px);
          }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '24px',
    textAlign: 'center'
  },
  spinnerContainer: {
    position: 'relative'
  },
  conveyorBelt: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: '16px',
    background: 'linear-gradient(to right, #4b5563, #374151)',
    borderRadius: '8px',
    border: '1px solid #6b7280'
  },
  beltIndicator: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '4px',
    height: '8px',
    backgroundColor: '#fbbf24',
    borderRadius: '2px'
  },
  robotArmContainer: {
    position: 'absolute',
    bottom: '56px'
  },
  robotArm: {
    width: '4px',
    height: '32px',
    background: 'linear-gradient(to bottom, #60a5fa, #2563eb)',
    borderRadius: '2px',
    transformOrigin: 'bottom center'
  },
  robotTip: {
    position: 'absolute',
    top: '-8px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '12px',
    height: '12px',
    backgroundColor: '#f97316',
    borderRadius: '50%'
  },
  codePackage: {
    position: 'absolute',
    bottom: '16px',
    width: '32px',
    height: '24px',
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    borderRadius: '4px',
    border: '1px solid #60a5fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)'
  },
  codeText: {
    fontSize: '12px',
    fontFamily: 'monospace',
    color: '#67e8f9',
    fontWeight: 'bold'
  },
  shimmer: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent)',
    borderRadius: '4px'
  }
};

// Usage example
const AutomationSpinnerDemo = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #312e81 100%)',
      padding: '32px'
    }}>
      <div style={{
        maxWidth: '1024px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '48px'
      }}>
        
        {/* Large spinner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.4), rgba(34, 197, 94, 0.4))',
          backdropFilter: 'blur(8px)',
          borderRadius: '12px',
          padding: '32px',
          border: '1px solid rgba(20, 184, 166, 0.3)'
        }}>
          <AutomationAssemblySpinner size="large" speed="normal" />
        </div>
        
        {/* Medium and small spinners */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.4), rgba(34, 197, 94, 0.4))',
            backdropFilter: 'blur(8px)',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid rgba(20, 184, 166, 0.3)'
          }}>
            <AutomationAssemblySpinner size="medium" speed="fast" />
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.4), rgba(34, 197, 94, 0.4))',
            backdropFilter: 'blur(8px)',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid rgba(20, 184, 166, 0.3)'
          }}>
            <AutomationAssemblySpinner size="small" speed="slow" />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AutomationSpinnerDemo;
```


```javascript
import React from 'react';

const MainLoader = () => {
  return (
    <div style={styles.fullScreenContainer}>
      <div style={styles.loaderWrapper}>
        <h2 style={styles.loadingText}>Processing...</h2>
        
        <div style={styles.assemblyContainer}>
          {/* Conveyor belt */}
          <div style={styles.conveyorBelt}>
            {/* Belt movement indicators */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                style={{
                  ...styles.beltIndicator,
                  left: `${i * 8.33}%`,
                  animation: `conveyor-move 3s linear ${i * 0.15}s infinite`
                }}
              />
            ))}
          </div>
          
          {/* Robotic arms */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{...styles.robotArmContainer, left: `${15 + i * 17}%`}}>
              <div 
                style={{
                  ...styles.robotArm,
                  animation: `robot-arm 4s ease-in-out ${i * 0.8}s infinite`
                }}
              />
              <div 
                style={{
                  ...styles.robotTip,
                  animation: `ping 2s cubic-bezier(0, 0, 0.2, 1) ${i * 0.8}s infinite`
                }}
              />
            </div>
          ))}
          
          {/* Code packages moving */}
          {[...Array(5)].map((_, i) => {
            const codeSnippets = ['{ }', '< />', 'fn()', '[]', '()'];
            return (
              <div
                key={i}
                style={{
                  ...styles.codePackage,
                  animation: `package-move 6s linear ${i * 2}s infinite`
                }}
              >
                <span style={styles.codeText}>
                  {codeSnippets[i]}
                </span>
                <div style={{...styles.shimmer, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}} />
              </div>
            );
          })}
        </div>
        
        <div style={styles.loadingDots}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.dot,
                animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite both`
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes conveyor-move {
          0% {
            transform: translate(-50%, -50%) translateX(-150px);
          }
          100% {
            transform: translate(-50%, -50%) translateX(600px);
          }
        }
        
        @keyframes robot-arm {
          0%, 100% {
            transform: rotate(-20deg);
          }
          50% {
            transform: rotate(20deg);
          }
        }
        
        @keyframes package-move {
          0% {
            left: -80px;
          }
          100% {
            left: calc(100% + 80px);
          }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  fullScreenContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 30%, #312e81 70%, #1e1b4b 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  },
  loaderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
    animation: 'fadeIn 0.8s ease-out'
  },
  loadingText: {
    color: 'white',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: 0,
    textAlign: 'center',
    background: 'linear-gradient(45deg, #60a5fa, #a78bfa, #ec4899)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'pulse 2s ease-in-out infinite'
  },
  assemblyContainer: {
    position: 'relative',
    width: '500px',
    height: '120px'
  },
  conveyorBelt: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: '32px',
    background: 'linear-gradient(to right, #4b5563, #374151, #4b5563)',
    borderRadius: '16px',
    border: '2px solid #6b7280',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 2px 8px rgba(255, 255, 255, 0.1)'
  },
  beltIndicator: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '8px',
    height: '16px',
    backgroundColor: '#fbbf24',
    borderRadius: '4px',
    boxShadow: '0 0 12px rgba(251, 191, 36, 0.6)'
  },
  robotArmContainer: {
    position: 'absolute',
    bottom: '100px'
  },
  robotArm: {
    width: '8px',
    height: '60px',
    background: 'linear-gradient(to bottom, #60a5fa, #2563eb, #1e40af)',
    borderRadius: '4px',
    transformOrigin: 'bottom center',
    boxShadow: '0 0 16px rgba(96, 165, 250, 0.5)'
  },
  robotTip: {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20px',
    height: '20px',
    backgroundColor: '#f97316',
    borderRadius: '50%',
    boxShadow: '0 0 20px rgba(249, 115, 22, 0.8)'
  },
  codePackage: {
    position: 'absolute',
    bottom: '32px',
    width: '60px',
    height: '40px',
    background: 'linear-gradient(135deg, #2563eb, #7c3aed, #a855f7)',
    borderRadius: '8px',
    border: '2px solid #60a5fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.6)'
  },
  codeText: {
    fontSize: '18px',
    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
    color: '#67e8f9',
    fontWeight: 'bold',
    textShadow: '0 0 8px rgba(103, 232, 249, 0.8)'
  },
  shimmer: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    borderRadius: '8px'
  },
  loadingDots: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #ec4899, #8b5cf6)',
    boxShadow: '0 0 16px rgba(236, 72, 153, 0.6)'
  }
};

export default MainLoader;
```

```javascript
import React from 'react';

const MainLoader = () => {
  return (
    <div style={styles.fullScreenContainer}>
      <div style={styles.loaderWrapper}>
        <h2 style={styles.loadingText}>Processing...</h2>
        
        <div style={styles.assemblyContainer}>
          {/* Conveyor belt */}
          <div style={styles.conveyorBelt}>
            {/* Belt movement indicators */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                style={{
                  ...styles.beltIndicator,
                  left: `${i * 8.33}%`,
                  animation: `conveyor-move 3s linear ${i * 0.15}s infinite`
                }}
              />
            ))}
          </div>
          
          {/* Robotic arms */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{...styles.robotArmContainer, left: `${15 + i * 17}%`}}>
              <div 
                style={{
                  ...styles.robotArm,
                  animation: `robot-arm 4s ease-in-out ${i * 0.8}s infinite`
                }}
              />
              <div 
                style={{
                  ...styles.robotTip,
                  animation: `ping 2s cubic-bezier(0, 0, 0.2, 1) ${i * 0.8}s infinite`
                }}
              />
            </div>
          ))}
          
          {/* Code packages moving */}
          {[...Array(5)].map((_, i) => {
            const codeSnippets = ['{ }', '< />', 'fn()', '[]', '()'];
            return (
              <div
                key={i}
                style={{
                  ...styles.codePackage,
                  animation: `package-move 8s linear ${i * 1.5}s infinite`
                }}
              >
                <span style={styles.codeText}>
                  {codeSnippets[i]}
                </span>
                <div style={{...styles.shimmer, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}} />
              </div>
            );
          })}
        </div>
        
        <div style={styles.loadingDots}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.dot,
                animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite both`
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes conveyor-move {
          0% {
            transform: translate(-50%, -50%) translateX(-150px);
          }
          100% {
            transform: translate(-50%, -50%) translateX(600px);
          }
        }
        
        @keyframes robot-arm {
          0%, 100% {
            transform: rotate(-20deg);
          }
          50% {
            transform: rotate(20deg);
          }
        }
        
        @keyframes package-move {
          0% {
            left: -80px;
          }
          100% {
            left: calc(100% + 80px);
          }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  fullScreenContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 30%, #312e81 70%, #1e1b4b 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  },
  loaderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
    animation: 'fadeIn 0.8s ease-out'
  },
  loadingText: {
    color: 'white',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: 0,
    textAlign: 'center',
    background: 'linear-gradient(45deg, #60a5fa, #a78bfa, #ec4899)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'pulse 2s ease-in-out infinite'
  },
  assemblyContainer: {
    position: 'relative',
    width: '500px',
    height: '120px'
  },
  conveyorBelt: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: '32px',
    background: 'linear-gradient(to right, #4b5563, #374151, #4b5563)',
    borderRadius: '16px',
    border: '2px solid #6b7280',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 2px 8px rgba(255, 255, 255, 0.1)'
  },
  beltIndicator: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '8px',
    height: '16px',
    backgroundColor: '#fbbf24',
    borderRadius: '4px',
    boxShadow: '0 0 12px rgba(251, 191, 36, 0.6)'
  },
  robotArmContainer: {
    position: 'absolute',
    bottom: '100px'
  },
  robotArm: {
    width: '8px',
    height: '60px',
    background: 'linear-gradient(to bottom, #60a5fa, #2563eb, #1e40af)',
    borderRadius: '4px',
    transformOrigin: 'bottom center',
    boxShadow: '0 0 16px rgba(96, 165, 250, 0.5)'
  },
  robotTip: {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20px',
    height: '20px',
    backgroundColor: '#f97316',
    borderRadius: '50%',
    boxShadow: '0 0 20px rgba(249, 115, 22, 0.8)'
  },
  codePackage: {
    position: 'absolute',
    bottom: '32px',
    width: '60px',
    height: '40px',
    background: 'linear-gradient(135deg, #2563eb, #7c3aed, #a855f7)',
    borderRadius: '8px',
    border: '2px solid #60a5fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.6)'
  },
  codeText: {
    fontSize: '18px',
    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
    color: '#67e8f9',
    fontWeight: 'bold',
    textShadow: '0 0 8px rgba(103, 232, 249, 0.8)'
  },
  shimmer: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    borderRadius: '8px'
  },
  loadingDots: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #ec4899, #8b5cf6)',
    boxShadow: '0 0 16px rgba(236, 72, 153, 0.6)'
  }
};

export default MainLoader;
```

```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainLoader from './MainLoader';

describe('MainLoader Component', () => {
  
  // Basic Rendering Tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<MainLoader />);
    });

    it('displays the loading text', () => {
      render(<MainLoader />);
      expect(screen.getByText('Processing...')).toBeInTheDocument();
    });

    it('displays J.J. initials on the conveyor belt', () => {
      render(<MainLoader />);
      expect(screen.getByText('J.J.')).toBeInTheDocument();
    });

    it('renders all code snippets', () => {
      render(<MainLoader />);
      const codeSnippets = ['{ }', '< />', 'fn()', '[]', '()'];
      
      codeSnippets.forEach(snippet => {
        expect(screen.getByText(snippet)).toBeInTheDocument();
      });
    });
  });

  // Structure Tests
  describe('Component Structure', () => {
    it('has correct number of robotic arms', () => {
      const { container } = render(<MainLoader />);
      // Should have 5 robotic arms based on the array length
      const robotArms = container.querySelectorAll('[style*="linear-gradient(to bottom, #60a5fa, #2563eb, #1e40af)"]');
      expect(robotArms).toHaveLength(5);
    });

    it('has correct number of belt indicators', () => {
      const { container } = render(<MainLoader />);
      // Should have 12 belt indicators
      const beltIndicators = container.querySelectorAll('[style*="#fbbf24"]');
      expect(beltIndicators.length).toBeGreaterThanOrEqual(12);
    });

    it('has correct number of loading dots', () => {
      const { container } = render(<MainLoader />);
      // Should have 3 bouncing dots
      const dots = container.querySelectorAll('[style*="linear-gradient(45deg, #ec4899, #8b5cf6)"]');
      expect(dots).toHaveLength(3);
    });
  });

  // Animation Tests
  describe('Animations', () => {
    it('applies conveyor belt animation to indicators', () => {
      const { container } = render(<MainLoader />);
      const firstIndicator = container.querySelector('[style*="conveyor-move"]');
      expect(firstIndicator).toHaveStyle({
        animation: expect.stringContaining('conveyor-move')
      });
    });

    it('applies package movement animation to code snippets', () => {
      const { container } = render(<MainLoader />);
      const codePackages = container.querySelectorAll('[style*="package-move"]');
      expect(codePackages).toHaveLength(5);
    });

    it('applies robot arm animation', () => {
      const { container } = render(<MainLoader />);
      const robotArms = container.querySelectorAll('[style*="robot-arm"]');
      expect(robotArms.length).toBeGreaterThan(0);
    });

    it('applies bounce animation to loading dots', () => {
      const { container } = render(<MainLoader />);
      const bouncingDots = container.querySelectorAll('[style*="bounce"]');
      expect(bouncingDots).toHaveLength(3);
    });
  });

  // Style Tests
  describe('Styling', () => {
    it('has full-screen overlay styling', () => {
      const { container } = render(<MainLoader />);
      const overlay = container.firstChild;
      
      expect(overlay).toHaveStyle({
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        zIndex: '9999'
      });
    });

    it('has gradient background', () => {
      const { container } = render(<MainLoader />);
      const overlay = container.firstChild;
      
      expect(overlay).toHaveStyle({
        background: expect.stringContaining('linear-gradient')
      });
    });

    it('centers content properly', () => {
      const { container } = render(<MainLoader />);
      const overlay = container.firstChild;
      
      expect(overlay).toHaveStyle({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      });
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('has appropriate role for loading state', () => {
      const { container } = render(<MainLoader />);
      // Could add aria-label or role attributes to the main container
      expect(container.firstChild).toBeInTheDocument();
    });

    it('loading text is visible to screen readers', () => {
      render(<MainLoader />);
      const loadingText = screen.getByText('Processing...');
      expect(loadingText).not.toHaveStyle({ display: 'none' });
    });
  });

  // Animation Timing Tests
  describe('Animation Timing', () => {
    it('code packages have staggered animation delays', () => {
      const { container } = render(<MainLoader />);
      const codePackages = Array.from(container.querySelectorAll('[style*="package-move"]'));
      
      // Check that each package has a different delay
      const delays = codePackages.map(pkg => {
        const style = pkg.getAttribute('style');
        const delayMatch = style.match(/package-move [0-9.]+s linear ([0-9.]+)s/);
        return delayMatch ? parseFloat(delayMatch[1]) : 0;
      });
      
      // Each delay should be different (1.4s intervals: 0, 1.4, 2.8, 4.2, 5.6)
      const expectedDelays = [0, 1.4, 2.8, 4.2, 5.6];
      expectedDelays.forEach((expectedDelay, index) => {
        expect(delays[index]).toBeCloseTo(expectedDelay, 1);
      });
    });
  });
});

// Integration Tests
describe('MainLoader Integration', () => {
  it('maintains visual consistency across renders', () => {
    const { rerender } = render(<MainLoader />);
    const initialText = screen.getByText('Processing...');
    
    rerender(<MainLoader />);
    const rerenderedText = screen.getByText('Processing...');
    
    expect(initialText).toEqual(rerenderedText);
  });

  it('does not interfere with document body', () => {
    const originalBodyStyle = document.body.style.cssText;
    render(<MainLoader />);
    expect(document.body.style.cssText).toBe(originalBodyStyle);
  });
});

// Snapshot Tests
describe('MainLoader Snapshots', () => {
  it('matches snapshot', () => {
    const { container } = render(<MainLoader />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

// Performance Tests
describe('MainLoader Performance', () => {
  it('renders within acceptable time', () => {
    const startTime = performance.now();
    render(<MainLoader />);
    const endTime = performance.now();
    
    // Should render within 100ms
    expect(endTime - startTime).toBeLessThan(100);
  });

  it('does not cause memory leaks with animations', () => {
    const { unmount } = render(<MainLoader />);
    // This would be more comprehensive in a real test environment
    expect(() => unmount()).not.toThrow();
  });
});

// Mock Animation Tests (for CI environments)
describe('MainLoader with Mocked Animations', () => {
  beforeEach(() => {
    // Mock CSS animations for consistent testing
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({
        animationName: 'none',
        animationDuration: '0s'
      })
    });
  });

  it('works without CSS animation support', () => {
    render(<MainLoader />);
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });
});
```

```css
.pipeline-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e6fffa 50%, #dcfce7 100%);
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}

.pipeline-header {
  text-align: center;
  margin-bottom: 2rem;
}

.pipeline-title {
  font-size: 3rem;
  font-weight: 800;
  color: #374151;
  margin-bottom: 0;
}

.gradient-text {
  background: linear-gradient(135deg, #34d399, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pipeline-main {
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.progress-tracker {
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border-radius: 1rem;
}

.progress-stages {
  display: flex;
  position: relative;
}

.progress-stage {
  flex: 1;
  position: relative;
}

.progress-stage:not(:last-child) .stage-connector {
  position: absolute;
  top: 20px;
  left: 50%;
  right: -50%;
  height: 2px;
  background: #cbd5e1;
  z-index: 0;
}

.connector-fill {
  height: 100%;
  background: #10b981;
  transition: width 0.3s ease;
}

.stage-indicator {
  position: relative;
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border-radius: 50%;
  background: white;
  border: 3px solid #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: all 0.3s ease;
}

.indicator-icon {
  font-size: 1.25rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.indicator-number {
  position: absolute;
  font-weight: 700;
  color: #94a3b8;
  transition: opacity 0.3s ease;
}

.stage-info {
  margin-top: 0.5rem;
  text-align: center;
}

.stage-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: #374151;
}

.stage-status {
  font-size: 0.625rem;
  color: #10b981;
  margin-top: 0.25rem;
  animation: pulse 1.5s ease-in-out infinite;
}

.progress-stage.completed .stage-indicator {
  border-color: #10b981;
  background: #10b981;
}

.progress-stage.completed .indicator-icon {
  opacity: 1;
}

.progress-stage.completed .indicator-number {
  opacity: 0;
}

.progress-stage.active .stage-indicator {
  border-color: #f97316;
  background: white;
  animation: stagePulse 2s ease-in-out infinite;
}

.progress-stage.active .indicator-number {
  color: #f97316;
}

.progress-stage.pending .stage-indicator {
  opacity: 0.5;
}

.stages-container {
  position: relative;
  margin-bottom: 2rem;
}

.stages-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  position: relative;
}

.stage-box {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  transition: all 0.5s ease;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.stage-box.waiting {
  opacity: 0.3;
  transform: scale(0.95);
  pointer-events: none;
}

.stage-box.waiting .stage-icon {
  filter: grayscale(1);
}

.stage-box.active {
  opacity: 1;
  transform: scale(1);
  animation: activePulse 0.5s ease;
}

.stage-box.active.stage-request {
  border-color: #3b82f6;
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
}

.stage-box.active.stage-sandbox {
  border-color: #8b5cf6;
  background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
}

.stage-box.active.stage-engine {
  border-color: #f97316;
  background: linear-gradient(135deg, #fff7ed, #fed7aa);
}

.stage-box.active.stage-report {
  border-color: #10b981;
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
}

.stage-box.completed {
  opacity: 0.8;
  transform: scale(0.98);
  background: #f8fafc;
  border-color: #10b981;
}

.stage-box.completed::before {
  content: '✓';
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  background: #10b981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}

.stage-icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.stage-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.stage-icon svg {
  width: 2rem;
  height: 2rem;
  color: white;
}

.stage-icon-blue {
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
}

.stage-icon-purple {
  background: linear-gradient(135deg, #a78bfa, #8b5cf6);
}

.stage-icon-orange {
  background: linear-gradient(135deg, #fb923c, #f97316);
}

.stage-icon-green {
  background: linear-gradient(135deg, #34d399, #10b981);
}

.stage-title {
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 1rem;
}

.stage-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.request-source {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.source-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
}

.source-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.source-icon.github-icon {
  background: #24292e;
  color: white;
}

.source-icon.custom-logo {
  background: linear-gradient(135deg, #34d399, #10b981);
  color: white;
  font-size: 0.625rem;
  font-weight: bold;
}

.request-source span {
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
}

.server-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.server-item {
  background: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  text-align: center;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.server-icon {
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 auto 0.25rem;
}

.server-icon svg {
  width: 100%;
  height: 100%;
}

.server-icon.app-server { color: #8b5cf6; }
.server-icon.db-server { color: #3b82f6; }
.server-icon.api-server { color: #f97316; }
.server-icon.mock-server { color: #10b981; }

.server-item span {
  font-size: 0.625rem;
  color: #374151;
}

.test-frameworks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.35rem;
  margin-bottom: 0.75rem;
}

.framework-pod {
  position: relative;
  border-radius: 0.5rem;
  padding: 0.5rem 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
  min-height: 2.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.framework-pod:hover {
  transform: scale(1.1);
  z-index: 10;
}

.framework-pod.running {
  animation: frameworkPulse 2s ease-in-out infinite;
}

.framework-symbol {
  font-weight: 700;
  font-size: 0.875rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.pod-indicator {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  animation: blink 1s ease-in-out infinite;
}

.test-metrics {
  background: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.metric-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
}

.metric-label {
  color: #9ca3af;
}

.metric-value {
  font-weight: 700;
}

.metric-value.running { color: #f97316; }
.metric-value.complete { color: #10b981; }

.report-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.report-header {
  text-align: center;
  margin-bottom: 0.75rem;
}

.pass-rate {
  font-size: 2rem;
  font-weight: 800;
  color: #10b981;
}

.pass-label {
  font-size: 0.75rem;
  color: #9ca3af;
}

.report-progress {
  height: 0.5rem;
  background: #f3f4f6;
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.report-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #34d399, #10b981);
  transition: width 1s ease;
}

.report-duration {
  text-align: center;
  font-size: 0.75rem;
  color: #9ca3af;
}

.duration-value {
  font-weight: 700;
  color: #374151;
}

.stage-status-indicator {
  text-align: center;
  margin-top: 0.75rem;
}

.status-text {
  font-size: 0.75rem;
  font-weight: 600;
  color: #10b981;
}

/* Enhanced Assembly Line Section */
.assembly-line-section {
  margin-top: 3rem;
  padding: 2.5rem;
  background: linear-gradient(135deg, #0f172a, #1e293b, #0f172a);
  border-radius: 1.5rem;
  animation: fadeIn 0.5s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.assembly-line-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #34d399, transparent);
  animation: scanLine 3s linear infinite;
}

.assembly-line-container {
  position: relative;
  height: 180px;
}

.energy-field {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.energy-wave {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid rgba(52, 211, 153, 0.2);
}

.energy-wave-1 {
  animation: expandWave 4s linear infinite;
}

.energy-wave-2 {
  animation: expandWave 4s linear infinite 1.3s;
}

.energy-wave-3 {
  animation: expandWave 4s linear infinite 2.6s;
}

.belt-track {
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  height: 50px;
  background: linear-gradient(to bottom, #1e293b, #0f172a);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 
    inset 0 2px 10px rgba(0, 0, 0, 0.5),
    0 5px 20px rgba(0, 0, 0, 0.3);
}

.belt-pattern {
  position: absolute;
  width: 200%;
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 30px,
    rgba(52, 211, 153, 0.1) 30px,
    rgba(52, 211, 153, 0.1) 60px
  );
  animation: beltMove 2s linear infinite;
}

.speed-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    transparent 0,
    transparent 10px,
    rgba(255, 255, 255, 0.03) 10px,
    rgba(255, 255, 255, 0.03) 11px,
    transparent 11px,
    transparent 20px
  );
  animation: beltMove 0.5s linear infinite;
}

.belt-rail {
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, 
    transparent,
    #34d399,
    #10b981,
    #34d399,
    transparent
  );
  box-shadow: 0 0 10px rgba(52, 211, 153, 0.5);
}

.belt-rail-top { top: 0; }
.belt-rail-bottom { bottom: 0; }

.test-package {
  position: absolute;
  width: 70px;
  height: 60px;
  bottom: 45px;
  animation: flowRight 10s linear infinite;
}

.package-content {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--package-color, #10b981);
  box-shadow: 
    0 5px 15px rgba(0, 0, 0, 0.3),
    0 0 30px color-mix(in srgb, var(--package-color) 50%, transparent);
  position: relative;
  transform: rotateX(10deg);
  transition: all 0.3s ease;
}

.package-content:hover {
  transform: rotateX(0deg) scale(1.1);
}

.package-icon {
  font-size: 1.5rem;
  margin-bottom: 0.125rem;
}

.package-label {
  color: white;
  font-size: 0.625rem;
  font-weight: 700;
}

.package-type {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.5rem;
  text-transform: uppercase;
}

.package-glow {
  position: absolute;
  inset: -10px;
  background: radial-gradient(
    circle at center,
    color-mix(in srgb, var(--package-color) 30%, transparent),
    transparent
  );
  border-radius: 10px;
  animation: pulse 2s ease-in-out infinite;
}

.package-particles {
  position: absolute;
  inset: 0;
}

.package-particles span {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: float 2s ease-in-out infinite;
}

.package-particles span:nth-child(1) {
  top: 10%;
  left: 20%;
  animation-delay: 0s;
}

.package-particles span:nth-child(2) {
  top: 30%;
  right: 20%;
  animation-delay: 0.5s;
}

.package-particles span:nth-child(3) {
  bottom: 20%;
  left: 30%;
  animation-delay: 1s;
}

.assembly-stations {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
}

.station {
  position: relative;
}

.station-tower {
  position: relative;
  width: 60px;
  height: 80px;
}

.station-input .station-arm {
  width: 4px;
  height: 50px;
  background: linear-gradient(to bottom, #64748b, #475569);
  margin: 0 auto;
  position: relative;
  transform-origin: top center;
  animation: armSwing 3s ease-in-out infinite;
}

.arm-joint {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background: #fbbf24;
  border-radius: 50%;
}

.arm-laser {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background: linear-gradient(to bottom, #ef4444, transparent);
  animation: laserPulse 1s ease-in-out infinite;
}

.station-base {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 20px;
  background: #475569;
  border-radius: 4px;
}

.base-light {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.scanner-ring {
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  border: 2px solid #3b82f6;
  border-radius: 50%;
}

.scanner-ring-1 {
  width: 40px;
  height: 40px;
  animation: scannerRotate 3s linear infinite;
}

.scanner-ring-2 {
  width: 50px;
  height: 50px;
  top: 15px;
  animation: scannerRotate 3s linear infinite reverse;
}

.scanner-beam {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  animation: scanBeam 2s linear infinite;
}

.processor-core {
  position: absolute;
  left: 50%;
  top: 30px;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
}

.core-spin {
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top-color: #f97316;
  border-right-color: #f97316;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.core-pulse {
  position: absolute;
  inset: 10px;
  background: radial-gradient(circle, #f97316, transparent);
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}

.validator-check {
  position: absolute;
  left: 50%;
  top: 30px;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: checkBounce 3s ease-in-out infinite;
}

.validator-check svg {
  width: 24px;
  height: 24px;
  stroke: white;
  fill: none;
}

.validator-ring {
  position: absolute;
  left: 50%;
  top: 30px;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  border: 2px solid #10b981;
  border-radius: 50%;
  animation: ringExpand 3s ease-in-out infinite;
}

.output-portal {
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
}

.portal-inner {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, #8b5cf6, transparent);
  border-radius: 50%;
  animation: portalPulse 2s ease-in-out infinite;
}

.portal-particles {
  position: absolute;
  inset: 0;
}

.portal-particles span {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #8b5cf6;
  border-radius: 50%;
  animation: orbitParticle 3s linear infinite;
}

.portal-particles span:nth-child(1) { animation-delay: 0s; }
.portal-particles span:nth-child(2) { animation-delay: 0.75s; }
.portal-particles span:nth-child(3) { animation-delay: 1.5s; }
.portal-particles span:nth-child(4) { animation-delay: 2.25s; }

.station-label {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  color: #94a3b8;
  font-size: 0.625rem;
  text-transform: uppercase;
  font-weight: 600;
  white-space: nowrap;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.speed-indicator {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.speed-meter {
  width: 150px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.speed-fill {
  height: 100%;
  background: linear-gradient(90deg, #34d399, #10b981);
  box-shadow: 0 0 10px rgba(52, 211, 153, 0.5);
  animation: speedPulse 2s ease-in-out infinite;
}

.speed-text {
  color: #94a3b8;
  font-size: 0.75rem;
}

.speed-text strong {
  color: #10b981;
}

.status-lights {
  position: absolute;
  top: 10px;
  right: 20px;
  display: flex;
  gap: 0.5rem;
}

.status-light {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-light.status-green {
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
  animation: lightBlink 2s ease-in-out infinite;
}

.status-light.status-yellow {
  background: #f59e0b;
  box-shadow: 0 0 10px #f59e0b;
  animation: lightBlink 2s ease-in-out infinite 0.5s;
}

/* Animations */
@keyframes stagePulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 0 10px rgba(249, 115, 22, 0);
  }
}

@keyframes activePulse {
  0% { transform: scale(0.95); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

@keyframes frameworkPulse {
  0%, 100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

@keyframes blink {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes beltMove {
  from { transform: translateX(0); }
  to { transform: translateX(-60px); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes scanLine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes expandWave {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

@keyframes flowRight {
  0% {
    left: -80px;
    opacity: 0;
    transform: rotateY(90deg);
  }
  5% {
    opacity: 1;
    transform: rotateY(0deg);
  }
  95% {
    opacity: 1;
    transform: rotateY(0deg);
  }
  100% {
    left: calc(100% + 80px);
    opacity: 0;
    transform: rotateY(-90deg);
  }
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0); 
    opacity: 0; 
  }
  50% { 
    transform: translateY(-10px); 
    opacity: 1; 
  }
}

@keyframes armSwing {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-20deg); }
}

@keyframes laserPulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

@keyframes scannerRotate {
  from { transform: translateX(-50%) rotate(0deg); }
  to { transform: translateX(-50%) rotate(360deg); }
}

@keyframes scanBeam {
  0%, 100% { 
    opacity: 0.3; 
    width: 60px; 
  }
  50% { 
    opacity: 1; 
    width: 80px; 
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes checkBounce {
  0%, 100% { transform: translateX(-50%) scale(1); }
  50% { transform: translateX(-50%) scale(1.2); }
}

@keyframes ringExpand {
  0%, 100% { 
    transform: translateX(-50%) scale(1); 
    opacity: 1; 
  }
  50% { 
    transform: translateX(-50%) scale(1.3); 
    opacity: 0.3; 
  }
}

@keyframes portalPulse {
  0%, 100% { 
    transform: scale(1); 
    opacity: 0.8; 
  }
  50% { 
    transform: scale(1.2); 
    opacity: 1; 
  }
}

@keyframes orbitParticle {
  from { 
    transform: rotate(0deg) translateX(25px) rotate(0deg); 
  }
  to { 
    transform: rotate(360deg) translateX(25px) rotate(-360deg); 
  }
}

@keyframes speedPulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

@keyframes lightBlink {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
```
