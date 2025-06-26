GET your-index-name/_search
{
  "size": 0,
  "aggs": {
    
    // === USER ADOPTION Q1 ===
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

    // === USER ADOPTION Q2 ===
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

    // === ROLE ADOPTION Q1 ===
    "q1_role_adoption": {
      "filter": {
        "range": {
          "timestamp": {
            "gte": "2025-01-01T00:00:00Z",
            "lt": "2025-04-01T00:00:00Z"
          }
        }
      },
      "aggs": {
        "by_role": {
          "terms": {
            "field": "role.keyword",
            "size": 20
          },
          "aggs": {
            "unique_users": {
              "cardinality": { "field": "userID.keyword" }
            }
          }
        }
      }
    },

    // === ROLE ADOPTION Q2 ===
    "q2_role_adoption": {
      "filter": {
        "range": {
          "timestamp": {
            "gte": "2025-04-01T00:00:00Z",
            "lt": "2025-07-01T00:00:00Z"
          }
        }
      },
      "aggs": {
        "by_role": {
          "terms": {
            "field": "role.keyword",
            "size": 20
          },
          "aggs": {
            "unique_users": {
              "cardinality": { "field": "userID.keyword" }
            }
          }
        }
      }
    },

    // === PAGE POPULARITY Q1 ===
    "q1_page_popularity": {
      "filter": {
        "range": {
          "timestamp": {
            "gte": "2025-01-01T00:00:00Z",
            "lt": "2025-04-01T00:00:00Z"
          }
        }
      },
      "aggs": {
        "top_pages": {
          "terms": {
            "field": "page.keyword",
            "size": 10
          },
          "aggs": {
            "unique_users": {
              "cardinality": { "field": "userID.keyword" }
            }
          }
        }
      }
    },

    // === PAGE POPULARITY Q2 ===
    "q2_page_popularity": {
      "filter": {
        "range": {
          "timestamp": {
            "gte": "2025-04-01T00:00:00Z",
            "lt": "2025-07-01T00:00:00Z"
          }
        }
      },
      "aggs": {
        "top_pages": {
          "terms": {
            "field": "page.keyword",
            "size": 10
          },
          "aggs": {
            "unique_users": {
              "cardinality": { "field": "userID.keyword" }
            }
          }
        }
      }
    },

    // === WEEKLY TRENDS (Both Quarters) ===
    "weekly_trends": {
      "filter": {
        "range": {
          "timestamp": {
            "gte": "2025-01-01T00:00:00Z",
            "lt": "2025-07-01T00:00:00Z"
          }
        }
      },
      "aggs": {
        "by_week": {
          "date_histogram": {
            "field": "timestamp",
            "calendar_interval": "week",
            "format": "yyyy-'W'ww"
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
