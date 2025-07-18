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
