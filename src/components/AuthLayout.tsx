import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left Panel */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-12 flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-12">SwiftPay</h1>

          <h2 className="text-4xl font-bold leading-tight mb-6">
            Master your finances with speed and security.
          </h2>

          <p className="text-blue-100 text-lg">
            Join over 2 million users worldwide who trust SwiftPay for their
            daily transactions and global transfers.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
          <p className="italic text-sm">
            "SwiftPay has completely transformed how I manage my international
            payments."
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
