/* ==========================================================================
   PORTFOLIO INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientGlow();
  initScrollReveal();
  initConsoleSimulator();
  initLivePing();
  initLiveTelemetry();
  initInteractiveShell();
  printDevConsoleWelcome();
});

/* ==========================================================================
   2. AMBIENT GLOW EFFECT
   ========================================================================== */
function initAmbientGlow() {
  const glow = document.getElementById('glow');
  if (!glow) return;

  window.addEventListener('mousemove', (e) => {
    // Position glow behind cursor
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

/* ==========================================================================
   3. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once animated, no need to observe again
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Triggers slightly before entry
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   4. CONSOLE PREVIEW SIMULATOR
   ========================================================================== */
const projectData = {
  secureorder: {
    title: "secureorder_seq.log",
    lang: "go",
    desc: "Distributed MEV protection layer built with a 5-node Raft consensus cluster in Go & C++, sustaining 3,000+ RPS with sub-12ms p99 latency to prevent transaction front-running.",
    stats: [
      { label: "Consensus", val: "Raft (5-Node AWS Cluster)" },
      { label: "Throughput", val: "3150 RPS (Sustained)" },
      { label: "Avg Latency", val: "8.4ms (p95)", accent: true },
      { label: "MEV Mitigation", val: "FIFO Sequencing (99.8%)" },
      { label: "Crypto Layer", val: "ECDSA + Solidity Escrow" }
    ],
    diagram: 
`[Client] ──gRPC──> [Sequencer (FIFO)]
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
     [Node 01] ◄──Raft──► [Node 02] ◄──Raft──► [Node 03]
     (Leader)            (Follower)          (Follower)`,
    logs: [
      "sys.init: loading config from /etc/secureorder/config.yaml",
      "raft.cluster: term 4 established, 5 peers online",
      "mempool.sequencer: transaction sequencer started on port :50051",
      "raft.leader: broadcasting heartbeat; rtt = 1.4ms",
      "mempool: queued transaction tx_0x8f2a... fee = 4.2 gwei",
      "sequencer: ordering batch #10482 (250 txs) in 0.8ms",
      "escrow.sol: verifying state changes on-chain...",
      "metric.throughput: 3142 RPS | CPU: 42.1% | Mem: 1.2GB"
    ]
  },
  swarm: {
    title: "swarm_coordinator.log",
    lang: "go",
    desc: "Resource-aware distributed task execution engine using a 2D Quadtree spatial index (O(log N) pruning) for capacity-based container matchmaking without OOM crashes, achieving 570µs latency at 1M tasks.",
    stats: [
      { label: "Engine Type", val: "Capacity-Aware Work Stealing" },
      { label: "Spatial Index", val: "2D Spatial Quadtree (CPU x RAM)" },
      { label: "Matchmaking RTT", val: "570µs @ 1M tasks (O(log N))", accent: true },
      { label: "Horizontal Scale", val: "5.6x Speedup (5 Coordinators)" },
      { label: "Sandboxing", val: "Docker SDK + Cgroups Limits" }
    ],
    diagram:
`[Client] ──HTTP/gRPC──> [Coordinator Pool (Quadtree Index)]
                                      │
           ┌──────────────────────────┼──────────────────────────┐
           ▼                          ▼                          ▼
[Worker 01 (Docker Engine)]  [Worker 02 (Docker Engine)]  [Worker 03 (Docker Engine)]
 (cgroup Sandboxed Task)      (Capacity Headroom Poll)    (Work Stealing Poller)`,
    logs: [
      "sys.init: quadtree spatial index initialized (CPU x RAM plane)",
      "coordinator.pool: 5 coordinator nodes bound, listening on :8081",
      "worker.telemetry: monitoring host cgroup capacity headroom",
      "matchmaker.quadtree: spatial query for required (0.5 CPU, 52MB RAM)",
      "matchmaker.dispatch: matched task python-math-pi in 48.2µs (K=50 nearest)",
      "worker.executor: spinning up container python:3.9-alpine with cgroups",
      "executor.stream: Real Pi value: 3.141592653589793",
      "metric.cluster: 1,000,000 tasks queued | E2E latency: 571.9µs | 5.6x cluster speedup"
    ]
  },
  tablingtime: {
    title: "tabling_time_solver.conf",
    lang: "nodejs",
    desc: "University course scheduling engine powering 2,000+ students and 180 courses, leveraging a backtracking Greedy Constraint Satisfaction (CSP) algorithm to reduce admin planning time from 15 hours to 3 minutes.",
    stats: [
      { label: "Engine Type", val: "Greedy CSP (Backtracking)" },
      { label: "Capacity", val: "2000+ Students, 180 Courses" },
      { label: "Compute RTT", val: "184ms (Slashing admin hours)", accent: true },
      { label: "Backend API", val: "Node.js (Express)" },
      { label: "Database", val: "MongoDB (Compound Indexes)" }
    ],
    diagram:
`[Admin Dashboard] ──REST API──> [Express Router]
                                       │
     ┌─────────────────────────────────┘
     ▼
[Greedy CSP Solver] ◄──Indexes──► [MongoDB Grid]
(180 conflict edges resolved in memory)`,
    logs: [
      "api.server: listening on port 8080 (production mode)",
      "csp.engine: compiling constraints for cohort 2026",
      "csp.engine: active constraints = 142, conflict edges = 320",
      "csp.solver: search depth = 42, branch-and-bound activated",
      "csp.solver: slot assigned -> CS-301 (Algorithms) to Lab 3",
      "csp.solver: forward-checking pruned 14 branches",
      "csp.success: schedule compiled in 184.2ms. 0 conflicts.",
      "db.mongodb: write operation complete (1480 slot documents)"
    ]
  },
  trafficlights: {
    title: "urban_traffic_sim.py",
    lang: "python",
    desc: "Complex network traffic simulator using OpenStreetMap APIs, NetworkX graph modeling, and a dynamic backpressure phase algorithm to boost vehicle flow by +24% across 4 global metropolitan cities.",
    stats: [
      { label: "Network Graph", val: "NetworkX / OpenStreetMap API" },
      { label: "Optimization", val: "Dynamic Phase Control" },
      { label: "Flow Boost", val: "+24% Avg Flow Rate vs Baseline", accent: true },
      { label: "Baselines", val: "Static Timer, Backpressure" },
      { label: "Simulation", val: "SUMO Integration Layer" }
    ],
    diagram:
`[OSM Map API] ──GeoJSON──> [Road Network Graph (NetworkX)]
                                        │
      ┌─────────────────────────────────┘
      ▼
[Simulator Core] ◄──Dynamic Phase Weights──► [SUMO Engine]
(Average queue length reduced by 34.2s/vehicle)`,
    logs: [
      "osm.api: fetching street network for Munich, Germany",
      "networkx: graph parsed (1420 nodes, 3110 directed edges)",
      "sim.core: initializing vehicle spawn generators (Poisson λ=0.8)",
      "algo.backpressure: computing pressure queue gradients",
      "algo.dynamic: adjusting phase timers on Node #302",
      "sim.telemetry: active vehicles = 840, avg speed = 42.4 km/h",
      "metrics: phase cycle optimization finished",
      "metrics: delay = -34.2s | flow improvement = +24.1%"
    ]
  }
};

let currentActiveProject = 'secureorder';
let currentlyShowingProject = '';
let logTimeoutIds = [];

function initConsoleSimulator() {
  const projectItems = document.querySelectorAll('.project-item');
  const projectList = document.querySelector('.project-list');
  
  if (!projectItems.length) return;

  // Track page scrolling to ignore false-positive mouse hove events
  let isScrolling = false;
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    isScrolling = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 150);
  }, { passive: true });

  // Render initial project
  renderConsoleData('secureorder');

  projectItems.forEach(item => {
    const projectId = item.getAttribute('data-project');
    
    // Hover events
    item.addEventListener('mouseenter', () => {
      if (isScrolling) return;
      renderConsoleData(projectId);
    });

    // Click events (persists selection)
    item.addEventListener('click', () => {
      projectItems.forEach(pi => pi.classList.remove('active'));
      item.classList.add('active');
      currentActiveProject = projectId;
      renderConsoleData(projectId, true);
    });
  });

  // Intercept GitHub link clicks to stop parent item selection triggers
  const gitIcons = document.querySelectorAll('.project-git-icon');
  gitIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  // Restore active project console on leaving list
  if (projectList) {
    projectList.addEventListener('mouseleave', () => {
      if (isScrolling) return;
      renderConsoleData(currentActiveProject);
    });
  }
}

