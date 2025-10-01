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
