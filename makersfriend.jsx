import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Save, Trash2, Coffee } from 'lucide-react';

const MakersFriend = () => {
  const [step, setStep] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [currency, setCurrency] = useState('GBP');
  const [savedResults, setSavedResults] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [showPaymentGate, setShowPaymentGate] = useState(false);

  // Calculator state
  const [formData, setFormData] = useState({
    itemName: '',
    materialCost: '',
    labourRate: '', // hourly
    labourHours: '',
    monthlyOverhead: '',
    batchSize: '1',
  });

  const [etsyData, setEtsyData] = useState(null);

  // Mock Etsy data for laser-cut items
  const mockEtsyDatabase = {
    'personalised wooden sign': {
      priceRange: [18, 45],
      competitors: 2847,
      avgRating: 4.7,
      searchVolume: 'high',
    },
    'laser cut coaster': {
      priceRange: [8, 20],
      competitors: 1253,
      avgRating: 4.8,
      searchVolume: 'medium',
    },
    'wooden gift box': {
      priceRange: [15, 40],
      competitors: 3421,
      avgRating: 4.6,
      searchVolume: 'high',
    },
    'acrylic keychain': {
      priceRange: [5, 15],
      competitors: 5482,
      avgRating: 4.5,
      searchVolume: 'very high',
    },
    'leather coaster': {
      priceRange: [12, 30],
      competitors: 892,
      avgRating: 4.8,
      searchVolume: 'medium',
    },
  };

  // Load saved results from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('makersfriend_results');
    const paidStatus = localStorage.getItem('makersfriend_paid');
    if (saved) setSavedResults(JSON.parse(saved));
    if (paidStatus) setIsPaid(JSON.parse(paidStatus));
  }, []);

  // Save results to localStorage
  const saveResults = (results) => {
    const newResults = [...savedResults, results];
    if (newResults.length > 3) newResults.shift();
    setSavedResults(newResults);
    localStorage.setItem('makersfriend_results', JSON.stringify(newResults));
  };

  const deleteResult = (index) => {
    const newResults = savedResults.filter((_, i) => i !== index);
    setSavedResults(newResults);
    localStorage.setItem('makersfriend_results', JSON.stringify(newResults));
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get Etsy data
  const handleGetEtsyData = () => {
    const searchTerm = formData.itemName.toLowerCase();
    const match = Object.entries(mockEtsyDatabase).find(([key]) =>
      key.includes(searchTerm) || searchTerm.includes(key.split(' ')[0])
    );
    
    if (match) {
      setEtsyData(match[1]);
    } else {
      // Generic data if no match
      setEtsyData({
        priceRange: [12, 35],
        competitors: 1500,
        avgRating: 4.6,
        searchVolume: 'medium',
      });
    }
  };

  // Calculate profitability
  const calculateProfitability = () => {
    const materialCost = parseFloat(formData.materialCost) || 0;
    const labourCost = (parseFloat(formData.labourRate) || 0) * (parseFloat(formData.labourHours) || 0);
    const overhead = (parseFloat(formData.monthlyOverhead) || 0) / 30; // daily
    const batchSize = parseInt(formData.batchSize) || 1;

    const totalCostPerItem = (materialCost + labourCost + overhead) / batchSize;
    const breakEvenPrice = totalCostPerItem * 1.15; // 15% margin for fees

    return {
      materialCost,
      labourCost,
      overheadPerItem: overhead,
      totalCostPerItem,
      breakEvenPrice,
    };
  };

  const profitability = calculateProfitability();
  const currencySymbol = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$';

  // Wizard steps
  const steps = [
    {
      title: 'What are you making?',
      description: 'Give your design a name',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Item name</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              placeholder="e.g. Personalised wooden sign"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleGetEtsyData}
            disabled={!formData.itemName}
            className="w-full px-4 py-2 bg-amber-100 text-amber-900 rounded-lg hover:bg-amber-200 disabled:opacity-50 font-medium"
          >
            Look up market data
          </button>
          {etsyData && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-orange-900">Market data found!</p>
              <p className="text-xs text-orange-800 mt-1">Price range: {currencySymbol}{etsyData.priceRange[0]} - {currencySymbol}{etsyData.priceRange[1]}</p>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Material costs',
      description: 'What does it cost to make?',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Material cost per item</label>
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">{currencySymbol}</span>
              <input
                type="number"
                name="materialCost"
                value={formData.materialCost}
                onChange={handleInputChange}
                step="0.01"
                placeholder="0.00"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Your time',
      description: 'Labour costs matter',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hourly labour rate</label>
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">{currencySymbol}</span>
              <input
                type="number"
                name="labourRate"
                value={formData.labourRate}
                onChange={handleInputChange}
                step="0.01"
                placeholder="15.00"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
              <span className="text-gray-600 ml-2">/hour</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time to make (hours)</label>
            <input
              type="number"
              name="labourHours"
              value={formData.labourHours}
              onChange={handleInputChange}
              step="0.25"
              placeholder="1.5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Overhead & batch',
      description: 'Fixed costs and volume',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly overhead</label>
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">{currencySymbol}</span>
              <input
                type="number"
                name="monthlyOverhead"
                value={formData.monthlyOverhead}
                onChange={handleInputChange}
                step="0.01"
                placeholder="0.00"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">e.g. rent, utilities, equipment</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Batch size</label>
            <input
              type="number"
              name="batchSize"
              value={formData.batchSize}
              onChange={handleInputChange}
              min="1"
              placeholder="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-2">How many items made at once?</p>
          </div>
        </div>
      ),
    },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  // Free version (limited results)
  if (!isPaid && step === steps.length - 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-amber-900 mb-2">MakersFriend</h1>
            <p className="text-amber-700">Design profitability calculator</p>
          </div>

          {/* Free preview */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-amber-200 mb-8">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
              <p className="text-sm text-yellow-800">
                <strong>Free preview:</strong> You're seeing a basic calculation. Unlock full features with market insights for {currencySymbol}3.99
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{formData.itemName}</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Material cost:</span>
                  <span className="font-mono font-semibold">{currencySymbol}{profitability.materialCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Labour cost:</span>
                  <span className="font-mono font-semibold">{currencySymbol}{profitability.labourCost.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-amber-900">
                  <span>Total cost (per item):</span>
                  <span className="font-mono">{currencySymbol}{profitability.totalCostPerItem.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-amber-900 text-lg">
                  <span>Break-even price:</span>
                  <span className="font-mono">{currencySymbol}{profitability.breakEvenPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg mb-6 text-sm text-amber-900">
              <p className="font-semibold mb-2">Want to see how this compares to Etsy?</p>
              <p className="text-amber-800">Upgrade to see market prices, competitor analysis, and save up to 3 designs.</p>
            </div>

            {/* Payment CTA */}
            <div className="space-y-3">
              <a
                href="https://fitzy84.gumroad.com/l/awapcz"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-semibold text-center transition"
              >
                Upgrade for {currencySymbol}3.99
              </a>
              <button
                onClick={() => {
                  setIsPaid(true);
                  localStorage.setItem('makersfriend_paid', JSON.stringify(true));
                }}
                className="w-full px-6 py-3 bg-amber-100 text-amber-900 rounded-lg hover:bg-amber-200 font-semibold transition"
              >
                Try paid version (demo)
              </button>
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={() => {
              setStep(0);
              setFormData({
                itemName: '',
                materialCost: '',
                labourRate: '',
                labourHours: '',
                monthlyOverhead: '',
                batchSize: '1',
              });
              setEtsyData(null);
            }}
            className="w-full px-4 py-2 text-amber-700 hover:text-amber-900 font-medium"
          >
            ← Start over
          </button>
        </div>
      </div>
    );
  }

  // Paid version - full results with Etsy data
  if (isPaid && step === steps.length - 1) {
    const chartData = {
      userPrice: profitability.breakEvenPrice,
      minMarket: etsyData?.priceRange[0] || 12,
      maxMarket: etsyData?.priceRange[1] || 35,
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-amber-900 mb-2">MakersFriend</h1>
            <p className="text-amber-700">Your analysis</p>
          </div>

          {/* Saved results toggle */}
          {savedResults.length > 0 && (
            <button
              onClick={() => setShowSaved(!showSaved)}
              className="mb-6 px-4 py-2 bg-amber-100 text-amber-900 rounded-lg hover:bg-amber-200 font-medium text-sm"
            >
              View saved ({savedResults.length})
            </button>
          )}

          {showSaved ? (
            // Saved results view
            <div className="space-y-4">
              {savedResults.map((result, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow p-6 border border-amber-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900">{result.itemName}</h3>
                      <p className="text-sm text-gray-600">Break-even: {currencySymbol}{result.breakEvenPrice.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => deleteResult(idx)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setShowSaved(false)}
                className="w-full px-4 py-2 text-amber-700 hover:text-amber-900 font-medium"
              >
                ← Back to current analysis
              </button>
            </div>
          ) : (
            // Current analysis
            <>
              {/* Main result */}
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-amber-200 mb-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{formData.itemName}</h2>
                  <p className="text-sm text-gray-600">Profitability Analysis</p>
                </div>

                {/* Cost breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-200">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Your Costs</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Materials:</span>
                        <span className="font-mono font-semibold">{currencySymbol}{profitability.materialCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Labour:</span>
                        <span className="font-mono font-semibold">{currencySymbol}{profitability.labourCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Overhead per item:</span>
                        <span className="font-mono font-semibold">{currencySymbol}{profitability.overheadPerItem.toFixed(2)}</span>
                      </div>
                      <div className="bg-amber-50 p-3 rounded flex justify-between font-bold text-amber-900">
                        <span>Total cost:</span>
                        <span className="font-mono">{currencySymbol}{profitability.totalCostPerItem.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Market Data</h3>
                    {etsyData && (
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">Price range</p>
                          <p className="text-lg font-mono font-bold text-gray-900">{currencySymbol}{etsyData.priceRange[0]} — {currencySymbol}{etsyData.priceRange[1]}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">Competitors</p>
                          <p className="text-lg font-mono font-bold text-gray-900">{etsyData.competitors.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">Avg rating</p>
                          <p className="text-lg font-mono font-bold text-gray-900">★ {etsyData.avgRating}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bar chart */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Your Price vs Market</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Your break-even</span>
                        <span className="font-mono font-bold text-amber-900">{currencySymbol}{chartData.userPrice.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-amber-600 h-3 rounded-full"
                          style={{ width: `${Math.min((chartData.userPrice / chartData.maxMarket) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Market range</span>
                        <span className="font-mono text-gray-600">{currencySymbol}{chartData.minMarket} — {currencySymbol}{chartData.maxMarket}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-green-600 h-3 rounded-full"
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Insight */}
                  <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-sm text-blue-900 font-medium">
                      {chartData.userPrice <= chartData.minMarket
                        ? `✓ Your break-even (${currencySymbol}${chartData.userPrice.toFixed(2)}) is below market range. Good margin potential.`
                        : chartData.userPrice <= chartData.maxMarket
                        ? `◐ Your break-even sits within market range. Consider optimizing costs.`
                        : `⚠ Your break-even (${currencySymbol}${chartData.userPrice.toFixed(2)}) exceeds market price. Consider streamlining production.`}
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => {
                      const result = {
                        itemName: formData.itemName,
                        totalCostPerItem: profitability.totalCostPerItem,
                        breakEvenPrice: profitability.breakEvenPrice,
                        timestamp: new Date().toLocaleDateString(),
                      };
                      saveResults(result);
                      alert('Saved! You have ' + (savedResults.length + 1) + ' of 3 slots used.');
                    }}
                    disabled={savedResults.length >= 3}
                    className="w-full px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <Save size={18} /> Save this design
                  </button>

                  <a
                    href="https://www.buymeacoffee.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-3 bg-amber-100 text-amber-900 rounded-lg hover:bg-amber-200 font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <Coffee size={18} /> Buy me a coffee
                  </a>
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={() => {
                  setStep(0);
                  setFormData({
                    itemName: '',
                    materialCost: '',
                    labourRate: '',
                    labourHours: '',
                    monthlyOverhead: '',
                    batchSize: '1',
                  });
                  setEtsyData(null);
                }}
                className="w-full px-4 py-2 text-amber-700 hover:text-amber-900 font-medium"
              >
                ← Start new calculation
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // Wizard flow
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">MakersFriend</h1>
          <p className="text-amber-700">Design profitability calculator</p>
        </div>

        {/* Progress indicator */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            {steps.map((_, idx) => (
              <div key={idx} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                    idx <= step
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {idx + 1}
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`h-1 w-12 mx-2 transition ${
                      idx < step ? 'bg-amber-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 text-sm">Step {step + 1} of {steps.length}</p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-amber-200 mb-8">
          {/* Step title */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentStep.title}</h2>
            <p className="text-gray-600">{currentStep.description}</p>
          </div>

          {/* Step content */}
          <div className="mb-8">
            {currentStep.content}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="flex-1 px-4 py-3 bg-amber-100 text-amber-900 rounded-lg hover:bg-amber-200 disabled:opacity-50 font-semibold flex items-center justify-center gap-2 transition"
          >
            <ChevronLeft size={18} /> Back
          </button>
          <button
            onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
            className="flex-1 px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-semibold flex items-center justify-center gap-2 transition"
          >
            {isLastStep ? 'See results' : 'Next'} <ChevronRight size={18} />
          </button>
        </div>

        {/* Currency selector */}
        <div className="mt-8 text-center">
          <div className="inline-flex gap-2 bg-amber-50 p-2 rounded-lg">
            {['GBP', 'EUR', 'USD'].map(curr => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-3 py-1 rounded text-sm font-medium transition ${
                  currency === curr
                    ? 'bg-amber-600 text-white'
                    : 'text-amber-900 hover:bg-amber-100'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakersFriend;
