import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const Menu = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        console.log("logout");
        navigate("/");
        
    }
return(
    <div>
        <Button onClick={handleLogout}>Logout</Button>
    </div>
);
}