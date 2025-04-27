import React, { useState, useEffect, useRef } from 'react';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import { useUser } from '../context/UserContext';
import apartmentsData from '../data/apartments.json';

function TenantHome() {
  const { user } = useUser();
  const [apartments, setApartments] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('distance'); // Default sort by distance
  const [customCenter, setCustomCenter] = useState(null); // For custom search location
  const [referencePoint, setReferencePoint] = useState(null); // Student’s institution or custom location
  const [useInstitution, setUseInstitution] = useState(true); // Default to using institution
  const [customSearch, setCustomSearch] = useState(''); // For the "Other location" search bar
  const [isMapsLoaded, setIsMapsLoaded] = useState(false); // Track if Google Maps API is loaded
  const mapRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const geocodeAddresses = async () => {
      try {
        const updatedApartments = await Promise.all(
          apartmentsData.map(async (apartment) => {
            try {
              const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(apartment.location)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
              );
              const data = await response.json();
              if (data.status === 'OK') {
                const { lat, lng } = data.results[0].geometry.location;
                return {
                  ...apartment,
                  title: `${apartment.bedrooms}BR Apartment`,
                  lat,
                  lng,
                  image: 'https://via.placeholder.com/150'
                };
              }
              return null;
            } catch (error) {
              console.error('Geocoding error for', apartment.location, ':', error);
              return null;
            }
          })
        );
        setApartments(updatedApartments.filter((apt) => apt !== null));
      } catch (error) {
        console.error('Geocoding process failed:', error);
      }
    };

    geocodeAddresses();
  }, []);

  useEffect(() => {
    const geocodeLocation = async (location) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location + ', QC')}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.status === 'OK') {
          const { lat, lng } = data.results[0].geometry.location;
          setReferencePoint({ lat, lng });
          if (!useInstitution) {
            setCustomCenter({ lat, lng });
          }
        } else {
          console.error('Geocoding failed:', data.status);
          // Fallback to default Montreal coordinates if geocoding fails
          setReferencePoint({ lat: 45.5017, lng: -73.5673 });
        }
      } catch (error) {
        console.error('Geocoding error:', error);
        setReferencePoint({ lat: 45.5017, lng: -73.5673 });
      }
    };

    if (useInstitution && user.institution) {
      geocodeLocation(user.institution);
      setCustomCenter(null); // Clear custom center when using institution
      setCustomSearch(''); // Clear the custom search input
    } else if (customCenter) {
      setReferencePoint(customCenter);
    }
  }, [user.institution, useInstitution, customCenter]);

  useEffect(() => {
    if (isMapsLoaded && mapRef.current && referencePoint && window.google && window.google.maps) {
      // Update the circle
      if (circleRef.current) {
        circleRef.current.setMap(null);
      }
      circleRef.current = new window.google.maps.Circle({
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#0000FF',
        fillOpacity: 0.1,
        map: mapRef.current,
        center: referencePoint,
        radius: 5000 // Fixed 5km radius for visualization
      });
    }
  }, [isMapsLoaded, referencePoint]);

  const handleCustomSearch = async () => {
    if (customSearch) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(customSearch)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.status === 'OK') {
          const { lat, lng } = data.results[0].geometry.location;
          setCustomCenter({ lat, lng });
          setReferencePoint({ lat, lng });
        } else {
          console.error('Geocoding failed for custom search:', data.status);
        }
      } catch (error) {
        console.error('Geocoding error for custom search:', error);
      }
    }
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };

  const filteredApartments = apartments
    .filter((apartment) =>
      apartment.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'distance' && referencePoint) {
        const distA = calculateDistance(a.lat, a.lng, referencePoint.lat, referencePoint.lng);
        const distB = calculateDistance(b.lat, b.lng, referencePoint.lat, referencePoint.lng);
        return distA - distB;
      } else if (sortBy === 'price') {
        return a.price - b.price;
      } else if (sortBy === 'rating') {
        return b.rating - a.rating; // Descending order for rating
      }
      return 0;
    })
    .map((apartment, index) => ({
      ...apartment,
      label: String.fromCharCode(65 + index) // A, B, C, etc.
    }));

  const mapCenter = referencePoint || { lat: 45.5017, lng: -73.5673 };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4 h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Filter Apartments</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Sort By</h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border rounded-lg text-black"
          >
            <option value="distance">Distance from Reference Point</option>
            <option value="price">Price (Low to High)</option>
            <option value="rating">Rating (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 text-center bg-white shadow">
          <h1 className="text-3xl font-bold">Hello, {user.firstName}!</h1>
          <p className="text-lg mt-2">Explore rentals on Strent</p>
          {/* Checkboxes and Search Bar */}
          <div className="flex justify-center items-center mt-4 space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={useInstitution}
                onChange={() => {
                  setUseInstitution(true);
                  setCustomCenter(null);
                  setCustomSearch('');
                }}
                className="mr-2"
              />
              My institution ({user.institution})
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={!useInstitution}
                onChange={() => {
                  setUseInstitution(false);
                }}
                className="mr-2"
              />
              Other location
            </label>
            <input
              type="text"
              placeholder="Search another location..."
              value={customSearch}
              onChange={(e) => setCustomSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCustomSearch();
                }
              }}
              disabled={useInstitution}
              className={`p-2 border rounded-lg text-black ${useInstitution ? 'opacity-50 cursor-not-allowed' : 'focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
            />
          </div>
        </div>
        <div className="flex flex-1">
          {/* Map */}
          <div className="w-1/2 h-[calc(100vh-150px)]">
            {apartments.length > 0 ? (
              <APIProvider
                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                onLoad={() => setIsMapsLoaded(true)}
              >
                {!isMapsLoaded ? (
                  <p className="p-4 text-gray-500">Loading map...</p>
                ) : (
                  <Map
                    center={mapCenter}
                    style={{ height: '100%', width: '100%' }}
                    mapTypeId="roadmap"
                    options={{
                      disableDefaultUI: false, // Ensure default UI is enabled
                      zoomControl: true, // Show zoom controls
                      scrollwheel: true, // Allow mouse wheel zooming
                      draggable: true, // Allow panning
                      gestureHandling: 'greedy', // Enable all gestures (zoom, pan, etc.)
                      minZoom: 11, // Minimum zoom level
                      maxZoom: 18, // Maximum zoom level
                      styles: [
                        { featureType: "poi", stylers: [{ visibility: "off" }] },
                        { featureType: "transit", stylers: [{ visibility: "off" }] },
                        { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
                        { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
                      ]
                    }}
                    onLoad={(map) => {
                      mapRef.current = map;
                    }}
                  >
                    {filteredApartments.map((apartment) => (
                      <Marker
                        key={apartment.id}
                        position={{ lat: apartment.lat, lng: apartment.lng }}
                        onClick={() => setSelectedApartment(apartment)}
                        icon={{
                          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                              <circle cx="15" cy="15" r="13" fill="red" stroke="white" stroke-width="2"/>
                              <text x="15" y="19" font-size="15" font-family="Arial" fill="white" text-anchor="middle">${apartment.label}</text>
                            </svg>
                          `)}`,
                          scaledSize: new window.google.maps.Size(30, 30)
                        }}
                      />
                    ))}
                    {referencePoint && (
                      <Marker
                        position={referencePoint}
                        icon={{
                          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="blue">
                              <circle cx="12" cy="12" r="10" />
                            </svg>
                          `),
                          scaledSize: new window.google.maps.Size(24, 24)
                        }}
                      />
                    )}
                    {selectedApartment && (
                      <InfoWindow
                        position={{ lat: selectedApartment.lat, lng: selectedApartment.lng }}
                        onCloseClick={() => setSelectedApartment(null)}
                      >
                        <div>
                          <h3 className="font-bold">{selectedApartment.title}</h3>
                          <p>{selectedApartment.location}</p>
                          <p>{selectedApartment.bedrooms} Bed, {selectedApartment.bathrooms} Bath</p>
                          <p>${selectedApartment.price}/month</p>
                          <p>Rating: {selectedApartment.rating} stars</p>
                        </div>
                      </InfoWindow>
                    )}
                  </Map>
                )}
              </APIProvider>
            ) : (
              <p className="p-4 text-gray-500">Loading map...</p>
            )}
          </div>
          {/* List */}
          <div className="w-1/2 p-4 overflow-y-auto h-[calc(100vh-150px)]">
            {filteredApartments.length > 0 ? (
              filteredApartments.map((apartment) => (
                <div
                  key={apartment.id}
                  className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center mr-4">
                    <span className="text-lg font-bold">{apartment.label}</span>
                  </div>
                  <img
                    src={apartment.image || 'https://via.placeholder.com/150'}
                    alt={apartment.title}
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{apartment.title}</h3>
                    <p className="text-gray-600">{apartment.location}</p>
                    <p className="text-gray-600">{apartment.bedrooms} Bed, {apartment.bathrooms} Bath</p>
                    <p className="text-green-600 font-semibold">${apartment.price}/month</p>
                    <p className="text-gray-600">Rating: {apartment.rating} stars</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No apartments found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TenantHome;