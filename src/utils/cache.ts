import type { CacheEntry, CommitData, Contributor } from "../types";

const CACHE_KEY = "wintoolkit_github_cache";
export const CACHE_TTL_MS = 60 * 60 * 1000; // 1 ora
export const DAILY_REFRESH_TTL_MS = 24 * 60 * 60 * 1000; // 24 ore

export function clearCache() {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {
    // Ignore
  }
}

export function readCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    return entry;
  } catch {
    return null;
  }
}

export function writeCache(
  data: Omit<import("../types").RepoData, "loading" | "error"> & {
    mainCommits?: CommitData;
    devCommits?: CommitData;
    contributors?: Contributor[];
  },
) {
  try {
    const entry: CacheEntry = { timestamp: Date.now(), data };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // localStorage non disponibile (es. Safari private mode) — ignoriamo
  }
}

export function isCacheExpired(entry: CacheEntry, ttl: number): boolean {
  return Date.now() - entry.timestamp > ttl;
}
