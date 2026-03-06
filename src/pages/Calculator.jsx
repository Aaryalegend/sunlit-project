import React, { useState } from 'react';

const STATE_SUN_HOURS = {
  'Rajasthan': 5.5, 'Gujarat': 5.3, 'Madhya Pradesh': 5.2, 'Andhra Pradesh': 5.2,
  'Telangana': 5.3, 'Tamil Nadu': 5.1, 'Karnataka': 5.0, 'Maharashtra': 5.0,
  'Odisha': 4.9, 'Delhi': 4.9, 'Haryana': 4.8, 'Uttar Pradesh': 4.8,
  'Punjab': 4.7, 'Bihar': 4.7, 'West Bengal': 4.6, 'Assam': 4.5,
  'Himachal Pradesh': 4.8, 'Uttarakhand': 4.7, 'Jharkhand': 4.7,
  'Chhattisgarh': 5.0, 'Kerala': 4.6, 'Goa': 4.8, 'Other': 5.0,
};

const ELECTRICITY_RATES = {
  Residential: 7, Commercial: 9, Institutional: 8, Industrial: 6.5,
};

const Calculator = () => {
  const [formData, setFormData] = useState({
    state: 'Maharashtra',
    category: 'Residential',
    monthlyUnits: '',
    roofArea: '',
    requiredCapacity: '',
    sanctionLoad: '',
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateSavings = (e) => {
    e.preventDefault();

    const sunHours = STATE_SUN_HOURS[formData.state] || 5.0;
    const electricityRate = ELECTRICITY_RATES[formData.category] || 7;
    const monthlyUnits = parseFloat(formData.monthlyUnits) || 0;
    const roofArea = parseFloat(formData.roofArea) || 0;
    const requiredCapacity = parseFloat(formData.requiredCapacity) || 0;
    const sanctionLoad = parseFloat(formData.sanctionLoad) || 0;

    // System size from consumption
    const dailyUnits = monthlyUnits / 30;
    const sizeFromConsumption = dailyUnits / sunHours;

    // System size from rooftop (100 sq ft per kW)
    const sizeFromRoof = roofArea > 0 ? roofArea / 100 : Infinity;

    // System size from sanction load (typically 80% of sanction load)
    const sizeFromSanction = sanctionLoad > 0 ? sanctionLoad * 0.8 : Infinity;

    // Start from required capacity or consumption-based size
    let baseSize = requiredCapacity > 0 ? requiredCapacity : sizeFromConsumption;

    // Apply constraints
    const recommendedSize = Math.min(
      baseSize,
      sizeFromRoof === Infinity ? baseSize : sizeFromRoof,
      sizeFromSanction === Infinity ? baseSize : sizeFromSanction
    );

    const roundedSize = Math.max(1, parseFloat(recommendedSize.toFixed(1)));

    // Costing
    const costPerKW = formData.category === 'Residential' ? 55000
      : formData.category === 'Commercial' ? 50000
      : formData.category === 'Industrial' ? 45000 : 52000;

    const totalCost = Math.round(roundedSize * costPerKW);
    const annualGeneration = Math.round(roundedSize * sunHours * 365);
    const monthlySavings = Math.round((annualGeneration / 12) * electricityRate);
    const annualSavings = Math.round(annualGeneration * electricityRate);
    const paybackPeriod = (totalCost / annualSavings).toFixed(1);
    const co2Reduction = (roundedSize * 1.0).toFixed(1);
    const treesEquivalent = Math.round(roundedSize * 2);
    const roi25Years = Math.round(annualSavings * 25 - totalCost);

    // PM Surya Ghar subsidy (Residential only)
    let subsidy = 0;
    if (formData.category === 'Residential') {
      if (roundedSize <= 2) {
        subsidy = Math.round(roundedSize * 30000);
      } else if (roundedSize <= 3) {
        subsidy = 60000 + Math.round((roundedSize - 2) * 18000);
      } else {
        subsidy = 78000;
      }
    }

    const costAfterSubsidy = totalCost - subsidy;

    setResults({
      systemSize: roundedSize,
      totalCost,
      subsidy,
      costAfterSubsidy,
      monthlySavings,
      annualSavings,
      paybackPeriod,
      annualGeneration,
      co2Reduction,
      treesEquivalent,
      roi25Years,
      electricityRate,
      sunHours,
    });
  };

  const formatCurrency = (num) => '₹' + num.toLocaleString('en-IN');

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[300px] md:h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#02203E] to-[#1976D2]"></div>
        <div className="relative max-w-[1280px] mx-auto px-4 md:px-[90px] h-full flex flex-col justify-center">
          <h1 className="text-[32px] md:text-[64px] font-bold text-lightBlue leading-tight tracking-[0.05em]">
            Solar Calculator
          </h1>
          <p className="text-base md:text-2xl font-normal text-white mt-4 max-w-[700px] tracking-[0.05em]">
            Calculate your potential savings and find the perfect solar system size for your needs
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="w-full py-12 md:py-20 px-4 md:px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Input Form */}
            <div className="bg-white rounded-[20px] p-6 md:p-10 shadow-card">
              <h2 className="text-[24px] md:text-[32px] font-bold text-primary mb-2">
                Calculate Your Savings
              </h2>
              <p className="text-sm md:text-base font-normal text-dark mb-8 tracking-[0.05em]">
                Enter your details to get an estimated solar system recommendation
              </p>

              <form onSubmit={calculateSavings} className="space-y-6">

                {/* State */}
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">Your State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-[12px] border border-gray-200 text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all bg-white"
                  >
                    {Object.keys(STATE_SUN_HOURS).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">Your Category *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Residential', 'Commercial', 'Institutional', 'Industrial'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat })}
                        className={`px-4 py-3 rounded-[12px] text-sm font-bold transition-all ${
                          formData.category === cat
                            ? 'bg-primary text-white'
                            : 'bg-lightBlue text-primary hover:bg-primary hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monthly Units */}
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">
                    Average Monthly Consumption (kWh) *
                  </label>
                  <input
                    type="number"
                    name="monthlyUnits"
                    value={formData.monthlyUnits}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="e.g., 500"
                    className="w-full px-4 py-3.5 rounded-[12px] border border-gray-200 text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Check your electricity bill for monthly units consumed</p>
                </div>

                {/* Roof Area */}
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">
                    Total Available Rooftop Area (sq. ft.)
                  </label>
                  <input
                    type="number"
                    name="roofArea"
                    value={formData.roofArea}
                    onChange={handleChange}
                    min="0"
                    placeholder="e.g., 500"
                    className="w-full px-4 py-3.5 rounded-[12px] border border-gray-200 text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Approx. 100 sq. ft. required per 1 kW</p>
                </div>

                {/* Required Capacity */}
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">
                    Required Solar Plant Capacity (kW) <span className="font-normal text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="number"
                    name="requiredCapacity"
                    value={formData.requiredCapacity}
                    onChange={handleChange}
                    min="0"
                    step="0.1"
                    placeholder="e.g., 5"
                    className="w-full px-4 py-3.5 rounded-[12px] border border-gray-200 text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave blank to auto-calculate based on consumption</p>
                </div>

                {/* Sanction Load */}
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">
                    Sanctioned Load (kW) <span className="font-normal text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="number"
                    name="sanctionLoad"
                    value={formData.sanctionLoad}
                    onChange={handleChange}
                    min="0"
                    step="0.5"
                    placeholder="e.g., 10"
                    className="w-full px-4 py-3.5 rounded-[12px] border border-gray-200 text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Solar capacity is limited to 80% of sanctioned load</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-[19px] text-base md:text-lg font-bold hover:bg-blue-700 transition-colors tracking-[0.05em]"
                >
                  Calculate Savings
                </button>
              </form>
            </div>

            {/* Results Panel */}
            <div>
              {!results ? (
                <div className="bg-lightBlue rounded-[20px] p-6 md:p-10 h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mb-6">
                    <svg className="w-12 h-12 md:w-16 md:h-16 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary mb-3">
                    Enter Your Details
                  </h3>
                  <p className="text-sm md:text-base font-normal text-dark tracking-[0.05em] max-w-[400px]">
                    Fill in the form on the left to see your estimated solar savings, system size, and environmental impact.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* System Size Card */}
                  <div className="bg-primary rounded-[20px] p-6 md:p-8 text-white text-center">
                    <p className="text-base font-normal mb-2 tracking-[0.05em]">Recommended System Size</p>
                    <h3 className="text-[48px] md:text-[64px] font-bold leading-none mb-2">
                      {results.systemSize} kW
                    </h3>
                    <p className="text-sm text-lightBlue tracking-[0.05em]">
                      {formData.category} · {formData.state} · {results.sunHours} sun hrs/day
                    </p>
                  </div>

                  {/* Cost & Savings */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-[20px] p-5 md:p-6 shadow-card text-center">
                      <p className="text-xs md:text-sm text-gray-500 mb-1">System Cost</p>
                      <p className="text-lg md:text-2xl font-bold text-dark">{formatCurrency(results.totalCost)}</p>
                    </div>
                    <div className="bg-white rounded-[20px] p-5 md:p-6 shadow-card text-center">
                      <p className="text-xs md:text-sm text-gray-500 mb-1">
                        {formData.category === 'Residential' ? 'PM Surya Ghar Subsidy' : 'Govt. Subsidy'}
                      </p>
                      <p className="text-lg md:text-2xl font-bold text-green-600">{formatCurrency(results.subsidy)}</p>
                      {formData.category !== 'Residential' && (
                        <p className="text-xs text-gray-400 mt-1">N/A for {formData.category}</p>
                      )}
                    </div>
                  </div>

                  {/* Net Cost */}
                  <div className="bg-lightBlue rounded-[20px] p-5 md:p-6 text-center">
                    <p className="text-sm text-primary font-bold mb-1">Net Cost After Subsidy</p>
                    <p className="text-[28px] md:text-[36px] font-bold text-primary">{formatCurrency(results.costAfterSubsidy)}</p>
                  </div>

                  {/* Savings Breakdown */}
                  <div className="bg-white rounded-[20px] p-5 md:p-6 shadow-card">
                    <h4 className="text-lg font-bold text-dark mb-4">Savings Breakdown</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-dark">Electricity Rate Used</span>
                        <span className="text-base font-bold text-primary">₹{results.electricityRate}/unit</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-dark">Monthly Savings</span>
                        <span className="text-base font-bold text-primary">{formatCurrency(results.monthlySavings)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-dark">Annual Savings</span>
                        <span className="text-base font-bold text-primary">{formatCurrency(results.annualSavings)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-dark">Payback Period</span>
                        <span className="text-base font-bold text-primary">{results.paybackPeriod} years</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-dark">Annual Generation</span>
                        <span className="text-base font-bold text-primary">{results.annualGeneration.toLocaleString()} kWh</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-dark">25-Year ROI</span>
                        <span className="text-base font-bold text-green-600">{formatCurrency(results.roi25Years)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Environmental Impact */}
                  <div className="bg-white rounded-[20px] p-5 md:p-6 shadow-card">
                    <h4 className="text-lg font-bold text-dark mb-4">Environmental Impact (Annual)</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-[12px] p-4 text-center">
                        <p className="text-2xl md:text-3xl font-bold text-green-600 mb-1">{results.co2Reduction}</p>
                        <p className="text-xs text-green-700">Tons CO₂ Reduced</p>
                      </div>
                      <div className="bg-green-50 rounded-[12px] p-4 text-center">
                        <p className="text-2xl md:text-3xl font-bold text-green-600 mb-1">{results.treesEquivalent}</p>
                        <p className="text-xs text-green-700">Trees Equivalent</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col gap-3">
                    <a 
                      href="/contact"
                      className="bg-primary text-white py-3.5 rounded-[19px] text-base font-bold hover:bg-blue-700 transition-colors tracking-[0.05em] text-center block"
                    >
                      Get Free Consultation
                    </a>
                    <button 
                      onClick={() => setResults(null)}
                      className="bg-transparent border-[1.5px] border-primary text-primary py-3.5 rounded-[19px] text-base font-normal hover:bg-primary hover:text-white transition-colors tracking-[0.05em]"
                    >
                      Recalculate
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full bg-lightBlue py-12 md:py-20 px-4 md:px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[32px] md:text-[48px] font-bold text-primary mb-2 md:mb-4">
              How It Works
            </h2>
            <p className="text-base md:text-xl font-normal text-dark tracking-[0.05em]">
              Getting solar installed is easy with Sun Lit Tech
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { step: '01', title: 'Calculate', description: 'Use our calculator to estimate your system size and savings' },
              { step: '02', title: 'Consult', description: 'Get a free consultation and site assessment from our experts' },
              { step: '03', title: 'Install', description: 'Our certified team installs your solar system professionally' },
              { step: '04', title: 'Save', description: 'Start saving on electricity bills from day one' },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl md:text-2xl font-bold text-white">{item.step}</span>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-primary bg-opacity-30"></div>
                )}
                <h4 className="text-lg md:text-xl font-bold text-dark mb-2">{item.title}</h4>
                <p className="text-sm font-normal text-dark tracking-[0.05em]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-12 md:py-20 px-4 md:px-20">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-[32px] md:text-[48px] font-bold text-primary mb-2 md:mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: 'How accurate is the solar calculator?', a: 'Our calculator provides an estimate based on average solar irradiance data for Maharashtra. For a precise quote, we recommend scheduling a free site assessment with our team.' },
              { q: 'What government subsidies are available?', a: 'Under the PM Surya Ghar Yojana, residential customers can avail subsidies up to ₹78,000 for systems up to 3kW and proportionally for larger systems up to 10kW.' },
              { q: 'How long does installation take?', a: 'A typical residential installation (1-10 kW) takes 2-3 days. Commercial and industrial installations may take 1-4 weeks depending on the system size.' },
              { q: 'What is the lifespan of solar panels?', a: 'Quality solar panels have a lifespan of 25-30 years with performance warranties guaranteeing at least 80% output after 25 years.' },
              { q: 'Do I need battery storage?', a: 'For on-grid systems, battery storage is optional as you can use net metering. Off-grid and hybrid systems include battery backup for power supply during outages or nighttime.' },
            ].map((faq, index) => (
              <details key={index} className="bg-white rounded-[20px] shadow-card group">
                <summary className="p-5 md:p-6 cursor-pointer text-base md:text-lg font-bold text-dark list-none flex justify-between items-center">
                  {faq.q}
                  <svg className="w-5 h-5 text-primary transition-transform group-open:rotate-180 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 md:px-6 pb-5 md:pb-6">
                  <p className="text-sm md:text-base font-normal text-dark leading-relaxed tracking-[0.05em]">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calculator;
