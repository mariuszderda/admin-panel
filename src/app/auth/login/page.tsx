import { SignIn } from "@/components/sign-in";

const LoginPage = () => {
  return (
    <div className="flex  h-screen w-full flex-col">
      <main className="flex items-center justify-center flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <SignIn />
      </main>
    </div>
  );
};

export default LoginPage;
