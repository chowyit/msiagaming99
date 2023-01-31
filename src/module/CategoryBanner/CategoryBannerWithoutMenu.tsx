import { Maybe } from 'graphql/jsutils/Maybe';
import { Product } from '../../graphql/generates';
import CategoryBannerItems from './CategoryBannerItems';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';

interface IProps {
  title: Maybe<string>;
  games: Maybe<Array<Maybe<Product>>>;
}

const CategoryBannerWithoutMenu = ({ title, games }: IProps) => {
  const slideLeft = () => {
    const slider = document.getElementById('slider');
    if (slider) slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    const slider = document.getElementById('slider');
    if (slider) slider.scrollLeft = slider.scrollLeft + 500;
  };

  if (!games) return null;

  return (
    <div className='flex flex-col justify-center gap-3 relative w-full bg-slate-50 p-2'>
      <div className='flex'>
        <p className='text-2xl'>{title}</p>
      </div>
      <div className='flex flex-row items-center'>
        <div className='cursor-pointer opacity-70 hover:opacity-100'>
          <IoIosArrowDropleftCircle size={40} onClick={slideLeft} />
        </div>
        <div
          id='slider'
          className='flex text-center relative overflow-x-auto scroll scroll-smooth whitespace-nowrap scrollbar-hide'
        >
          <div className='flex flex-row gap-3 p-2'>
            {games.map((item, index) => {
              if (!item) return;
              if (!item.image) return;
              if (!item.image.length) return;
              if (!item.name) return;
              if (!item.price) return;
              return (
                <CategoryBannerItems
                  image={item.image[0]}
                  name={item.name}
                  price={item.price}
                  key={index}
                />
              );
            })}
          </div>
        </div>
        <div className='cursor-pointer opacity-70 hover:opacity-100'>
          <IoIosArrowDroprightCircle size={40} onClick={slideRight} />
        </div>
      </div>
    </div>
  );
};
export default CategoryBannerWithoutMenu;
