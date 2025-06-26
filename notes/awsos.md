```json
GET your-index-name/_search
{
  "size": 0,
  "aggs": {
    
    // === USER ADOPTION COMPARISON ===
    "user_adoption": {
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
            "cardinality": { "field": "userId.keyword" }
          },
          "total_events": {
            "value_count": { "field": "id" }
          }
        }
      },
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
            "cardinality": { "field": "userId.keyword" }
          },
          "total_events": {
            "value_count": { "field": "id" }
          }
        }
      }
    },

    // === ROLE-BASED ADOPTION ===
    "role_adoption_comparison": {
      "q1_by_role": {
        "filter": {
          "range": {
            "timestamp": {
              "gte": "2025-01-01T00:00:00Z",
              "lt": "2025-04-01T00:00:00Z"
            }
          }
        },
        "aggs": {
          "roles": {
            "terms": {
              "field": "role.keyword",
              "size": 20
            },
            "aggs": {
              "unique_users": {
                "cardinality": { "field": "userId.keyword" }
              },
              "avg_sessions": {
                "avg": {
                  "script": {
                    "source": "doc['id'].size()"
                  }
                }
              }
            }
          }
        }
      },
      "q2_by_role": {
        "filter": {
          "range": {
            "timestamp": {
              "gte": "2025-04-01T00:00:00Z",
              "lt": "2025-07-01T00:00:00Z"
            }
          }
        },
        "aggs": {
          "roles": {
            "terms": {
              "field": "role.keyword",
              "size": 20
            },
            "aggs": {
              "unique_users": {
                "cardinality": { "field": "userId.keyword" }
              }
            }
          }
        }
      }
    },

    // === PAGE POPULARITY COMPARISON ===
    "page_popularity": {
      "q1_pages": {
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
                "cardinality": { "field": "userId.keyword" }
              }
            }
          }
        }
      },
      "q2_pages": {
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
                "cardinality": { "field": "userId.keyword" }
              }
            }
          }
        }
      }
    },

    // === ROUTE/FEATURE ADOPTION ===
    "feature_adoption": {
      "q1_routes": {
        "filter": {
          "range": {
            "timestamp": {
              "gte": "2025-01-01T00:00:00Z",
              "lt": "2025-04-01T00:00:00Z"
            }
          }
        },
        "aggs": {
          "popular_routes": {
            "terms": {
              "field": "route.keyword",
              "size": 15
            }
          }
        }
      },
      "q2_routes": {
        "filter": {
          "range": {
            "timestamp": {
              "gte": "2025-04-01T00:00:00Z",
              "lt": "2025-07-01T00:00:00Z"
            }
          }
        },
        "aggs": {
          "popular_routes": {
            "terms": {
              "field": "route.keyword",
              "size": 15
            }
          }
        }
      }
    },

    // === WEEKLY TRENDS ===
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
              "cardinality": { "field": "userId.keyword" }
            },
            "events": {
              "value_count": { "field": "id" }
            }
          }
        }
      }
    },

    // === VIEW INTERACTION ANALYSIS ===
    "view_analysis": {
      "q1_views": {
        "filter": {
          "range": {
            "timestamp": {
              "gte": "2025-01-01T00:00:00Z",
              "lt": "2025-04-01T00:00:00Z"
            }
          }
        },
        "aggs": {
          "view_usage": {
            "terms": {
              "field": "view.keyword",
              "size": 10
            }
          }
        }
      },
      "q2_views": {
        "filter": {
          "range": {
            "timestamp": {
              "gte": "2025-04-01T00:00:00Z",
              "lt": "2025-07-01T00:00:00Z"
            }
          }
        },
        "aggs": {
          "view_usage": {
            "terms": {
              "field": "view.keyword",
              "size": 10
            }
          }
        }
      }
    },

    // === NEW VS RETURNING USERS ===
    "user_retention": {
      "q1_user_first_seen": {
        "filter": {
          "range": {
            "timestamp": {
              "gte": "2025-01-01T00:00:00Z",
              "lt": "2025-04-01T00:00:00Z"
            }
          }
        },
        "aggs": {
          "users_with_first_event": {
            "terms": {
              "field": "userId.keyword",
              "size": 10000
            },
            "aggs": {
              "first_seen": {
                "min": { "field": "timestamp" }
              }
            }
          }
        }
      }
    }
  }
}
```