function renderConsoleData(projectId, force = false) {
  if (currentlyShowingProject === projectId && !force) return;

  const data = projectData[projectId];
  if (!data) return;

  currentlyShowingProject = projectId;

  // Clear any active log printing timeouts
  logTimeoutIds.forEach(id => clearTimeout(id));
  logTimeoutIds = [];

  // Update Headers
  document.getElementById('consoleTitle').textContent = data.title;
  document.getElementById('consoleLang').textContent = data.lang;

  // Generate body structure
  const body = document.getElementById('consoleBody');
  body.innerHTML = '';

  // 0. Overview / Description Section
  if (data.desc) {
    const overviewTitle = document.createElement('span');
    overviewTitle.className = 'console-section-title';
    overviewTitle.textContent = `// PROJECT OVERVIEW`;
    body.appendChild(overviewTitle);

    const overviewDesc = document.createElement('p');
    overviewDesc.className = 'console-overview-desc';
    overviewDesc.style.cssText = 'color: var(--text-secondary); font-size: 0.82rem; line-height: 1.45; margin-bottom: 1.25rem; font-family: var(--font-mono); font-weight: 400;';
    overviewDesc.textContent = data.desc;
    body.appendChild(overviewDesc);
  }

  // 1. Stats Title
  const statsTitle = document.createElement('span');
  statsTitle.className = 'console-section-title';
  statsTitle.textContent = `// SYSTEM STATE CONFIGURATION`;
  body.appendChild(statsTitle);

  // 2. Stats list
  data.stats.forEach(stat => {
    const row = document.createElement('div');
    row.className = 'console-stat-row';
    row.innerHTML = `
      <span class="stat-label">${stat.label}:</span>
      <span class="stat-val ${stat.accent ? 'accent' : ''}">${stat.val}</span>
    `;
    body.appendChild(row);
  });

  // 3. Diagram Section
  const diagTitle = document.createElement('span');
  diagTitle.className = 'console-section-title';
  diagTitle.style.marginTop = '1.5rem';
  diagTitle.textContent = `// ARCHITECTURE SCHEMATIC`;
  body.appendChild(diagTitle);

  const diagram = document.createElement('pre');
  diagram.className = 'console-diagram';
  diagram.textContent = data.diagram;
  body.appendChild(diagram);

  // 4. Logs Section
  const logTitle = document.createElement('span');
  logTitle.className = 'console-section-title';
  logTitle.textContent = `// STDOUT STREAM`;
  body.appendChild(logTitle);

  const logArea = document.createElement('div');
  logArea.className = 'console-log-area';
  body.appendChild(logArea);

  // Typewriter effect for log output lines
  data.logs.forEach((logText, index) => {
    const timeoutId = setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'log-line';
      
      // Format timestamps and tags for realism
      const timestamp = new Date().toISOString().split('T')[1].substring(0, 8);
      let formattedText = logText;
      let logType = 'info';

      if (logText.includes('sys.init') || logText.includes('api.server') || logText.includes('osm.api')) {
        logType = 'init';
      } else if (logText.includes('metric') || logText.includes('success')) {
        logType = 'ok';
      }

      const typeTag = logType === 'ok' ? '[SUCCESS]' : logType === 'init' ? '[SYSTEM]' : '[STREAM]';

      line.innerHTML = `
        <span class="timestamp">${timestamp}</span>
        <span class="tag" style="color: ${logType === 'ok' ? '#10b981' : logType === 'init' ? 'var(--accent)' : 'var(--text-muted)'}">${typeTag}</span>
        <span class="text">${formattedText}</span>
      `;
      
      logArea.appendChild(line);
      
      // Auto scroll console as logs print
      body.scrollTop = body.scrollHeight;
    }, index * 180); // Speed of logs printing (180ms per line)
    
    logTimeoutIds.push(timeoutId);
  });
}

