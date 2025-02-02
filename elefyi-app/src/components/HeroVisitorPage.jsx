import {Link} from "react-router-dom";
import Image from '../Images/image.png';
import userImage from '../Images/user.png';

  
  export default function HeroVisitorPage() {
    return (
      <div className="relative bg-gray-50">
    <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
        <img className="w-auto h-full" src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png" alt="" />
    </div>
    

    <section className="relative  py-12 sm:py-16 lg:pt-30 lg:pb-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 gap-y-8 lg:items-center lg:grid-cols-2 sm:gap-y-20 xl:grid-cols-5">
                <div className="text-center xl:col-span-2 lg:text-left md:px-16 lg:px-0">
                    <div className="max-w-sm mx-auto sm:max-w-md md:max-w-full">
                        <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">Streamline Your Workflow with  <span className="text-[#05b0d6]">Elefyi</span></h1>

                        <div className="mt-8 lg:mt-12 lg:flex lg:items-center">
                            <div className="flex justify-center flex-shrink-0 -space-x-4 overflow-hidden lg:justify-start">
                                <img className="inline-block rounded-full w-16 h-16 ring-1 ring-white" src={userImage} alt="" />
                                <img className="inline-block rounded-full w-16 h-16 ring-1 ring-white" src={userImage} alt="" />
                                <img className="inline-block rounded-full w-16 h-16 ring-1 ring-white" src={userImage} alt="" />
                            </div>

                            <p className="mt-4 text-lg text-gray-900 lg:mt-0 lg:ml-4 font-pj">Join with <span className="font-bold">3200+ Employess</span> and start managening your tasks right now</p>
                        </div>
                    </div>

                    <div className="mt-8 sm:flex sm:items-center sm:justify-center lg:justify-start sm:space-x-5 lg:mt-12">
                        <Link
                            to="/signup"
                            title=""
                            className="inline-flex items-center px-6 py-3 text-md font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj justif-center hover:bg-gray-600"
                            role="button"
                        >
                            Get Started
                        </Link>

                        <a
                            href="#"
                            title=""
                            className="inline-flex items-center px-3 py-3 mt-4 text-md font-bold transition-all duration-200 bg-transparent border border-transparent sm:mt-0 font-pj justif-center rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 hover:bg-gray-200 focus:bg-gray-200"
                            role="button"
                        >
                            Veiw App Demo
                            <div className=" ml-3 mt-1 ">
                            <i className='bx bxs-right-arrow'></i>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="xl:col-span-3">
                    <img className="w-full mx-auto scale-90" src={Image} alt="" />
                </div>
            </div>
        </div>
    </section>
</div>
    )
  }
  