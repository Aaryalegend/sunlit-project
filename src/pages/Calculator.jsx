import React, { useState } from 'react';

const Calculator = () => {
  const [formData, setFormData] = useState({
    monthlyBill: '',
    roofArea: '',
    location: 'Pune',
    roofType: 'flat',
    electricityRate: 8,
    systemType: 'on-grid'
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateSavings = (e) => {
    e.preventDefault();
    
    const monthlyBill = parseFloat(formData.monthlyBill) || 0;
    const roofArea = parseFloat(formData.roofArea) || 0;
    const electricityRate = parseFloat(formData.electricityRate) || 8;

    // Calculate system size based on monthly bill
    const monthlyConsumption = monthlyBill / electricityRate; // kWh
    const dailyConsumption = monthlyConsumption / 30;
    const systemSizeFromBill = dailyConsumption / 4; // Assuming 4 peak sun hours

    // Calculate system size based on roof area (1 kW per 100 sq ft)
    const systemSizeFromRoof = roofArea / 100;

    // Use the smaller of the two
    const recommendedSize = Math.min(systemSizeFromBill, systemSizeFromRoof || systemSizeFromBill);
    const roundedSize = Math.max(1, Math.ceil(recommendedSize));

    // Calculations
    const costPerKW = 55000; // ₹55,000 per kW (average)
    const totalCost = roundedSize * costPerKW;
    const annualGeneration = roundedSize * 4 * 365; // kWh
    const monthlySavings = (annualGeneration / 12) * electricityRate;
    const annualSavings = annualGeneration * electricityRate;
    const paybackPeriod = totalCost / annualSavings;
    const co2Reduction = roundedSize * 1.0; // tons per year per kW
    const treesEquivalent = roundedSize * 2;
    const roi25Years = (annualSavings * 25) - totalCost;

    // Government subsidy (for residential)
    let subsidy = 0;
    if (roundedSize <= 3) {
      subsidy = roundedSize * 14588;
    } else if (roundedSize <= 10) {
      subsidy = 3 * 14588 + (roundedSize - 3) * 7294;
    }
    const costAfterSubsidy = totalCost - subsidy;

    setResults({
      systemSize: roundedSize,
      totalCost,
      subsidy,
      costAfterSubsidy,
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      paybackPeriod: paybackPeriod.toFixed(1),
      annualGeneration: Math.round(annualGeneration),
      co2Reduction: co2Reduction.toFixed(1),
      treesEquivalent: Math.round(treesEquivalent),
      roi25Years: Math.round(roi25Years),
    });
  };

  const formatCurrency = (num) => {
    return '₹' + num.toLocaleString('en-IN');
  };

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
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">
                    Monthly Electricity Bill (₹) *
                  </label>
                  <input 
                    type="number"
                    name="monthlyBill"
                    value={formData.monthlyBill}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="e.g., 5000"
                    className="w-full px-4 py-3.5 rounded-[12px] border border-gray-200 text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-dark mb-2">
                    Available Roof Area (sq. ft.)
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
                  <p className="text-xs text-gray-500 mt-1">Approx. 100 sq. ft. per 1 kW</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-dark mb-2">
                    Location
                  </label>
                  <select 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-[12px] border border-gray-200 text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all bg-white"
                  >
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Nagpur">Nagpur</option>
                    <option value="Nashik">Nashik</option>
                    <option value="Aurangabad">Aurangabad</option>
                    <option value="Other">Other (Maharashtra)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-dark mb-2">
                    Roof Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'flat', label: 'Flat Roof' },
                      { value: 'tilted', label: 'Tilted Roof' },
                    ].map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, roofType: type.value })}
                        className={`px-4 py-3 rounded-[12px] text-sm font-bold transition-all ${
                          formData.roofType === type.value
                            ? 'bg-primary text-white'
                            : 'bg-lightBlue text-primary hover:bg-primary hover:text-white'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-dark mb-2">
                    System Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'on-grid', label: 'On-Grid' },
                      { value: 'off-grid', label: 'Off-Grid' },
                      { value: 'hybrid', label: 'Hybrid' },
                    ].map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, systemType: type.value })}
                        className={`px-3 py-3 rounded-[12px] text-sm font-bold transition-all ${
                          formData.systemType === type.value
                            ? 'bg-primary text-white'
                            : 'bg-lightBlue text-primary hover:bg-primary hover:text-white'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-dark mb-2">
                    Electricity Rate (₹/unit): {formData.electricityRate}
                  </label>
                  <input 
                    type="range"
                    name="electricityRate"
                    value={formData.electricityRate}
                    onChange={handleChange}
                    min="4"
                    max="15"
                    step="0.5"
                    className="w-full h-2 bg-lightBlue rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹4/unit</span>
                    <span>₹15/unit</span>
                  </div>
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
                      {formData.systemType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} System
                    </p>
                  </div>

                  {/* Cost & Savings */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-[20px] p-5 md:p-6 shadow-card text-center">
                      <p className="text-xs md:text-sm text-gray-500 mb-1">System Cost</p>
                      <p className="text-lg md:text-2xl font-bold text-dark">{formatCurrency(results.totalCost)}</p>
                    </div>
                    <div className="bg-white rounded-[20px] p-5 md:p-6 shadow-card text-center">
                      <p className="text-xs md:text-sm text-gray-500 mb-1">Govt. Subsidy</p>
                      <p className="text-lg md:text-2xl font-bold text-green-600">{formatCurrency(results.subsidy)}</p>
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
