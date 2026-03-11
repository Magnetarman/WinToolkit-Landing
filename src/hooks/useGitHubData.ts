import { useEffect, useState } from "react";
import type { RepoData } from "../types";

const GITHUB_DATA_URL = "/wintoolkit/github-data.json";

export function useOnlineGitHubData() {
  const [data, setData] = useState<RepoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response, guiResponse] = await Promise.all([
          fetch(GITHUB_DATA_URL),
          fetch(
            "https://raw.githubusercontent.com/Magnetarman/WinToolkit/refs/heads/Dev/WinToolkit_GUI.ps1",
          ),
        ]);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();

        let guiVersion = "N/A";
        if (guiResponse.ok) {
          const guiScript = await guiResponse.text();
          const versionMatch = guiScript.match(
            /\$Global:GuiVersion\s*=\s*['"]([^'"]+)['"]/,
          );
          if (versionMatch && versionMatch[1]) {
            guiVersion = versionMatch[1];
          }
        }

        // Validate the data structure
        if (jsonData && jsonData.data) {
          setData({
            ...jsonData.data,
            guiVersion,
          });
          setError(false);
        } else {
          throw new Error("Invalid data structure");
        }
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh data every hour to ensure it's always up-to-date
    const intervalId = setInterval(
      () => {
        fetchData();
      },
      60 * 60 * 1000,
    ); // 1 hour

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return { data, loading, error };
}
