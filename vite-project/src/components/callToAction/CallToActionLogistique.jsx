import { Button } from "flowbite-react";

export default function CallToActionLogistique() {
  return (
    <div className="flex flex-col sm:flex-row border border-teal-800 justify-center items-center rounded-tl-3xl rounded-br-3xl p-4">
      <div className="flex-1 flex flex-col justify-center sm:p-6">
        <h2 className="text-2xl font-semibold text-teal-900 mb-2 text-center sm:text-left dark:text-teal-100">
        Streamlined Approach to Our Logistics Operations        </h2>
        <p className="text-gray-600 mb-4 text-center sm:text-left dark:text-gray-400">
        provides a clear overview of our logistics strategy, focusing on efficient supply chain management and timely delivery. This insight highlights our commitment to optimizing processes and ensuring smooth, reliable operations.                </p>
        <div className="flex justify-center sm:justify-start">
          <Button
            className="bg-gradient-to-r from-purple-700 to-blue-700 text-white hover:from-purple-800 hover:to-blue-800 shadow-lg transition-transform transform hover:scale-105"
            outline
          >
            <a
              href="https://www.linkedin.com/company/roca-logistics/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </Button>
        </div>
      </div>
      <div className="flex-1 flex justify-center sm:justify-end p-4">
        <img
          src="https://media.istockphoto.com/id/1568622760/photo/industrial-container-cargo-freight-ship-forklift-handling-container-box-loading-for-logistic.jpg?s=612x612&w=0&k=20&c=Sr3Ig63q02d6gN53aBYewHEHbpuQb-93xvBhozjuyJY="
          className="rounded-lg shadow-md max-w-full h-auto"
        />
      </div>
    </div>
  );
}
