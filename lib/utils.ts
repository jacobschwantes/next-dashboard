import useSWR from "swr";
const fetcher = async (url, method, body) => {
  const res = await fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body
  })

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.text();
    error.status = res.status;

    throw error;
  }
  return res.json();
};
export function useAnalytics() {
  const { data, error } = useSWR(`/api/analytics`, fetcher, {
    dedupingInterval: 30000
  });
  return {
    report: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useProjects() {
  const { data, error } = useSWR(["/api/projects", "GET"], fetcher, );
  return {
    projects: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function useProject(id) {
  const { data, error } = useSWR([`/api/projects/${id}`, 'GET'], fetcher);
  return {
    project: data,
    isLoading: !error && !data,
    error,
  };
}
export function useIssues(projectId) {
  const {data, error } = useSWR([`/api/projects/${projectId}/issues`, 'GET'], fetcher);
  return {
    issues: data,
    isLoading: !error && !data,
    error,
  };
}
export function useTasks(projectId) {
  const {data, error } = useSWR([`/api/projects/${projectId}/tasks`, 'GET'], fetcher);
  return {
    tasks: data,
    isLoading: !error && !data,
    error,
  };
}

export function useNews() {
  const {data, error} = useSWR("/api/news", fetcher, {dedupingInterval: 60000});
  return {
    news: data,
    isLoading: !error && !data,
    isError: error,
  }
}


export function formatDate(time: EpochTimeStamp) {
  let now = Date.now();
  let difference = now / 1000 - time;
  if (difference < 3600) {
    return `${Math.round(difference / 60)} minute${
      Math.round(difference / 60) !== 1 ? "s" : ""
    } ago`;
  }
  if (difference < 86400) {
    return `about ${Math.round(difference / 3600)} hour${
      Math.round(difference / 3600) > 1 ? "s" : ""
    } ago`;
  }
  if (difference / 86400 < 30) {
    return `${(difference / 86400).toFixed(0)} day${
      (difference / 86400).toFixed(0) > 1 ? "s" : ""
    } ago`;
  } else {
    return new Date(1642030293 * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}