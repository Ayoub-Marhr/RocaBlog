import { Button } from "flowbite-react";

export default function CallToActionAdministration() {
  return (
    <div className="flex flex-col sm:flex-row border border-teal-800 justify-center items-center rounded-tl-3xl rounded-br-3xl p-4">
      <div className="flex-1 flex flex-col justify-center sm:p-6">
        <h2 className="text-2xl font-semibold text-teal-900 mb-2 text-center sm:text-left dark:text-teal-100">
        Overview of Our Administrative Practices        </h2>
        <p className="text-gray-600 mb-4 text-center sm:text-left dark:text-gray-400">
        provides a snapshot of how we manage day-to-day operations. This summary highlights our efficient systems for handling internal processes, ensuring smooth organizational function and effective support.</p>
        <div className="flex justify-center sm:justify-start">
          <Button
            className="bg-gradient-to-r from-purple-700 to-blue-700 text-white hover:from-purple-800 hover:to-blue-800 shadow-lg transition-transform transform hover:scale-105"
            outline
          >
            <a
              href="https://www.roca.co.ma/a-propos-de-roca"
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
          src="https://media.istockphoto.com/id/1831418785/photo/confident-businessman-and-his-team.jpg?s=612x612&w=0&k=20&c=JFK-LRkfhLN8870ulUpTctC9rIeDDSRWABWRBW_shOI="
          alt="Production Process"
          className="rounded-lg shadow-md max-w-full h-auto"
        />
      </div>
    </div>
  );
}
