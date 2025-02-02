import {Link} from "react-router-dom";

export default function CtaSection() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-10 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900  shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex justify-center lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            >
              <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#05b0d6" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-20 lg:text-left">
              <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
              “...it’s going to do things you didn’t think were possible.”
              </h2>
              <p className="mt-6 text-lg/8 text-center text-gray-300">
              Start using Elefyi today and experience a smarter way to manage your work and time
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-center">
                <Link
                  to="/signup"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Start For Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  