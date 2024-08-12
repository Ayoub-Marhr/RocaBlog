import { Button } from "flowbite-react";

export default function CallToActionMaintenance() {
  return (
    <div className="flex flex-col sm:flex-row border border-teal-800 justify-center items-center rounded-tl-3xl rounded-br-3xl p-4">
      <div className="flex-1 flex flex-col justify-center sm:p-6">
        <h2 className="text-2xl font-semibold text-teal-900 mb-2 text-center sm:text-left dark:text-teal-100">
        Essential Insights into Our Maintenance Practices        </h2>
        <p className="text-gray-600 mb-4 text-center sm:text-left dark:text-gray-400">
        briefly outlines our approach to keeping operations running smoothly. This overview emphasizes our commitment to proactive maintenance, ensuring optimal performance and minimizing downtime.        </p>
        <div className="flex justify-center sm:justify-start">
          <Button
            className="bg-gradient-to-r from-purple-700 to-blue-700 text-white hover:from-purple-800 hover:to-blue-800 shadow-lg transition-transform transform hover:scale-105"
            outline
          >
            <a
              href="https://www.roca.com/smart-toilets/in-wash/installation-and-maintenance"
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
          src="https://media.istockphoto.com/id/1516511531/photo/a-plumber-carefully-fixes-a-leak-in-a-sink-using-a-wrench.jpg?s=612x612&w=0&k=20&c=4WRY5lTezchQ5aLj9gXj0Gixq7Wq7b0tzvrCTt4jrrI="
          alt="Production Process"
          className="rounded-lg shadow-md max-w-full h-auto"
        />
      </div>
    </div>
  );
}
