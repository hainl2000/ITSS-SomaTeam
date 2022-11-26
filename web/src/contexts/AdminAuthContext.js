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
import { getAdminToken, removeAdminToken } from '../utils/adminAuth';
import AdminAuthAPI from '../api/AdminAuthAPI';

const AdminAuthContext = createContext();

function AdminAuthProvider({ children }) {
  const [initializing, setInitializing] = useState(true);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const authenticated = useMemo(() => !!currentAdmin, [currentAdmin]);
  const history = useNavigate();
  const toast = useToast();

  const initAuth = async () => {
    return getAdminToken()
      ? AdminAuthAPI.getAdmin()
      : Promise.resolve(null);
  };

  const redirectWhenNoAuth = useCallback(() => {
    toast({
      title: 'You need to log in to use this',
      status: 'warning',
      duration: 3000
    });
    history('/login');
  }, [history, toast]);

  useEffect(() => {
    initAuth()
      .then((user) => {
        setCurrentAdmin(user);
        setInitializing(false);
      })
      .catch(() => {
        setInitializing(false);
        toast({
          title: 'Session expired!',
          description: 'Please log in again',
          status: 'warning'
        });
        removeAdminToken();
        return <Navigate to="/login" />;
      });
  }, [toast]);

  return (
    <AdminAuthContext.Provider
      value={{
        initializing,
        authenticated,
        currentAdmin,
        setCurrentAdmin,
        redirectWhenNoAuth
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

const useAdminAuthContext = () => {
  const context = useContext(AdminAuthContext);

  if (context === undefined) {
    throw new Error(`useAdminAuth must be used within a AdminAuthProvider`);
  }

  return context;
};

AdminAuthProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default AdminAuthProvider;
export { useAdminAuthContext };
