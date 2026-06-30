import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Nav } from '@/components/Nav';
import { StudentPage } from '@/pages/StudentPage';
import { TeacherPage } from '@/pages/TeacherPage';
import { useSession } from '@/lib/store';

import { AuthPage } from '@/pages/AuthPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 5000 },
    mutations: { retry: 0 },
  },
});

function AppContent() {
  const { user, role } = useSession();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <AuthPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Nav />
      <main>
        {role === 'student' ? <StudentPage /> : <TeacherPage />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
