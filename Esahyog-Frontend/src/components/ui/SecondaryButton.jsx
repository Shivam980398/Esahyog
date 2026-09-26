function SecondaryButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={
        "inline-flex items-center justify-center px-4 py-2 rounded-md border border-card text-sm text-muted hover:bg-slate-100 transition " +
        className
      }
    >
      {children}
    </button>
  );
}
export default SecondaryButton;
