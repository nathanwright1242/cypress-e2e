```bash
#!/bin/bash

# Set your email/name here
YOUR_EMAIL="your.email@company.com"  # Update this with your email
YOUR_NAME="Your Name"  # Update this with your name

echo "=========================================="
echo "COMPREHENSIVE GIT CONTRIBUTION METRICS"
echo "=========================================="

# 1. OVERALL STATISTICS (Last 12 months)
echo -e "\n📊 OVERALL CONTRIBUTION STATS (Last 12 Months)"
echo "-------------------------------------------"
git log --author="$YOUR_EMAIL" --since="1 year ago" --pretty=tformat: --numstat | \
awk '{ add += $1; subs += $2; loc += $1 - $2 } END { 
    printf "Total Lines Added:      %s\n", add
    printf "Total Lines Removed:    %s\n", subs
    printf "Net Lines Contributed:  %s\n", loc 
}'

# 2. COMMIT FREQUENCY
echo -e "\n📈 COMMIT FREQUENCY"
echo "-------------------------------------------"
echo "Last 12 months: $(git rev-list --count --author="$YOUR_EMAIL" --since="1 year ago" HEAD) commits"
echo "Last 6 months:  $(git rev-list --count --author="$YOUR_EMAIL" --since="6 months ago" HEAD) commits"
echo "Last 3 months:  $(git rev-list --count --author="$YOUR_EMAIL" --since="3 months ago" HEAD) commits"
echo "Last month:     $(git rev-list --count --author="$YOUR_EMAIL" --since="1 month ago" HEAD) commits"

# 3. MONTHLY BREAKDOWN (Last 12 months)
echo -e "\n📅 MONTHLY CONTRIBUTION BREAKDOWN"
echo "-------------------------------------------"
for i in {0..11}; do
    month_start=$(date -d "$i months ago" '+%Y-%m-01')
    month_end=$(date -d "$i months ago + 1 month" '+%Y-%m-01')
    month_name=$(date -d "$i months ago" '+%B %Y')
    
    commits=$(git rev-list --count --author="$YOUR_EMAIL" --since="$month_start" --before="$month_end" HEAD 2>/dev/null)
    
    if [ "$commits" -gt 0 ]; then
        stats=$(git log --author="$YOUR_EMAIL" --since="$month_start" --before="$month_end" --pretty=tformat: --numstat | \
        awk '{ add += $1; subs += $2 } END { printf "%d additions, %d deletions", add, subs }')
        echo "$month_name: $commits commits, $stats"
    fi
done

# 4. QUARTERLY BREAKDOWN
echo -e "\n📊 QUARTERLY BREAKDOWN"
echo "-------------------------------------------"
for q in {0..3}; do
    quarter_start=$(date -d "$((q*3)) months ago" '+%Y-%m-%d')
    quarter_end=$(date -d "$((q*3-3)) months ago" '+%Y-%m-%d')
    quarter_num=$((4-q))
    year=$(date -d "$((q*3)) months ago" '+%Y')
    
    if [ $(date -d "$quarter_start" '+%s') -lt $(date '+%s') ]; then
        commits=$(git rev-list --count --author="$YOUR_EMAIL" --since="$quarter_start" --before="$quarter_end" HEAD 2>/dev/null)
        if [ "$commits" -gt 0 ]; then
            echo "Q$quarter_num $year: $commits commits"
        fi
    fi
done

# 5. FILE TYPES MODIFIED (Show expertise areas)
echo -e "\n💻 TOP FILE TYPES MODIFIED (Last 12 months)"
echo "-------------------------------------------"
git log --author="$YOUR_EMAIL" --since="1 year ago" --pretty=format: --name-only | \
    grep -v '^$' | \
    sed 's/.*\.//' | \
    sort | uniq -c | \
    sort -rn | \
    head -10 | \
    awk '{printf "%-15s %s files\n", "."$2":", $1}'

# 6. TOP MODIFIED FILES (Shows ownership/expertise)
echo -e "\n📁 TOP 10 FILES YOU'VE MODIFIED"
echo "-------------------------------------------"
git log --author="$YOUR_EMAIL" --since="1 year ago" --pretty=format: --name-only | \
    grep -v '^$' | \
    sort | uniq -c | \
    sort -rn | \
    head -10 | \
    awk '{printf "%4s changes: %s\n", $1, $2}'

# 7. CONTRIBUTION PATTERNS
echo -e "\n⏰ COMMIT PATTERNS"
echo "-------------------------------------------"
echo "By Day of Week:"
git log --author="$YOUR_EMAIL" --since="1 year ago" --format="%ad" --date=format:"%A" | \
    sort | uniq -c | \
    awk '{printf "  %-10s %s commits\n", $2":", $1}'

echo -e "\nBy Hour of Day (shows work patterns):"
git log --author="$YOUR_EMAIL" --since="1 year ago" --format="%ad" --date=format:"%H" | \
    sort | uniq -c | \
    awk '{printf "  %02d:00-%02d:59  %s commits\n", $2, $2, $1}' | \
    sort

# 8. IMPACT METRICS
echo -e "\n🚀 IMPACT METRICS"
echo "-------------------------------------------"
# Average commits per week (last 12 months)
total_commits=$(git rev-list --count --author="$YOUR_EMAIL" --since="1 year ago" HEAD)
avg_per_week=$(echo "scale=1; $total_commits / 52" | bc)
echo "Average commits per week: $avg_per_week"

# Files touched
total_files=$(git log --author="$YOUR_EMAIL" --since="1 year ago" --pretty=format: --name-only | sort -u | wc -l)
echo "Total unique files modified: $total_files"

# 9. COMPARISON TO TEAM AVERAGE (Optional - shows leadership)
echo -e "\n👥 TEAM COMPARISON (Last 3 months)"
echo "-------------------------------------------"
my_commits=$(git rev-list --count --author="$YOUR_EMAIL" --since="3 months ago" HEAD)
total_commits=$(git rev-list --count --since="3 months ago" HEAD)
total_authors=$(git log --since="3 months ago" --format="%ae" | sort -u | wc -l)

if [ $total_authors -gt 0 ]; then
    avg_commits=$(echo "scale=1; $total_commits / $total_authors" | bc)
    percentage=$(echo "scale=1; ($my_commits * 100) / $total_commits" | bc)
    
    echo "Your commits: $my_commits"
    echo "Team average: $avg_commits"
    echo "Your contribution: $percentage% of total commits"
fi

# 10. RECENT ACTIVITY SUMMARY (Last 30 days - shows current momentum)
echo -e "\n🔥 LAST 30 DAYS ACTIVITY"
echo "-------------------------------------------"
recent_commits=$(git rev-list --count --author="$YOUR_EMAIL" --since="30 days ago" HEAD)
recent_stats=$(git log --author="$YOUR_EMAIL" --since="30 days ago" --pretty=tformat: --numstat | \
    awk '{ add += $1; subs += $2; files += 1 } END { 
        printf "Files: %d, Additions: %d, Deletions: %d", files, add, subs 
    }')
echo "Commits: $recent_commits"
echo "Changes: $recent_stats"

# 11. COLLABORATION METRICS (Shows teamwork)
echo -e "\n🤝 COLLABORATION INDICATORS"
echo "-------------------------------------------"
# Count merge commits (shows integration work)
merge_commits=$(git log --author="$YOUR_EMAIL" --since="1 year ago" --merges --oneline | wc -l)
echo "Merge commits (integration work): $merge_commits"

# Count different branches worked on
branches=$(git log --author="$YOUR_EMAIL" --since="1 year ago" --format="%d" | \
    grep -oE 'origin/[^,)]+' | sort -u | wc -l)
echo "Branches contributed to: $branches"

echo -e "\n=========================================="
echo "END OF METRICS REPORT"
echo "=========================================="
```

