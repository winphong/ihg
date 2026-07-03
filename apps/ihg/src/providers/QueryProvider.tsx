"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({
  children,
  dehydratedState,
}: {
  children: React.ReactNode;
  dehydratedState?: unknown;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
