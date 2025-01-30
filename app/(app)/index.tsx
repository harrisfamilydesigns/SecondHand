import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from '@/components/SafeAreaView';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchGlutenFreeProducts, queryKeys } from '@/api';
import { ActivityIndicator, FlatList } from 'react-native';
import SearchInput from '@/components/SearchInput/SearchInput';
import { useEffect, useState } from 'react';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { ChevronRightIcon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';

const categories = [
  { id: 1, name: "Baked goods", image_url: "https://images.unsplash.com/photo-1622941367239-8acd68fa946d?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJha2VkJTIwZ29vZHN8ZW58MHx8MHx8fDA%3D" },
  { id: 2, name: "Bread", image_url: "https://plus.unsplash.com/premium_photo-1700399458190-eb33043ae7b2?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z2x1dGVuJTIwZnJlZSUyMGJyZWFkfGVufDB8fDB8fHww" },
  { id: 3, name: "Meat", image_url: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RlYWt8ZW58MHx8MHx8fDA%3D" },
  { id: 4, name: "Dairy", image_url: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFpcnl8ZW58MHx8MHx8fDA%3D" },
  { id: 5, name: "Fruits", image_url: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJ1aXRzfGVufDB8fDB8fHww" },
  { id: 6, name: "Vegetables", image_url: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D" },
  { id: 7, name: "Cereals", image_url: "https://plus.unsplash.com/premium_photo-1675237626442-cb1af9f49a92?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2VyZWFsc3xlbnwwfHwwfHx8MA%3D%3D" },
  { id: 8, name: "Pasta", image_url: "https://plus.unsplash.com/premium_photo-1726862844513-26b69cf51a78?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGdsdXRlbiUyMGZyZWUlMjBwYXN0YXxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 9, name: "Sauces", image_url: "https://images.unsplash.com/photo-1563599175592-c58dc214deff?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2F1Y2V8ZW58MHx8MHx8fDA%3D" },
  { id: 10, name: "Snacks", image_url: "https://images.unsplash.com/photo-1543158181-1274e5362710?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNuYWNrc3xlbnwwfHwwfHx8MA%3D%3D" },
  { id: 11, name: "Beverage", image_url: "https://images.unsplash.com/photo-1589948100953-963e39185fd6?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJldmVyYWdlc3xlbnwwfHwwfHx8MA%3D%3D" },
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
      <Box className="m-3">
        <SearchInput value={searchValue} onChangeText={setSearchValue} />
      </Box>

      {/* categories horizontal scrolling list */}
      <Box className="my-3 flex flex-row items-center justify-between mx-3">
        <Text bold size='xl'>
          Categories
        </Text>
        <Button variant='link' size="sm" className="gap-1">
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
            <Box key={item.id.toString()} className="p-4 h-40 w-40 bg-background-100 rounded-lg ml-3">
              <Text bold size='md'>{item.name}</Text>
              <Box className="mt-2 rounded-xl overflow-hidden">
                <Image source={{ uri: item.image_url }} alt="some_img" className="w-full h-24" />
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
