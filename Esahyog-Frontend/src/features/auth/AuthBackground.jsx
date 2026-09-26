function AuthBackground({ children }) {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/src/assets/img/signup-bg.png')",
      }}
    >
      <div className="min-h-screen w-full bg-black/20 flex items-center justify-center px-4 py-8">
        {children}
      </div>
    </div>
  );
}

export default AuthBackground;
