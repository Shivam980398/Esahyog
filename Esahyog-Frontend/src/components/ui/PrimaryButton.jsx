function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={
        "inline-flex items-center justify-center px-4 py-2 rounded-md bg-accent text-on-accent text-sm font-medium shadow-sm hover:bg-accent-hover transition " +
        className
      }
    >
      {children}
    </button>
  );
}
export default PrimaryButton;
