import { PortableText } from '@portabletext/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, useMemo } from 'react';
import {
  useAllCategoryTitleQuery,
  useGameBySlugIdQuery,
  useGetAllProductSlugQuery,
} from '../../graphql/generates';
import Layout from '../../module/Layout';
import ProductDetail from '../../module/ProductPage/Details';
import ProductPhoto from '../../module/ProductPage/Photo';
import { NextPageWithLayout } from '../../shared/types';

const ProductPage: NextPageWithLayout = () => {
  const { query } = useRouter();
  const slug = query.slug;
  const { data } = useGameBySlugIdQuery({ Param: slug as string });

  const game = useMemo(() => {
    return data?.allProduct.map((value) => value);
  }, [data]);

  const gameImages = useMemo(() => {
    if (!game) return;
    return game.map((item) => {
      if (!item) return;
      if (!item.image) return;
      return item.image;
    });
  }, [game]);

  return (
    <div className='flex w-full flex-col justify-center mt-5 gap-5 bg-slate-100'>
      <div className='flex w-full bg-white'>
        {/* Detail section */}
        <div className='flex w-full justify-center gap-5 max-h-[500px]'>
          <div className='flex w-full justify-center'>
            {gameImages &&
              gameImages.length > 0 &&
              gameImages.map((image, index) => {
                if (!image) return;
                if (index > 0) return;
                return <ProductPhoto images={image} key={index} />;
              })}
          </div>
          <div className='flex w-[40%] justify-center'>
            {game &&
              game.length &&
              game.map((item, index) => {
                if (!item) return;
                if (!item.name) return;
                if (!item.price) return;
                if (index > 0) return;
                return <ProductDetail name={item.name} price={item.price} key={index} />;
              })}
          </div>
        </div>
      </div>
      <div className='flex w-full justify-center bg-white'>
        {/* Description section */}
        {game && game.length > 0 && (
          <div className='flex w-full justify-center flex-col text-center p-2 gap-5'>
            <span className='text-4xl font-number'>Descriptions</span>
            <span className='font-semibold text-xl'>
              <PortableText
                value={game[0].descriptionRaw}
                components={{
                  // types: {
                  //   image: ({ value }) => {
                  //     const { width, height } = getImageDimensions(value);
                  //     return (
                  //       <Image
                  //         src={urlBuilder().image(value).fit('max').auto('format').url()}
                  //         alt='description-image'
                  //         loading='lazy'
                  //         style={{ aspectRatio: width / height }}
                  //       />
                  //     );
                  //   },
                  // },
                  block: {
                    h1: ({ children }) => <h1>{children}</h1>,
                    h2: ({ children }) => <h2>{children}</h2>,
                    h3: ({ children }) => <h3>{children}</h3>,
                    h4: ({ children }) => <h4>{children}</h4>,
                    h5: ({ children }) => <h5>{children}</h5>,
                    h6: ({ children }) => <h6>{children}</h6>,
                  },
                  marks: {
                    strong: ({ children }) => <strong className='text-red-500'>{children}</strong>,
                  },
                }}
              />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();
  if (params) {
    await Promise.all([
      queryClient.fetchQuery(
        useGameBySlugIdQuery.getKey({ Param: params.slug as string }),
        useGameBySlugIdQuery.fetcher({ Param: params.slug as string })
      ),
      queryClient.fetchQuery(useAllCategoryTitleQuery.getKey(), useAllCategoryTitleQuery.fetcher()),
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
  const { allProduct } = await queryClient.fetchQuery(
    useGetAllProductSlugQuery.getKey(),
    useGetAllProductSlugQuery.fetcher()
  );
  const { allHomepage } = await queryClient.fetchQuery(
    useAllCategoryTitleQuery.getKey(),
    useAllCategoryTitleQuery.fetcher()
  );
  const categoryBanners = allHomepage[0].category;

  const paths = allProduct.flatMap((item) => {
    if (!item) return [];
    if (!item.slug) return [];
    if (!item.slug.current) return [];

    return (
      categoryBanners?.reduce((acc, curr) => {
        if (curr?.id) {
          return acc.concat({
            params: { categoryTitle: curr.id, slug: item.slug?.current as string },
          });
        }
        return acc;
      }, [] as Array<{ params: { categoryTitle: string; slug: string } }>) || []
    );
  });

  return {
    paths,
    fallback: true,
  };
};

export default ProductPage;
