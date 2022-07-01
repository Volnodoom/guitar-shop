import { HeaderCart, HeaderNavigation, HeaderSearchBar } from './components/components';

function Header (): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <HeaderNavigation />
        <HeaderSearchBar />
        <HeaderCart />
      </div>
    </header>
  );
}

export default Header;
