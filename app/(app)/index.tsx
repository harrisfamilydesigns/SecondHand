import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchGlutenFreeProducts, queryKeys } from '@/api';
import { ActivityIndicator, FlatList } from 'react-native';
import SearchInput from '@/components/SearchInput/SearchInput';
import { useEffect, useState } from 'react';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { ChevronRightIcon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';

const image_url = "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
const categories = [
  { id: 1, name: "Baked goods", image_url },
  { id: 2, name: "Bread", image_url },
  { id: 3, name: "Meat", image_url },
  { id: 4, name: "Dairy", image_url },
  { id: 5, name: "Fruits", image_url },
  { id: 6, name: "Vegetables", image_url },
  { id: 7, name: "Cereals", image_url },
  { id: 8, name: "Pasta", image_url },
  { id: 9, name: "Sauces", image_url },
  { id: 10, name: "Snacks", image_url },
  { id: 11, name: "Drinks", image_url },
];

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
    refetch,
  } = useInfiniteQuery({
    queryKey: [queryKeys.GLUTEN_FREE_PRODUCTS],
    queryFn: ({ pageParam = 0 }) => fetchGlutenFreeProducts({
      limit: perPage,
      offset: pageParam,
      search: searchValue
    }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // Determine if there are more pages to fetch
      return lastPage.length < perPage ? null : allPages.length * perPage;
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      refetch();
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  if (productsIsLoading) {
    return <Text>Loading...</Text>;
  }

  if (productsError) {
    return <Text>Error: {productsError?.message}</Text>;
  }

  // Combine all pages into a single list
  const glutenFreeProducts = productsData?.pages.flat() || [];

  return (
    <SafeAreaView edges={['bottom']} className="flex flex-col flex-1">
      {/* Search for glutenFreeProducts */}
      <Box className="mt-5 mx-3">
        <SearchInput value={searchValue} onChangeText={setSearchValue} />
      </Box>

      {/* categories horizontal scrolling list */}
      <Box className="mt-8 flex flex-row items-center justify-between mx-3">
        <Text bold size='xl'>
          Categories
        </Text>
        <Button variant='link' size="sm" className="ml-2">
          <ButtonText className="bold text-gray-400">See all</ButtonText>
          <ButtonIcon as={ChevronRightIcon} />
        </Button>
      </Box>

      <Box>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Box key={item.id.toString()} className="p-4 h-40 w-40 bg-gray-200 rounded-lg ml-3">
              <Text bold size='xl'>{item.name}</Text>
              <Box>
                <Image source={{ uri: item.image_url }} className="w-full h-24" />
              </Box>
            </Box>
          )}
        />
      </Box>

      {/* glutenFreeProducts list */}
      <Box className="flex-1 mt-3">
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
    </SafeAreaView>
  );
}
