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
