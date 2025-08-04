import { Film } from "lucide-react";

export default function Navbar() {
  return (
    <div className="border sticky top-0 bg-background z-10">
      <div className="flex justify-between h-16 items-center max-w-[1200px] m-auto px-4">
        <div className="flex gap-0.5 items-center text-lg font-bold">
          <Film />
          <p>MovieVault</p>
        </div>
      </div>
    </div>
  )
}