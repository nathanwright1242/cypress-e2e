```css
/* Card container styling */
.tile-content {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin: 16px;
  border: 1px solid #e0e0e0;
  max-width: 400px;
}

/* Header styling */
.tile-content h4 {
  color: #333333;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 24px 0;
  text-align: center;
  letter-spacing: 0.5px;
}

/* Contact section styling */
.tile-content p {
  margin: 0 0 16px 0;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  line-height: 1.5;
}

.tile-content p:last-child {
  margin-bottom: 0;
}

/* Contact title styling */
.tile-content p b {
  color: #2c3e50;
  font-weight: 500;
  display: block;
  margin-bottom: 8px;
  font-size: 1rem;
}

/* Contact info text */
.tile-content p {
  color: #555555;
  font-size: 0.9rem;
}

/* Clean typography */
.tile-content {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Responsive design */
@media (max-width: 768px) {
  .tile-content {
    margin: 12px;
    padding: 20px;
    max-width: 100%;
  }
  
  .tile-content h4 {
    font-size: 1.1rem;
  }
}
```

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Service Dashboard</title>
    <style>
        body {
            background: #f5f5f5;
            padding: 20px;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Flex container styling */
        .dashboard-container {
            display: flex;
            gap: 40px;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px 0;
            justify-content: space-between;
        }

        /* Individual metric item */
        .metric-item {
            flex: 1;
            text-align: center;
        }

        /* Metric value styling */
        .metric-value {
            font-size: 2.5rem;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 8px;
            line-height: 1;
        }

        /* Metric label styling */
        .metric-label {
            font-size: 0.9rem;
            color: #666666;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        /* Status indicator for overall status */
        .status-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-left: 8px;
        }

        .status-healthy {
            background-color: #27ae60;
        }

        .status-warning {
            background-color: #f39c12;
        }

        .status-critical {
            background-color: #e74c3c;
        }

        /* Optional separator lines between metrics */
        .metric-item:not(:last-child)::after {
            content: "";
            position: absolute;
            right: -20px;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 60px;
            background-color: #e0e0e0;
        }

        .metric-item {
            position: relative;
        }

        /* Responsive design */
        @media (max-width: 768px) {
            .dashboard-container {
                flex-direction: column;
                gap: 24px;
                text-align: center;
            }
            
            .metric-item::after {
                display: none;
            }
            
            .metric-value {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="dashboard-container">
        <div class="metric-item">
            <div class="metric-value">24</div>
            <div class="metric-label">Services</div>
        </div>
        
        <div class="metric-item">
            <div class="metric-value">18</div>
            <div class="metric-label">Service Level Objectives</div>
        </div>
        
        <div class="metric-item">
            <div class="metric-value">
                Healthy
                <span class="status-indicator status-healthy"></span>
            </div>
            <div class="metric-label">Overall Status</div>
        </div>
    </div>
</body>
</html>
```
