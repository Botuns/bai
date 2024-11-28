import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Facebook, Instagram } from "lucide-react";
import { useAuthStore } from "@/app/providers/stores/authStore";

export function AuthModal() {
  const { modalOpen, closeModal, login } = useAuthStore();
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username);
    closeModal();
  };

  const handleOAuthLogin = (provider: string) => {
    login(`${provider}User`);
    closeModal();
  };

  return (
    <Dialog open={modalOpen !== null} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {modalOpen === "login" ? "Log In" : "Sign Up"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input placeholder="Password" type="password" />
          <Button type="submit" className="w-full">
            {modalOpen === "login" ? "Log In" : "Sign Up"}
          </Button>
        </form>
        <div className="mt-4">
          <p className="text-center text-sm text-gray-500 mb-2">
            Or continue with
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleOAuthLogin("Google")}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleOAuthLogin("Facebook")}
            >
              <Facebook className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleOAuthLogin("Instagram")}
            >
              <Instagram className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
