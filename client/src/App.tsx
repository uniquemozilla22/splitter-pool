import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FetchGroup from "./pages/group/[id]";
import CreateGroup from "./pages/group/create-group";
import AllGroups from "./pages/group";
import BottomNav from "./components/BottomNavigation";
import TopBar from "./components/TopBar";
import Settings from "./pages/settings";
import Login from "./pages/login";
import { AuthProvider, useAuth } from "./user/authcontext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <TopBar />
        <div className="pb-20 h-screen flex flex-col justify-center bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/groups"
              element={
                <ProtectedRoute>
                  <AllGroups />
                </ProtectedRoute>
              }
            />
            <Route
              path="/groups/create-group"
              element={
                <ProtectedRoute>
                  <CreateGroup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/groups/:id"
              element={
                <ProtectedRoute>
                  <FetchGroup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <AllGroups />
                </ProtectedRoute>
              }
            />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
