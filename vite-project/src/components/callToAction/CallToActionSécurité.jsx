import { Button } from "flowbite-react";

export default function CallToActionSécurité() {
  return (
    <div className="flex flex-col sm:flex-row border border-teal-800 justify-center items-center rounded-tl-3xl rounded-br-3xl p-4">
      <div className="flex-1 flex flex-col justify-center sm:p-6">
        <h2 className="text-2xl font-semibold text-teal-900 mb-2 text-center sm:text-left dark:text-teal-100">
        Comprehensive Overview of Our Security Measures        </h2>
        <p className="text-gray-600 mb-4 text-center sm:text-left dark:text-gray-400">
        outlines our approach to safeguarding assets and ensuring safety. This summary highlights our commitment to implementing robust security protocols and practices, protecting both physical and digital resources.       </p>
        <div className="flex justify-center sm:justify-start">
          <Button
            className="bg-gradient-to-r from-purple-700 to-blue-700 text-white hover:from-purple-800 hover:to-blue-800 shadow-lg transition-transform transform hover:scale-105"
            outline
          >
            <a
              href="https://www.roca.co.ma/rocalife/le-temps-passe-la-securite-reste"
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
          src="https://media.istockphoto.com/id/2154453359/photo/two-officers-watching-cctv-video-cameras.jpg?s=612x612&w=0&k=20&c=kV3b232wVdlidYAoWNYK8ExcajDl2lwYS7Xg_o1VMn0="
          className="rounded-lg shadow-md max-w-full h-auto"
        />
      </div>
    </div>
  );
}
