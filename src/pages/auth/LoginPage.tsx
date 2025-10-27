import { useState } from "react";
import InputText, { InputTextSize } from "../../component/form/InputText";
import authApi from "../../api/auth/auth";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";


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

    authApi.login(loginRequest)
      .then(() => {
        navigate("/main");
      })
      .catch((err) => {
        console.log(err);
        alert("로그인 오류");
      });
  }

  return (
    <>
    <Helmet>
      <title>세진정판 - 로그인</title>
    </Helmet>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full p-6 max-w-md mx-auto my-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">세진정판</h2>
          <div className="grid gap-4">
            <InputText 
              name="loginId"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              size={InputTextSize.Full}
              placeholder="아이디"
            />
            <InputText
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size={InputTextSize.Full}
              type="password"
              placeholder="비밀번호"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
            />
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
