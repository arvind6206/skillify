const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center
      bg-linear-to-br from-indigo-100  to-indigo-500 px-4">
      {children}
    </div>
  );
};

export default AuthLayout;