import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchGlutenFreeProducts, fetchSession, queryKeys } from '@/api';
import UserAvatar from '@/components/UserAvatar/UserAvatar';
import { ActivityIndicator, FlatList } from 'react-native';
import SearchInput from '@/components/SearchInput/SearchInput';
import { Fragment, useState } from 'react';

export default function Home() {
  const [searchValue, setSearchValue] = useState('');

  const perPage = 50;
  const {
    data: productsData,
    isLoading: productsIsLoading,
    error: productsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKeys.GLUTEN_FREE_PRODUCTS],
    queryFn: ({ pageParam = 0 }) => fetchGlutenFreeProducts({ limit: perPage, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // Determine if there are more pages to fetch
      return lastPage.length < perPage ? null : allPages.length * perPage;
    },
  });
  const isLoading = productsIsLoading;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (productsError) {
    return <Text>Error: {productsError?.message}</Text>;
  }

  // Combine all pages into a single list
  const glutenFreeProducts = productsData?.pages.flat() || [];

  return (
    <Fragment>
      <Box className="mt-3 mx-3">
        <SearchInput value={searchValue} onChangeText={setSearchValue} />
      </Box>

      <Box className="flex flex-col h-full">
        <Box className="flex flex-col mb-20">
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
    </Fragment>
  );
}
