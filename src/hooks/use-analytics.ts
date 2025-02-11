import { useQuery } from "@tanstack/react-query";
import { getUserAnalytics } from "@/actions/analytics";

export const useAnalytics = (slug: string) => {
  return useQuery({
    queryKey: ["user-analytics", slug],
    queryFn: () => getUserAnalytics(slug),
  });
};
