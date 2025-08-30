import { Button } from "@/components/ui/button";

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
import { useLoginMutation } from "@/Redux/feature/auth/auth.api";
import { toast } from "sonner";

const LoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string(),
});

export function LoginForm({

}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof LoginSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { reset } = form;

  const [Login] = useLoginMutation();
  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {

     await Login(data).unwrap();
    
      toast.success("User Logged In SuccessFully");

      navigate("/");
      reset();
      

    
  
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
            Login
          </Button>
          <p className="m-2">or login With Google</p>
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
          Your are New?
          <b className="text-green-400 m-2">
            <Link to="/register">Register Here</Link>
          </b>
        </p>
      </div>
    </div>
  );
}
