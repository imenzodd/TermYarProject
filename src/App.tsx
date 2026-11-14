import React, { useState, useEffect, useMemo } from 'react';
import {
  initialCourses,
  initialMarketItems,
  initialNeedRequests,
  initialProfile,
  initialTasks,
} from './data/initialData';
import {
  AcademicResource,
  Course,
  CourseSchedule,
  MarketItem,
  NeedRequest,
  ResourceNote,
  StudyLog,
  Task,
  TaskType,
  UserProfile,
} from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { MarketplaceView } from './components/MarketplaceView';
import { NeedRequestsView } from './components/NeedRequestsView';
import { WeeklyScheduleView } from './components/WeeklyScheduleView';
import { CoursesView } from './components/CoursesView';
import { TasksView } from './components/TasksView';
import { FocusTimerView } from './components/FocusTimerView';
import { FavoritesView } from './components/FavoritesView';
import { SettingsView } from './components/SettingsView';
import { AcademicResourcesView } from './components/AcademicResourcesView';
import { PdfViewerModal } from './components/PdfViewerModal';
import { UploadResourceModal } from './components/UploadResourceModal';
import { SemesterHealthScoreModal } from './components/SemesterHealthScoreModal';
import { SemesterHealthScoreCard } from './components/SemesterHealthScoreCard';
import { MonetizationPitchModal } from './components/MonetizationPitchModal';
import { NewTaskModal } from './components/NewTaskModal';
import { NewMarketItemModal } from './components/NewMarketItemModal';
import { NewNeedRequestModal } from './components/NewNeedRequestModal';
import { ProfileModal } from './components/ProfileModal';
import { GolestanScheduleImportModal } from './components/GolestanScheduleImportModal';
import {
  loadAllResources,
  saveResourceToVault,
  deleteResourceFromVault,
  loadResourceNotes,
} from './utils/resourceStorage';
import { calculateSemesterHealthScore } from './utils/healthScoreCalculator';
import { BusinessDossierView } from './components/BusinessDossierView';
import { LandingPageView } from './components/LandingPageView';
import { LayoutDashboard, BookOpen, CheckSquare, CalendarDays, Menu, GraduationCap } from 'lucide-react';

