import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchGlutenFreeProducts, fetchSession, queryKeys } from '@/api';
import UserAvatar from '@/components/UserAvatar/UserAvatar';
import { ActivityIndicator, FlatList } from 'react-native';
import { useState } from 'react';
import { CheckCircleIcon, CheckIcon } from '@/components/ui/icon';

export default function Home() {
  const [offset, setOffset] = useState(0);

  const {
    data: glutenFreeProductsInfiniteData,
    isLoading: isLoadingProducts,
    error: errorProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKeys.GLUTEN_FREE_PRODUCTS],
    queryFn: ({ pageParam = 0 }) => fetchGlutenFreeProducts({ limit: 50, offset: pageParam }),
    initialPageParam: offset,
    getNextPageParam: (lastPage, allPages) => {
      // Determine if there are more pages to fetch
      return lastPage.length < 50 ? null : allPages.length * 50;
    },
  });
  const { data: session, isLoading: isLoadingSession, error: errorSession } = useQuery({
    queryKey: [queryKeys.SESSION],
    queryFn: fetchSession
  });
  const isLoading = isLoadingSession || isLoadingProducts;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (errorProducts || errorSession) {
    return <Text>Error: {errorProducts?.message || errorSession?.message}</Text>;
  }

  // Combine all pages into a single list
  const glutenFreeProducts = glutenFreeProductsInfiniteData?.pages.flat() || [];

  return (
    <SafeAreaView>

      <Box className="flex items-end">
        <UserAvatar />
      </Box>

      <Box className="flex flex-col h-full">
        <Box className="flex flex-col py-4 mb-20">
          <FlatList
            scrollsToTop
            data={glutenFreeProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Box key={item.id} className="border-b border-outline-300 p-4">
                <Text bold size='xl'>{item.name}</Text>
                <Text className="mt-2 color-gray-400">{item.brand_name}</Text>
              </Box>
            )}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
}
