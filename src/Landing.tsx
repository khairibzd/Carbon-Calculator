import { useState } from "react";
import backgroundImage from "./assets/forst.jpeg"; // Import your image
import backgroundImage3 from "./assets/3.jpeg"; // Import your image
import { Bar } from "react-chartjs-2"; // Import Bar chart from react-chartjs-2
import { Chart, registerables } from "chart.js"; // Import Chart.js and registerables

const LandingComponent = () => {
  const [formData, setFormData] = useState({
    electricityUsageKWh: "",
    transportationUsageGallonsPerMonth: "",
    flightsShortHaul: "0",
    flightsMediumHaul: "0",
    flightsLongHaul: "0",
    dietaryChoice: "Vegan", // Default value
  });
  const [result, setResult] = useState<any>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const electricityFactor = 0.3978; // Example factor for electricity emissions calculation
const transportationFactor = 9.087; // Example factor for transportation emissions calculation
const kgCO2ePerYearFactor = 12; // Conversion factor for monthly to yearly emissions
const airTravelFactorShortHaul = 100; // Example factor for short-haul flight emissions (adjust as needed)
const airTravelFactorMediumHaul = 200; // Example factor for medium-haul flight emissions (adjust as needed)
const airTravelFactorLongHaul = 300; // Example factor for long-haul flight emissions (adjust as needed)
const dietaryFactors: { [key: string]: number } = {
  Vegan: 200,
  Vegetarian: 400,
  Pescatarian: 600,
  MeatEater: 800,
};


  const calculateResults = () => {
    const {
      electricityUsageKWh,
      transportationUsageGallonsPerMonth,
      flightsShortHaul,
      flightsMediumHaul,
      flightsLongHaul,
      dietaryChoice
    } = formData;
  
    // Adjusted calculation based on provided factors
    const electricityEmissions = parseFloat(electricityUsageKWh) * electricityFactor;
    const transportationEmissions = parseFloat(transportationUsageGallonsPerMonth) * transportationFactor;
  
    const airTravelEmissionsShortHaul = parseInt(flightsShortHaul) * airTravelFactorShortHaul;
    const airTravelEmissionsMediumHaul = parseInt(flightsMediumHaul) * airTravelFactorMediumHaul;
    const airTravelEmissionsLongHaul = parseInt(flightsLongHaul) * airTravelFactorLongHaul;
  
    const dietaryChoiceEmissions = dietaryFactors[dietaryChoice] || 0; // Default to 0 if choice not found
  
    const totalAirTravelEmissions =
      airTravelEmissionsShortHaul + airTravelEmissionsMediumHaul + airTravelEmissionsLongHaul;
  
    const yearlyElectricityEmissions = electricityEmissions * kgCO2ePerYearFactor;
    const yearlyTransportationEmissions = transportationEmissions * kgCO2ePerYearFactor;
  
    const totalYearlyEmissions =
      yearlyElectricityEmissions +
      yearlyTransportationEmissions +
      totalAirTravelEmissions +
      dietaryChoiceEmissions;
  
    return {
      yearlyElectricityEmissions,
      yearlyTransportationEmissions,
      totalAirTravelEmissions,
      dietaryChoiceEmissions,
      totalYearlyEmissions
    };
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const calculatedResult = calculateResults();
    setResult(calculatedResult);

    // Update chart data after receiving new results
    setChartData({
      labels: ["Électricité ", "Transport ", "Transport AN   ", "Choix Almt "],
      datasets: [
        {
          label: "CO2 Emissions (kgCO2e/year)",
          data: [
            calculatedResult.yearlyElectricityEmissions || 0,
            calculatedResult.yearlyTransportationEmissions || 0,
            calculatedResult.totalAirTravelEmissions || 0,
            calculatedResult.dietaryChoiceEmissions || 0,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  const [chartData, setChartData] = useState<any>({
    labels: ["Électricité ", "Transport ", "Transport AN   ", "Choix Almt "],
    datasets: [
      {
        label: "CO2 Emissions (kgCO2e/year)",
        data: [
          result?.yearlyElectricityEmissions || 0,
          result?.yearlyTransportationEmissions || 0,
          result?.totalAirTravelEmissions || 0,
          result?.dietaryChoiceEmissions || 0,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  // Register chart
  Chart.register(...registerables);
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center p-5 flex-col"
        style={{
          backgroundImage: `url(${backgroundImage3})`,
          backgroundSize: "cover",
        }}
      >
        <div
          className=" bg-gray-200 p-10 w-full max-w-screen-lg"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
          }}
        >
          <h1 className="text-5xl font-bold mb-6 text-center text-white">
            My Carbon Footprint
          </h1>
         
        </div>

  <div className="flex flex-col md:flex-row gap-8 bg-gray-200 p-10 w-full max-w-screen-lg">
  {/* Calculateur d'empreinte carbone (Calculatrice d'empreinte carbone) */}
  <div className="bg-white p-8 rounded-lg shadow-lg flex-1">
    <h1 className="text-3xl font-bold mb-6 text-center">
      Calculateur d'empreinte carbone (حاسبة بصمة الكربون)
    </h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Champs de saisie (مجالات الإدخال) */}
      <div className="flex flex-col">
        <label className="mb-2">
        🍽️ ️ Déchets générés par semaine (en kg) (كمية النفايات التي تنتجها أسبوعياً (بالكيلوجرام:))
        </label>
        <input
          type="number"
          name="electricityUsageKWh"
          value={formData.electricityUsageKWh}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2">
        🚗  Distance quotidienne de trajet domicile-travail (en km/mois) (مسافة الذهاب والعودة اليومية (بالكيلومتر):)
        </label>
        <input
          type="number"
          name="transportationUsageGallonsPerMonth"
          value={formData.transportationUsageGallonsPerMonth}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2">🧑‍✈️Vols courts (رحلات قصيرة):</label>
        <input
          type="number"
          name="flightsShortHaul"
          value={formData.flightsShortHaul}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2">️ 🍽️ Nombre de repas par jour (عدد الوجبات في اليوم):</label>
        <input
          type="number"
          name="flightsMediumHaul"
          value={formData.flightsMediumHaul}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2">🧑‍✈️ Vols longs (رحلات طويلة):</label>
        <input
          type="number"
          name="flightsLongHaul"
          value={formData.flightsLongHaul}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2"> 🍽️ Choix alimentaire (اختيار غذائي):</label>
        <select
          name="dietaryChoice"
          value={formData.dietaryChoice}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="Vegan">Végétalien (فيغان)</option>
          <option value="Vegetarian">Végétarien (نباتي)</option>
          <option value="Pescatarian">Pescatarien (مأكولات بحرية)</option>
          <option value="MeatEater">Mangeur de viande (آكل اللحوم)</option>
        </select>
      </div>
      <br />
      <div className="flex flex-col">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          Calculer (احسب)
        </button>
      </div>
    </form>
  </div>



       {/* Résultats ( نتائج) */}
<div className="bg-white p-8 rounded-lg shadow-lg flex-1 ">
  <h1 className="text-3xl font-bold mb-2">
    Statistiques annuelles des émissions (إحصائيات الانبعاثات السنوية)
  </h1>
  <br />
  <Bar data={chartData} options={chartOptions} />
  {result && (
    <div className="mt-8">
      <div>
        <p className="text-2xl font-bold">Transport aérien (النقل الجوي):</p>
        <p className="text-xl">
          {result.totalAirTravelEmissions} kgCO2e/an
        </p>
        <br />
        <p className="text-2xl font-bold">Électricité (كهرباء):</p>
        <p className="text-xl">
          {result.yearlyElectricityEmissions} kgCO2e/an
        </p>
        <br />
        <p className="text-2xl font-bold">Transport (نقل):</p>
        <p className="text-xl">
          {result.yearlyTransportationEmissions} kgCO2e/an
        </p>
        <br />
        <p className="text-2xl font-bold">Choix alimentaire (اختيار غذائي):</p>
        <p className="text-xl">
          {result.dietaryChoiceEmissions} kgCO2e/an
        </p>
        <br />
        <p className="text-xl font-bold">
          TOTAL : {result.totalYearlyEmissions} kgCO2e/an
        </p>
      </div>
    </div>

            )}
          </div>
          
        </div>
        <p className="text-xl font-bold bg-white rounded  mt-10 text-center text-black">
            By @Khairi Bouzid
          </p>
      </div>
    </>
  );
};

export default LandingComponent;
