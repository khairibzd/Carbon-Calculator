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
  // const transportationFactor = 9.087; // Example factor for transportation emissions calculation
  const kgCO2ePerYearFactor = 12; // Conversion factor for monthly to yearly emissions
  const airTravelFactorShortHaul = 40; // Example factor for short-haul flight emissions (adjust as needed)
  // const airTravelFactorMediumHaul = 200; // Example factor for medium-haul flight emissions (adjust as needed)
  const airTravelFactorLongHaul = 50; // Example factor for long-haul flight emissions (adjust as needed)
  const dietaryFactors: { [key: string]: number } = {
    Vegan: 900,
    Vegetarian: 520,
    Pescatarian: 1400,
    MeatEater: 2200,
  };
  
  const electricityFacto: { [key: string]: number } = {
    'Less than 4 hours': 100,
    'Between 4 and 8 hours': 40,
    'Between 8 and 12 hours': 10,
    'More than 12 hours': 250,
  };
  
  const calculateResults = () => {
    const {
      electricityUsageKWh,
      transportationUsageGallonsPerMonth,
      flightsShortHaul,
      // flightsMediumHaul,
      flightsLongHaul,
      dietaryChoice,
    } = formData;
  
    // Adjusted calculation based on provided factors
    const electricityEmissions =
      parseFloat(electricityUsageKWh) * electricityFactor;
    const transportationEmissions =
      electricityFacto[transportationUsageGallonsPerMonth] || 0; // corrected variable name
    const airTravelEmissionsShortHaul =
      parseInt(flightsShortHaul) * airTravelFactorShortHaul;
  
    const airTravelEmissionsLongHaul =
      parseInt(flightsLongHaul) * airTravelFactorLongHaul;
  
    const dietaryChoiceEmissions = dietaryFactors[dietaryChoice] || 0; // Default to 0 if choice not found
  
    const totalAirTravelEmissions =
      airTravelEmissionsShortHaul +
      airTravelEmissionsLongHaul;
  
    const yearlyElectricityEmissions =
      electricityEmissions * kgCO2ePerYearFactor;
    const yearlyTransportationEmissions =
      transportationEmissions * kgCO2ePerYearFactor;
  
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
      totalYearlyEmissions,
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

        <div className="flex flex-col md:flex-col gap-8 bg-gray-200 p-10 w-full max-w-screen-lg">
          {/* Calculateur d'empreinte carbone (Calculatrice d'empreinte carbone) */}
          <div className="bg-white p-8 rounded-lg shadow-lg flex-1">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Calculateur d'empreinte carbone (حاسبة بصمة الكربون)
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Champs de saisie (مجالات الإدخال) */}
              <div className="flex flex-col">
                <label className="mb-2">
                  {" "}
                  Quelle moyenne de transport utilisez-vous ? (ما نوع وسيلة
                  النقل التي تستخدمها؟)
                </label>
                <select
                  // name="transportChoice"
                  name="transportationUsageGallonsPerMonth"
                  value={formData.transportationUsageGallonsPerMonth}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="Less than 4 hours">
                    probablement le train (ربما القطار)
                  </option>
                  <option value="Between 4 and 8 hours">
                    J'apprécie également le vélo (أستمتع أيضًا بركوب الدراجة)
                  </option>
                  <option value="Between 8 and 12 hours">Marche à pied (المشي)</option>
                  <option value="More than 12 hours">Voiture personnelle (سيارة شخصية)</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-2">
                  {" "}
                  Quelle distance as-tu parcourue ? (par semaine en km/h) (ما
                  المسافة التي قطعتها؟ (في الأسبوع بالكيلومترات/الساعة)؟)
                </label>
                <select
                 
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="200">10</option>
                  <option value="600">100</option>
                  <option value="200">200</option>
                  <option value="2000">
                    plus de 200 (أكثر من 200)
                  </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-2">
                  {" "}
                  Quel type de chauffage privilégiez-vous pour votre domicile en
                  hiver ? (ما نوع التدفئة التي تفضلها لمنزلك في الشتاء؟)
                </label>
                <select
                  name="electricityUsageKWh"
                   value={formData.electricityUsageKWh}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="600">
                    Chauffage central (التدفئة المركزية)
                  </option>
                  <option value="1000">
                    Chauffage électrique (التدفئة الكهربائية)
                  </option>
                  <option value="300">
                    Chauffage solaire (تسخين الطاقة الشمسية)
                  </option>
                  <option value="100">
                    Chauffage en bois (تدفئة بالحطب)
                  </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-2">
                  {" "}
                  Combien d'heures par jour fonctionne votre chauffage ? (كم
                  ساعة في اليوم يعمل نظام التدفئة الخاص بك؟)
                </label>
                <select
                
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="Less than 4 hours">
                    Moins de 4 heures par jour (أقل من 4 ساعات في اليوم)
                  </option>
                  <option value="Between 4 and 8 hours">
                    Entre 4 et 8 heures par jour (بين 4 و 8 ساعات في اليوم)
                  </option>
                  <option value="Between 8 and 12 hours">
                    Entre 8 et 12 heures par jour (بين 8 و 12 ساعة في اليوم)
                  </option>
                  <option value="More than 12 hours">
                    Plus de 12 heures par jour (أكثر من 12 ساعة في اليوم)
                  </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-2">
                  {" "}
                  Comment chauffez-vous l'eau ? (كيف تقوم بتسخين الماء؟)
                </label>
                <select
                  // name="waterHeating"
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="Electric Water Heater">
                    À l'aide d'un chauffe-eau électrique (باستخدام سخان مياه
                    كهربائي)
                  </option>
                  <option value="Solar Water Heater">
                    En utilisant un système de chauffage solaire (باستخدام نظام
                    تسخين مياه شمسي)
                  </option>
                  <option value="Gas Water Heater">
                    chauffe-eau au gaz (سخان مياه غازي)
                  </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-2">
                  ️ 🍽️ Choix alimentaire (اختيار غذائي):
                </label>
                <select
                  name="dietaryChoice"
                  value={formData.dietaryChoice}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="Vegan">Végétalien (فيغان)</option>
                  <option value="Vegetarian">Végétarien (نباتي)</option>
                  <option value="Pescatarian">
                    Pescatarien (مأكولات بحرية)
                  </option>
                  <option value="MeatEater">
                    Mangeur de viande (آكل اللحوم)
                  </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-2">
                  ️ 🍽️ Nombre de repas par jour (عدد الوجبات في اليوم):
                </label>
                <input
                  type="number"
                  // name="mealsPerDay"
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2">
                  ️ 🍽️ Combien de déchets par jour ? (كم عدد النفايات في اليوم؟)
                </label>
                <input
                  type="number"
                  // name="wastePerDay"
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2">
                  ️  Courts vols (الرحلات القصيرة)
                </label>
                <input
                  type="number"
                  name="flightsShortHaul"
                  value={formData.flightsShortHaul}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2">️  Long vols (الرحلات الطويلة)</label>
                <input
                  type="number"
                  name="flightsLongHaul"
                  value={formData.flightsLongHaul}

                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                />
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
                  <p className="text-2xl font-bold">
                    Transport aérien (النقل الجوي):
                  </p>
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
                  <p className="text-2xl font-bold">
                    Choix alimentaire (اختيار غذائي):
                  </p>
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
      </div>

      {/* <p className="text-xl font-bold bg-white rounded  mt-10 text-center text-black">
          By @Khairi Bouzid
        </p> */}
    </>
  );
};

export default LandingComponent;