```bash
#!/bin/bash

# Git Monthly Commit and Lines of Code Statistics
# Usage: ./git_monthly_stats.sh [author_email] [start_year-month] [end_year-month]
# Example: ./git_monthly_stats.sh "john@example.com" "2024-01" "2025-09"

# Set author (optional - leave empty for all authors)
AUTHOR=${1:-""}
START_MONTH=${2:-"2024-01"}
END_MONTH=${3:-"2025-09"}

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Git Monthly Statistics Report${NC}"
echo "========================================="
echo "Period: $START_MONTH to $END_MONTH"
if [ -n "$AUTHOR" ]; then
    echo "Author: $AUTHOR"
fi
echo "========================================="
echo ""

# Function to get monthly stats using git log directly
get_monthly_stats() {
    local year_month=$1
    local author_filter=""
    
    if [ -n "$AUTHOR" ]; then
        author_filter="--author=$AUTHOR"
    fi
    
    # Get commit count for the month
    local commit_count=$(git log --since="$year_month-01" --until="$year_month-31" $author_filter --format="%H" 2>/dev/null | wc -l | tr -d ' ')
    
    # Get lines added and deleted for the month
    local stats=$(git log --since="$year_month-01" --until="$year_month-31" $author_filter --pretty=tformat: --numstat 2>/dev/null | \
        awk '{added+=$1; deleted+=$2} END {printf "%d\t%d", added, deleted}')
    
    local lines_added=$(echo "$stats" | cut -f1)
    local lines_deleted=$(echo "$stats" | cut -f2)
    
    # Handle empty results
    lines_added=${lines_added:-0}
    lines_deleted=${lines_deleted:-0}
    
    echo "$year_month|$commit_count|$lines_added|$lines_deleted"
}

# Function to format number with commas (portable)
format_number() {
    echo $1 | sed ':a;s/\B[0-9]\{3\}\>/,&/;ta'
}

# Create header
printf "%-12s | %-10s | %-12s | %-12s | %-12s\n" "Month" "Commits" "Lines Added" "Lines Deleted" "Net Change"
printf "%-12s-+-%-10s-+-%-12s-+-%-12s-+-%-12s\n" "------------" "----------" "------------" "------------" "------------"

# Variables for totals
total_commits=0
total_added=0
total_deleted=0
months_processed=0

# Generate list of months to process
current_year=$(echo $START_MONTH | cut -d'-' -f1)
current_month=$(echo $START_MONTH | cut -d'-' -f2 | sed 's/^0*//')
end_year=$(echo $END_MONTH | cut -d'-' -f1)
end_month=$(echo $END_MONTH | cut -d'-' -f2 | sed 's/^0*//')

while [ $current_year -lt $end_year ] || [ $current_year -eq $end_year -a $current_month -le $end_month ]; do
    # Format month with leading zero
    formatted_month=$(printf "%02d" $current_month)
    year_month="$current_year-$formatted_month"
    
    # Get stats for the month
    stats=$(get_monthly_stats "$year_month")
    
    # Parse the stats
    IFS='|' read -r month_label commits added deleted <<< "$stats"
    
    # Calculate net change
    net_change=$((added - deleted))
    
    # Update totals
    total_commits=$((total_commits + commits))
    total_added=$((total_added + added))
    total_deleted=$((total_deleted + deleted))
    
    # Only print if there's activity
    if [ $commits -gt 0 ]; then
        months_processed=$((months_processed + 1))
        
        # Color code the net change
        if [ $net_change -gt 0 ]; then
            net_color=$GREEN
            net_sign="+"
        elif [ $net_change -lt 0 ]; then
            net_color=$RED
            net_sign=""
        else
            net_color=$YELLOW
            net_sign=" "
        fi
        
        printf "%-12s | %-10s | ${GREEN}%-12s${NC} | ${RED}%-12s${NC} | ${net_color}%-12s${NC}\n" \
            "$year_month" \
            "$(format_number $commits)" \
            "+$(format_number $added)" \
            "-$(format_number $deleted)" \
            "${net_sign}$(format_number $net_change)"
    fi
    
    # Move to next month
    current_month=$((current_month + 1))
    if [ $current_month -gt 12 ]; then
        current_month=1
        current_year=$((current_year + 1))
    fi
done

# Calculate total net change
total_net=$((total_added - total_deleted))

# Print summary
echo ""
echo "========================================="
echo -e "${BLUE}SUMMARY${NC}"
echo "========================================="
printf "%-20s: %s\n" "Total Commits" "$(format_number $total_commits)"
printf "%-20s: ${GREEN}+%s${NC}\n" "Total Lines Added" "$(format_number $total_added)"
printf "%-20s: ${RED}-%s${NC}\n" "Total Lines Deleted" "$(format_number $total_deleted)"

if [ $total_net -gt 0 ]; then
    printf "%-20s: ${GREEN}+%s${NC}\n" "Net Lines Changed" "$(format_number $total_net)"
elif [ $total_net -lt 0 ]; then
    printf "%-20s: ${RED}%s${NC}\n" "Net Lines Changed" "$(format_number $total_net)"
else
    printf "%-20s: ${YELLOW}%s${NC}\n" "Net Lines Changed" "$(format_number $total_net)"
fi

# Calculate averages
if [ $months_processed -gt 0 ]; then
    avg_commits=$((total_commits / months_processed))
    avg_added=$((total_added / months_processed))
    avg_deleted=$((total_deleted / months_processed))
    
    echo ""
    echo "Average per active month ($months_processed months with activity):"
    printf "  %-18s: %s\n" "Commits" "$(format_number $avg_commits)"
    printf "  %-18s: %s\n" "Lines Added" "$(format_number $avg_added)"
    printf "  %-18s: %s\n" "Lines Deleted" "$(format_number $avg_deleted)"
fi

# CSV Export Option
echo ""
echo "========================================="
echo -n "Export to CSV? (y/n): "
read export_csv
if [ "$export_csv" = "y" ] || [ "$export_csv" = "Y" ]; then
    csv_file="git_stats_$(date +%Y%m%d_%H%M%S).csv"
    echo "Month,Commits,Lines Added,Lines Deleted,Net Change" > "$csv_file"
    
    # Re-run the loop for CSV export
    current_year=$(echo $START_MONTH | cut -d'-' -f1)
    current_month=$(echo $START_MONTH | cut -d'-' -f2 | sed 's/^0*//')
    
    while [ $current_year -lt $end_year ] || [ $current_year -eq $end_year -a $current_month -le $end_month ]; do
        formatted_month=$(printf "%02d" $current_month)
        year_month="$current_year-$formatted_month"
        
        stats=$(get_monthly_stats "$year_month")
        IFS='|' read -r _ commits added deleted <<< "$stats"
        
        if [ $commits -gt 0 ]; then
            net_change=$((added - deleted))
            echo "$year_month,$commits,$added,$deleted,$net_change" >> "$csv_file"
        fi
        
        current_month=$((current_month + 1))
        if [ $current_month -gt 12 ]; then
            current_month=1
            current_year=$((current_year + 1))
        fi
    done
    
    echo -e "${GREEN}Data exported to $csv_file${NC}"
fi
```

```bash
# Get all commits grouped by month in the date range
git log --author="<author>" --since="2024-01-01" --until="2025-09-30" \
  --pretty=format:"%cd" --date=format:"%Y-%m" | 
  sort | uniq -c | 
  while read count month; do
    echo -n "$month: $count commits, "
    git log --author="<author>" \
      --since="$month-01" --until="$month-31" \
      --numstat --format="" | 
      awk '{add+=$1; del+=$2} END {printf "+%d -%d lines\n", add, del}'
  done
```
