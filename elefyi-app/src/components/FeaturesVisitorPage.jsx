import { 
    ClipboardDocumentCheckIcon, // Task Management
    ClockIcon, // Smart Scheduling & Reminders
    UsersIcon, // Real-Time Collaboration
  } from '@heroicons/react/24/solid';

  import Image from '../Images/image.png'

export default function Features() {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-20 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_bottom,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base/7 font-semibold text-[#05b0d6]">Stay Organized</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                Boost Productivity with Elefyi
              </h1>
              <p className="mt-6 text-xl/8 text-gray-700">
              Effortlessly manage tasks, collaborate with your team,
               and stay on top of your deadlines—all in one powerful platform.
              </p>
            </div>
          </div>
        </div>
        <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            alt=""
            src={Image}
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem]"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
              <p>
              Elefyi simplifies task management by offering an intuitive platform where employees can create,
               assign, and track tasks effortlessly. Whether you are working individually or in a team,
                Elefyi ensures you stay organized with smart scheduling, real-time collaboration, 
                and automated reminders.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <ClipboardDocumentCheckIcon aria-hidden="true" className="mt-1 size-5 flex-none text-[#05b0d6]" />
                  <span>
                    <strong className="font-semibold text-gray-900">Effortless Task Management</strong> Quickly create tasks, set priorities,
                     and assign them to team members with a few clicks.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ClockIcon aria-hidden="true" className="mt-1 size-5 flex-none text-[#05b0d6]" />
                  <span>
                    <strong className="font-semibold text-gray-900">Smart Scheduling & Automated Reminders</strong> Stay ahead of deadlines with intelligent 
                    scheduling. Elefyi sends automatic reminders for upcoming tasks, ensuring that nothing is forgotten. 
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <UsersIcon aria-hidden="true" className="mt-1 size-5 flex-none text-[#05b0d6]" />
                  <span>
                    <strong className="font-semibold text-gray-900"> Real-Time Collaboration</strong> Work together with your team using shared task lists and real-time updates.
                     track progress and leave comments to streamline communication
                  </span>
                </li>
              </ul>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Why Choose Elefyi?</h2>
              <p className="mt-6">
              Elefyi is more than just a task manager—it’s your personal productivity assistant.
               By integrating automation, collaboration, and security, Elefyi empowers teams to work smarter,
                not harder. Get started today and experience a seamless, stress-free approach to task management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
