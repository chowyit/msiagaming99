import Navigation from '../../components/Navigation';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div>
      <Navigation>{children}</Navigation>
    </div>
  );
};

export default Layout;
