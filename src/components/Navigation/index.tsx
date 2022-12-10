import MainNavigation from './MainNavigation';
import SubNavigation from './SubNavigation';

interface INavigationProps {
  children: React.ReactNode;
}

const Navigation = ({ children }: INavigationProps) => {
  return (
    <div>
      <SubNavigation />
      <MainNavigation />
      {children}
    </div>
  );
};

export default Navigation;
