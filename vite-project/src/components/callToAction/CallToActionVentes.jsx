import { Button } from "flowbite-react";

export default function CallToActionVentes() {
  return (
    <div className="flex flex-col sm:flex-row border border-teal-800 justify-center items-center rounded-tl-3xl rounded-br-3xl p-4">
      <div className="flex-1 flex flex-col justify-center sm:p-6">
        <h2 className="text-2xl font-semibold text-teal-900 mb-2 text-center sm:text-left dark:text-teal-100">
        Strategic Overview of Our Sales and Marketing Efforts        </h2>
        <p className="text-gray-600 mb-4 text-center sm:text-left dark:text-gray-400">
        provides a concise look at our approach to driving growth and building brand presence. This summary highlights our strategies for effective sales tactics and innovative marketing campaigns, aimed at maximizing impact and achieving        </p>
        <div className="flex justify-center sm:justify-start">
          <Button
            className="bg-gradient-to-r from-purple-700 to-blue-700 text-white hover:from-purple-800 hover:to-blue-800 shadow-lg transition-transform transform hover:scale-105"
            outline
          >
            <a
              href="https://www.roca.co.ma/recompenses/prix-national-marketing"
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
          src="https://media.istockphoto.com/id/2163552475/photo/digital-marketing-commerce-online-sale-concept-businessman-using-laptop-with-ads-dashboard.jpg?s=612x612&w=0&k=20&c=ynpDpKWknKs8dWgVBFutJ_wbQtJ9NJIVxYQmQjiHO8U="
          className="rounded-lg shadow-md max-w-full h-auto"
        />
      </div>
    </div>
  );
}
