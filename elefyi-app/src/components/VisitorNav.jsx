
import { Link } from 'react-router-dom';
import logo from "../Images/logo.png";


const VisitorNav = () => {
  return (
    <header className="absolute top-5 mt-5 z-30 w-full md:top-6" id='navvisit'>
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(theme(colors.gray.100),theme(colors.gray.200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
        {/* Site branding */}
        <div className="relative flex items-center">
  <Link to="/" className="relative flex items-center">
   {/* Logo Image */}
   <img src={logo} alt="Logo" className="h-15 w-15 relative z-10" />
    {/* Page Name (Behind the Logo) */}
    <span className=" text-3xl font-bold  select-none">
      Elefyi
    </span>
  </Link>
</div>


<ul className="flex flex-1 items-center justify-end gap-4">
   {/* About Link (Simple Text Link) */}
   <li>
    <Link
      to="/about"
      className="text-gray-800 font-medium hover:text-blue-600 transition duration-300"
    >
      About
    </Link>
  </li>
  {/* Register Button */}
  <li>
    <Link
      to="/signup"
      className="px-4 py-2 text-white text-sm font-semibold bg-[#000000] rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-lg "
    >
      Register
    </Link>
  </li>
</ul>

      </div>
    </div>
  </header>
  );
};

export default VisitorNav;