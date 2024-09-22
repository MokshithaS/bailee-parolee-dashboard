import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Tooltip as LeafletTooltip } from 'react-leaflet';
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
import L from 'leaflet';

// Create a custom icon for the stick figure
const stickFigureIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2" fill="%23000"/><line x1="12" y1="7" x2="12" y2="18" stroke="%23000" stroke-width="2"/><line x1="12" y1="11" x2="8" y2="15" stroke="%23000" stroke-width="2"/><line x1="12" y1="11" x2="16" y2="15" stroke="%23000" stroke-width="2"/><line x1="12" y1="18" x2="8" y2="20" stroke="%23000" stroke-width="2"/><line x1="12" y1="18" x2="16" y2="20" stroke="%23000" stroke-width="2"/></svg>',
    iconSize: [24, 24],
});

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const initialProfiles = [
    {
        id: 1,
        name: "Aarav Sharma",
        age: 30,
        address: "123 Main St, Delhi",
        crime: "Assault",
        legalMentions: "Section 323, IPC",
        jailPeriod: "12 months",
        bailPeriod: "6 months",
        bailGranted: "2023-07-15",
        lastDate: "2023-10-15",
        location: { lat: 28.6139, lng: 77.2090 },
        behavior: "Stationary",
        signedIn: false,
        geofenceAlert: true,
        risk: 7,
        signInHistory: [0, 1, 1, 0, 0],
        allowedArea: [[28.618, 77.213], [28.618, 77.205], [28.610, 77.205], [28.610, 77.213]],
        notAllowedArea: [[28.605, 77.210], [28.605, 77.205], [28.615, 77.205], [28.615, 77.210]],
        phoneNumber: "987-654-3210",
        email: "aaravsharma@example.com",
        emergencyContact: {
            name: "Riya Sharma",
            phone: "912-345-6789"
        },
        violationHistory: [],
        lastGeofenceCheck: "2023-09-15T12:00:00Z",
    },
    {
        id: 2,
        name: "Anaya Singh",
        age: 25,
        address: "456 Elm St, Mumbai",
        crime: "Theft",
        legalMentions: "Section 378, IPC",
        jailPeriod: "10 months",
        bailPeriod: "5 months",
        bailGranted: "2023-06-20",
        lastDate: "2023-09-20",
        location: { lat: 19.0760, lng: 72.8777 },
        behavior: "Moving",
        signedIn: true,
        geofenceAlert: false,
        risk: 4,
        signInHistory: [2, 1, 3, 1, 2],
        allowedArea: [[19.078, 72.879], [19.078, 72.874], [19.075, 72.874], [19.075, 72.879]],
        notAllowedArea: [[19.073, 72.876], [19.073, 72.873], [19.077, 72.873], [19.077, 72.876]],
        phoneNumber: "234-567-8901",
        email: "anayasingh@example.com",
        emergencyContact: {
            name: "Karan Singh",
            phone: "987-654-3210"
        },
        violationHistory: [
            { date: "2023-08-01", description: "Curfew violation" }
        ],
        lastGeofenceCheck: "2023-09-15T12:00:00Z",
    },
    {
        id: 3,
        name: "Rahul Mehta",
        age: 28,
        address: "789 Oak St, Bengaluru",
        crime: "Fraud",
        legalMentions: "Section 420, IPC",
        jailPeriod: "9 months",
        bailPeriod: "4 months",
        bailGranted: "2023-08-01",
        lastDate: "2023-10-01",
        location: { lat: 12.9716, lng: 77.5946 },
        behavior: "Stationary",
        signedIn: false,
        geofenceAlert: true,
        risk: 6,
        signInHistory: [1, 0, 0, 1, 0],
        allowedArea: [[12.973, 77.596], [12.973, 77.590], [12.970, 77.590], [12.970, 77.596]],
        notAllowedArea: [[12.968, 77.593], [12.968, 77.589], [12.972, 77.589], [12.972, 77.593]],
        phoneNumber: "345-678-9012",
        email: "rahulmehta@example.com",
        emergencyContact: {
            name: "Sonia Mehta",
            phone: "876-543-2109"
        },
        violationHistory: [],
        lastGeofenceCheck: "2023-09-01T12:00:00Z",
    },
    {
        id: 4,
        name: "Sofia Khan",
        age: 22,
        address: "321 Pine St, Chennai",
        crime: "Assault",
        legalMentions: "Section 323, IPC",
        jailPeriod: "12 months",
        bailPeriod: "6 months",
        bailGranted: "2023-05-15",
        lastDate: "2023-09-30",
        location: { lat: 13.0827, lng: 80.2707 },
        behavior: "Moving",
        signedIn: true,
        geofenceAlert: false,
        risk: 3,
        signInHistory: [2, 2, 1, 1, 3],
        allowedArea: [[13.084, 80.272], [13.084, 80.267], [13.081, 80.267], [13.081, 80.272]],
        notAllowedArea: [[13.080, 80.269], [13.080, 80.266], [13.082, 80.266], [13.082, 80.269]],
        phoneNumber: "456-789-0123",
        email: "sofiakhan@example.com",
        emergencyContact: {
            name: "Farah Khan",
            phone: "765-432-1098"
        },
        violationHistory: [
            { date: "2023-08-10", description: "Missed check-in" }
        ],
        lastGeofenceCheck: "2023-09-25T12:00:00Z",
    },
    {
        id: 5,
        name: "Vikram Nair",
        age: 35,
        address: "654 Maple St, Kolkata",
        crime: "Burglary",
        legalMentions: "Section 457, IPC",
        jailPeriod: "8 months",
        bailPeriod: "4 months",
        bailGranted: "2023-07-10",
        lastDate: "2023-09-15",
        location: { lat: 22.5726, lng: 88.3639 },
        behavior: "Stationary",
        signedIn:true,
        geofenceAlert: false,
        risk: 5,
        signInHistory: [0, 1, 1, 0, 0],
        allowedArea: [[22.574, 88.365], [22.574, 88.360], [22.570, 88.360], [22.570, 88.365]],
        notAllowedArea: [[22.569, 88.362], [22.569, 88.359], [22.573, 88.359], [22.573, 88.362]],
        phoneNumber: "567-890-1234",
        email: "vikramnair@example.com",
        emergencyContact: {
            name: "Kavita Nair",
            phone: "654-321-0987"
        },
        violationHistory: [],
        lastGeofenceCheck: "2023-09-29T12:00:00Z",
    },
    {
        id: 6,
        name: "Arjun Patil",
        age: 27,
        address: "987 Birch St, Hyderabad",
        crime: "Fraud",
        legalMentions: "Section 420, IPC",
        jailPeriod: "7 months",
        bailPeriod: "4 months",
        bailGranted: "2023-06-30",
        lastDate: "2023-09-05",
        location: { lat: 17.3850, lng: 78.4867 },
        behavior: "Moving",
        signedIn: true,
        geofenceAlert: false,
        risk: 2,
        signInHistory: [1, 1, 0, 0, 2],
        allowedArea: [[17.386, 78.488], [17.386, 78.484], [17.383, 78.484], [17.383, 78.488]],
        notAllowedArea: [[17.382, 78.485], [17.382, 78.482], [17.387, 78.482], [17.387, 78.485]],
        phoneNumber: "678-901-2345",
        email: "arjunpatil@example.com",
        emergencyContact: {
            name: "Priya Patil",
            phone: "543-210-9876"
        },
        violationHistory: [],
        lastGeofenceCheck: "2023-09-02T12:00:00Z",
    },
    {
        id: 7,
        name: "Nisha Reddy",
        age: 31,
        address: "111 Cedar St, Pune",
        crime: "Assault",
        legalMentions: "Section 323, IPC",
        jailPeriod: "12 months",
        bailPeriod: "6 months",
        bailGranted: "2023-07-01",
        lastDate: "2023-09-15",
        location: { lat: 18.5204, lng: 73.8567 },
        behavior: "Stationary",
        signedIn: false,
        geofenceAlert: true,
        risk: 6,
        signInHistory: [0, 0, 1, 1, 0],
        allowedArea: [[18.521, 73.858], [18.521, 73.853], [18.519, 73.853], [18.519, 73.858]],
        notAllowedArea: [[18.518, 73.855], [18.518, 73.850], [18.522, 73.850], [18.522, 73.855]],
        phoneNumber: "789-012-3456",
        email: "nishareddy@example.com",
        emergencyContact: {
            name: "Ravi Reddy",
            phone: "432-109-8765"
        },
        violationHistory: [],
        lastGeofenceCheck: "2023-09-10T12:00:00Z",
    },
    {
        id: 8,
        name: "Diya Joshi",
        age: 29,
        address: "222 Willow St, Jaipur",
        crime: "Burglary",
        legalMentions: "Section 457, IPC",
        jailPeriod: "8 months",
        bailPeriod: "4 months",
        bailGranted: "2023-06-20",
        lastDate: "2023-09-28",
        location: { lat: 26.9124, lng: 75.7873 },
        behavior: "Moving",
        signedIn: true,
        geofenceAlert: false,
        risk: 3,
        signInHistory: [2, 3, 1, 1, 2],
        allowedArea: [[26.914, 75.789], [26.914, 75.783], [26.911, 75.783], [26.911, 75.789]],
        notAllowedArea: [[26.910, 75.786], [26.910, 75.782], [26.913, 75.782], [26.913, 75.786]],
        phoneNumber: "890-123-4567",
        email: "diyajoshi@example.com",
        emergencyContact: {
            name: "Ankit Joshi",
            phone: "321-098-7654"
        },
        violationHistory: [
            { date: "2023-08-15", description: "Entered a not allowed area" }
        ],
        lastGeofenceCheck: "2023-09-20T12:00:00Z",
    },
    {
        id: 9,
        name: "Karan Gupta",
        age: 26,
        address: "333 Cherry St, Surat",
        crime: "Fraud",
        legalMentions: "Section 420, IPC",
        jailPeriod: "6 months",
        bailPeriod: "4 months",
        bailGranted: "2023-07-30",
        lastDate: "2023-09-25",
        location: { lat: 21.1702, lng: 72.8311 },
        behavior: "Stationary",
        signedIn: false,
        geofenceAlert: true,
        risk: 5,
        signInHistory: [0, 1, 1, 0, 0],
        allowedArea: [[21.171, 72.833], [21.171, 72.829], [21.169, 72.829], [21.169, 72.833]],
        notAllowedArea: [[21.168, 72.830], [21.168, 72.826], [21.172, 72.826], [21.172, 72.830]],
        phoneNumber: "901-234-5678",
        email: "karangupta@example.com",
        emergencyContact: {
            name: "Pooja Gupta",
            phone: "210-987-6543"
        },
        violationHistory: [],
        lastGeofenceCheck: "2023-09-05T12:00:00Z",
    },
    {
        id: 10,
        name: "Ravi Sharma",
        age: 33,
        address: "444 Peach St, Ahmedabad",
        crime: "Theft",
        legalMentions: "Section 378, IPC",
        jailPeriod: "7 months",
        bailPeriod: "3 months",
        bailGranted: "2023-06-15",
        lastDate: "2023-09-30",
        location: { lat: 23.0225, lng: 72.5714 },
        behavior: "Moving",
        signedIn: false,
        geofenceAlert: true,
        risk: 6,
        signInHistory: [2, 1, 2, 1, 3],
        allowedArea: [[23.024, 72.573], [23.024, 72.570], [23.020, 72.570], [23.020, 72.573]],
        notAllowedArea: [[23.019, 72.572], [23.019, 72.568], [23.023, 72.568], [23.023, 72.572]],
        phoneNumber: "012-345-6789",
        email: "ravisharma@example.com",
        emergencyContact: {
            name: "Meera Sharma",
            phone: "098-765-4321"
        },
        violationHistory: [
            { date: "2023-09-15", description: "Missed check-in" }
        ],
        lastGeofenceCheck: "2023-09-29T12:00:00Z",
    },
];

