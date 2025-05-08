import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <BarChart3 className="h-5 w-5 text-primary" />
          <span>SpendLens</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="sm" render={<Link href="/#how-it-works" />}>
            How it works
          </Button>
          <Button size="sm" render={<Link href="/audit" />}>
            Start free audit
          </Button>
        </nav>
      </div>
    </header>
  );
}
