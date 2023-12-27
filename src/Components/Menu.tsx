import { DropdownMenu } from "@radix-ui/themes";
import { Button as RadixButton } from "@radix-ui/themes";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const Menu = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        console.log("logout");
        navigate("/");
        
    }
return(
    <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      <Button >
        Options
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Item shortcut="⌘ E">Add Class</DropdownMenu.Item>
      <DropdownMenu.Item shortcut="⌘ D">Flash Cards</DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item shortcut="⌘ N">AI companion</DropdownMenu.Item>

      <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
        <DropdownMenu.SubContent>
          <DropdownMenu.Item>Edit Class</DropdownMenu.Item>
          <DropdownMenu.Item>Remove Class</DropdownMenu.Item>
        </DropdownMenu.SubContent>
      </DropdownMenu.Sub>

      <DropdownMenu.Separator />
      <DropdownMenu.Item>Share</DropdownMenu.Item>
      <DropdownMenu.Item onClick={handleLogout}>Logout</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
);
}