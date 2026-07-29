import { io } from "socket.io-client";
import Cookies from "cookie-universal";
import { baseURL } from "../../../../services/Api/api";

const cookies = Cookies();

const socket = io(baseURL, {
    extraHeaders: {
        token: cookies.get("token-client"),
    },
});

export default socket;