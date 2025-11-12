```javascript
// ProgressStages.tsx
import React from 'react';
import { FaCheckCircle, FaCircle, FaTimesCircle, FaForward, FaQuestionCircle } from 'react-icons/fa';
import styles from './ProgressStages.scss';

interface Stage {
  StageName: string;
  StartTime: string;
  Result: string;
  Message: string;
}

interface ProgressStagesProps {
  stages: Stage[];
}

const ProgressStages: React.FC<ProgressStagesProps> = ({ stages }) => {
  const getStageIcon = (stage: Stage) => {
    const result = stage.Result.toLowerCase();
    
    switch (result) {
      case 'passed':
        return <FaCheckCircle className={`${styles.progressIcon} ${styles.progressIconPassed}`} />;
      case 'failed':
        return <FaTimesCircle className={`${styles.progressIcon} ${styles.progressIconFailed}`} />;
      case 'skipped':
        return <FaForward className={`${styles.progressIcon} ${styles.progressIconSkipped}`} />;
      case 'pending':
        return <FaCircle className={`${styles.progressIcon} ${styles.progressIconPending}`} />;
      default:
        return <FaQuestionCircle className={`${styles.progressIcon} ${styles.progressIconUnknown}`} />;
    }
  };

  const getConnectorClass = (stage: Stage) => {
    const result = stage.Result.toLowerCase();
    
    switch (result) {
      case 'passed':
        return styles.connectorLinePassed;
      case 'failed':
        return styles.connectorLineFailed;
      case 'skipped':
        return styles.connectorLineSkipped;
      default:
        return styles.connectorLinePending;
    }
  };

  const formatTooltipContent = (stage: Stage) => {
    return (
      <div className={styles.tooltipContent}>
        <div className={styles.tooltipTitle}>{stage.StageName}</div>
        {stage.StartTime && <div className={styles.tooltipDetail}>Started: {stage.StartTime}</div>}
        {stage.Message && <div className={styles.tooltipMessage}>{stage.Message}</div>}
      </div>
    );
  };

  return (
    <div className={styles.progressStagesContainer}>
      {stages.map((stage, index) => (
        <div key={index} className={styles.stageWrapper}>
          <div className={styles.stageIconWrapper}>
            {getStageIcon(stage)}
            <div className={styles.tooltip}>
              {formatTooltipContent(stage)}
            </div>
          </div>
          {index < stages.length - 1 && (
            <div className={`${styles.connectorLine} ${getConnectorClass(stage)}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressStages;
