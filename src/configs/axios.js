import axios from "axios";
import useToken from "../common/hooks/useToken";
import { jwtDecode } from "jwt-decode";
import { dispatch } from "../redux/store";
import { saveToken } from "../redux/slices/auth";
// import jwt_decode from "jwt-decode";

// Tạo một instance Axios
const instanceAxios = axios.create({
    baseURL: "https://uniqlo-be-f348.onrender.com", // URL cơ sở của API
    timeout: 5000, // Thời gian timeout cho mỗi request là 5 giây
});

// Thêm một interceptor cho request
instanceAxios.interceptors.request.use(
    async (config) => {
        const [access_token, refresh_token] = useToken();
        const accessToken = localStorage.getItem("accessToken") || access_token;

        let date = new Date();
        const decodedAccessToken = jwtDecode(accessToken);
        if (decodedAccessToken.exp < date.getTime() / 1000) {
            const [newAccessToken, newRefreshToken] = await refreshToken(
                refresh_token
            );
            dispatch(
                saveToken({
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                })
            );
            config.headers.Authorization = `Bearer ${newAccessToken}`;
        } else {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Hàm để refresh token
const refreshToken = async (refresh_token) => {
    try {
        const response = await axios.post(
            "https://uniqlo-be-f348.onrender.com/auth/refresh_token",
            null,
            {
                headers: {
                    Authorization: `Bearer ${refresh_token}`,
                },
            }
        );
        const { accessToken, refreshToken } = response.data.data;
        return [accessToken, refreshToken];
    } catch (error) {
        console.log("Error refreshing token:", error);
    }
};

export default instanceAxios;
