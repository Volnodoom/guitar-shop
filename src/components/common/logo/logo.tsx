import { Link } from 'react-router-dom';
import { AppRoutes, LogoPosition } from '../../../const';

type LogoProps = {
  position: LogoPosition,
}

function Logo ({position}: LogoProps): JSX.Element {

  return(
    <Link
      className={position === LogoPosition.Header ? 'header__logo logo' : 'footer__logo logo'}
      to={AppRoutes.Root}
    >
      <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" />
    </Link>
  );
}

export default Logo;
