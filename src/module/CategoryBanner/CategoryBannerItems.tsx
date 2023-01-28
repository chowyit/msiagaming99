import SanityImage from '../../components/SanityImage';
import { Image, Maybe } from '../../graphql/generates';
import NoImage from './../../assets/img/No-Image.png';
import NextImage from 'next/image';

interface IProps {
  image: Maybe<Image>;
  price: number;
  name: string;
}

const CategoryBannerItems = ({ image, price, name }: IProps) => {
  return (
    <div className='flex flex-col border gap-2 h-[300px] w-[260px] cursor-pointer hover:scale-105 ease-in-out duration-300 bg-white'>
      {image ? (
        <div className='p-2'>
          <SanityImage imageProps={image} alt='product' height={260} width={260} quality={100} />
        </div>
      ) : (
        <div>
          <NextImage alt='game' src={NoImage} />
        </div>
      )}
      <div className='mt-5'>
        <span>{name}</span>
      </div>
      <div className='mt-auto'>
        <span className='text-red-500 font-semibold'>RM{price}</span>
      </div>
    </div>
  );
};

export default CategoryBannerItems;
