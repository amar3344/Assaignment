import { useSelector } from 'react-redux';
import AuthNavigation from "./AuthNavigation";
import AppNavigation from './AppNavigation';
import { RootState } from '../redux/Store';

const Navigation = () => {
  const { token } = useSelector((state: RootState) => state.authData)
  return (
    <>
      {token !== "" ? <AppNavigation /> : <AuthNavigation />}
    </>
  )
}

export default Navigation;