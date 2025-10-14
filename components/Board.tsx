// components/Board.tsx

"use client";

import React from 'react';
import mapaBrasil from '@/app/data/mapaBrasil';

type City = {
    id: number;
    name: string;
    x: number;  // X coordinate for SVG positioning
    y: number;  // Y coordinate for SVG positioning
};

type Route = {
    from: number; // ID of the starting city
    to: number;   // ID of the destination city
    color: string; // Color of the route
};

const cities: City[] = mapaBrasil.cities.slice(0, 15); // Assuming `mapaBrasil` has a `cities` array
const routes: Route[] = mapaBrasil.routes.slice(0, 20); // Assuming `mapaBrasil` has a `routes` array

const Board: React.FC = () => {
    const handleRouteClick = (from: number, to: number) => {
        alert(`Route from city ID ${from} to city ID ${to} clicked!`);
    };

    return (
        <svg width="800" height="600" style={{ border: '1px solid black' }}>
            {routes.map((route, index) => {
                const fromCity = cities.find(city => city.id === route.from);
                const toCity = cities.find(city => city.id === route.to);
                return fromCity && toCity ? (
                    <line
                        key={index}
                        x1={fromCity.x}
                        y1={fromCity.y}
                        x2={toCity.x}
                        y2={toCity.y}
                        stroke={route.color}
                        strokeWidth={2}
                        onClick={() => handleRouteClick(route.from, route.to)}
                        style={{ cursor: 'pointer' }}
                    />
                ) : null;
            })}
            {cities.map(city => (
                <g key={city.id}>
                    <circle
                        cx={city.x}
                        cy={city.y}
                        r={10}
                        fill="blue"
                        onMouseOver={(e) => e.currentTarget.setAttribute('fill', 'lightblue')}
                        onMouseOut={(e) => e.currentTarget.setAttribute('fill', 'blue')}
                    />
                    <text x={city.x} y={city.y - 15} fill="black" textAnchor="middle">
                        {city.name}
                    </text>
                </g>
            ))}
        </svg>
    );
};

export default Board;