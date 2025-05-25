import { useState } from "react";
import InputText from "../../component/input/InputText";
import { authService } from "../../api/auth/authService";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const loginRequest = {
      loginId: loginId,
      password: password
    };
    console.log(loginRequest);
    authService.login(loginRequest).then(() => {
      navigate("/main");
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-3xl mx-auto my-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">세진정판</h2>
      <div className="grid grid-cols-2 gap-4">
        <InputText 
          label="아이디" 
          name="loginId" 
          placeholder="아이디" 
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
        <InputText 
          label="비밀번호" 
          name="password" 
          placeholder="비밀번호" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </div>
      <div>
        <button 
          type="button" 
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleSubmit}  
        >
          로그인
        </button>
      </div>
    </div>
  );
}