const App = () => {
    const [profiles, setProfiles] = useState(initialProfiles);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showSidebar, setShowSidebar] = useState(null); // State for toggling sidebar

    const handleProfileClick = (profile) => {
        setSelectedProfile(profile);
        setShowSidebar(false);
    };

    const handleHomeClick = () => {
        setSelectedProfile(null);
        
    };

    const filteredProfiles = profiles.filter(profile =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderProfileDetails = (profile) => {
        return (
            <div className="profile-details">
                <h2>Profile Details</h2>
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Age:</strong> {profile.age}</p>
                <p><strong>Address:</strong> {profile.address}</p>
                <p><strong>Crime Committed:</strong> {profile.crime}</p>
                <p><strong>Legal Mentions:</strong> {profile.legalMentions}</p>
                <p><strong>Jail Period:</strong> {profile.jailPeriod}</p>
                <p><strong>Bail Period:</strong> {profile.bailPeriod}</p>
                <p><strong>Bail/Parole Granted:</strong> {profile.bailGranted}</p>
                <p><strong>Last Date:</strong> {profile.lastDate}</p>
                <p><strong>Signed In:</strong> {profile.signedIn ? "Yes" : "No"}</p>
                <p><strong>Geofence Alert:</strong> {profile.geofenceAlert ? "Alert!" : "All Clear"}</p>
                <button onClick={handleHomeClick}>Back to Home</button>
            </div>
        );
    };

    const renderRiskMeter = (risk) => {
        const riskLevel = risk <= 3 ? "Low" : risk <= 6 ? "Medium" : "High";
        return (
            <div className={`risk-meter ${riskLevel.toLowerCase()}`}>
                <p>Risk Level: {riskLevel}</p>
            </div>
        );
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
                    <Marker position={[profile.location.lat, profile.location.lng]} icon={stickFigureIcon}>
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

                <h2>Risk Meter</h2>
                {renderRiskMeter(profile.risk)}
            </div>
        );
    };

    return (
        <div className="App">
            <h1>Bailee and Parolee Monitoring Dashboard</h1>
            <input
                type="text"
                placeholder="Search profiles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => setShowSidebar(!showSidebar)}>
                {showSidebar ? "Hide Profiles" : "Show Profiles"}
            </button>

            {showSidebar && (
                <div className="sidebar">
                    <h2>Profiles</h2>
                    {filteredProfiles.map(profile => (
                        <div key={profile.id} className="profile-item" onClick={() => handleProfileClick(profile)}>
                            {profile.name}
                        </div>
                    ))}
                </div>
            )}

            <button onClick={handleHomeClick}>Home</button>

           {/* Only show the map if no profile is selected */}
{!selectedProfile && (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "500px", width: "100%" }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {profiles.map(profile => (
            <Marker key={profile.id} position={[profile.location.lat, profile.location.lng]} icon={stickFigureIcon}>
                <LeafletTooltip>{profile.name}</LeafletTooltip>
            </Marker>
        ))}
    </MapContainer>
)}


            {selectedProfile && (
                <div className="side-panel">
                    {renderProfileDetails(selectedProfile)}
                    {renderProfileDashboard(selectedProfile)}
                </div>
            )}
        </div>
    );
};

export default App;
