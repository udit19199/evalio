export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#fffdf5] text-[#1a1a1a] selection:bg-[#ffde59] selection:text-black font-sans">
      {children}
    </div>
  );
}
