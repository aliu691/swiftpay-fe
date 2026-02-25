import { ReactNode } from "react";
import { Wallet } from "lucide-react";
import Logo from "./Logo";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex bg-[#f4f6f9]">
      {/* Left Panel */}
      <div className="relative hidden lg:flex w-1/2 text-white p-16 flex-col justify-between overflow-hidden bg-deep-blue">
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid-overlay w-full h-full" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <Logo size="lg" light />
          </div>

          <h2 className="text-5xl font-bold leading-tight mb-8">
            Master your finances with speed and security.
          </h2>

          <p className="text-blue-100 text-lg max-w-md leading-relaxed">
            Join over 2 million users worldwide who trust SwiftPay for their
            daily transactions and global transfers.
          </p>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 max-w-md">
          <p className="italic text-sm text-blue-100">
            "SwiftPay has completely transformed how I manage my international
            payments."
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
          {children}
        </div>
      </div>
    </div>
  );
}
