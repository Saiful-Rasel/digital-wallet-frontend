import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import Password from "../../components/Password";
import { Link, useNavigate } from "react-router";
import { z } from "zod";


import { toast } from "sonner";
import { useRegisterMutation } from "../../Redux/feature/auth/auth.api";

const RegisterSchema = z.object({
  name: z.string(),
  email: z.email("Invalid email address"),
  password: z.string(),
});

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [userRegister] = useRegisterMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { reset } = form;
  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await userRegister(userInfo).unwrap();

      toast.success(
        "User Register SuccessFully And Register Bonus You Get 50 Taka Into Your Wallet"
      );
      reset();
      navigate("/login");
    } catch (error ) {
      
       toast.error("User Already Exist");
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jhon Doe" type="text" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jhon Doe@gmail.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Password field={field} />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-4 w-full" type="submit">
            Sing Up
          </Button>
        </form>
      </Form>
      <div>
        <div>
          {/* <Button
              variant="outline"
              type="button"
              className="w-full cursor-pointer"
              onClick={() => window.open(`${config.baseUrl}/auth/google`)}
            >
              Google Login
            </Button> */}
        </div>
        <p className="mt-2 lg:mt-4">
          Already Have An Account?
          <b className="text-green-400 m-2">
            <Link to="/login">Login Here</Link>
          </b>
        </p>
      </div>
    </div>
  );
}
