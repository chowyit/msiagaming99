import { dehydrate, QueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { uniqBy } from 'lodash';

import { ReactElement } from 'react';
import {
  useAllCategoryBannerTitleQuery,
  useGetCategoryBannerByIdQuery,
} from '../graphql/generates';
import CategoryBannerItems from '../module/CategoryBanner/CategoryBannerItems';
import Layout from '../module/Layout';
import { NextPageWithLayout } from '../shared/types';
import { GetStaticProps } from 'next';

const CategoryPage: NextPageWithLayout = () => {
  const { asPath } = useRouter();
  const param = asPath.replace('/', '');

  const { data } = useGetCategoryBannerByIdQuery({
    Param: param,
  });
  const allGames = data?.allCategoryBanner.map((item) => {
    if (item.hasMenu) {
      return item.gameType?.flatMap((game) => game?.games);
    } else {
      return item.games?.map((value) => value);
    }
  })[0];

  const filteredAllGames = uniqBy(allGames, 'name');

  if (!data) return null;

  return (
    <div className='flex justify-start mt-5 p-5 text-center'>
      {allGames && allGames.length ? (
        <div className='flex flex-wrap gap-3'>
          {filteredAllGames.map((item, index) => {
            if (!item) return;
            if (!item.image) return;
            if (!item.name) return;
            if (!item.price) return;
            if (!item.slug) return;
            if (!item.slug.current) return;
            return (
              <>
                <Link href={`${param}/${item.slug.current}`}>
                  <CategoryBannerItems
                    image={item.image[0]}
                    name={item.name}
                    price={item.price}
                    background={true}
                    key={index}
                  />
                </Link>
              </>
            );
          })}
        </div>
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
};

CategoryPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();
  if (params) {
    //TODO Reduce the data size for page
    await Promise.all([
      queryClient.fetchQuery(
        useGetCategoryBannerByIdQuery.getKey({ Param: params.categoryTitle as string }),
        useGetCategoryBannerByIdQuery.fetcher({ Param: params.categoryTitle as string })
      ),
      queryClient.fetchQuery(
        useAllCategoryBannerTitleQuery.getKey(),
        useAllCategoryBannerTitleQuery.fetcher()
      ),
    ]);
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const queryClient = new QueryClient();
  const { allHomepage } = await queryClient.fetchQuery(
    useAllCategoryBannerTitleQuery.getKey(),
    useAllCategoryBannerTitleQuery.fetcher()
  );
  const categoryBanners = allHomepage[0].categoryBanners;
  const paths = categoryBanners?.reduce((acc, curr) => {
    if (curr?.id) {
      return acc.concat({ params: { categoryTitle: curr.id } });
    }
    return acc;
  }, [] as Array<{ params: { categoryTitle: string } }>);

  return {
    paths,
    fallback: true,
  };
};

export default CategoryPage;
