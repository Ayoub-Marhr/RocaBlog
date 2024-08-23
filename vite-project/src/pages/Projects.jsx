import { getRandomCallToAction } from './PostPage';

export default function Projects() {
  const RandomCallToAction = getRandomCallToAction();

  return (
    <>
      <div className="mt-20 max-w-4xl mx-auto w-full mb-16 p-8 bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-2xl rounded-lg border border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-3xl">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-6 text-center">
            Our Latest Projects
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-10 text-center max-w-4xl px-4">
            Explore our recent projects that showcase our dedication to excellence and innovation. Our team utilizes the latest technology to deliver exceptional results.
          </p>
          <div className="w-full flex justify-center">
            <RandomCallToAction />
          </div>
        </div>
      </div>
    </>
  );
}
