import { CategoryBannerType, Maybe, Product } from '../../graphql/generates';
import { AiFillCaretRight } from 'react-icons/ai';
import { useMemo, useState } from 'react';
import CategoryBannerItems from './CategoryBannerItems';
import Link from 'next/link';

interface IProps {
  data: Maybe<Array<Maybe<CategoryBannerType>>> | undefined;
  title: Maybe<string> | undefined;
}

const CategoryBannerWithMenu = ({ data, title }: IProps) => {
  const getInitialData = () => {
    if (!data) return '';
    if (!data[0]) return '';
    return (data[0].typeName as string) || '';
  };

  const [selectedType, setSelectedType] = useState(getInitialData());

  const getGamesForSelectedType = useMemo(() => {
    if (!data) return;
    if (!selectedType) {
      return data[0];
    } else {
      return data.find((type) => type?.typeName === selectedType);
    }
  }, [data, selectedType]);

  const spotlightA = getGamesForSelectedType?.spotlightA;
  const spotlightB = getGamesForSelectedType?.spotlightB;

  if (!data) return null;

  return (
    <div className='flex flex-col w-full gap-3'>
      <div className='flex flex-row w-full justify-between'>
        <div className='flex'>
          <p className='text-2xl'>{title}</p>
        </div>
        <div className='flex flex-row gap-5 mr-16 items-center'>
          {data.map((banner, index) => {
            if (!banner) return;
            if (!banner.typeName) return;
            return (
              <span
                key={index}
                className={`cursor-pointer hover:text-orange-400 ${
                  selectedType === banner.typeName &&
                  'text-orange-400 underline decoration-2 underline-offset-4'
                }`}
                onClick={() => setSelectedType(banner.typeName || '')}
              >
                {banner.typeName}
              </span>
            );
          })}
          <div className='flex flex-row hover:text-orange-400 cursor-pointer'>
            <span>All</span>
            <AiFillCaretRight size={20} />
          </div>
        </div>
      </div>
      <div className='flex flex-row items-center text-center'>
        <div className='flex flex-col flex-wrap p-2 gap-3'>
          {spotlightA &&
            spotlightA.image &&
            spotlightA.image.length &&
            spotlightA.name &&
            spotlightA.category &&
            spotlightA.slug &&
            spotlightA.slug.current && (
              <Link href={`/${spotlightA.category.id}/${spotlightA.slug.current}`}>
                <CategoryBannerItems
                  image={spotlightA.image[0]}
                  name={spotlightA.name}
                  background={true}
                />
              </Link>
            )}
          {spotlightB &&
            spotlightB.image &&
            spotlightB.image.length &&
            spotlightB.name &&
            spotlightB.category &&
            spotlightB.slug &&
            spotlightB.slug.current && (
              <Link href={`/${spotlightB.category.id}/${spotlightB.slug.current}`}>
                <CategoryBannerItems
                  image={spotlightB.image[0]}
                  name={spotlightB.name}
                  background={true}
                />
              </Link>
            )}
        </div>
        <div className='flex flex-row gap-3 p-2 flex-wrap'>
          {getGamesForSelectedType &&
            getGamesForSelectedType.games &&
            getGamesForSelectedType.games.length > 0 &&
            getGamesForSelectedType.games.map((game, index) => {
              if (!game) return;
              if (!game.image) return;
              if (!game.image.length) return;
              if (!game.name) return;
              if (!game.price) return;
              if (!game.category) return;
              if (!game.slug) return;
              if (!game.slug.current) return;
              return (
                <Link key={index} href={`/${game.category.id}/${game.slug.current}`}>
                  <CategoryBannerItems
                    image={game.image[0]}
                    name={game.name}
                    price={game.price}
                    background={true}
                  />
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default CategoryBannerWithMenu;
