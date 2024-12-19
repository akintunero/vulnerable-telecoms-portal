import React, { useState } from 'react';
import { MessageSquare, Activity, AlertTriangle, CheckCircle, MapPin, Users, Server, Star, TrendingUp } from 'lucide-react';

const CustomerFeedbackPage: React.FC = () => {
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const [filterRating, setFilterRating] = useState<string>('all');

  // Mock data for customer feedback
  const customerFeedback = [
    {
      id: 'FB001',
      customer: 'TechCorp Solutions',
      rating: 5,
      category: 'Network Performance',
      feedback: 'Excellent service quality and fast response times. The network has been very reliable.',
      status: 'positive',
      date: '2025-06-01 15:30',
      sentiment: 'positive'
    },
    {
      id: 'FB002',
      customer: 'RetailChain Inc',
      rating: 4,
      category: 'Customer Support',
      feedback: 'Good support team, but sometimes response times could be faster during peak hours.',
      status: 'positive',
      date: '2025-06-01 14:45',
      sentiment: 'positive'
    },
    {
      id: 'FB003',
      customer: 'CloudTech Ltd',
      rating: 2,
      category: 'Service Reliability',
      feedback: 'Experienced several outages this month. Need improvement in service stability.',
      status: 'negative',
      date: '2025-06-01 13:20',
      sentiment: 'negative'
    },
    {
      id: 'FB004',
      customer: 'FinanceCorp',
      rating: 5,
      category: 'Technical Support',
      feedback: 'Outstanding technical support. The team resolved our VPN issues quickly and professionally.',
      status: 'positive',
      date: '2025-06-01 12:15',
      sentiment: 'positive'
    }
  ];

  // Mock data for feedback statistics
  const feedbackStats = [
    {
      title: 'Total Feedback',
      value: customerFeedback.length.toString(),
      change: '+12',
      changeType: 'positive' as const,
      icon: <MessageSquare className="h-6 w-6" />,
      color: 'blue'
    },
    {
      title: 'Avg Rating',
      value: '4.2/5',
      change: '+0.3',
      changeType: 'positive' as const,
      icon: <Star className="h-6 w-6" />,
      color: 'yellow'
    },
    {
      title: 'Positive Sentiment',
      value: '75%',
      change: '+5%',
      changeType: 'positive' as const,
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'green'
    },
    {
      title: 'Response Rate',
      value: '92%',
      change: '+3%',
      changeType: 'positive' as const,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'purple'
    }
  ];

  // Mock data for feedback categories
  const feedbackCategories = [
    { name: 'Network Performance', count: 25, avgRating: 4.3, color: 'blue' },
    { name: 'Customer Support', count: 18, avgRating: 4.1, color: 'green' },
    { name: 'Service Reliability', count: 12, avgRating: 3.8, color: 'yellow' },
    { name: 'Technical Support', count: 15, avgRating: 4.5, color: 'purple' }
  ];

  // Mock data for recent surveys
  const recentSurveys = [
    {
      id: 'SURVEY001',
      title: 'Q2 2025 Customer Satisfaction Survey',
      responses: 45,
      completionRate: '78%',
      avgRating: 4.2,
      status: 'active'
    },
    {
      id: 'SURVEY002',
      title: 'Network Performance Feedback',
      responses: 32,
      completionRate: '85%',
      avgRating: 4.4,
      status: 'completed'
    },
    {
      id: 'SURVEY003',
      title: 'Support Team Evaluation',
      responses: 28,
      completionRate: '72%',
      avgRating: 4.0,
      status: 'active'
    }
  ];

  // Mock data for sentiment analysis
  const sentimentData = [
    { sentiment: 'Positive', count: 75, percentage: 75 },
    { sentiment: 'Neutral', count: 15, percentage: 15 },
    { sentiment: 'Negative', count: 10, percentage: 10 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'positive': return 'text-green-600 bg-green-50 border-green-200';
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      case 'neutral': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'positive': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'negative': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'neutral': return <Activity className="h-4 w-4 text-gray-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50';
      case 'negative': return 'text-red-600 bg-red-50';
      case 'neutral': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Network Performance': return 'bg-blue-100 text-blue-800';
      case 'Customer Support': return 'bg-green-100 text-green-800';
      case 'Service Reliability': return 'bg-yellow-100 text-yellow-800';
      case 'Technical Support': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const filteredFeedback = customerFeedback.filter(feedback => 
    filterRating === 'all' || feedback.rating.toString() === filterRating
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Customer Feedback</h1>
          <p className="text-gray-600 mt-1">Monitor customer satisfaction and feedback analysis</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            Create Survey
          </button>
        </div>
      </div>

      {/* Feedback Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {feedbackStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                'bg-purple-100 text-purple-600'}`}>
                {stat.icon}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Feedback */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Feedback</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="space-y-4">
              {filteredFeedback.map((feedback) => (
                <div 
                  key={feedback.id} 
                  className={`p-4 rounded-lg border cursor-pointer hover:bg-gray-50 ${
                    selectedFeedback === feedback.id ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedFeedback(selectedFeedback === feedback.id ? null : feedback.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-medium text-gray-900">{feedback.customer}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(feedback.category)}`}>
                            {feedback.category}
                          </span>
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            {renderStars(feedback.rating)}
                          </div>
                          <span className="ml-2 text-sm text-gray-500">{feedback.rating}/5</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(feedback.status)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        feedback.status === 'positive' ? 'bg-green-100 text-green-800' :
                        feedback.status === 'negative' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {feedback.status}
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-700">{feedback.feedback}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500">{feedback.date}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getSentimentColor(feedback.sentiment)}`}>
                      {feedback.sentiment}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback Categories and Surveys */}
        <div className="space-y-6">
          {/* Feedback Categories */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Feedback Categories</h2>
            <div className="space-y-3">
              {feedbackCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      category.color === 'blue' ? 'bg-blue-500' :
                      category.color === 'green' ? 'bg-green-500' :
                      category.color === 'yellow' ? 'bg-yellow-500' :
                      'bg-purple-500'
                    }`}></div>
                    <div>
                      <span className="text-sm font-medium text-gray-900">{category.name}</span>
                      <div className="flex items-center mt-1">
                        {renderStars(Math.round(category.avgRating))}
                        <span className="ml-1 text-xs text-gray-500">{category.avgRating}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{category.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Surveys */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Surveys</h2>
            <div className="space-y-3">
              {recentSurveys.map((survey) => (
                <div key={survey.id} className="p-3 rounded-lg border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-900">{survey.title}</h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Responses: {survey.responses}</span>
                      <span>Completion: {survey.completionRate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {renderStars(Math.round(survey.avgRating))}
                        <span className="ml-1 text-xs text-gray-500">{survey.avgRating}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        survey.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {survey.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sentiment Analysis and Feedback Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Analysis */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Analysis</h2>
          <div className="space-y-4">
            {sentimentData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    item.sentiment === 'Positive' ? 'bg-green-500' :
                    item.sentiment === 'Neutral' ? 'bg-gray-500' :
                    'bg-red-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-900">{item.sentiment}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{item.count} responses</span>
                  <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Details (when selected) */}
        {selectedFeedback && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Feedback Details</h2>
            {(() => {
              const feedback = customerFeedback.find(f => f.id === selectedFeedback);
              if (!feedback) return null;
              
              return (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-2">Customer Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Customer:</span>
                        <span className="text-sm font-medium text-gray-900">{feedback.customer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Category:</span>
                        <span className="text-sm font-medium text-gray-900">{feedback.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Date:</span>
                        <span className="text-sm font-medium text-gray-900">{feedback.date}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-2">Rating & Sentiment</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Rating:</span>
                        <div className="flex items-center">
                          {renderStars(feedback.rating)}
                          <span className="ml-2 text-sm font-medium text-gray-900">{feedback.rating}/5</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Sentiment:</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSentimentColor(feedback.sentiment)}`}>
                          {feedback.sentiment}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Status:</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          feedback.status === 'positive' ? 'bg-green-100 text-green-800' :
                          feedback.status === 'negative' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {feedback.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-2">Feedback</h3>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{feedback.feedback}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerFeedbackPage; 