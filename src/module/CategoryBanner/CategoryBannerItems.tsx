import SanityImage from '../../components/SanityImage';
import { Image, Maybe } from '../../graphql/generates';
import NoImage from './../../assets/img/No-Image.png';
import NextImage from 'next/image';

interface IProps {
  image: Maybe<Image>;
  name: string;
  price?: string;
  background?: boolean;
}

const CategoryBannerItems = ({ image, price, name, background }: IProps) => {
  return (
    <div
      className={`p-2 flex flex-col border gap-2 h-[400px] w-[230px] cursor-pointer hover:scale-105 ease-in-out duration-300 ${
        background ? 'bg-slate-50' : 'bg-white'
      } `}
    >
      {image ? (
        <div>
          <SanityImage
            imageProps={image}
            alt='product'
            height={260}
            width={250}
            quality={100}
            className='h-[200px]'
          />
        </div>
      ) : (
        <div>
          <NextImage alt='game' src={NoImage} height={260} width={260} />
        </div>
      )}
      <div className='mt-5 whitespace-normal'>
        <span>{name}</span>
      </div>
      <div className='mt-auto'>
        {price && <span className='text-red-500 font-semibold'>RM{price}</span>}
      </div>
    </div>
  );
};

export default CategoryBannerItems;
