export function Feature({ icon, title, desc }: any) {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
        {icon}
      </div>
      <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
  );
}
