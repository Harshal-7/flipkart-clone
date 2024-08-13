"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { RegisterSchema } from "@/schema/RegisterSchema";
import { register } from "@/app/actions/register";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    register(values).then((res) => {
      if (res.error) {
        toast({
          title: "User Registeration Failed",
          description: res.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: res.success,
          description: "Login to access dashboard",
        });
        setLoading(false);
        router.replace(`/login`);
      }
    });
  };

  return (
    <div className="w-full px-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter Name"
                    className="border-b rounded-none focus:border-b-blue-500 focus:placeholder:-top-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter Email"
                    type="email"
                    className="border-b rounded-none focus:border-b-blue-500 focus:placeholder:-top-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter Password"
                    type="password"
                    className="border-b rounded-none focus:border-b-blue-500 focus:placeholder:-top-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4">
            <div className="text-xs text-muted-foreground ">
              By continuing, you agree to Flipkart&apos;s{" "}
              <a
                className="text-blue-500"
                target="_blank"
                href="https://www.flipkart.com/pages/terms"
              >
                Terms of Use
              </a>{" "}
              and{" "}
              <a
                className="text-blue-500"
                target="_blank"
                href="https://www.flipkart.com/pages/privacypolicy"
              >
                Privacy Policy.
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#fb641b] text-white p-3 font-semibold hover:bg-[#fb641b]/90"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <span>CONTINUE</span>
              )}
            </button>
          </div>
        </form>

        <button
          onClick={() => router.push("/login")}
          className="w-full text-sm bg-white text-blue-500 border shadow-md p-3 font-semibold hover:shadow-lg mt-4"
        >
          Existing User? Log in
        </button>
      </Form>
    </div>
  );
};

export default RegisterForm;
