import SearchBar from './SearchBar';
import Logo from './../../assets/img/Logo.jpeg';
import Image from 'next/image';

import Link from 'next/link';
import { useAllCategoryTitleQuery } from '../../graphql/generates';

const MainNavigation = () => {
  const { data } = useAllCategoryTitleQuery();
  const activeHomepage = data?.allHomepage.filter((homepage) => homepage.active === true)[0];
  const bannerTitles = activeHomepage?.category;

  return (
    <div className='h-[88px] bg-white flex gap-10 flex-row w-full justify-between px-5 align-middle items-center'>
      <div className='flex'>
        <Link href='/'>
          <Image src={Logo} height={66} width={66} alt='Logo' />
        </Link>
      </div>
      <div className='flex flex-row gap-24'>
        <div className='flex items-center'>
          <Link href='/'>Homepage</Link>
        </div>
        <div className='flex gap-24 items-center'>
          {bannerTitles &&
            bannerTitles.length &&
            bannerTitles.map((item, index) => {
              if (!item) return;
              if (!item.id) return;
              if (!item.categoryName) return;
              return (
                <Link href={`/${item.id.replace(/\s/g, '')}`} key={index}>
                  {item.categoryName}
                </Link>
              );
            })}
        </div>
      </div>
      <div className='flex'>
        <SearchBar />
      </div>
    </div>
  );
};

export default MainNavigation;
