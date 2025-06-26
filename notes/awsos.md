```json
GET your-index-name/_search
{
  "size": 0,
  "aggs": {
    "q1_active_users": {
      "filter": { 
        "range": { 
          "timestamp": { 
            "gte": "2024-01-01", 
            "lt": "2024-04-01" 
          } 
        } 
      },
      "aggs": { 
        "unique_users": { 
          "cardinality": { 
            "field": "userId" 
          } 
        } 
      }
    },
    "q2_active_users": {
      "filter": { 
        "range": { 
          "timestamp": { 
            "gte": "2024-04-01", 
            "lt": "2024-07-01" 
          } 
        } 
      },
      "aggs": { 
        "unique_users": { 
          "cardinality": { 
            "field": "userId" 
          } 
        } 
      }
    }
  }
}
```
