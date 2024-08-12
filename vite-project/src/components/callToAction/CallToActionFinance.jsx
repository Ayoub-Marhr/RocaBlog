import { Button } from "flowbite-react";

export default function CallToActionFinance() {
  return (
    <div className="flex flex-col sm:flex-row border border-teal-800 justify-center items-center rounded-tl-3xl rounded-br-3xl p-4">
      <div className="flex-1 flex flex-col justify-center sm:p-6">
        <h2 className="text-2xl font-semibold text-teal-900 mb-2 text-center sm:text-left dark:text-teal-100">
        Overview of Our Financial Management Practices</h2>
        <p className="text-gray-600 mb-4 text-center sm:text-left dark:text-gray-400">
        offers a brief look into how we handle financial operations. This summary highlights our strategies for budgeting, forecasting, and financial planning, ensuring sound fiscal health and informed decision-making.
        </p>
        <div className="flex justify-center sm:justify-start">
          <Button
            className="bg-gradient-to-r from-purple-700 to-blue-700 text-white hover:from-purple-800 hover:to-blue-800 shadow-lg transition-transform transform hover:scale-105"
            outline
          >
            <a
              href="https://www.roca.com/about-roca/annual-reports"
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
          src="https://media.istockphoto.com/id/2121419720/photo/yearly-financial-report-chart-with-years-data-statistics-company-progress-or-plan.jpg?s=2048x2048&w=is&k=20&c=yPoZL0vFrg3KPrlIN9UrG4ReMrg-xEMKYyE9VtHfA1U="
          className="rounded-lg shadow-md max-w-full h-auto"
        />
      </div>
    </div>
  );
}
