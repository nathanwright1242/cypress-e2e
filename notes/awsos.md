GET your-index-name/_search
{
  "size": 0,
  "aggs": {
    
    // === USER ADOPTION Q4 2024 ===
    "q4_2024_users": {
      "filter": {
        "range": {
          "timestamp": {
            "gte": "2024-10-01T00:00:00Z",
            "lt": "2025-01-01T00:00:00Z"
          }
        }
      },
      "aggs": {
        "unique_users": {
          "cardinality": { "field": "userID.keyword" }
        },
        "total_events": {
          "value_count": { "field": "eventId" }
        }
      }
    },

    // === USER ADOPTION Q1 2025 ===
    "q1_2025_users": {
      "filter": {
        "range": {
          "timestamp": {
            "gte": "2025-01-01T00:00:00Z",
            "lt": "2025-04-01T00:00:00Z"
          }
        }
      },
      "aggs": {
        "unique_users": {
          "cardinality": { "field": "userID.keyword" }
        },
        "total_events": {
          "value_count": { "field": "eventId" }
        }
      }
    },

    // === USER ADOPTION Q2 2025 ===
    "q2_2025_users": {
      "filter": {
        "range": {
          "timestamp": {
            "gte": "2025-04-01T00:00:00Z",
            "lt": "2025-07-01T00:00:00Z"
          }
        }
      },
      "aggs": {
        "unique_users": {
          "cardinality": { "field": "userID.keyword" }
        },
        "total_events": {
          "value_count": { "field": "eventId" }
        }
      }
    },

    // === ALL ROUTES Q4 2024 ===
    "q4_2024_routes": {
      "filter": {
        "range": {
          "timestamp": {
            "gte": "2024-10-01T00:00:00Z",
            "lt": "2025-01-01T00:00:00Z"
          }
        }
      },
      "aggs": {
        "all_routes": {
          "terms": {
            "field": "route.keyword",
            "size": 1000
          },
          "aggs": {
            "unique_users": {
              "cardinality": { "field": "userID.keyword" }
            }
          }
        }
      }
    },

    // === ALL ROUTES Q1 2025 ===
    "q1_2025_routes": {
      "filter": {
        "range": {
          "timestamp": {
            "gte": "2025-01-01T00:00:00Z",
            "lt": "2025-04-01T00:00:00Z"
          }
        }
      },
      "aggs": {
        "all_routes": {
          "terms": {
            "field": "route.keyword",
            "size": 1000
          },
          "aggs": {
            "unique_users": {
              "cardinality": { "field": "userID.keyword" }
            }
          }
        }
      }
    },

    // === ALL ROUTES Q2 2025 ===
    "q2_2025_routes": {
      "filter": {
        "range": {
          "timestamp": {
            "gte": "2025-04-01T00:00:00Z",
            "lt": "2025-07-01T00:00:00Z"
          }
        }
      },
      "aggs": {
        "all_routes": {
          "terms": {
            "field": "route.keyword",
            "size": 1000
          },
          "aggs": {
            "unique_users": {
              "cardinality": { "field": "userID.keyword" }
            }
          }
        }
      }
    },

    // === WEEKLY TRENDS (All 3 Quarters) ===
    "weekly_trends": {
      "filter": {
        "range": {
          "timestamp": {
            "gte": "2024-10-01T00:00:00Z",
            "lt": "2025-07-01T00:00:00Z"
          }
        }
      },
      "aggs": {
        "by_week": {
          "date_histogram": {
            "field": "timestamp",
            "calendar_interval": "1w",
            "format": "yyyy-MM-dd"
          },
          "aggs": {
            "unique_users": {
              "cardinality": { "field": "userID.keyword" }
            },
            "total_events": {
              "value_count": { "field": "eventId" }
            }
          }
        }
      }
    }
  }
}
