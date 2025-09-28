import { useState } from 'react';
import UsersDisplay from '../Content/UsersDisplay/UsersDisplay';
import Footer from '../Footer/Footer';

const UserListPage = () => {
  const [visibleCount, setVisibleCount] = useState(50);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 50);
  };

  return (
    <div>
      <UsersDisplay visibleCount={visibleCount} />
      <Footer onLoadMore={handleLoadMore} />
    </div>
  );
};

export default UserListPage;
