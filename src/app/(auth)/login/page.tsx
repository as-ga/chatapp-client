"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "@/constants/config";
import { useDispatch } from "react-redux";
import { userExists } from "@/redux/reducers/auth";

export default function LoginForm() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loding, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${server}/api/v1/user/login`, user);
      // console.log("Login success", response.data);
      toast.success("Login success");
      dispatch(userExists(response.data));
      setUser({ username: "", password: "" });
      router.push("/");
    } catch (error: any) {
      // console.log(error);
      toast.error("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.username.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return loding ? (
    <div>Loading...</div>
  ) : (
    <Card className="mt-5 mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="username"
              value={user.username}
              placeholder="Enter your username"
              required
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={user.password}
              required
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full" onClick={onLogin}>
            {buttonDisabled ? "Enter your username" : "Login"}
          </Button>
          {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
