import { ReactElement } from 'react';
import { useAllHomepageQuery } from '../graphql/generates';
import CategoryBannerWithMenu from '../module/CategoryBanner/CategoryBannerWithMenu';
import CategoryBannerWithoutMenu from '../module/CategoryBanner/CategoryBannerWithoutMenu';
import Layout from '../module/Layout';
import TopBannerCarousel from '../module/Top Banner';
import { NextPageWithLayout } from '../shared/types';

const Home: NextPageWithLayout = () => {
  const { data } = useAllHomepageQuery();
  const activeHomepage = data?.allHomepage.filter((homepage) => homepage.active === true)[0];
  const topBanner = activeHomepage?.topBanners;
  const videoBanner = activeHomepage?.videoBanner;

  return (
    <div className='flex justify-center w-full h-full flex-col px-2 mb-5 gap-5'>
      <div className='mb-10 overflow-hidden'>
        {/* Top Banner Carousel */}
        {topBanner && topBanner.length && <TopBannerCarousel banners={topBanner} />}
      </div>
      <div className='flex flex-col gap-5'>
        {/* Content Banners */}
        {activeHomepage &&
          activeHomepage.categoryBanners &&
          activeHomepage.categoryBanners.map((banner, index) => {
            if (!banner) return;
            return (
              <div key={index} className='flex justify-start w-full'>
                {banner.hasMenu ? (
                  <CategoryBannerWithMenu data={banner.gameType} title={banner.bannerTitle} />
                ) : (
                  <CategoryBannerWithoutMenu title={banner.bannerTitle} games={banner.games} />
                )}
              </div>
            );
          })}
      </div>
      <div>{/* Video Banners */}</div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