/* ==========================================================================
   5. LIVE LATENCY / RTT SIMULATION
   ========================================================================== */
function initLivePing() {
  const pingDisplay = document.getElementById('pingDisplay');
  if (!pingDisplay) return;

  const endpoints = ['aws.ap-south-1', 'gcp.asia-south1', 'db.local'];
  
  function updatePing() {
    const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
    const baseLatency = endpoint.includes('local') ? 0.4 : endpoint.includes('aws') ? 34 : 45;
    const jitter = (Math.random() * 4 - 2).toFixed(1); // Small jitter
    const latency = (parseFloat(baseLatency) + parseFloat(jitter)).toFixed(1);
    
    pingDisplay.textContent = `rtt to ${endpoint}: ${latency}ms`;
    
    // Poll every 4-8 seconds randomly to feel natural
    setTimeout(updatePing, 4000 + Math.random() * 4000);
  }
  
  updatePing();
}

/* ==========================================================================
   6. DEVELOPER CONSOLE EASTER EGG
   ========================================================================== */
function printDevConsoleWelcome() {
  const styles = [
    'background: #050505',
    'border: 1px solid #00f0ff',
    'color: #00f0ff',
    'padding: 10px 15px',
    'font-family: monospace',
    'font-size: 14px',
    'border-radius: 4px',
    'text-shadow: 0 0 5px rgba(0,240,255,0.3)'
  ].join(';');

  console.log('%c>_ Welcoming other engineers. Source code available at: https://github.com/drumilbhati', styles);
  console.log('Nice to meet you! If you are checking this out, feel free to drop an email at drumilbhati5@gmail.com.');
}

