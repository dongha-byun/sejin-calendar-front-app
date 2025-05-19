
import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/auth/authService";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "../context/AuthContext";

export const useLogin = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: authService.login,
        onSuccess: (data) => {  
            console.log(data);
            if(data && data.accessToken) {
                localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
                navigate('/main');
            }
        },
        onError: (err) => {
            alert(err.message);
        }
    });
}