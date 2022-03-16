import useSWR from "swr";
const fetcher = async (url, params = "") => {
  const res = await fetch(`${url}${params}`);

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
 
  });
  return {
    report: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useProjects() {
  const { data, error } = useSWR("/api/projects/getprojects", fetcher, );
  return {
    projects: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function useProject(params) {
  const { data, error } = useSWR(["/api/projects/getprojectbyid", params], fetcher);
  return {
    project: data,
    isLoading: !error && !data,
    error,
  };
}

export function useNews() {
  const {data, error} = useSWR("/api/news", fetcher);
  return {
    news: data,
    isLoading: !error && !data,
    isError: error,
  }
}
