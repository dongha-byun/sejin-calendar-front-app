import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  const { isLoggedIn, logout } = useAuth();

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">홈 화면</h1>
        <p className="mb-4">로그인 성공! 🎉</p>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default App;
