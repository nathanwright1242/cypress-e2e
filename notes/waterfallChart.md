```javascript
import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';

interface Task {
  id: number | string;
  name: string;
  start: number;
  end: number;
  type?: string;
  status?: string;
  details?: Record<string, any>;
}

interface WaterfallVisualizationProps {
  tasks: Task[];
  width?: number;
  height?: number;
  timeUnit?: 'ms' | 's';
  showGrid?: boolean;
  colorScheme?: 'duration' | 'type' | 'status';
  onTaskClick?: (task: Task) => void;
}

interface TaskWithMetadata extends Task {
  duration: number;
  index: number;
  overlaps?: string[];
}

interface FilterOptions {
  type?: string;
  minDuration?: number;
  maxDuration?: number;
  search?: string;
}

const WaterfallVisualization: React.FC<WaterfallVisualizationProps> = ({
  tasks,
  width = 1000,
  height = 600,
  timeUnit = 'ms',
  showGrid = true,
  colorScheme = 'duration',
  onTaskClick
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewDomain, setViewDomain] = useState<[number, number] | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskWithMetadata | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [taskTypes, setTaskTypes] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<'index' | 'duration' | 'start'>('index');
  const [searchText, setSearchText] = useState('');
  
  // Helper function to find overlapping tasks
  const findOverlappingTasks = (tasks: Task[]): Record<string, string[]> => {
    const overlaps: Record<string, string[]> = {};
    
    for (let i = 0; i < tasks.length; i++) {
      const taskA = tasks[i];
      const overlappingTasks: string[] = [];
      
      for (let j = 0; j < tasks.length; j++) {
        if (i === j) continue;
        
        const taskB = tasks[j];
        
        // Check if taskB overlaps with taskA
        if (
          (taskB.start >= taskA.start && taskB.start < taskA.end) ||
          (taskB.end > taskA.start && taskB.end <= taskA.end) ||
          (taskB.start <= taskA.start && taskB.end >= taskA.end)
        ) {
          overlappingTasks.push(taskB.id.toString());
        }
      }
      
      if (overlappingTasks.length > 0) {
        overlaps[taskA.id.toString()] = overlappingTasks;
      }
    }
    
    return overlaps;
  };

  // Process tasks with derived data
  const processedTasks = useMemo(() => {
    // Get unique task types
    const types = [...new Set(tasks.filter(t => t.type).map(t => t.type as string))];
    setTaskTypes(types);
    
    // Calculate overlaps
    const overlaps = findOverlappingTasks(tasks);
    
    // Calculate derived data
    return tasks.map((task, index) => ({
      ...task,
      duration: task.end - task.start,
      index,
      overlaps: overlaps[task.id.toString()] || []
    }));
  }, [tasks]);
  
  // Calculate task statistics
  const taskStats = useMemo(() => {
    if (processedTasks.length === 0) return null;
    
    const durations = processedTasks.map(task => task.duration);
    return {
      totalTasks: processedTasks.length,
      totalDuration: Math.max(...processedTasks.map(t => t.end)) - Math.min(...processedTasks.map(t => t.start)),
      averageDuration: durations.reduce((sum, d) => sum + d, 0) / durations.length,
      medianDuration: [...durations].sort((a, b) => a - b)[Math.floor(durations.length / 2)],
      maxDuration: Math.max(...durations),
      minDuration: Math.min(...durations)
    };
  }, [processedTasks]);
  
  // Apply filters to tasks
  const filteredTasks = useMemo(() => {
    return processedTasks.filter(task => {
      // Filter by type
      if (filters.type && task.type !== filters.type) {
        return false;
      }
      
      // Filter by min duration
      if (filters.minDuration !== undefined && task.duration < filters.minDuration) {
        return false;
      }
      
      // Filter by max duration
      if (filters.maxDuration !== undefined && task.duration > filters.maxDuration) {
        return false;
      }
      
      // Filter by search text
      if (filters.search && !task.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [processedTasks, filters]);
  
  // Sort tasks by various criteria
  const sortedTasks = useMemo(() => {
    const tasks = [...filteredTasks];
    
    switch (sortOption) {
      case 'duration':
        return tasks.sort((a, b) => b.duration - a.duration);
      case 'start':
        return tasks.sort((a, b) => a.start - b.start);
      case 'index':
      default:
        return tasks.sort((a, b) => a.index - b.index);
    }
  }, [filteredTasks, sortOption]);
  
  // Get time boundaries
  const timeBoundaries = useMemo(() => {
    if (processedTasks.length === 0) {
      return { earliestTime: 0, latestTime: 1000, totalTimeSpan: 1000 };
    }
    
    const startTimes = processedTasks.map(task => task.start);
    const endTimes = processedTasks.map(task => task.end);
    const earliestTime = Math.min(...startTimes);
    const latestTime = Math.max(...endTimes);
    
    return {
      earliestTime,
      latestTime,
      totalTimeSpan: latestTime - earliestTime
    };
  }, [processedTasks]);
  
  // Initialize view domain if not set
  useEffect(() => {
    if (!viewDomain) {
      // Add 5% padding on each side
      const padding = timeBoundaries.totalTimeSpan * 0.05;
      setViewDomain([
        timeBoundaries.earliestTime - padding, 
        timeBoundaries.latestTime + padding
      ]);
    }
  }, [timeBoundaries, viewDomain]);

  // Reset view to show all tasks
  const resetView = () => {
    const padding = timeBoundaries.totalTimeSpan * 0.05;
    setViewDomain([
      timeBoundaries.earliestTime - padding, 
      timeBoundaries.latestTime + padding
    ]);
  };

  // Handle task type selection
  const handleTypeSelect = (type: string | undefined) => {
    setFilters(prev => ({ ...prev, type }));
  };

  // Handle duration filter
  const handleDurationFilter = (min?: number, max?: number) => {
    setFilters(prev => ({ ...prev, minDuration: min, maxDuration: max }));
  };

  // Handle search
  const handleSearch = () => {
    setFilters(prev => ({ ...prev, search: searchText.trim() ? searchText : undefined }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({});
    setSearchText('');
  };

  // Handle sort change
  const handleSortChange = (option: 'index' | 'duration' | 'start') => {
    setSortOption(option);
  };

  // Handle task click
  const handleTaskClick = (task: TaskWithMetadata) => {
    setSelectedTask(prev => prev?.id === task.id ? null : task);
    if (onTaskClick) {
      onTaskClick(task);
    }
  };

  // D3 rendering
  useEffect(() => {
    if (!svgRef.current || !viewDomain || sortedTasks.length === 0) return;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Define dimensions
    const margin = { top: 40, right: 20, bottom: 50, left: 150 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = Math.min(height - margin.top - margin.bottom, sortedTasks.length * 40 + 20);
    const barHeight = 25;
    const barPadding = 15;
    
    // Create scales
    const xScale = d3.scaleLinear()
      .domain(viewDomain)
      .range([0, innerWidth]);
    
    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', Math.max(height, innerHeight + margin.top + margin.bottom));
    
    // Create a group for the visualization
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Create x-axis
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d => `${d}${timeUnit}`);
    
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .append('text')
      .attr('fill', 'black')
      .attr('x', innerWidth / 2)
      .attr('y', 35)
      .attr('text-anchor', 'middle')
      .text(`Time (${timeUnit})`);
    
    // Add grid lines if enabled
    if (showGrid) {
      g.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(
          d3.axisBottom(xScale)
            .tickSize(-innerHeight)
            .tickFormat(() => '')
        )
        .selectAll('line')
        .attr('stroke', '#e0e0e0');
    }
    
    // Get color scale based on colorScheme
    const getColor = (task: TaskWithMetadata) => {
      switch (colorScheme) {
        case 'type': {
          if (!task.type) return '#999';
          const typeIndex = taskTypes.indexOf(task.type);
          const typeColors = d3.schemeCategory10;
          return typeColors[typeIndex % typeColors.length];
        }
        case 'status': {
          if (!task.status) return '#999';
          switch (task.status) {
            case 'success': return '#4caf50';
            case 'error': return '#f44336';
            case 'warning': return '#ff9800';
            default: return '#999';
          }
        }
        case 'duration':
        default: {
          // Color based on duration percentile (red for longest, blue for shortest)
          const maxDuration = Math.max(...sortedTasks.map(t => t.duration));
          const percentile = task.duration / maxDuration;
          return d3.interpolateRdYlBu(1 - percentile);
        }
      }
    };
    
    // Create a group for each task bar
    const taskGroups = g.selectAll('.task-group')
      .data(sortedTasks)
      .enter()
      .append('g')
      .attr('class', 'task-group')
      .attr('transform', (d, i) => `translate(0,${i * (barHeight + barPadding)})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => handleTaskClick(d));
    
    // Add task name labels
    taskGroups.append('text')
      .attr('x', -10)
      .attr('y', barHeight / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .attr('fill', d => selectedTask?.id === d.id ? '#2196f3' : 'black')
      .style('font-weight', d => selectedTask?.id === d.id ? 'bold' : 'normal')
      .text(d => d.name);
    
    // Add task duration bars
    const bars = taskGroups.append('rect')
      .attr('x', d => Math.max(0, xScale(d.start)))
      .attr('y', 0)
      .attr('width', d => {
        const width = Math.max(2, xScale(d.end) - xScale(d.start));
        // Ensure bar is visible within the current view
        if (d.start > viewDomain[1] || d.end < viewDomain[0]) {
          return 0; // Outside view
        }
        return width;
      })
      .attr('height', barHeight)
      .attr('rx', 3) // Rounded corners
      .attr('fill', d => getColor(d))
      .attr('stroke', d => selectedTask?.id === d.id ? '#2196f3' : '#333')
      .attr('stroke-width', d => selectedTask?.id === d.id ? 2 : 1)
      .on('mouseover', function(event, d) {
        d3.select(this).attr('opacity', 0.8);
      })
      .on('mouseout', function(event, d) {
        d3.select(this).attr('opacity', 1);
      });
    
    // Add task duration labels
    taskGroups.append('text')
      .attr('x', d => xScale(d.start) + (xScale(d.end) - xScale(d.start)) / 2)
      .attr('y', barHeight / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('fill', 'black')
      .style('font-weight', 'bold')
      .style('pointer-events', 'none')
      .text(d => `${d.duration}${timeUnit}`)
      .style('display', d => (xScale(d.end) - xScale(d.start)) < 50 ? 'none' : 'block');
    
    // Add indicator for overlapping tasks
    taskGroups
      .filter(d => d.overlaps && d.overlaps.length > 0)
      .append('circle')
      .attr('cx', -20)
      .attr('cy', barHeight / 2)
      .attr('r', 4)
      .attr('fill', '#ff5722')
      .append('title')
      .text(d => `Overlaps with ${d.overlaps?.length} other tasks`);
    
    // Add task type indicators if available
    taskGroups
      .filter(d => d.type)
      .append('rect')
      .attr('x', -35)
      .attr('y', barHeight / 4)
      .attr('width', 10)
      .attr('height', barHeight / 2)
      .attr('rx', 2)
      .attr('fill', d => {
        if (!d.type) return '#999';
        const typeIndex = taskTypes.indexOf(d.type);
        const typeColors = d3.schemeCategory10;
        return typeColors[typeIndex % typeColors.length];
      })
      .append('title')
      .text(d => `Type: ${d.type}`);
    
    // Add tooltips using title elements
    bars.append('title')
      .text(d => {
        let tooltip = `${d.name}\nStart: ${d.start}${timeUnit}\nEnd: ${d.end}${timeUnit}\nDuration: ${d.duration}${timeUnit}`;
        if (d.type) tooltip += `\nType: ${d.type}`;
        if (d.status) tooltip += `\nStatus: ${d.status}`;
        if (d.overlaps && d.overlaps.length > 0) {
          tooltip += `\nOverlaps with ${d.overlaps.length} other tasks`;
        }
        return tooltip;
      });
    
    // Add panning functionality
    const zoom = d3.zoom()
      .scaleExtent([0.5, 20]) // Allow more zoom levels
      .translateExtent([[-Infinity, -100], [Infinity, innerHeight + 100]])
      .on('zoom', (event) => {
        // Update the x scale with the new domain
        const newXScale = event.transform.rescaleX(xScale);
        
        // Update the x-axis
        g.select('g').call(xAxis.scale(newXScale));
        
        // Update the position and width of the bars
        taskGroups.selectAll('rect:not(:last-child)')
          .attr('x', d => newXScale(d.start))
          .attr('width', d => Math.max(2, newXScale(d.end) - newXScale(d.start)));
        
        // Update the position of the duration labels
        taskGroups.selectAll('text:not(:first-child):not(:last-child)')
          .attr('x', d => newXScale(d.start) + (newXScale(d.end) - newXScale(d.start)) / 2)
          .style('display', d => (newXScale(d.end) - newXScale(d.start)) < 50 ? 'none' : 'block');
        
        // Update the grid if enabled
        if (showGrid) {
          g.select('.grid').call(
            d3.axisBottom(newXScale)
              .tickSize(-innerHeight)
              .tickFormat(() => '')
          );
        }
        
        // Update the view domain state
        setViewDomain(newXScale.domain() as [number, number]);
      });
    
    // Apply zoom behavior to SVG
    svg.call(zoom as any);
    
  }, [
    sortedTasks, width, height, viewDomain, colorScheme, 
    showGrid, timeUnit, taskTypes, selectedTask
  ]);

  // If no tasks, show empty state
  if (tasks.length === 0) {
    return (
      <div className="waterfall-container p-4">
        <h2 className="text-xl font-bold">Execution Waterfall Chart</h2>
        <div className="bg-gray-100 p-8 mt-4 text-center rounded">
          <p>No tasks to display. Add tasks to see the waterfall visualization.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="waterfall-container p-4 bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Execution Waterfall Chart</h2>
        <div className="flex space-x-2">
          <button 
            onClick={resetView}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reset View
          </button>
        </div>
      </div>
      
      {/* Controls section */}
      <div className="controls my-4 p-4 bg-gray-50 rounded">
        <div className="flex flex-wrap gap-4">
          {/* Type filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Task Type</label>
            <select 
              value={filters.type || ''}
              onChange={e => handleTypeSelect(e.target.value === '' ? undefined : e.target.value)}
              className="p-2 border rounded w-40"
            >
              <option value="">All Types</option>
              {taskTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          {/* Duration filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Min Duration ({timeUnit})</label>
            <input 
              type="number" 
              value={filters.minDuration || ''}
              onChange={e => handleDurationFilter(
                e.target.value ? Number(e.target.value) : undefined, 
                filters.maxDuration
              )}
              className="p-2 border rounded w-32"
              placeholder="Min duration"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Max Duration ({timeUnit})</label>
            <input 
              type="number" 
              value={filters.maxDuration || ''}
              onChange={e => handleDurationFilter(
                filters.minDuration, 
                e.target.value ? Number(e.target.value) : undefined
              )}
              className="p-2 border rounded w-32"
              placeholder="Max duration"
            />
          </div>
          
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-1">Search Tasks</label>
            <div className="flex">
              <input 
                type="text" 
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSearch()}
                className="p-2 border rounded-l w-40"
                placeholder="Task name"
              />
              <button 
                onClick={handleSearch}
                className="px-3 py-2 bg-gray-200 rounded-r hover:bg-gray-300"
              >
                Search
              </button>
            </div>
          </div>
          
          {/* Sort options */}
          <div>
            <label className="block text-sm font-medium mb-1">Sort By</label>
            <select 
              value={sortOption}
              onChange={e => handleSortChange(e.target.value as any)}
              className="p-2 border rounded w-40"
            >
              <option value="index">Original Order</option>
              <option value="duration">Duration (longest first)</option>
              <option value="start">Start Time</option>
            </select>
          </div>
          
          {/* Clear filters */}
          <div className="flex items-end">
            <button 
              onClick={clearFilters}
              className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Clear Filters
            </button>
          </div>
        </div>
        
        {/* Stats */}
        {taskStats && (
          <div className="stats mt-4 grid grid-cols-4 gap-4 text-sm">
            <div className="bg-blue-50 p-2 rounded">
              <div className="font-medium">Total Tasks</div>
              <div>{filteredTasks.length} / {tasks.length}</div>
            </div>
            <div className="bg-green-50 p-2 rounded">
              <div className="font-medium">Avg Duration</div>
              <div>{Math.round(taskStats.averageDuration)}{timeUnit}</div>
            </div>
            <div className="bg-yellow-50 p-2 rounded">
              <div className="font-medium">Max Duration</div>
              <div>{taskStats.maxDuration}{timeUnit}</div>
            </div>
            <div className="bg-purple-50 p-2 rounded">
              <div className="font-medium">Total Time Span</div>
              <div>{taskStats.totalDuration}{timeUnit}</div>
            </div>
          </div>
        )}
        
        <div className="text-sm text-gray-500 mt-2">
          <p>Pan: Click and drag | Zoom: Use mouse wheel</p>
        </div>
      </div>
      
      {/* Task details panel when a task is selected */}
      {selectedTask && (
        <div className="task-details my-2 p-4 bg-blue-50 rounded border border-blue-200">
          <h3 className="font-bold">{selectedTask.name}</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <div className="text-sm text-gray-500">Start Time</div>
              <div>{selectedTask.start}{timeUnit}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">End Time</div>
              <div>{selectedTask.end}{timeUnit}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Duration</div>
              <div className="font-medium">{selectedTask.duration}{timeUnit}</div>
            </div>
            {selectedTask.type && (
              <div>
                <div className="text-sm text-gray-500">Type</div>
                <div>{selectedTask.type}</div>
              </div>
            )}
          </div>
          
          {selectedTask.overlaps && selectedTask.overlaps.length > 0 && (
            <div className="mt-2">
              <div className="text-sm text-gray-500">Overlapping Tasks</div>
              <div className="text-sm bg-white p-2 rounded mt-1">
                {selectedTask.overlaps.map(id => {
                  const task = processedTasks.find(t => t.id.toString() === id);
                  return task ? (
                    <div key={id} className="mb-1">
                      {task.name} ({task.duration}{timeUnit})
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
          
          {selectedTask.details && Object.keys(selectedTask.details).length > 0 && (
            <div className="mt-2">
              <div className="text-sm text-gray-500">Details</div>
              <div className="text-sm bg-white p-2 rounded mt-1">
                {Object.entries(selectedTask.details).map(([key, value]) => (
                  <div key={key} className="mb-1">
                    <span className="font-medium">{key}:</span> {JSON.stringify(value)}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <button 
            onClick={() => setSelectedTask(null)} 
            className="mt-4 px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
          >
            Close Details
          </button>
        </div>
      )}
      
      {/* Main visualization SVG */}
      <div className="visualization-container overflow-auto border border-gray-200 rounded">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

// Sample demo component with some test data
const WaterfallDemo: React.FC = () => {
  const sampleTasks: Task[] = [
    { id: 1, name: "Initialize App", start: 0, end: 200, type: "initialization" },
    { id: 2, name: "Load Config", start: 50, end: 120, type: "initialization" },
    { id: 3, name: "Connect to API", start: 150, end: 480, type: "network", status: "success" },
    { id: 4, name: "Fetch User Data", start: 220, end: 350, type: "network", status: "success" },
    { id: 5, name: "Process Results", start: 380, end: 550, type: "processing" },
    { id: 6, name: "Render UI", start: 500, end: 720, type: "rendering" },
    { id: 7, name: "Load Images", start: 550, end: 900, type: "network", status: "warning" },
    { id: 8, name: "Initialize Analytics", start: 300, end: 420, type: "initialization" },
    { id: 9, name: "Run Background Tasks", start: 600, end: 1200, type: "background" },
    { id: 10, name: "API Call Retry", start: 400, end: 430, type: "network", status: "error" },
    { id: 11, name: "Database Query", start: 320, end: 390, type: "database" },
    { id: 12, name: "Cache Update", start: 510, end: 530, type: "cache" }
  ];

  return (
    <div className="container mx-auto p-4">
      <WaterfallVisualization 
        tasks={sampleTasks} 
        colorScheme="type"
        timeUnit="ms"
        showGrid={true}
      />
    </div>
  );
};

export default WaterfallDemo;
```
