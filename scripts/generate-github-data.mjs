/**
 * Script per generare i dati GitHub e salvarli in public/github-data.json
 * Eseguire con: node scripts/generate-github-data.mjs
 * oppure come parte del build: npm run build
 */

import { writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");
const OUTPUT_FILE = join(PUBLIC_DIR, "github-data.json");

// Read GitHub token from .env file
let GITHUB_TOKEN = "";
try {
  const envFile = readFileSync(join(__dirname, "..", ".env"), "utf-8");
  const match = envFile.match(/GITHUB_TOKEN=([^\s]+)/);
  if (match) {
    GITHUB_TOKEN = match[1];
  }
} catch (e) {
  // Ignore if .env not found
}

const REPO_OWNER = "Magnetarman";
const REPO_NAME = "WinToolkit";

const headers = {
  Accept: "application/vnd.github.v3+json",
};
if (GITHUB_TOKEN) {
  headers.Authorization = `token ${GITHUB_TOKEN}`;
}

async function fetchJSON(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.error(`Errore fetch ${url}: ${res.status}`);
    return null;
  }
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.error(`Errore fetch ${url}: ${res.status}`);
    return null;
  }
  return res.text();
}

async function generateGitHubData() {
  console.log("🔄 Generazione dati GitHub...");

  try {
    // Fetch all PRs (open + closed) for the count
    const [repo, allPrs, prs, issues, mainScript, devScript] =
      await Promise.all([
        fetchJSON(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`),
        fetchJSON(
          `https://api.github.com/search/issues?q=repo:${REPO_OWNER}/${REPO_NAME}+is:pr`,
        ),
        fetchJSON(
          `https://api.github.com/search/issues?q=repo:${REPO_OWNER}/${REPO_NAME}+is:pr+state:open`,
        ),
        fetchJSON(
          `https://api.github.com/search/issues?q=repo:${REPO_OWNER}/${REPO_NAME}+is:issue+state:open`,
        ),
        fetchText(
          `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/refs/heads/main/WinToolkit.ps1`,
        ),
        fetchText(
          `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/refs/heads/Dev/WinToolkit.ps1`,
        ),
      ]);

    // Extract versions
    let mainVersion = "v1.0.0";
    if (mainScript) {
      const match = mainScript.match(/\$ToolkitVersion\s*=\s*"([^"]+)"/);
      if (match && match[1]) mainVersion = match[1];
    }

    let devVersion = "latest";
    if (devScript) {
      const match = devScript.match(/\$ToolkitVersion\s*=\s*"([^"]+)"/);
      if (match && match[1]) devVersion = match[1];
    }

    // Fetch commit data for main branch
    let mainCommits = { total: 0, weekly: [], lastCommit: undefined };
    try {
      let allMainCommits = [];
      let page = 1;
      let hasMore = true;

      while (hasMore && page <= 10) {
        const mainCommitsRes = await fetchJSON(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?sha=main&per_page=100&page=${page}`,
        );
        if (mainCommitsRes && mainCommitsRes.length > 0) {
          allMainCommits = [...allMainCommits, ...mainCommitsRes];
          page++;
        } else {
          hasMore = false;
        }
      }

      mainCommits.total = allMainCommits.length;

      // Get the last commit date (most recent)
      if (allMainCommits.length > 0) {
        const lastCommitDate = allMainCommits[0]?.commit?.author?.date;
        if (lastCommitDate) {
          mainCommits.lastCommit = lastCommitDate;
        }
      }

      // Calculate exactly 24 weeks of data
      const weeklyMap = new Map();
      const today = new Date();
      const currentWeekStart = new Date(today);
      currentWeekStart.setDate(today.getDate() - today.getDay());
      currentWeekStart.setHours(0, 0, 0, 0);

      for (let i = 23; i >= 0; i--) {
        const week = new Date(currentWeekStart);
        week.setDate(currentWeekStart.getDate() - i * 7);
        const weekKey = week.toISOString().split("T")[0];
        weeklyMap.set(weekKey, 0);
      }

      for (const commit of allMainCommits) {
        const dateStr = commit.commit?.author?.date;
        if (dateStr) {
          const date = new Date(dateStr);
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          weekStart.setHours(0, 0, 0, 0);
          const weekKey = weekStart.toISOString().split("T")[0];

          if (weeklyMap.has(weekKey)) {
            weeklyMap.set(weekKey, weeklyMap.get(weekKey) + 1);
          }
        }
      }

      const weeklyData = [];
      weeklyMap.forEach((count, date) => {
        weeklyData.push({ date, count });
      });

      mainCommits.weekly = weeklyData.sort((a, b) =>
        a.date.localeCompare(b.date),
      );
    } catch (e) {
      console.error("Errore fetching main commits:", e.message);
    }

    // Fetch commit data for dev branch
    let devCommits = { total: 0, weekly: [], lastCommit: undefined };
    try {
      let allDevCommits = [];
      let page = 1;
      let hasMore = true;

      while (hasMore && page <= 50) {
        const devCommitsRes = await fetchJSON(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?sha=Dev&per_page=100&page=${page}`,
        );
        if (devCommitsRes && devCommitsRes.length > 0) {
          allDevCommits = [...allDevCommits, ...devCommitsRes];
          page++;
        } else {
          hasMore = false;
        }
      }

      devCommits.total = allDevCommits.length;

      // Get the last commit date (most recent)
      if (allDevCommits.length > 0) {
        const lastCommitDate = allDevCommits[0]?.commit?.author?.date;
        if (lastCommitDate) {
          devCommits.lastCommit = lastCommitDate;
        }
      }

      const devWeeklyMap = new Map();
      const today = new Date();
      const currentWeekStart = new Date(today);
      currentWeekStart.setDate(today.getDate() - today.getDay());
      currentWeekStart.setHours(0, 0, 0, 0);

      for (let i = 23; i >= 0; i--) {
        const week = new Date(currentWeekStart);
        week.setDate(currentWeekStart.getDate() - i * 7);
        const weekKey = week.toISOString().split("T")[0];
        devWeeklyMap.set(weekKey, 0);
      }

      for (const commit of allDevCommits) {
        const dateStr = commit.commit?.author?.date;
        if (dateStr) {
          const date = new Date(dateStr);
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          weekStart.setHours(0, 0, 0, 0);
          const weekKey = weekStart.toISOString().split("T")[0];

          if (devWeeklyMap.has(weekKey)) {
            devWeeklyMap.set(weekKey, devWeeklyMap.get(weekKey) + 1);
          }
        }
      }

      const devWeeklyData = [];
      devWeeklyMap.forEach((count, date) => {
        devWeeklyData.push({ date, count });
      });

      devCommits.weekly = devWeeklyData.sort((a, b) =>
        a.date.localeCompare(b.date),
      );
    } catch (e) {
      console.error("Errore fetching dev commits:", e.message);
    }

    // Fetch contributors - get from both main and Dev branches
    let contributors = [];
    try {
      // First try getting contributors from main branch
      let contribRes = await fetchJSON(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=100`,
      );

      // Also get contributors from Dev branch by looking at recent commits
      const devCommitsForContributors = await fetchJSON(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?sha=Dev&per_page=100&page=1`,
      );

      const uniqueUsers = new Map();

      // Add contributors from main branch
      if (contribRes) {
        contribRes.forEach((user) => {
          if (user && user.login) {
            uniqueUsers.set(user.login, {
              login: user.login,
              avatar_url: user.avatar_url,
              html_url: user.html_url,
              contributions: user.contributions || 0,
              prs: 0,
              issues: 0,
            });
          }
        });
      }

      // Add contributors from Dev branch commits
      if (devCommitsForContributors) {
        for (const commit of devCommitsForContributors) {
          const author = commit.author;
          if (author && author.login && !uniqueUsers.has(author.login)) {
            uniqueUsers.set(author.login, {
              login: author.login,
              avatar_url: author.avatar_url,
              html_url: author.html_url,
              contributions: 0, // Will be updated from main if available
              prs: 0,
              issues: 0,
            });
          }
        }
      }

      // Get PRs count by user
      const prSearchRes = await fetchJSON(
        `https://api.github.com/search/issues?q=repo:${REPO_OWNER}/${REPO_NAME}+is:pr+state:closed`,
      );

      if (prSearchRes && prSearchRes.items) {
        const prCountByUser = new Map();
        prSearchRes.items.forEach((item) => {
          const user = item.user;
          if (user && user.login) {
            prCountByUser.set(
              user.login,
              (prCountByUser.get(user.login) || 0) + 1,
            );
          }
        });

        prCountByUser.forEach((count, login) => {
          if (uniqueUsers.has(login)) {
            uniqueUsers.get(login).prs = count;
          }
        });
      }

      // Get issues count by user
      const issuesSearchRes = await fetchJSON(
        `https://api.github.com/search/issues?q=repo:${REPO_OWNER}/${REPO_NAME}+is:issue+state:closed`,
      );

      if (issuesSearchRes && issuesSearchRes.items) {
        const issueCountByUser = new Map();
        issuesSearchRes.items.forEach((item) => {
          const user = item.user;
          if (user && user.login) {
            issueCountByUser.set(
              user.login,
              (issueCountByUser.get(user.login) || 0) + 1,
            );
          }
        });

        issueCountByUser.forEach((count, login) => {
          if (uniqueUsers.has(login)) {
            uniqueUsers.get(login).issues = count;
          }
        });
      }

      const allUsers = Array.from(uniqueUsers.values());

      if (allUsers.length > 0) {
        // Get open issues count for top contributors
        const contribsWithDetails = await Promise.all(
          allUsers.slice(0, 15).map(async (contributor) => {
            let contributorOpenIssues = 0;
            try {
              const openIssuesRes = await fetchJSON(
                `https://api.github.com/search/issues?q=repo:${REPO_OWNER}/${REPO_NAME}+author:${contributor.login}+is:issue+state:open`,
              );
              if (openIssuesRes) {
                contributorOpenIssues = openIssuesRes.total_count || 0;
              }
            } catch {
              // Ignore
            }
            return {
              ...contributor,
              issues: contributor.issues + contributorOpenIssues,
            };
          }),
        );

        contributors = contribsWithDetails.sort(
          (a, b) =>
            b.contributions +
            b.prs +
            b.issues -
            (a.contributions + a.prs + a.issues),
        );
      }
    } catch (e) {
      console.error("Errore fetching contributors:", e.message);
    }

    // Build the final data object
    const data = {
      timestamp: Date.now(),
      data: {
        stars: repo?.stargazers_count ?? 0,
        openIssues: issues?.total_count ?? 0,
        mainVersion,
        devVersion,
        pullRequests: prs?.total_count ?? 0,
        mainCommits: mainCommits.total > 0 ? mainCommits : undefined,
        devCommits: devCommits.total > 0 ? devCommits : undefined,
        contributors: contributors.length > 0 ? contributors : undefined,
      },
    };

    // Write to file
    writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), "utf-8");

    console.log("✅ Dati GitHub generati con successo!");
    console.log(`   - Stelle: ${data.data.stars}`);
    console.log(`   - Main commits: ${mainCommits.total}`);
    console.log(`   - Dev commits: ${devCommits.total}`);
    console.log(`   - Contributori: ${contributors.length}`);
    console.log(`   - File: ${OUTPUT_FILE}`);
  } catch (error) {
    console.error("❌ Errore durante la generazione dei dati:", error.message);
    process.exit(1);
  }
}

generateGitHubData();