export default function App() {
  // Mobile drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Language state (defaults to Persian 'fa' and RTL for Iranian academic environment)
  const [lang, setLang] = useState<'en' | 'fa'>(() => {
    const saved = localStorage.getItem('ty_lang_v2');
    return (saved === 'en' || saved === 'fa') ? saved : 'fa';
  });

  useEffect(() => {
    localStorage.setItem('ty_lang_v2', lang);
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Theme state: Supports both Futuristic Dark Liquid Glass and Crisp Light Editorial theme
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('ty_dark_mode');
    return saved !== null ? saved === 'true' : true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('ty_dark_mode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Active navigation tab (always starts on 'landing' when opening the site link unless ?tab= is explicitly specified)
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location) {
      const urlParams = new URLSearchParams(window.location.search);
      const requestedTab = urlParams.get('tab');
      if (requestedTab) return requestedTab;
    }
    return 'landing';
  });

  useEffect(() => {
    try {
      localStorage.removeItem('ty_active_tab_v7');
    } catch {
      // ignore storage errors
    }
  }, []);

  // Search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ty_profile_v6');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  // Courses
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('ty_courses_v6');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  // Tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('ty_tasks_v6');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  // Market Items
  const [marketItems, setMarketItems] = useState<MarketItem[]>(() => {
    const saved = localStorage.getItem('ty_market_v6');
    return saved ? JSON.parse(saved) : initialMarketItems;
  });

  // Need Requests
  const [needRequests, setNeedRequests] = useState<NeedRequest[]>(() => {
    const saved = localStorage.getItem('ty_needs_v6');
    return saved ? JSON.parse(saved) : initialNeedRequests;
  });

  // Study sessions
  const [studyLogs, setStudyLogs] = useState<StudyLog[]>(() => {
    const saved = localStorage.getItem('ty_study_v6');
    return saved ? JSON.parse(saved) : [];
  });

  // Favorite Items (Marketplace items, courses, tasks)
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('ty_favs_v6');
    return saved ? JSON.parse(saved) : ['m-1', 'c-1', 't-1'];
  });

  // Modals state
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [newTaskInitialType, setNewTaskInitialType] = useState<TaskType>('homework');
  const [isNewMarketModalOpen, setIsNewMarketModalOpen] = useState(false);
  const [isNewNeedModalOpen, setIsNewNeedModalOpen] = useState(false);
  const [isMonetizationModalOpen, setIsMonetizationModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isGolestanModalOpen, setIsGolestanModalOpen] = useState(false);

  // Navigation history stack for global back button
  const [tabHistory, setTabHistory] = useState<string[]>([]);

  const navigateToTab = (newTab: string) => {
    if (newTab === activeTab) return;
    setTabHistory((prev) => [...prev, activeTab]);
    setActiveTab(newTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoBack = () => {
    if (tabHistory.length > 0) {
      const prevTab = tabHistory[tabHistory.length - 1];
      setTabHistory((prev) => prev.slice(0, -1));
      setActiveTab(prevTab);
    } else {
      if (activeTab !== 'dashboard') {
        setActiveTab('dashboard');
      } else {
        setActiveTab('dossier');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyGolestanSchedule = (
    newCourses: Course[],
    options: { mode: 'replace' | 'merge'; updateProfile?: UserProfile }
  ) => {
    if (options.mode === 'replace') {
      setCourses(newCourses);
    } else {
      setCourses((prev) => {
        const newNames = new Set(newCourses.map((c) => c.name.trim().toLowerCase()));
        const kept = prev.filter((c) => !newNames.has(c.name.trim().toLowerCase()));
        return [...kept, ...newCourses];
      });
    }

    if (options.updateProfile) {
      setUser((prev) => ({
        ...prev,
        ...options.updateProfile,
        name: options.updateProfile?.name || prev.name,
        studentId: options.updateProfile?.studentId || prev.studentId,
        university: options.updateProfile?.university || prev.university,
        major: options.updateProfile?.major || prev.major,
      }));
    }

    setIsGolestanModalOpen(false);
    navigateToTab('schedule');
  };

  // Persistence to localStorage
  useEffect(() => {
    localStorage.setItem('ty_profile_v6', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ty_tasks_v6', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('ty_courses_v6', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('ty_market_v6', JSON.stringify(marketItems));
  }, [marketItems]);

  useEffect(() => {
    localStorage.setItem('ty_needs_v6', JSON.stringify(needRequests));
  }, [needRequests]);

  useEffect(() => {
    localStorage.setItem('ty_study_v6', JSON.stringify(studyLogs));
  }, [studyLogs]);

  // Academic Resources Vault & Notes state
  const [resources, setResources] = useState<AcademicResource[]>([]);
  const [notes, setNotes] = useState<ResourceNote[]>([]);
  const [selectedViewerResource, setSelectedViewerResource] = useState<AcademicResource | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);
  const [weeklyGoalHours, setWeeklyGoalHours] = useState<number>(() => {
    const saved = localStorage.getItem('ty_goal_hours');
    return saved ? parseInt(saved, 10) : 15;
  });

  useEffect(() => {
    localStorage.setItem('ty_goal_hours', String(weeklyGoalHours));
  }, [weeklyGoalHours]);

  // Load vault resources and notes on mount
  useEffect(() => {
    loadAllResources().then(setResources);
    loadResourceNotes().then(setNotes);
  }, []);

  const handleRefreshNotes = () => {
    loadResourceNotes().then(setNotes);
  };

  const handleToggleFavoriteResource = async (id: string) => {
    setResources((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
      const target = updated.find((r) => r.id === id);
      if (target) saveResourceToVault(target);
      return updated;
    });
  };

  const handleDeleteResource = async (id: string) => {
    await deleteResourceFromVault(id);
    setResources((prev) => prev.filter((r) => r.id !== id));
    if (selectedViewerResource?.id === id) {
      setSelectedViewerResource(null);
    }
  };

  const handleAddResource = async (newResource: AcademicResource) => {
    await saveResourceToVault(newResource);
    setResources((prev) => [newResource, ...prev.filter((r) => r.id !== newResource.id)]);
  };

  const handleUpdateResource = async (updatedResource: AcademicResource) => {
    await saveResourceToVault(updatedResource);
    setResources((prev) => prev.map((r) => (r.id === updatedResource.id ? updatedResource : r)));
    if (selectedViewerResource?.id === updatedResource.id) {
      setSelectedViewerResource(updatedResource);
    }
  };

  // Deterministic Semester Health Score calculation
  const healthData = useMemo(() => {
    return calculateSemesterHealthScore(tasks, courses, studyLogs, weeklyGoalHours, lang);
  }, [tasks, courses, studyLogs, weeklyGoalHours, lang]);

  // Favorite toggle handler
  const handleToggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Reset to Mockup Demo Data
  const handleResetToSampleData = () => {
    setUser(initialProfile);
    setCourses(initialCourses);
    setTasks(initialTasks);
    setMarketItems(initialMarketItems);
    setNeedRequests(initialNeedRequests);
    setFavoriteIds(['m-1', 'c-1']);
  };

  // Clear all data (blank slate)
  const handleClearAllData = () => {
    setUser({
      name: '',
      studentId: '',
      university: '',
      major: '',
      dormitory: '',
      roomNumber: '',
      avatar: '👨‍🎓',
    });
    setCourses([]);
    setTasks([]);
    setMarketItems([]);
    setNeedRequests([]);
    setStudyLogs([]);
    setFavoriteIds([]);
  };

  // Handlers
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t))
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleAddTask = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleAddCourse = (newCourse: Course) => {
    setCourses((prev) => [...prev, newCourse]);
  };

  const handleUpdateCourseProgress = (courseId: string, progress: number) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, progress } : c))
    );
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
  };

  const handleAddScheduleSlot = (courseId: string, slot: CourseSchedule) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          return { ...c, schedule: [...c.schedule, slot] };
        }
        return c;
      })
    );
  };

  const handleAddMarketItem = (newItem: MarketItem) => {
    setMarketItems((prev) => [newItem, ...prev]);
  };

  const handleAddNeedRequest = (newNeed: NeedRequest) => {
    setNeedRequests((prev) => [newNeed, ...prev]);
  };

  const handleRespondToNeed = (requestId: string) => {
    setNeedRequests((prev) =>
      prev.map((r) =>
        r.id === requestId ? { ...r, responsesCount: r.responsesCount + 1 } : r
      )
    );
  };

  const handleAddStudyLog = (log: StudyLog) => {
    setStudyLogs((prev) => [log, ...prev]);
  };

  const openNewTaskModal = (type: TaskType = 'homework') => {
    setNewTaskInitialType(type);
    setIsNewTaskModalOpen(true);
  };

  const pendingTasksCount = tasks.filter((t) => !t.done).length;

  // Dedicated Academic Business Dossier view for E-commerce university course
  if (activeTab === 'dossier') {
    return (
      <BusinessDossierView
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onSwitchToLiveApp={() => {
          setActiveTab('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  if (activeTab === 'landing') {
    return (
      <LandingPageView
        lang={lang}
        setLang={setLang}
        onLaunchApp={() => navigateToTab('dashboard')}
        onOpenDossier={() => navigateToTab('dossier')}
      />
    );
  }

  return (
    <div className="min-h-screen futuristic-bg text-slate-900 dark:text-[#F1F3FA] flex flex-col lg:flex-row w-full max-w-full overflow-x-clip relative selection:bg-[#663AF3] selection:text-white transition-colors">
      {/* Subtle Atmospheric Lighting Layer (Dark mode only, restrained opacity for visual calm) */}
      {darkMode && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-45" aria-hidden="true">
          <div className="absolute -top-32 end-0 w-[520px] h-[520px] bg-[#663AF3]/10 rounded-full blur-[140px]" />
          <div className="absolute top-[25%] start-0 w-[440px] h-[440px] bg-[#39A7FF]/8 rounded-full blur-[130px]" />
        </div>
      )}

      {/* 1. Navigation Sidebar (Desktop permanent + Mobile slide-over drawer) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={navigateToTab}
        openNeedsCount={needRequests.length}
        marketItemsCount={marketItems.length}
        pendingTasksCount={pendingTasksCount}
        user={user}
        lang={lang}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* 2. Main Content Flow (Header + Dynamic Dashboard) */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top Navbar */}
        <Navbar
          user={user}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          lang={lang}
          setLang={setLang}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
          onOpenNewTaskModal={() => openNewTaskModal('homework')}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onOpenLanding={() => navigateToTab('landing')}
          tasks={tasks}
          onNavigateTab={navigateToTab}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1360px] w-full mx-auto pb-24 lg:pb-8">

          {activeTab === 'dashboard' && (
            <DashboardView
              user={user}
              tasks={tasks}
              courses={courses}
              marketItems={marketItems}
              needRequests={needRequests}
              studyLogs={studyLogs}
              lang={lang}
              healthData={healthData}
              onOpenHealthModal={() => setIsHealthModalOpen(true)}
              onToggleTask={handleToggleTask}
              onNavigateTab={(tab) => {
                if (tab === 'health_score') {
                  setIsHealthModalOpen(true);
                  return;
                }
                navigateToTab(tab);
              }}
              onOpenNewTaskModal={() => openNewTaskModal('homework')}
              onOpenNewMarketModal={() => setIsNewMarketModalOpen(true)}
              onOpenProfileModal={() => setIsProfileModalOpen(true)}
              onOpenGolestanModal={() => setIsGolestanModalOpen(true)}
              onAddStudyLog={handleAddStudyLog}
            />
          )}

          {activeTab === 'resources' && (
            <AcademicResourcesView
              resources={resources}
              courses={courses}
              lang={lang}
              onOpenUploadModal={() => setIsUploadModalOpen(true)}
              onOpenResourceViewer={(res) => setSelectedViewerResource(res)}
              onToggleFavorite={handleToggleFavoriteResource}
              onDeleteResource={handleDeleteResource}
              onQuickShare={(res) => setSelectedViewerResource(res)}
              onBack={handleGoBack}
            />
          )}

          {activeTab === 'health_score' && (
            <div className="space-y-6">
              <SemesterHealthScoreCard
                healthData={healthData}
                lang={lang}
                onOpenAnalysisModal={() => setIsHealthModalOpen(true)}
                onNavigateTab={(tab: string) => navigateToTab(tab)}
              />
            </div>
          )}

          {activeTab === 'marketplace' && (
            <MarketplaceView
              items={marketItems}
              onOpenNewModal={() => setIsNewMarketModalOpen(true)}
              onOpenNeedRequestTab={() => navigateToTab('need_requests')}
              searchQuery={searchQuery}
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
              onBack={handleGoBack}
            />
          )}

          {activeTab === 'favorites' && (
            <FavoritesView
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
              marketItems={marketItems}
              courses={courses}
              tasks={tasks}
              lang={lang}
              onNavigateTab={(tab) => navigateToTab(tab)}
              onBack={handleGoBack}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              user={user}
              onSaveProfile={setUser}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              lang={lang}
              setLang={setLang}
              onResetToSampleData={handleResetToSampleData}
              onClearAllData={handleClearAllData}
              onOpenGolestanModal={() => setIsGolestanModalOpen(true)}
              onBack={handleGoBack}
            />
          )}

          {activeTab === 'need_requests' && (
            <NeedRequestsView
              requests={needRequests}
              onOpenNewNeedModal={() => setIsNewNeedModalOpen(true)}
              onRespondToNeed={handleRespondToNeed}
              onBack={handleGoBack}
            />
          )}

          {activeTab === 'schedule' && (
            <WeeklyScheduleView
              courses={courses}
              onAddScheduleSlot={handleAddScheduleSlot}
              lang={lang}
              onOpenGolestanModal={() => setIsGolestanModalOpen(true)}
              onBack={handleGoBack}
            />
          )}

          {activeTab === 'courses' && (
            <CoursesView
              courses={courses}
              onAddCourse={handleAddCourse}
              onUpdateCourseProgress={handleUpdateCourseProgress}
              onDeleteCourse={handleDeleteCourse}
              onOpenGolestanModal={() => setIsGolestanModalOpen(true)}
              onBack={handleGoBack}
            />
          )}

          {activeTab === 'tasks' && (
            <TasksView
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onOpenNewTaskModal={openNewTaskModal}
              isExamOnly={false}
              onBack={handleGoBack}
            />
          )}

          {activeTab === 'exams' && (
            <TasksView
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onOpenNewTaskModal={() => openNewTaskModal('exam')}
              isExamOnly={true}
              onBack={handleGoBack}
            />
          )}

          {(activeTab === 'timer' || activeTab === 'statistics' || activeTab === 'reports') && (
            <FocusTimerView
              courses={courses}
              studyLogs={studyLogs}
              onAddStudyLog={handleAddStudyLog}
              lang={lang}
              onBack={handleGoBack}
            />
          )}
        </main>

        {/* 3. Mobile Thumb Floating Navigation Bar (Hidden on desktop lg+) */}
        <nav
          aria-label={lang === 'fa' ? 'ناوبری سریع موبایل' : 'Mobile quick navigation'}
          className="lg:hidden fixed bottom-3 inset-x-3 z-40 bg-white/95 dark:bg-[#0D1324]/95 backdrop-blur-lg rounded-2xl p-1.5 flex items-center justify-around shadow-lg border border-slate-200 dark:border-white/[0.1] select-none"
        >
          <button
            type="button"
            onClick={() => navigateToTab('dashboard')}
            className={`flex flex-col items-center gap-1 text-[10px] py-1.5 px-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-[#663AF3]/12 dark:bg-[#663AF3]/22 text-[#663AF3] dark:text-[#C9BAFF] font-bold'
                : 'text-slate-500 dark:text-[#A6AEC3] hover:text-slate-900 dark:hover:text-[#F1F3FA] font-medium'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{lang === 'fa' ? 'داشبورد' : 'Home'}</span>
          </button>

          <button
            type="button"
            onClick={() => navigateToTab('resources')}
            className={`flex flex-col items-center gap-1 text-[10px] py-1.5 px-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'resources'
                ? 'bg-[#663AF3]/12 dark:bg-[#663AF3]/22 text-[#663AF3] dark:text-[#C9BAFF] font-bold'
                : 'text-slate-500 dark:text-[#A6AEC3] hover:text-slate-900 dark:hover:text-[#F1F3FA] font-medium'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{lang === 'fa' ? 'منابع درسی' : 'Vault'}</span>
          </button>

          <button
            type="button"
            onClick={() => navigateToTab('tasks')}
            className={`flex flex-col items-center gap-1 text-[10px] py-1.5 px-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'tasks'
                ? 'bg-[#663AF3]/12 dark:bg-[#663AF3]/22 text-[#663AF3] dark:text-[#C9BAFF] font-bold'
                : 'text-slate-500 dark:text-[#A6AEC3] hover:text-slate-900 dark:hover:text-[#F1F3FA] font-medium'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>{lang === 'fa' ? 'تکالیف' : 'Tasks'}</span>
          </button>

          <button
            type="button"
            onClick={() => navigateToTab('schedule')}
            className={`flex flex-col items-center gap-1 text-[10px] py-1.5 px-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'schedule'
                ? 'bg-[#663AF3]/12 dark:bg-[#663AF3]/22 text-[#663AF3] dark:text-[#C9BAFF] font-bold'
                : 'text-slate-500 dark:text-[#A6AEC3] hover:text-slate-900 dark:hover:text-[#F1F3FA] font-medium'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>{lang === 'fa' ? 'برنامه' : 'Schedule'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center gap-1 text-[10px] font-medium py-1.5 px-3 rounded-xl text-slate-500 dark:text-[#A6AEC3] hover:text-slate-900 dark:hover:text-[#F1F3FA] transition-colors cursor-pointer"
          >
            <Menu className="w-4 h-4" />
            <span>{lang === 'fa' ? 'بیشتر' : 'More'}</span>
          </button>
        </nav>
      </div>

      {/* Global Modals */}
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        onAddTask={handleAddTask}
        courses={courses}
        initialType={newTaskInitialType}
      />

      <NewMarketItemModal
        isOpen={isNewMarketModalOpen}
        onClose={() => setIsNewMarketModalOpen(false)}
        onAddItem={handleAddMarketItem}
        userDorm={user.dormitory || 'خوابگاه دانشجو'}
        userName={user.name || 'Alex Morgan'}
      />

      <NewNeedRequestModal
        isOpen={isNewNeedModalOpen}
        onClose={() => setIsNewNeedModalOpen(false)}
        onAddNeed={handleAddNeedRequest}
        userDorm={user.dormitory || 'خوابگاه دانشجو'}
        userName={user.name || 'Alex Morgan'}
      />

      <MonetizationPitchModal
        isOpen={isMonetizationModalOpen}
        onClose={() => setIsMonetizationModalOpen(false)}
        onGoToMarket={() => setActiveTab('marketplace')}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onSaveProfile={setUser}
      />

      {/* Module 1: PDF & Document Reader with Notes & Sharing */}
      <PdfViewerModal
        isOpen={!!selectedViewerResource}
        onClose={() => setSelectedViewerResource(null)}
        resource={selectedViewerResource}
        notes={notes}
        onRefreshNotes={handleRefreshNotes}
        onUpdateResource={handleUpdateResource}
        lang={lang}
      />

      {/* Module 1: Upload Academic Resource Modal */}
      <UploadResourceModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        courses={courses}
        userName={user.name || 'Alex Morgan'}
        onAddResource={handleAddResource}
        lang={lang}
      />

      {/* Module 2: Intelligent Semester Health Score Diagnostics Modal */}
      <SemesterHealthScoreModal
        isOpen={isHealthModalOpen}
        onClose={() => setIsHealthModalOpen(false)}
        healthData={healthData}
        lang={lang}
        onNavigateTab={(tab) => {
          setIsHealthModalOpen(false);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onUpdateGoalHours={(hours) => setWeeklyGoalHours(hours)}
      />

      {/* Feature 1: Intelligent Golestan Schedule Extraction & OCR Modal */}
      <GolestanScheduleImportModal
        isOpen={isGolestanModalOpen}
        onClose={() => setIsGolestanModalOpen(false)}
        onApplySchedule={handleApplyGolestanSchedule}
        currentCourses={courses}
        currentUser={user}
        lang={lang}
      />
    </div>
  );
}