/* ==========================================================================
   7. LIVE COMPETITIVE PROGRAMMING TELEMETRY SCRAPER
   ========================================================================== */
function initLiveTelemetry() {
  const lcRatingEl = document.getElementById('lc-rating');
  const lcMetricEl = document.getElementById('lc-solved-metric');

  const cfRatingEl = document.getElementById('cf-rating');
  const ccRatingEl = document.getElementById('cc-rating');
  const acRatingEl = document.getElementById('ac-rating');

  // 1. Fetch LeetCode Solved Count for Hero Metric
  fetch('https://leetcode-api-faisalshohag.vercel.app/drumilbhati')
    .then(res => {
      if (!res.ok) throw new Error('LeetCode Solved API error');
      return res.json();
    })
    .then(data => {
      const solved = data.matchedUserStats.acSubmissionNum[0].count;
      if (solved) {
        // LeetCode Solved + 1399 (Other platforms) = Total solved
        const totalSolved = solved + 1399;
        lcMetricEl.textContent = `${totalSolved}+`;
      } else {
        throw new Error('Data empty');
      }
    })
    .catch(() => {
      lcMetricEl.textContent = '2743+';
    });

  // 2. Fetch LeetCode Contest Rating for Telemetry Bar
  fetch('https://alfa-leetcode-api.onrender.com/drumilbhati/contest')
    .then(res => {
      if (!res.ok) throw new Error('LeetCode Rating API error');
      return res.json();
    })
    .then(data => {
      if (data.contestRating) {
        const rating = Math.round(data.contestRating);
        const badge = rating >= 1900 ? ' (Knight)' : '';
        lcRatingEl.textContent = `${rating}${badge}`;
      } else {
        throw new Error('Rating data empty');
      }
    })
    .catch(() => {
      lcRatingEl.textContent = '2000 (Knight)';
    });

  // 3. Fetch Codeforces Data (Using official API)
  fetch('https://codeforces.com/api/user.info?handles=Drumil')
    .then(res => {
      if (!res.ok) throw new Error('Network error');
      return res.json();
    })
    .then(data => {
      if (data.status === 'OK' && data.result.length > 0) {
        const user = data.result[0];
        cfRatingEl.textContent = `${user.rating} (${capitalize(user.rank)})`;
      } else {
        throw new Error('API response status not OK');
      }
    })
    .catch(() => {
      cfRatingEl.textContent = `1285 (Pupil)`;
    });

  // 4. Fetch CodeChef Data (Via AllOrigins CORS Proxy to scrape profile)
  fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.codechef.com/users/drumilbhati'))
    .then(res => {
      if (!res.ok) throw new Error('Proxy down');
      return res.json();
    })
    .then(data => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, 'text/html');
      const ratingEl = doc.querySelector('.rating-number');
      const starEl = doc.querySelector('.rating-header');
      if (ratingEl) {
        const rating = ratingEl.textContent.trim();
        let stars = '';
        if (starEl) {
          const starsMatch = starEl.textContent.match(/\d★/);
          stars = starsMatch ? ` (${starsMatch[0]})` : '';
        }
        ccRatingEl.textContent = `${rating}${stars}`;
      } else {
        throw new Error('Scraping parse error');
      }
    })
    .catch(() => {
      ccRatingEl.textContent = `1611 (3★)`;
    });

  // 5. Fetch AtCoder Data (Via AllOrigins CORS Proxy to scrape profile)
  fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://atcoder.jp/users/DrumilBhati'))
    .then(res => {
      if (!res.ok) throw new Error('Proxy down');
      return res.json();
    })
    .then(data => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, 'text/html');
      const rows = Array.from(doc.querySelectorAll('table.dl-table tr'));
      const ratingRow = rows.find(r => r.querySelector('th') && r.querySelector('th').textContent.includes('Rating'));
      if (ratingRow) {
        const rating = ratingRow.querySelector('td span').textContent.trim();
        const h3 = doc.querySelector('h3 b');
        const kyu = h3 ? ` (${h3.textContent.trim()})` : '';
        acRatingEl.textContent = `${rating}${kyu}`;
      } else {
        throw new Error('Scraping parse error');
      }
    })
    .catch(() => {
      acRatingEl.textContent = `814 (6 Kyu)`;
    });
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ==========================================================================
   8. INTERACTIVE SHELL EASTER EGG
   ========================================================================== */