```

```css
// ProgressStages.scss
.progressStagesContainer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stageWrapper {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stageIconWrapper {
  position: relative;
  display: inline-block;
}

.progressIcon {
  width: 1rem;
  height: 1rem;
  
  &.progressIconPassed {
    color: #22c55e;
  }
  
  &.progressIconFailed {
    color: #ef4444;
  }
  
  &.progressIconSkipped {
    color: #f59e0b;
  }
  
  &.progressIconPending {
    color: #d1d5db;
  }
  
  &.progressIconUnknown {
    color: #9ca3af;
  }
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #1f2937;
  color: white;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  z-index: 10;
  
  .stageIconWrapper:hover & {
    opacity: 1;
  }
}

.tooltipContent {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.tooltipTitle {
  font-weight: 600;
}

.tooltipDetail {
  color: #9ca3af;
  font-size: 0.7rem;
}

.tooltipMessage {
  color: #d1d5db;
  font-size: 0.7rem;
  max-width: 200px;
  white-space: normal;
}

.connectorLine {
  width: 1rem;
  height: 2px;
  
  &.connectorLinePassed {
    background-color: #22c55e;
  }
  
  &.connectorLineFailed {
    background-color: #ef4444;
  }
  
  &.connectorLineSkipped {
    background-color: #f59e0b;
  }
  
  &.connectorLinePending {
    background-color: #d1d5db;
  }
}
```

```javascript
// ProgressStages.test.tsx
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ProgressStages from './ProgressStages';

describe('ProgressStages', () => {
  const mockStages = [
    { StageName: "Planning", StartTime: "2025-11-01 09:00", Result: "Passed", Message: "All requirements gathered" },
    { StageName: "Development", StartTime: "2025-11-02 10:30", Result: "Passed", Message: "Code review passed" },
    { StageName: "Testing", StartTime: "2025-11-05 14:00", Result: "Failed", Message: "Integration tests failed" },
    { StageName: "Deployment", StartTime: "", Result: "Pending", Message: "" }
  ];

  it('renders all stages', () => {
    const { container } = render(<ProgressStages stages={mockStages} />);
    const stageWrappers = container.querySelectorAll('[class*="stageWrapper"]');
    expect(stageWrappers.length).toBeGreaterThan(0);
  });

  it('renders connector lines between stages', () => {
    const { container } = render(<ProgressStages stages={mockStages} />);
    const connectors = container.querySelectorAll('[class*="connectorLine"]');
    expect(connectors.length).toBeGreaterThan(0);
  });

  it('shows passed icon for Passed result', () => {
    const passedStages = [
      { StageName: "Build", StartTime: "2025-11-01 10:00", Result: "Passed", Message: "Build successful" }
    ];
    const { container } = render(<ProgressStages stages={passedStages} />);
    const passedIcon = container.querySelector('[class*="progressIconPassed"]');
    expect(passedIcon).toBeInTheDocument();
  });

  it('shows failed icon for Failed result', () => {
    const failedStages = [
      { StageName: "Build", StartTime: "2025-11-01 10:00", Result: "Failed", Message: "Build failed" }
    ];
    const { container } = render(<ProgressStages stages={failedStages} />);
    const failedIcon = container.querySelector('[class*="progressIconFailed"]');
    expect(failedIcon).toBeInTheDocument();
  });

  it('shows skipped icon for Skipped result', () => {
    const skippedStages = [
      { StageName: "Build", StartTime: "", Result: "Skipped", Message: "Stage skipped" }
    ];
    const { container } = render(<ProgressStages stages={skippedStages} />);
    const skippedIcon = container.querySelector('[class*="progressIconSkipped"]');
    expect(skippedIcon).toBeInTheDocument();
  });

  it('shows pending icon for Pending result', () => {
    const pendingStages = [
      { StageName: "Deploy", StartTime: "", Result: "Pending", Message: "" }
    ];
    const { container } = render(<ProgressStages stages={pendingStages} />);
    const pendingIcon = container.querySelector('[class*="progressIconPending"]');
    expect(pendingIcon).toBeInTheDocument();
  });

  it('shows unknown icon for unrecognized result', () => {
    const unknownStages = [
      { StageName: "Unknown", StartTime: "", Result: "SomeWeirdStatus", Message: "" }
    ];
    const { container } = render(<ProgressStages stages={unknownStages} />);
    const unknownIcon = container.querySelector('[class*="progressIconUnknown"]');
    expect(unknownIcon).toBeInTheDocument();
  });

  it('is case-insensitive for result values', () => {
    const mixedCaseStages = [
      { StageName: "Stage1", StartTime: "", Result: "PASSED", Message: "" },
      { StageName: "Stage2", StartTime: "", Result: "failed", Message: "" },
      { StageName: "Stage3", StartTime: "", Result: "SkIpPeD", Message: "" }
    ];
    const { container } = render(<ProgressStages stages={mixedCaseStages} />);
    
    expect(container.querySelector('[class*="progressIconPassed"]')).toBeInTheDocument();
    expect(container.querySelector('[class*="progressIconFailed"]')).toBeInTheDocument();
    expect(container.querySelector('[class*="progressIconSkipped"]')).toBeInTheDocument();
  });

  it('displays tooltip content on hover', async () => {
    const user = userEvent.setup();
    const { container } = render(<ProgressStages stages={mockStages} />);
    
    const stageWrapper = container.querySelector('[class*="stageIconWrapper"]');
    await user.hover(stageWrapper!);
    
    const tooltip = container.querySelector('[class*="tooltip"]');
    expect(tooltip).toBeInTheDocument();
  });

  it('shows stage name in tooltip', () => {
    const { container } = render(<ProgressStages stages={mockStages} />);
    const tooltipTitle = container.querySelector('[class*="tooltipTitle"]');
    expect(tooltipTitle).toHaveTextContent('Planning');
  });

  it('shows start time in tooltip when available', () => {
    const { container } = render(<ProgressStages stages={mockStages} />);
    const tooltipDetail = container.querySelector('[class*="tooltipDetail"]');
    expect(tooltipDetail).toHaveTextContent('Started: 2025-11-01 09:00');
  });

  it('shows message in tooltip when available', () => {
    const { container } = render(<ProgressStages stages={mockStages} />);
    const tooltipMessage = container.querySelector('[class*="tooltipMessage"]');
    expect(tooltipMessage).toHaveTextContent('All requirements gathered');
  });

  it('does not render start time when empty', () => {
    const stagesWithoutTime = [
      { StageName: "Testing", StartTime: "", Result: "Pending", Message: "" }
    ];
    const { container } = render(<ProgressStages stages={stagesWithoutTime} />);
    const tooltipDetail = container.querySelector('[class*="tooltipDetail"]');
    expect(tooltipDetail).not.toBeInTheDocument();
  });

  it('does not render message when empty', () => {
    const stagesWithoutMessage = [
      { StageName: "Testing", StartTime: "2025-11-01 09:00", Result: "Pending", Message: "" }
    ];
    const { container } = render(<ProgressStages stages={stagesWithoutMessage} />);
    const tooltipMessage = container.querySelector('[class*="tooltipMessage"]');
    expect(tooltipMessage).not.toBeInTheDocument();
  });

  it('applies correct connector line class for Passed stage', () => {
    const passedStages = [
      { StageName: "Stage1", StartTime: "", Result: "Passed", Message: "" },
      { StageName: "Stage2", StartTime: "", Result: "Pending", Message: "" }
    ];
    const { container } = render(<ProgressStages stages={passedStages} />);
    const passedConnector = container.querySelector('[class*="connectorLinePassed"]');
    expect(passedConnector).toBeInTheDocument();
  });

  it('applies correct connector line class for Failed stage', () => {
    const failedStages = [
      { StageName: "Stage1", StartTime: "", Result: "Failed", Message: "" },
      { StageName: "Stage2", StartTime: "", Result: "Pending", Message: "" }
    ];
    const { container } = render(<ProgressStages stages={failedStages} />);
    const failedConnector = container.querySelector('[class*="connectorLineFailed"]');
    expect(failedConnector).toBeInTheDocument();
  });

  it('applies correct connector line class for Skipped stage', () => {
    const skippedStages = [
      { StageName: "Stage1", StartTime: "", Result: "Skipped", Message: "" },
      { StageName: "Stage2", StartTime: "", Result: "Pending", Message: "" }
    ];
    const { container } = render(<ProgressStages stages={skippedStages} />);
    const skippedConnector = container.querySelector('[class*="connectorLineSkipped"]');
    expect(skippedConnector).toBeInTheDocument();
  });

  it('applies pending connector line class for unknown result', () => {
    const unknownStages = [
      { StageName: "Stage1", StartTime: "", Result: "UnknownStatus", Message: "" },
      { StageName: "Stage2", StartTime: "", Result: "Pending", Message: "" }
    ];
    const { container } = render(<ProgressStages stages={unknownStages} />);
    const pendingConnector = container.querySelector('[class*="connectorLinePending"]');
    expect(pendingConnector).toBeInTheDocument();
  });

  it('renders correctly with single stage', () => {
    const singleStage = [
      { StageName: "OnlyStage", StartTime: "2025-11-01 09:00", Result: "Passed", Message: "Done" }
    ];
    const { container } = render(<ProgressStages stages={singleStage} />);
    
    const stageWrappers = container.querySelectorAll('[class*="stageWrapper"]');
    expect(stageWrappers).toHaveLength(1);
    
    const connectors = container.querySelectorAll('[class*="connectorLine"]');
    expect(connectors).toHaveLength(0);
  });

  it('renders correctly with empty stages array', () => {
    const { container } = render(<ProgressStages stages={[]} />);
    const stageWrappers = container.querySelectorAll('[class*="stageWrapper"]');
    expect(stageWrappers).toHaveLength(0);
  });

  it('handles all stage types in sequence', () => {
    const allTypeStages = [
      { StageName: "Passed", StartTime: "2025-11-01 09:00", Result: "Passed", Message: "Success" },
      { StageName: "Failed", StartTime: "2025-11-01 10:00", Result: "Failed", Message: "Error occurred" },
      { StageName: "Skipped", StartTime: "", Result: "Skipped", Message: "Not needed" },
      { StageName: "Pending", StartTime: "", Result: "Pending", Message: "" },
      { StageName: "Unknown", StartTime: "", Result: "WeirdStatus", Message: "" }
    ];
    const { container } = render(<ProgressStages stages={allTypeStages} />);
    
    expect(container.querySelector('[class*="progressIconPassed"]')).toBeInTheDocument();
    expect(container.querySelector('[class*="progressIconFailed"]')).toBeInTheDocument();
    expect(container.querySelector('[class*="progressIconSkipped"]')).toBeInTheDocument();
    expect(container.querySelector('[class*="progressIconPending"]')).toBeInTheDocument();
    expect(container.querySelector('[class*="progressIconUnknown"]')).toBeInTheDocument();
  });

  it('renders multiple tooltips independently', () => {
    const { container } = render(<ProgressStages stages={mockStages} />);
    const tooltips = container.querySelectorAll('[class*="tooltip"]');
    expect(tooltips.length).toBeGreaterThan(0);
  });
}
```
