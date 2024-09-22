import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import 'leaflet/dist/leaflet.css';
import './App.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const App = () => {
    const [profiles, setProfiles] = useState([
        {
            id: 1,
            name: "John Doe",
            location: { lat: 37.7749, lng: -122.4194 },
            behavior: "Moving",
            signedIn: true,
            geofenceAlert: false,
            signInHistory: [1, 2, 3, 2, 5],
            allowedArea: [[37.779, -122.423], [37.779, -122.415], [37.772, -122.415], [37.772, -122.423]],
            notAllowedArea: [[37.770, -122.425], [37.770, -122.420], [37.775, -122.420], [37.775, -122.425]],
        },
        {
            id: 2,
            name: "Jane Smith",
            location: { lat: 37.7849, lng: -122.4094 },
            behavior: "Stationary",
            signedIn: false,
            geofenceAlert: true,
            signInHistory: [0, 1, 1, 0, 0],
            allowedArea: [[37.788, -122.413], [37.788, -122.405], [37.782, -122.405], [37.782, -122.413]],
            notAllowedArea: [[37.780, -122.410], [37.780, -122.405], [37.785, -122.405], [37.785, -122.410]],
        },
    ]);

    const [selectedProfile, setSelectedProfile] = useState(null);

    const handleProfileClick = (profile) => {
        setSelectedProfile(profile);
    };

    const renderProfileDashboard = (profile) => {
        const chartData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            datasets: [
                {
                    label: 'Sign-Ins',
                    data: profile.signInHistory,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                },
            ],
        };

        return (
            <div id="dashboard">
                <h2>Current Location: {profile.name}</h2>
                <MapContainer center={[profile.location.lat, profile.location.lng]} zoom={13} style={{ height: "400px", width: "100%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[profile.location.lat, profile.location.lng]}>
                        <Popup>
                            {profile.name}'s Current Location
                        </Popup>
                    </Marker>
                    <Polygon positions={profile.allowedArea} color="green" fillOpacity={0.3} />
                    <Polygon positions={profile.notAllowedArea} color="red" fillOpacity={0.3} />
                </MapContainer>

                <h2>Behavior Monitoring</h2>
                <div className={`behavior-indicator ${profile.behavior.toLowerCase()}`}>
                    Status: {profile.behavior}
                </div>

                <h2>Sign-In Status</h2>
                <p>Signed In: {profile.signedIn ? "✔️" : "❌"}</p>

                <h2>Geofencing Alerts</h2>
                <p>Alert: {profile.geofenceAlert ? "🚨 Outside Allowed Area" : "✅ Within Allowed Area"}</p>

                <h2>Sign-In History</h2>
                <Line data={chartData} />
            </div>
        );
    };

    return (
        <div className="App">
            <h1>Bailee and Parolee Monitoring Dashboard</h1>
            <h2>Select a Profile</h2>
            <ul>
                {profiles.map(profile => (
                    <li key={profile.id} onClick={() => handleProfileClick(profile)}>
                        {profile.name}
                    </li>
                ))}
            </ul>

            {selectedProfile && renderProfileDashboard(selectedProfile)}
        </div>
    );
};

export default App;