function initInteractiveShell() {
  const shellInput = document.getElementById('terminal-input');
  const shellHistory = document.getElementById('terminal-history');
  const shellBody = document.getElementById('shell-body');

  if (!shellInput || !shellHistory || !shellBody) return;

  shellInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = shellInput.value.trim();
      const rawCommand = shellInput.value;
      shellInput.value = '';

      // Print command in history
      const commandLine = document.createElement('div');
      commandLine.style.color = 'var(--text-primary)';
      commandLine.style.marginTop = '0.5rem';
      commandLine.innerHTML = `<span style="color: var(--accent); font-weight: bold;">guest@drumil.dev:~$</span> ${escapeHTML(rawCommand)}`;
      shellHistory.appendChild(commandLine);

      if (command === '') {
        scrollToBottom();
        return;
      }

      const output = document.createElement('div');
      output.style.margin = '0.2rem 0 0.6rem 0';
      output.style.lineHeight = '1.4';

      const lowerCmd = command.toLowerCase();

      switch (lowerCmd) {
        case 'help':
          output.innerHTML = 
`Available commands:
  <span style="color: var(--accent);">help</span>                 - Display active session commands
  <span style="color: var(--accent);">about</span>                - Print short background profile
  <span style="color: var(--accent);">ls [dir]</span>             - List files in current namespace
  <span style="color: var(--accent);">swarm</span>                - Inspect Swarm distributed task engine
  <span style="color: var(--accent);">secureorder</span>          - Inspect SecureOrder Raft consensus engine
  <span style="color: var(--accent);">tablingtime</span>          - Inspect TablingTime CSP solver engine
  <span style="color: var(--accent);">trafficlights</span>        - Inspect Urban Traffic Light simulator
  <span style="color: var(--accent);">cat &lt;file&gt;</span>            - View file content (e.g. 'cat projects/swarm')
  <span style="color: var(--accent);">cat resume.txt</span>       - Open PDF resume
  <span style="color: var(--accent);">clear</span>                - Clear shell screen`;
          break;
        case 'about':
          output.innerHTML = `Drumil Bhati — Backend & Distributed Systems Engineer. Final-year CS student at Ahmedabad University. Specialized in high-throughput backends, Raft consensus, 2D Quadtree spatial scheduling, and scalable APIs in Go and C++.`;
          break;
        case 'ls':
        case 'ls .':
          output.innerHTML = `resume.txt   projects/   skills.json   infrastructure.yaml`;
          break;
        case 'ls projects':
        case 'ls projects/':
          output.innerHTML = `secureorder.log   swarm.log   tablingtime.conf   trafficlights.py`;
          break;
        case 'swarm':
        case 'cat swarm':
        case 'cat swarm.log':
        case 'cat projects/swarm':
        case 'cat projects/swarm.log':
          output.innerHTML = 
`<span style="color: var(--accent); font-weight: bold;">[PROJECT: Swarm - Resource-Aware Distributed Task Execution Engine]</span>
Tech: Go / Docker SDK / 2D Spatial Quadtree / HTTP
Description: Resource-aware task execution framework using 2D spatial quadtree indexing (O(log N) pruning) for capacity-based container matchmaking without OOM crashes.
Metrics: 570µs E2E latency @ 1,000,000 tasks | 5.6x speedup (5 Coordinators)
GitHub: <a href="https://github.com/drumilbhati/swarm" target="_blank" style="color: var(--accent); text-decoration: underline;">https://github.com/drumilbhati/swarm</a>`;
          break;
        case 'secureorder':
        case 'cat secureorder':
        case 'cat secureorder.log':
        case 'cat projects/secureorder':
        case 'cat projects/secureorder_seq.log':
          output.innerHTML = 
`<span style="color: var(--accent); font-weight: bold;">[PROJECT: SecureOrder - Blockchain MEV Protection Engine]</span>
Tech: Go / C++ / Solidity / gRPC / Raft / AWS
Description: Distributed transaction sequencer implementing a 5-node Raft consensus cluster on AWS to prevent MEV front-running attacks.
Metrics: 3000+ RPS sustained | p99 < 12ms latency
GitHub: <a href="https://github.com/drumilbhati/secureorder" target="_blank" style="color: var(--accent); text-decoration: underline;">https://github.com/drumilbhati/secureorder</a>`;
          break;
        case 'tablingtime':
        case 'cat tablingtime':
        case 'cat tablingtime.conf':
        case 'cat projects/tablingtime':
        case 'cat projects/tabling_time_solver.conf':
          output.innerHTML = 
`<span style="color: var(--accent); font-weight: bold;">[PROJECT: TablingTime Ecosystem - Greedy CSP Scheduler]</span>
Tech: Node.js / Express / MongoDB
Description: University course scheduling engine resolving timetable conflicts for 2000+ students and 180 courses.
Metrics: Reduced planning time from 15 hours to < 3 minutes
GitHub: <a href="https://github.com/drumilbhati/TablingTime-Frontend" target="_blank" style="color: var(--accent); text-decoration: underline;">https://github.com/drumilbhati/TablingTime-Frontend</a>`;
          break;
        case 'trafficlights':
        case 'cat trafficlights':
        case 'cat trafficlights.py':
        case 'cat projects/trafficlights':
        case 'cat projects/urban_traffic_sim.py':
          output.innerHTML = 
`<span style="color: var(--accent); font-weight: bold;">[PROJECT: Urban Traffic Light Scheduler - OSM Graph Optimizer]</span>
Tech: Python / NetworkX / OpenStreetMap / SUMO
Description: Dynamic city traffic simulator outperforming Backpressure models by optimizing phase cycle weights in real time.
Metrics: +24% vehicle flow rate across 4 global cities
GitHub: <a href="https://github.com/drumilbhati/ComplexNetwork" target="_blank" style="color: var(--accent); text-decoration: underline;">https://github.com/drumilbhati/ComplexNetwork</a>`;
          break;
        case 'cat skills.json':
          output.innerHTML = `{\n  "languages": ["Go", "C++", "Java", "TypeScript", "SQL"],\n  "systems": ["Raft Consensus", "2D Spatial Quadtree", "gRPC", "Docker SDK", "TCP Sockets"],\n  "databases": ["Redis", "PostgreSQL", "MongoDB"]\n}`;
          break;
        case 'cat infrastructure.yaml':
          output.innerHTML = `environment: production\ncoordinators:\n  - node_id: 1\n    port: 8081\n  - node_id: 2\n    port: 8082\nworkers:\n  - capacity: "dynamic_cgroup_headroom"\n    container_engine: "docker"`;
          break;
        case 'cat resume.txt':
          output.innerHTML = `Opening resume.pdf in a new tab...`;
          window.open('https://drive.google.com/file/d/1IPMcJAx50Jo2XJaRMzm3qIi3LbqVGJyf/view?usp=sharing', '_blank');
          break;
        case 'sudo':
          output.style.color = '#ff5f56'; // Red error
          output.innerHTML = `drumil is not in the sudoers file. This incident will be reported.`;
          break;
        case 'clear':
          shellHistory.innerHTML = '';
          scrollToBottom();
          return;
        default:
          output.style.color = '#ff5f56';
          output.innerHTML = `command not found: ${escapeHTML(command)}. Type 'help' for options.`;
          break;
      }

      shellHistory.appendChild(output);
      scrollToBottom();
    }
  });

  // Focus input when clicking terminal container
  const terminalLogContainer = shellBody.closest('.terminal-log-container');
  if (terminalLogContainer) {
    terminalLogContainer.addEventListener('click', () => {
      shellInput.focus();
    });
  }

  function scrollToBottom() {
    shellBody.scrollTop = shellBody.scrollHeight;
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}
