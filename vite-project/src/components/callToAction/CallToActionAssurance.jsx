import { Button } from "flowbite-react";

export default function CallToActionAssurance() {
  return (
    <div className="flex flex-col sm:flex-row border border-teal-800 justify-center items-center rounded-tl-3xl rounded-br-3xl p-4">
      <div className="flex-1 flex flex-col justify-center sm:p-6">
        <h2 className="text-2xl font-semibold text-teal-900 mb-2 text-center sm:text-left dark:text-teal-100">
        Comprehensive Overview of Our Assurance Processes        </h2>
        <p className="text-gray-600 mb-4 text-center sm:text-left dark:text-gray-400">
        provides a succinct look at how we ensure quality and reliability across our operations. This overview highlights our commitment to rigorous standards and continuous improvement in delivering dependable results.        </p>
        <div className="flex justify-center sm:justify-start">
          <Button
            className="bg-gradient-to-r from-purple-700 to-blue-700 text-white hover:from-purple-800 hover:to-blue-800 shadow-lg transition-transform transform hover:scale-105"
            outline
          >
            <a
              href="https://www.roca.co.ma/service-client"
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
          src="https://cdn.edi-static.fr/image/upload/c_scale,f_auto,h_564,q_auto/v1/Img/FICHEPRATIQUE/2021/9/364763/est-que-assurance-qualite-peut-apporter-entreprise--LE.jpg"
          alt="Production Process"
          className="rounded-lg shadow-md max-w-full h-auto"
        />
      </div>
    </div>
  );
}
