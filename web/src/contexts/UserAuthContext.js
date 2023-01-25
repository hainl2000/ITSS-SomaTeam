import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Navigate, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { getUserToken, removeUserToken } from '../utils/userAuth';
import UserAuthAPI from '../api/UserAuthAPI';

const UserAuthContext = createContext();

function UserAuthProvider({ children }) {
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isChangeProfile, setIsChangeProfile] = useState(false);
  const authenticated = useMemo(() => !!currentUser, [currentUser]);
  const history = useNavigate();
  const toast = useToast();

  const initAuth = async () => {
    return getUserToken()
      ? UserAuthAPI.getUser()
      : Promise.resolve(null);
  };

  const redirectWhenNoAuth = useCallback(() => {
    toast({
      title: 'Bạn cần đăng nhập để thực hiện hành động này',
      status: 'warning',
      duration: 3000
    });
    history('/login');
  }, [history, toast]);

  useEffect(() => {
    initAuth()
      .then((user) => {
        setCurrentUser(user);
        setInitializing(false);
      })
      .catch(() => {
        setInitializing(false);
        toast({
          title: 'Hết hạn đăng nhập!',
          description: 'Cần đăng nhập lại',
          status: 'warning'
        });

        return <Navigate to="/login" />;
      });
  }, [toast, isChangeProfile]);

  return (
    <UserAuthContext.Provider
      value={{
        initializing,
        authenticated,
        currentUser,
        setCurrentUser,
        redirectWhenNoAuth,
        isChangeProfile,
        setIsChangeProfile
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

const useUserAuthContext = () => {
  const context = useContext(UserAuthContext);

  if (context === undefined) {
    throw new Error(
      `useUserAuth must be used within a UserAuthProvider`
    );
  }

  return context;
};

UserAuthProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default UserAuthProvider;
export { useUserAuthContext };
