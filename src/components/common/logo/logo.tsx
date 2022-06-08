import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes, LogoPosition } from '../../../const';
import { useAppDispatch } from '../../../hooks/hook';
import { clearGuitarsIdPerPage } from '../../../store/data-guitars/data-guitars';
import { clearQueryParams } from '../../../store/query-params/query-params';

type LogoProps = {
  position: LogoPosition,
}

function Logo ({position}: LogoProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    dispatch(clearQueryParams());
    dispatch(clearGuitarsIdPerPage());
  };

  return(
    <Link
      className={position === LogoPosition.Header ? 'header__logo logo' : 'footer__logo logo'}
      to={AppRoutes.Root}
      onClick={handleClick}
    >
      <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" />
    </Link>
  );
}

export default Logo;
