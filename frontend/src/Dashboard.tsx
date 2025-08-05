import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Bot, TrendingUp, Users, DollarSign, Activity, Sparkles, Zap } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

interface Metrics {
  activeAgents: number;
  totalUsers: number;
  revenue: number;
  queriesProcessed: number;
}

interface RealtimeData {
  queries: number;
  revenue: number;
  users: number;
}

interface PerformanceData {
  name: string;
  queries: number;
  revenue: number;
  users: number;
}

interface AgentType {
  name: string;
  value: number;
  color: string;
}

interface TopAgent {
  name: string;
  queries: number;
  rating: number;
  revenue: string;
}

interface MetricCardProps {
  icon: React.ComponentType<any>;
  title: string;
  value: number;
  change?: number;
  color: string;
  pulse?: boolean;
}

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    activeAgents: 1247,
    totalUsers: 15432,
    revenue: 98547,
    queriesProcessed: 2847563
  });

  const [realtimeData, setRealtimeData] = useState<RealtimeData>({
    queries: 45,
    revenue: 1250,
    users: 12
  });

  const [isLoaded, setIsLoaded] = useState(false);

  // Animación de carga
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  // Simulación de datos en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => ({
        queries: prev.queries + Math.floor(Math.random() * 5),
        revenue: prev.revenue + Math.floor(Math.random() * 50),
        users: prev.users + Math.floor(Math.random() * 2)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const performanceData: PerformanceData[] = [
    { name: 'Ene', queries: 4000, revenue: 2400, users: 240 },
    { name: 'Feb', queries: 3000, revenue: 1398, users: 221 },
    { name: 'Mar', queries: 2000, revenue: 9800, users: 229 },
    { name: 'Abr', queries: 2780, revenue: 3908, users: 200 },
    { name: 'May', queries: 1890, revenue: 4800, users: 218 },
    { name: 'Jun', queries: 2390, revenue: 3800, users: 250 },
    { name: 'Jul', queries: 3490, revenue: 4300, users: 210 }
  ];

  const agentTypes: AgentType[] = [
    { name: 'Customer Support', value: 400, color: '#8884d8' },
    { name: 'Content Creation', value: 300, color: '#82ca9d' },
    { name: 'Data Analysis', value: 200, color: '#ffc658' },
    { name: 'Sales Assistant', value: 278, color: '#ff7c7c' }
  ];

  const topAgents: TopAgent[] = [
    { name: 'GPT-4 Assistant', queries: 12450, rating: 4.9, revenue: '$15,240' },
    { name: 'Content Creator Pro', queries: 8930, rating: 4.8, revenue: '$12,100' },
    { name: 'Data Analyzer AI', queries: 7650, rating: 4.7, revenue: '$9,850' },
    { name: 'Sales Optimizer', queries: 6420, rating: 4.6, revenue: '$8,200' }
  ];

  const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, title, value, change, color, pulse = false }) => (
    <div className={`metric-card bg-white rounded-xl p-6 shadow-lg border border-gray-100 transform hover:scale-110 hover:rotate-1 transition-all duration-500 hover:shadow-2xl cursor-pointer ${pulse ? 'animate-pulse' : ''} ${isLoaded ? 'animate-slideInUp' : 'opacity-0'}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1 counter">{value.toLocaleString()}</p>
          {change && (
            <p className={`text-sm mt-1 flex items-center ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="w-4 h-4 mr-1 animate-bounce" />
              {change > 0 ? '+' : ''}{change}% vs ayer
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color} hover:animate-spin transition-all duration-500`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transition-opacity duration-500 animate-shimmer"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-hidden">
      {/* Partículas de fondo */}
      <ParticleBackground />
      
      {/* Efectos de luz de fondo */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animate-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animate-delay-4000"></div>

      {/* Header con efectos */}
      <div className={`mb-8 text-center ${isLoaded ? 'animate-fadeInDown' : 'opacity-0'}`}>
        <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient-x">
          🤖 AI Marketplace Dashboard
        </h1>
        <p className="text-xl text-purple-200 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 animate-pulse" />
          Monitoreo en tiempo real de tu ecosistema de IA
          <Sparkles className="w-5 h-5 animate-pulse" />
        </p>
      </div>

      {/* Métricas principales con stagger animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon={Bot}
          title="Agentes Activos"
          value={metrics.activeAgents}
          change={12.5}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
        />
        <MetricCard
          icon={Users}
          title="Usuarios Totales"
          value={metrics.totalUsers}
          change={8.2}
          color="bg-gradient-to-r from-green-500 to-green-600"
        />
        <MetricCard
          icon={DollarSign}
          title="Ingresos ($)"
          value={metrics.revenue}
          change={15.8}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
        />
        <MetricCard
          icon={Activity}
          title="Consultas Procesadas"
          value={metrics.queriesProcessed}
          change={23.1}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
        />
      </div>

      {/* Métricas en tiempo real con efectos de neón */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ${isLoaded ? 'animate-slideInLeft' : 'opacity-0'}`}>
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 hover:shadow-neon">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
              Tiempo Real
            </h3>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-purple-200">Consultas/min</span>
              <span className="text-2xl font-bold text-blue-400 glow">{realtimeData.queries}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-200">Ingresos/hora</span>
              <span className="text-2xl font-bold text-green-400 glow">${realtimeData.revenue}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-200">Usuarios activos</span>
              <span className="text-2xl font-bold text-purple-400 glow">{realtimeData.users}</span>
            </div>
          </div>
        </div>

        {/* Distribución de agentes con glassmorphism */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white border-opacity-20 col-span-2 hover:bg-opacity-20 transition-all duration-300">
          <h3 className="text-lg font-semibold text-white mb-4">Distribución por Tipo de Agente</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={agentTypes}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                animationBegin={0}
                animationDuration={1000}
              >
                {agentTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráficos principales con glassmorphism */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 ${isLoaded ? 'animate-slideInRight' : 'opacity-0'}`}>
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
          <h3 className="text-lg font-semibold text-white mb-4">📈 Rendimiento Mensual</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="queries"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorQueries)"
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
          <h3 className="text-lg font-semibold text-white mb-4">💰 Ingresos vs Usuarios</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#82ca9d" 
                strokeWidth={3}
                animationDuration={2000}
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#ffc658" 
                strokeWidth={3}
                animationDuration={2500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Agentes con efectos hover increíbles */}
      <div className={`bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 ${isLoaded ? 'animate-slideInUp' : 'opacity-0'}`}>
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          🏆 Top Agentes IA
          <span className="text-yellow-400 animate-bounce">✨</span>
        </h3>
        <div className="space-y-4">
          {topAgents.map((agent, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-lg hover:bg-opacity-20 transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:animate-spin transition-all duration-500">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white group-hover:text-purple-300 transition-colors">{agent.name}</h4>
                  <p className="text-sm text-purple-200">{agent.queries.toLocaleString()} consultas</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-400 glow">{agent.revenue}</p>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400 group-hover:animate-pulse">⭐</span>
                  <span className="text-sm text-purple-200">{agent.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;