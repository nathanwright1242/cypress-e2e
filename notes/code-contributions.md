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
# Usage: ./git_monthly_stats.sh [author_email] [start_date] [end_date]
# Example: ./git_monthly_stats.sh "john@example.com" "2023-01-01" "2024-12-31"

# Set author (optional - leave empty for all authors)
AUTHOR=${1:-""}
START_DATE=${2:-"2020-01-01"}
END_DATE=${3:-$(date +%Y-%m-%d)}

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Git Monthly Statistics Report${NC}"
echo "========================================="
echo "Period: $START_DATE to $END_DATE"
if [ -n "$AUTHOR" ]; then
    echo "Author: $AUTHOR"
fi
echo "========================================="
echo ""

# Function to get monthly stats
get_monthly_stats() {
    local year=$1
    local month=$2
    local author_filter=""
    
    if [ -n "$AUTHOR" ]; then
        author_filter="--author=$AUTHOR"
    fi
    
    # Calculate start and end dates for the month
    local month_start="$year-$month-01"
    local next_month=$((10#$month + 1))
    local next_year=$year
    
    if [ $next_month -gt 12 ]; then
        next_month=1
        next_year=$((year + 1))
    fi
    
    local month_end=$(printf "%04d-%02d-01" $next_year $next_month)
    
    # Get commit count for the month
    local commit_count=$(git rev-list --count --since="$month_start" --before="$month_end" $author_filter HEAD 2>/dev/null || echo 0)
    
    # Get lines added and deleted for the month
    local stats=$(git log --since="$month_start" --before="$month_end" $author_filter --pretty=tformat: --numstat 2>/dev/null | \
        awk '{added+=$1; deleted+=$2} END {printf "%d\t%d", added, deleted}')
    
    local lines_added=$(echo "$stats" | cut -f1)
    local lines_deleted=$(echo "$stats" | cut -f2)
    
    # Handle empty results
    lines_added=${lines_added:-0}
    lines_deleted=${lines_deleted:-0}
    
    echo "$year-$month|$commit_count|$lines_added|$lines_deleted"
}

# Function to format number with commas
format_number() {
    printf "%'d" $1
}

# Create header
printf "%-10s | %-10s | %-12s | %-12s | %-12s\n" "Month" "Commits" "Lines Added" "Lines Deleted" "Net Change"
printf "%-10s-+-%-10s-+-%-12s-+-%-12s-+-%-12s\n" "----------" "----------" "------------" "------------" "------------"

# Variables for totals
total_commits=0
total_added=0
total_deleted=0

# Process each month
current_date="$START_DATE"
while [ "$current_date" \< "$END_DATE" ] || [ "$current_date" = "$END_DATE" ]; do
    year=$(date -d "$current_date" +%Y)
    month=$(date -d "$current_date" +%m)
    month_name=$(date -d "$current_date" +%b)
    
    # Get stats for the month
    stats=$(get_monthly_stats $year $month)
    
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
        
        printf "%-10s | %-10s | ${GREEN}%-12s${NC} | ${RED}%-12s${NC} | ${net_color}%-12s${NC}\n" \
            "$month_name $year" \
            "$(format_number $commits)" \
            "+$(format_number $added)" \
            "-$(format_number $deleted)" \
            "${net_sign}$(format_number $net_change)"
    fi
    
    # Move to next month
    current_date=$(date -d "$current_date + 1 month" +%Y-%m-01)
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

# Calculate average per month (only for months with activity)
months_with_activity=$(git log --since="$START_DATE" --before="$END_DATE" $author_filter --pretty=format:"%Y-%m" 2>/dev/null | sort -u | wc -l)
if [ $months_with_activity -gt 0 ]; then
    avg_commits=$((total_commits / months_with_activity))
    avg_added=$((total_added / months_with_activity))
    avg_deleted=$((total_deleted / months_with_activity))
    
    echo ""
    echo "Average per active month:"
    printf "  %-18s: %s\n" "Commits" "$(format_number $avg_commits)"
    printf "  %-18s: %s\n" "Lines Added" "$(format_number $avg_added)"
    printf "  %-18s: %s\n" "Lines Deleted" "$(format_number $avg_deleted)"
fi

# CSV Export Option
echo ""
echo "========================================="
read -p "Export to CSV? (y/n): " export_csv
if [ "$export_csv" = "y" ] || [ "$export_csv" = "Y" ]; then
    csv_file="git_stats_$(date +%Y%m%d_%H%M%S).csv"
    echo "Month,Commits,Lines Added,Lines Deleted,Net Change" > "$csv_file"
    
    # Re-run the loop for CSV export
    current_date="$START_DATE"
    while [ "$current_date" \< "$END_DATE" ] || [ "$current_date" = "$END_DATE" ]; do
        year=$(date -d "$current_date" +%Y)
        month=$(date -d "$current_date" +%m)
        month_label="$year-$month"
        
        stats=$(get_monthly_stats $year $month)
        IFS='|' read -r _ commits added deleted <<< "$stats"
        
        if [ $commits -gt 0 ]; then
            net_change=$((added - deleted))
            echo "$month_label,$commits,$added,$deleted,$net_change" >> "$csv_file"
        fi
        
        current_date=$(date -d "$current_date + 1 month" +%Y-%m-01)
    done
    
    echo -e "${GREEN}Data exported to $csv_file${NC}"
fi
```
