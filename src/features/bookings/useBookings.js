import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../ui/Pagination";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // 1.FILTER
  const filterValue = searchParams.get("status");
  const filter = !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue };

  // 2.SORT
  const sorByRaw = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sorByRaw.split("-");
  const sortBy = { field, direction };

  // 3.PAGINATION
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // 4.QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page })
  });

  // 5.PRE-FETCHING
  const totalPage = Math.ceil(count / PAGE_SIZE);

  if (page < totalPage) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
    });
  }

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
    });

  return { isLoading, bookings, error, count };
}
