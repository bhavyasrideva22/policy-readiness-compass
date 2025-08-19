import React from 'react';
import { WISCARScores } from '@/types/assessment';

interface RadarChartProps {
  scores: WISCARScores;
}

export const RadarChart: React.FC<RadarChartProps> = ({ scores }) => {
  const categories = [
    { key: 'Will', label: 'Will', angle: 0 },
    { key: 'Interest', label: 'Interest', angle: 60 },
    { key: 'Skill', label: 'Skill', angle: 120 },
    { key: 'CognitiveReadiness', label: 'Cognitive', angle: 180 },
    { key: 'AbilityToLearn', label: 'Learning', angle: 240 },
    { key: 'RealWorldAlignment', label: 'Real-World', angle: 300 }
  ];

  const center = 120;
  const radius = 80;

  const getPoint = (value: number, angle: number) => {
    const radian = (angle * Math.PI) / 180;
    const distance = (value / 100) * radius;
    return {
      x: center + distance * Math.cos(radian),
      y: center + distance * Math.sin(radian)
    };
  };

  const getAxisPoint = (angle: number) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(radian),
      y: center + radius * Math.sin(radian)
    };
  };

  const dataPoints = categories.map(cat => ({
    ...cat,
    value: scores[cat.key as keyof WISCARScores],
    point: getPoint(scores[cat.key as keyof WISCARScores], cat.angle)
  }));

  const pathData = dataPoints
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.point.x} ${point.point.y}`)
    .join(' ') + ' Z';

  return (
    <div className="w-full max-w-md mx-auto">
      <svg width="240" height="240" className="mx-auto">
        {/* Background circles */}
        {[20, 40, 60, 80, 100].map(percent => (
          <circle
            key={percent}
            cx={center}
            cy={center}
            r={(percent / 100) * radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}

        {/* Axis lines */}
        {categories.map(cat => {
          const point = getAxisPoint(cat.angle);
          return (
            <line
              key={cat.key}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity="0.5"
            />
          );
        })}

        {/* Data area */}
        <path
          d={pathData}
          fill="hsl(var(--primary))"
          fillOpacity="0.2"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />

        {/* Data points */}
        {dataPoints.map(point => (
          <circle
            key={point.key}
            cx={point.point.x}
            cy={point.point.y}
            r="4"
            fill="hsl(var(--primary))"
            stroke="white"
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        {categories.map(cat => {
          const labelPoint = getAxisPoint(cat.angle);
          const extendedPoint = {
            x: center + (radius + 25) * Math.cos((cat.angle * Math.PI) / 180),
            y: center + (radius + 25) * Math.sin((cat.angle * Math.PI) / 180)
          };
          
          return (
            <text
              key={cat.key}
              x={extendedPoint.x}
              y={extendedPoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-medium fill-foreground"
            >
              {cat.label}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {dataPoints.map(point => (
          <div key={point.key} className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">{point.label}:</span>
            <span className="font-semibold text-primary">{point.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};