import { Outlet } from 'react-router-dom';
import TopicSidebar from './TopicSidebar';

const CompetitiveProgrammingPage = () => {
  return (
    <div className="flex min-h-screen p-4 gap-4">
      <TopicSidebar />
      <div className="flex-1 bg-white shadow p-4 rounded w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default CompetitiveProgrammingPage;