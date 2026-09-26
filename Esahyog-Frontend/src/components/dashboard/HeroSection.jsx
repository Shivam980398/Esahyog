import MapComponent from "../map.jsx";
import { useAuth } from "../../features/auth/useAuth";

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <div className="bg-slate-900 text-white shadow-md transition-shadow duration-300 pt-6">
      <div className="px-10 pb-10 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Unifying City Services,
            <br />
            One Click at a Time
          </h1>
          <p className="text-sm text-slate-300">
            Experience seamless city services, stay informed, and contribute to
            a smarter future.
          </p>
          <div className="flex gap-3 pt-1">
            {user ? (
              <div className="flex gap-1 border border-slate-500">
                <h1 className="px-5 py-2  bg-sky-500 hover:bg-sky-600 text-sm font-medium">
                  Welcome Back
                </h1>
                <h2 className="px-5 py-2 rounded-lg  text-sm font-medium hover:bg-slate-800">
                  {user?.fullName || user?.username}
                </h2>
              </div>
            ) : (
              <div className="flex gap-3">
                <button className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-sm font-medium">
                  Explore Services
                </button>
                <button className="px-5 py-2 rounded-lg border border-slate-500 text-sm font-medium hover:bg-slate-800">
                  Learn More
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative w-64 h-40 md:w-72 md:h-48 rounded-2xl bg-slate-800/80 border border-cyan-500/40 overflow-hidden hover:">
            {user ? (
              <div className="absolute inset-0 ">
                <MapComponent></MapComponent>
              </div>
            ) : (
              <div className="absolute inset-6 grid grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-cyan-500/80 rounded-md" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
