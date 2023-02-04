import { Maybe } from 'graphql/jsutils/Maybe';
import { useState } from 'react';
import SanityImage from '../../../components/SanityImage';
import { Image } from '../../../graphql/generates';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

interface IProps {
  images: Array<Maybe<Image>>;
}

const ProductPhoto = ({ images }: IProps) => {
  const [selectedImage, setSelectedImage] = useState(images ? images[0] : undefined);
  const [currentIndex, setCurrentIndex] = useState(images ? 0 : undefined);

  const handleImageClick = (index: number) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
  };

  const slideUp = () => {
    const slider = document.getElementById('productSlider');
    if (slider) slider.scrollTop = slider.scrollTop - 300;
  };

  const slideDown = () => {
    const slider = document.getElementById('productSlider');
    if (slider) slider.scrollTop = slider.scrollTop + 300;
  };

  if (!images) return null;

  return (
    <div className='flex w-full p-2 gap-2'>
      <div className=' flex flex-col gap-1'>
        {images.length > 7 && (
          <div
            onClick={slideUp}
            className='flex justify-center border-2 cursor-pointer hover:border-black'
          >
            <IoIosArrowUp />
          </div>
        )}
        <div
          id='productSlider'
          className='flex flex-col gap-5 overflow-y-auto scrollbar-hide scroll scroll-smooth whitespace-nowrap'
        >
          {images &&
            images.length &&
            images.map((image, index) => {
              if (!image) return;
              return (
                <div
                  key={index}
                  className={`border-2 p-2 w-[60px] h-[60px] justify-center flex cursor-pointer hover:border-orange-400 ${
                    index === currentIndex && 'border-orange-400'
                  }`}
                  onClick={() => handleImageClick(index)}
                >
                  <SanityImage imageProps={image} alt='product-images' quality={100} />
                </div>
              );
            })}
        </div>
        {images.length > 7 && (
          <div
            onClick={slideDown}
            className='flex justify-center border-2 cursor-pointer hover:border-black'
          >
            <IoIosArrowDown />
          </div>
        )}
      </div>
      <div className='flex w-full h-full max-h-[500px]'>
        {selectedImage && selectedImage !== null && (
          <SanityImage imageProps={selectedImage} alt='selected-product' objectFit='contain' />
        )}
      </div>
    </div>
  );
};

export default ProductPhoto;
