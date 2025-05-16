import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import Layout from "./pages/Layout";

function App() {
  const { isLoggedIn, logout } = useAuth();

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
          로그아웃
      </button>
      <Layout></Layout>
    </>
  );
}

export default App;
