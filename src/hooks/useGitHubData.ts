import { useEffect, useState } from "react";
import type { RepoData, CommitData, Contributor } from "../types";
import { fallbackData } from "../types";
import {
  readCache,
  writeCache,
  clearCache,
  CACHE_TTL_MS,
  DAILY_REFRESH_TTL_MS,
  isCacheExpired,
} from "../utils/cache";

const REPO_OWNER = "Magnetarman";
const REPO_NAME = "WinToolkit";

export function useGitHubData() {
  const [data, setData] = useState<RepoData>(fallbackData);

  useEffect(() => {
    let isMounted = true;

    const fetchDataIncremental = async () => {
      // Fetch only data that might have changed (repository, PRs, issues)
      const [repoRes, prsRes, issuesRes, mainScriptRes, devScriptRes] =
        await Promise.all([
          fetch("https://api.github.com/repos/Magnetarman/WinToolkit"),
          fetch(
            "https://api.github.com/search/issues?q=repo:Magnetarman/WinToolkit+is:pr+state:open",
          ),
          fetch(
            "https://api.github.com/search/issues?q=repo:Magnetarman/WinToolkit+is:issue+state:open",
          ),
          fetch(
            "https://raw.githubusercontent.com/Magnetarman/WinToolkit/refs/heads/main/WinToolkit.ps1",
          ),
          fetch(
            "https://raw.githubusercontent.com/Magnetarman/WinToolkit/refs/heads/Dev/WinToolkit.ps1",
          ),
        ]);

      const repo = repoRes.ok ? await repoRes.json() : null;
      const prs = prsRes.ok ? await prsRes.json() : null;
      const issues = issuesRes.ok ? await issuesRes.json() : null;

      let mainVersion = "v1.0.0";
      if (mainScriptRes.ok) {
        const text = await mainScriptRes.text();
        const match = text.match(/\$ToolkitVersion\s*=\s*"([^"]+)"/);
        if (match && match[1]) mainVersion = match[1];
      }

      let devVersion = "latest";
      if (devScriptRes.ok) {
        const text = await devScriptRes.text();
        const match = text.match(/\$ToolkitVersion\s*=\s*"([^"]+)"/);
        if (match && match[1]) devVersion = match[1];
      }

      // Update only the data that might have changed
      const freshData = {
        stars: repo?.stargazers_count ?? 0,
        openIssues: issues?.total_count ?? 0,
        mainVersion,
        devVersion,
        pullRequests: prs?.total_count ?? 0,
      };

      // Merge with existing data to preserve commit data
      const cached = readCache();
      const mergedData = { ...cached?.data, ...freshData };

      writeCache(mergedData);

      if (isMounted) {
        setData((prev) => ({
          ...prev,
          ...freshData,
          loading: false,
          error: !repoRes.ok,
        }));
      }
    };

    const fetchDataFull = async () => {
      // Clear cache to force fresh data
      clearCache();

      // Fetch repository data, PRs, and actual issues (not PRs)
      const [repoRes, prsRes, issuesRes, mainScriptRes, devScriptRes] =
        await Promise.all([
          fetch("https://api.github.com/repos/Magnetarman/WinToolkit"),
          fetch(
            "https://api.github.com/search/issues?q=repo:Magnetarman/WinToolkit+is:pr+state:open",
          ),
          fetch(
            "https://api.github.com/search/issues?q=repo:Magnetarman/WinToolkit+is:issue+state:open",
          ),
          fetch(
            "https://raw.githubusercontent.com/Magnetarman/WinToolkit/refs/heads/main/WinToolkit.ps1",
          ),
          fetch(
            "https://raw.githubusercontent.com/Magnetarman/WinToolkit/refs/heads/Dev/WinToolkit.ps1",
          ),
        ]);

      try {
        const repo = repoRes.ok ? await repoRes.json() : null;
        const prs = prsRes.ok ? await prsRes.json() : null;
        const issues = issuesRes.ok ? await issuesRes.json() : null;

        let mainVersion = "v1.0.0";
        if (mainScriptRes.ok) {
          const text = await mainScriptRes.text();
          const match = text.match(/\$ToolkitVersion\s*=\s*"([^"]+)"/);
          if (match && match[1]) mainVersion = match[1];
        }

        let devVersion = "latest";
        if (devScriptRes.ok) {
          const text = await devScriptRes.text();
          const match = text.match(/\$ToolkitVersion\s*=\s*"([^"]+)"/);
          if (match && match[1]) devVersion = match[1];
        }

        // Fetch commit data for main branch
        let mainCommits: CommitData = { total: 0, weekly: [] };
        try {
          // Fetch multiple pages to get more commits
          let allMainCommits: any[] = [];
          let page = 1;
          let hasMore = true;

          while (hasMore && page <= 10) {
            const mainCommitsRes = await fetch(
              `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?sha=main&per_page=100&page=${page}`,
            );
            if (mainCommitsRes.ok) {
              const commits = await mainCommitsRes.json();
              if (commits.length > 0) {
                allMainCommits = [...allMainCommits, ...commits];
                page++;
              } else {
                hasMore = false;
              }
            } else {
              hasMore = false;
            }
          }

          mainCommits.total = allMainCommits.length;

          // Calculate exactly 24 weeks of data (last 24 weeks from today)
          const weeklyData: { date: string; count: number }[] = [];
          const weeklyMap = new Map<string, number>();

          // Get today's date and calculate 24 weeks back
          const today = new Date();
          const currentWeekStart = new Date(today);
          currentWeekStart.setDate(today.getDate() - today.getDay());
          currentWeekStart.setHours(0, 0, 0, 0);

          // Create 24 weeks of data starting from 23 weeks ago to today
          for (let i = 23; i >= 0; i--) {
            const week = new Date(currentWeekStart);
            week.setDate(currentWeekStart.getDate() - i * 7);
            const weekKey: string = week.toISOString().split("T")[0] ?? "";
            weeklyMap.set(weekKey, 0);
          }

          // Count commits for each week
          for (const commit of allMainCommits) {
            const dateStr = commit.commit?.author?.date;
            if (dateStr) {
              const date = new Date(dateStr);
              const weekStart = new Date(date);
              weekStart.setDate(date.getDate() - date.getDay());
              weekStart.setHours(0, 0, 0, 0);
              const weekKey: string =
                weekStart.toISOString().split("T")[0] ?? "";

              // Only count if the week is within our 24-week range
              if (weeklyMap.has(weekKey)) {
                weeklyMap.set(weekKey, weeklyMap.get(weekKey)! + 1);
              }
            }
          }

          // Convert to array and sort by date (oldest first)
          weeklyMap.forEach((count, date) => {
            weeklyData.push({ date, count });
          });

          mainCommits.weekly = weeklyData.sort((a, b) =>
            a.date.localeCompare(b.date),
          );
        } catch {
          // Ignore commit fetch errors
        }

        // Fetch commit data for dev branch
        let devCommits: CommitData = { total: 0, weekly: [] };
        try {
          // Fetch multiple pages to get all commits
          let allDevCommits: any[] = [];
          let page = 1;
          let hasMore = true;

          while (hasMore && page <= 15) {
            // Max 15 pages = 1500 commits
            const devCommitsRes = await fetch(
              `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?sha=Dev&per_page=100&page=${page}`,
            );
            if (devCommitsRes.ok) {
              const commits = await devCommitsRes.json();
              if (commits.length > 0) {
                allDevCommits = [...allDevCommits, ...commits];
                page++;
              } else {
                hasMore = false;
              }
            } else {
              hasMore = false;
            }
          }

          devCommits.total = allDevCommits.length;

          // Calculate exactly 24 weeks of data (last 24 weeks from today)
          const devWeeklyData: { date: string; count: number }[] = [];
          const devWeeklyMap = new Map<string, number>();

          // Get today's date and calculate 24 weeks back
          const today = new Date();
          const currentWeekStart = new Date(today);
          currentWeekStart.setDate(today.getDate() - today.getDay());
          currentWeekStart.setHours(0, 0, 0, 0);

          // Create 24 weeks of data starting from 23 weeks ago to today
          for (let i = 23; i >= 0; i--) {
            const week = new Date(currentWeekStart);
            week.setDate(currentWeekStart.getDate() - i * 7);
            const weekKey: string = week.toISOString().split("T")[0] ?? "";
            devWeeklyMap.set(weekKey, 0);
          }

          // Count commits for each week
          for (const commit of allDevCommits) {
            const dateStr = commit.commit?.author?.date;
            if (dateStr) {
              const date = new Date(dateStr);
              const weekStart = new Date(date);
              weekStart.setDate(date.getDate() - date.getDay());
              weekStart.setHours(0, 0, 0, 0);
              const weekKey: string =
                weekStart.toISOString().split("T")[0] ?? "";

              // Only count if the week is within our 24-week range
              if (devWeeklyMap.has(weekKey)) {
                devWeeklyMap.set(weekKey, devWeeklyMap.get(weekKey)! + 1);
              }
            }
          }

          // Convert to array and sort by date (oldest first)
          devWeeklyMap.forEach((count, date) => {
            devWeeklyData.push({ date, count });
          });

          devCommits.weekly = devWeeklyData.sort((a, b) =>
            a.date.localeCompare(b.date),
          );
        } catch {
          // Ignore commit fetch errors
        }

        // Fetch contributors with PR and issue counts (more accurate method)
        let contributors: Contributor[] = [];
        try {
          // First get all contributors with their commit counts
          const contribRes = await fetch(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=100`,
          );

          const uniqueUsers = new Map<string, any>();

          if (contribRes.ok) {
            const contribsData = await contribRes.json();
            contribsData.forEach((user: any) => {
              if (user && user.login) {
                uniqueUsers.set(user.login, {
                  login: user.login,
                  avatar_url: user.avatar_url,
                  html_url: user.html_url,
                  contributions: user.contributions || 0, // This is commit count
                  prs: 0,
                  issues: 0,
                });
              }
            });
          }

          // Get all PRs to count them by user
          const prSearchRes = await fetch(
            `https://api.github.com/search/issues?q=repo:${REPO_OWNER}/${REPO_NAME}+is:pr+state:closed`,
          );

          if (prSearchRes.ok) {
            const prSearchData = await prSearchRes.json();
            const prCountByUser = new Map<string, number>();

            if (prSearchData.items) {
              prSearchData.items.forEach((item: any) => {
                const user = item.user;
                if (user && user.login) {
                  const currentCount = prCountByUser.get(user.login) || 0;
                  prCountByUser.set(user.login, currentCount + 1);
                }
              });
            }

            // Update users with their PR counts
            prCountByUser.forEach((count, login) => {
              if (uniqueUsers.has(login)) {
                uniqueUsers.get(login).prs = count;
              } else {
                // Get avatar from first PR item if available
                const prItem = prSearchData.items?.find(
                  (i: any) => i.user?.login === login,
                );
                uniqueUsers.set(login, {
                  login,
                  avatar_url:
                    prItem?.user?.avatar_url ||
                    `https://github.com/${login}.png`,
                  html_url: `https://github.com/${login}`,
                  contributions: 0,
                  prs: count,
                  issues: 0,
                });
              }
            });
          }

          // Get all issues to count them by user
          const issuesSearchRes = await fetch(
            `https://api.github.com/search/issues?q=repo:${REPO_OWNER}/${REPO_NAME}+is:issue+state:closed`,
          );

          if (issuesSearchRes.ok) {
            const issuesSearchData = await issuesSearchRes.json();
            const issueCountByUser = new Map<string, number>();

            if (issuesSearchData.items) {
              issuesSearchData.items.forEach((item: any) => {
                const user = item.user;
                if (user && user.login) {
                  const currentCount = issueCountByUser.get(user.login) || 0;
                  issueCountByUser.set(user.login, currentCount + 1);
                }
              });
            }

            // Update users with their issue counts
            issueCountByUser.forEach((count, login) => {
              if (uniqueUsers.has(login)) {
                uniqueUsers.get(login).issues = count;
              } else {
                // Get avatar from first issue item if available
                const issueItem = issuesSearchData.items?.find(
                  (i: any) => i.user?.login === login,
                );
                uniqueUsers.set(login, {
                  login,
                  avatar_url:
                    issueItem?.user?.avatar_url ||
                    `https://github.com/${login}.png`,
                  html_url: `https://github.com/${login}`,
                  contributions: 0,
                  prs: 0,
                  issues: count,
                });
              }
            });
          }

          const allUsers = Array.from(uniqueUsers.values());

          if (allUsers.length > 0) {
            // For top contributors, also fetch their open issues count
            const contribsWithDetails = await Promise.all(
              allUsers.slice(0, 15).map(async (contributor: any) => {
                let contributorOpenIssues = 0;
                try {
                  const openIssuesRes = await fetch(
                    `https://api.github.com/search/issues?q=repo:${REPO_OWNER}/${REPO_NAME}+author:${contributor.login}+is:issue+state:open`,
                  );
                  if (openIssuesRes.ok) {
                    const openIssuesData = await openIssuesRes.json();
                    contributorOpenIssues = openIssuesData.total_count || 0;
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

            // Sort by total engagement (commits + PRs + issues), descending
            contributors = contribsWithDetails.sort(
              (a, b) =>
                b.contributions +
                b.prs +
                b.issues -
                (a.contributions + a.prs + a.issues),
            );
          }
        } catch {
          // Ignore contributors fetch errors
        }

        // Improved error handling and data validation
        const freshData = {
          stars: repo?.stargazers_count ?? 0,
          openIssues: issues?.total_count ?? 0,
          mainVersion,
          devVersion,
          pullRequests: prs?.total_count ?? 0,
          mainCommits: mainCommits.total > 0 ? mainCommits : undefined,
          devCommits: devCommits.total > 0 ? devCommits : undefined,
          contributors: contributors.length > 0 ? contributors : undefined,
        };

        writeCache(freshData);

        if (isMounted) {
          setData({ ...freshData, loading: false, error: !repoRes.ok });
        }
      } catch {
        if (isMounted) {
          setData((prev) => ({ ...prev, loading: false, error: true }));
        }
      }
    };

    const initializeData = async () => {
      const cached = readCache();

      if (cached) {
        // Check if we need to do a daily full refresh
        if (isCacheExpired(cached, DAILY_REFRESH_TTL_MS)) {
          fetchDataFull();
        } else {
          // Use cached data initially
          setData({ ...cached.data, loading: false, error: false });
        }
      } else {
        // No cache, fetch full data
        fetchDataFull();
      }
    };

    initializeData();

    // Ricarica incrementale ogni ora se la pagina rimane aperta
    const hourlyInterval = setInterval(() => {
      fetchDataIncremental();
    }, CACHE_TTL_MS);

    // Refresh completo ogni 24 ore
    const dailyInterval = setInterval(() => {
      fetchDataFull();
    }, DAILY_REFRESH_TTL_MS);

    return () => {
      isMounted = false;
      clearInterval(hourlyInterval);
      clearInterval(dailyInterval);
    };
  }, []);

  return data;
}
