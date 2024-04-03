import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-4xl font-bold">Gaurav ChatApp</h1>
      <div>
      <h2 className="mt-5">Public</h2>
      <div className="mt-1 flex  gap-2">
        <Link href="/chat/1">
          <h3 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Start Chat
          </h3>
        </Link>

        <Link href="/groups">
          <h3 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Groups
          </h3>
        </Link>

        <Link href="/login">
          <h3 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </h3>
        </Link>
      </div>
      <h2 className="mt-5">Admin Only</h2>
      <div className="mt-2 flex  gap-2">
        <Link href="/admin">
          <h3 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Admin
          </h3>
        </Link>
        <Link href="/admin/chats">
          <h3 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Chats
          </h3>
        </Link>
        <Link href="/admin/messages">
          <h3 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Messages
          </h3>
        </Link>
        <Link href="/admin/dashboard">
          <h3 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Dashboard
          </h3>
        </Link>

        <Link href="/admin/users">
          <h3 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Users
          </h3>
        </Link>
      </div>
      </div>
    </main>
  );
}
