import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { login } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  user: z.string().min(2, {
    message: "Nome de usuario deve ter pelo menos 2 caracters.",
  }),
  pass: z.string().min(2, {
    message: "Senha deve ter pelo menos 2 caracters.",
  }),
});
export default function LoginForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      user: "",
      pass: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const log = login(data);
    if (log) {
      toast({
        title: "Login efetuado com sucesso",
      });
      navigate("/");
    } else {
      toast({
        variant: "destructive",
        title: "Falha!",
        description: "Login ou senha incorretos",
      });
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen bg-zinc-900">
        <Card className="w-[40%] h-[60%]">
          <CardHeader>
            <CardTitle className="text-4xl">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" space-y-6"
              >
                <FormField
                  control={form.control}
                  name="user"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nome de usuario: <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="E-mail" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Senha: <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Digite sua senha" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex justify-center">
                  <Button type="submit">Login</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
