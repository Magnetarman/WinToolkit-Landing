export interface CommitData {
  total: number;
  weekly: { count: number; date: string }[];
}

export interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  prs: number;
  issues: number;
}

export interface RepoData {
  stars: number | string;
  openIssues: number | string;
  mainVersion: string;
  devVersion: string;
  pullRequests: number | string;
  loading: boolean;
  error: boolean;
  mainCommits?: CommitData;
  devCommits?: CommitData;
  contributors?: Contributor[];
}

export const fallbackData: RepoData = {
  stars: "-",
  openIssues: "-",
  mainVersion: "v1.0.0",
  devVersion: "latest",
  pullRequests: "-",
  loading: true,
  error: false,
  mainCommits: { total: 0, weekly: [] },
  devCommits: { total: 0, weekly: [] },
  contributors: [],
};

export interface CacheEntry {
  timestamp: number;
  data: Omit<
    RepoData,
    "loading" | "error" | "mainCommits" | "devCommits" | "contributors"
  > & {
    mainCommits?: CommitData;
    devCommits?: CommitData;
    contributors?: Contributor[];
  };
}

export type VersionStatus = "yes" | "partial" | "no";

export type VersionTab = "stable" | "dev" | "gui";

export type CommandColor = "cyan" | "red" | "violet" | "fuchsia";
