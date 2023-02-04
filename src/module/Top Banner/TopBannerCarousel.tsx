import { Maybe } from 'graphql/jsutils/Maybe';
import { useState } from 'react';
import SanityImage from '../../components/SanityImage';
import { TopBanner } from '../../graphql/generates';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';

interface IProps {
  banners: Maybe<Array<Maybe<TopBanner>>>;
}

const TopBannerCarousel = ({ banners }: IProps) => {
  const [bannerIndex, setBannerIndex] = useState(0);

  if (!banners) {
    return null;
  }

  const handleNextClick = () => {
    setBannerIndex(bannerIndex === banners.length - 1 ? 0 : bannerIndex + 1);
  };

  const handlePreviousClick = () => {
    setBannerIndex(bannerIndex === 0 ? banners.length - 1 : bannerIndex - 1);
  };

  return (
    <div className='relative mx-auto items-center justify-center px-2 max-w-[1200px] h-full w-full flex'>
      {banners.map((item, index) => {
        if (!item || item === undefined) return;
        if (!item.name) return;
        if (!item.image) return;
        return (
          <div
            key={index}
            className={`relative flex left-0 right-0 mx-auto max-w-[1200px] h-[660px] ${
              index === bannerIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {banners.length > 1 && (
              <>
                <div>
                  <IoIosArrowDropleftCircle
                    onClick={handlePreviousClick}
                    className='absolute left-0 top-[45%]'
                    fill='white'
                    size={60}
                  />
                </div>
                <div>
                  <IoIosArrowDroprightCircle
                    onClick={handleNextClick}
                    className='absolute right-0 top-[45%]'
                    fill='white'
                    size={60}
                  />
                </div>
              </>
            )}
            {index === bannerIndex && (
              <SanityImage
                imageProps={item.image}
                alt='top-banner'
                width={1200}
                height={600}
                objectFit='contain'
                className='transition'
                quality={100}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
export default TopBannerCarousel;
