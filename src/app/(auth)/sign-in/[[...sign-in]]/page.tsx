import { SignIn } from "@clerk/nextjs"

const page = () => {
  return (
    <main className="h-svh flex items-center justify-center">
        <SignIn/>
    </main>
  )
}

export default page