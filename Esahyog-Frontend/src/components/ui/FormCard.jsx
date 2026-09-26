function FormCard({ icon, title, children }) {
  return (
    <div
      className="w-full max-w-sm  border  rounded-2xl 
      bg-white/5
    backdrop-blur-lg
    shadow-[0_18px_45px_rgba(15,23,42,0.18)] p-6"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="h-9 w-9 rounded-full bg-accent/10 flex items-center justify-center border border-card">
          {icon}
        </div>
        <p className="font-semibold text-sm text-main">{title}</p>
      </div>
      {children}
    </div>
  );
}
export default FormCard;
