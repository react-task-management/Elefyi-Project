export default function StepsSection() {
    return (
        <section className="py-10 bg-white sm:py-16 lg:py-24">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">How does it work?</h2>
            <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">Master Your Tasks with Elefyi in 3 Steps</p>
        </div>

        <div className="relative mt-12 lg:mt-20">
            <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg" alt="" />
            </div>

            <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                <div>
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 hover:border-[10px] hover:border-[#05b0d6] rounded-full shadow">
                        <span className="text-xl font-semibold text-gray-700"> 1 </span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Sign Up & Set Up Your Workspace</h3>
                    <p className="mt-4 text-base text-gray-600">Create a free account and customize your dashboard to match your workflow.</p>
                </div>

                <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 hover:border-[10px] hover:border-[#05b0d6] rounded-full shadow">
                        <span className="text-xl font-semibold text-gray-700"> 2 </span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Manage Your Tasks & Projects</h3>
                    <p className="mt-4 text-base text-gray-600">Add tasks, assign deadlines, and collaborate with your team efficiently.</p>
                </div>

                <div>
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 hover:border-[10px] hover:border-[#05b0d6] rounded-full shadow">
                        <span className="text-xl font-semibold text-gray-700"> 3 </span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Track Progress & Stay Organized</h3>
                    <p className="mt-4 text-base text-gray-600">Get real-time insights, stay on top of your work, and boost productivity.</p>
                </div>
            </div>
        </div>
    </div>
</section>

    );
};