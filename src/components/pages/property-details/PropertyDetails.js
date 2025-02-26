"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import DefaultHeader from "@/components/common/DefaultHeader";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, EmailShareButton, PinterestShareButton } from "react-share";

const PropertyDetails = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [isSaved, setIsSaved] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    console.log(isOpen)
    const router = useRouter();
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (currentScroll > 100) {
                if (currentScroll > scrollPosition) {
                    // Scrolling down
                    //   setTranslateY(-300); // Hide the div
                } else {
                    // Scrolling up
                    setTranslateY(0); // Show the div
                }
            } else {
                // Ensure the div is visible when near the top
                setTranslateY(0);
            }

            setScrollPosition(currentScroll);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrollPosition]);

    const sections = [
        { id: "gallery", label: "Gallery" },
        { id: "description", label: "Description" },
        { id: "amenities", label: "Amenities" },
        { id: "location", label: "Location" },
        { id: "price-insights", label: "Price Insights" },
        { id: "provided-by", label: "Provided by" },
        { id: "mortgage-calculator", label: "Mortgage Calculator" },
    ];
    const [activeSection, setActiveSection] = useState("gallery");

    useEffect(() => {
        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            root: null, // Use the viewport as the root
            threshold: 0.6, // Trigger when 60% of the section is visible
        });

        sections.forEach(({ id }) => {
            const section = document.getElementById(id);
            if (section) observer.observe(section);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleSaveClick = () => {
        setIsSaved((prevState) => !prevState);
    };
    const shareUrl = window.location.href;

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        alert("Link Copied Successfully")
    };
    return (
        <><div style={{ padding: "20px 150px 20px 150px" }}>
            <div className="details-top-main" style={{
                transform: `translateY(${translateY}px)`,

                transition: "transform 0.2s ease-out", // Smooth animation
            }}>
                {/* <div className="details-top">
                    <Link href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            router.back(); 
                        }}
                        className="back-search"><i className="fas fa-arrow-left"></i> Search</Link>
                    <div className="price">4,900,000 AED</div>
                    <div className="details">
                        <span><i className="fas fa-bed"></i> 3</span>
                        <span><i className="fas fa-bath"></i> 4</span>
                        <span><i className="fas fa-ruler-combined"></i> 2,202 sqft</span>
                    </div>
                    <div className="actions">
                        <a href="#"><i className="far fa-heart"></i> Save</a>
                        <a href="#"><i className="fas fa-share"></i> Share</a>
                        <a href="#"><i className="far fa-flag"></i> Report</a>
                    </div>
                </div> */}
                <DefaultHeader />
                {/* <div className="details-top">
                    <Link href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            router.back();
                        }}
                        className="back-search"><i className="fas fa-arrow-left"></i></Link>
                    <div className="price">4,900,000 AED</div>
                    <div className="details">
                        <span><i className="fas fa-bed"></i> 3</span>
                        <span><i className="fas fa-bath"></i> 4</span>
                        <span><i className="fas fa-ruler-combined"></i> 2,202 sqft</span>
                    </div>
                    <div className="actions">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleSaveClick();
                            }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                color: "#6b38fb",
                                textDecoration: "none",
                                fontSize: "14px",
                                cursor: "pointer",
                            }}
                        >
                            <i className={isSaved ? "fas fa-heart" : "far fa-heart"}></i>
                            <span>Save</span>
                        </a>
                        <a href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleOpen();
                            }}
                            style={{ cursor: "pointer", textDecoration: "none",color: "#6b38fb",}}
                        ><i className="fas fa-share"></i> Share</a>
                        <a href="#"><i className="far fa-flag"></i> Report</a>
                    </div>
                </div> */}
                {/* <div className="tabs">
                    {sections.map(({ id, label }) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className={activeSection === id ? "active" : ""}
                        >
                            {label}
                        </a>
                    ))}
                </div> */}
            </div>
            <div className="container" style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcumb-style1">
                            <div className="breadcumb-list">
                                <a href="#">Home</a>
                                <a href="#">Buy</a>
                            </div>
                            {/* <a
                  className="filter-btn-left mobile-filter-btn d-block d-lg-none"
                  data-bs-toggle="offcanvas"
                  href="#listingSidebarFilter"
                  role="button"
                  aria-controls="listingSidebarFilter"
                >
                  <span className="flaticon-settings" /> Filter
                </a> */}
                        </div>
                    </div>
                </div>
                <div className="actions" style={{ display: "flex", gap: "20px" }}>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleSaveClick();
                        }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            color: "#6b38fb",
                            textDecoration: "none",
                            fontSize: "14px",
                            cursor: "pointer",
                            gap: "5px"
                        }}
                    >
                        <i className={isSaved ? "fas fa-heart" : "far fa-heart"}></i>
                        <span>Save</span>
                    </a>
                    <a href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleOpen();
                        }}
                        style={{ cursor: "pointer", textDecoration: "none", color: "#6b38fb", }}
                    ><i className="fas fa-share"></i> Share</a>
                    <a href="#" style={{
                        color: "#6b38fb",
                    }}><i className="far fa-flag" ></i> Report</a>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px", width: "100%", marginBottom: "20px", marginTop: "20px" }}>
                <Image
                    width={500}
                    height={500}
                    style={{
                        flex: "2",
                        height: "400px",
                        borderRadius: "10px",
                        objectFit: "cover",
                    }}
                    src="/images/listings/demoBanglow.jpg"
                    alt="listings"
                />

                <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <Image
                        width={500}
                        height={200}
                        style={{
                            height: "195px",
                            borderRadius: "8px",
                            objectFit: "cover",
                        }}
                        src="/images/listings/demoBanglow2.jpg"
                        alt="listings"
                    />
                    <Image
                        width={500}
                        height={200}
                        style={{
                            height: "195px",
                            borderRadius: "8px",
                            objectFit: "cover",
                        }}
                        src="/images/listings/demoBanglow3.jpg"
                        alt="listings"
                    />
                </div>

                {/* <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <Image
                        width={400}
                        height={200}
                        style={{
                            height: "195px",
                            borderRadius: "8px",
                            objectFit: "cover",
                        }}
                        src="/images/listings/demoBanglow.jpg"
                        alt="listings"
                    />
                    <Image
                        width={400}
                        height={200}
                        style={{
                            height: "195px",
                            borderRadius: "8px",
                            objectFit: "cover",
                        }}
                        src="/images/listings/demoBanglow3.jpg"
                        alt="listings"
                    />
                </div> */}
            </div>


            <div className="property-details-1" id={"description"}>
                <div className="price">AED 21,500,000</div>
                <div className="upfront-costs">See upfront costs</div>
                <div className="monthly-cost">Own this from just 77,377 AED/month</div>
                <div className="details">
                    <div>
                        <i className="fas fa-bed"></i>
                        <div>5 Bedrooms + Maid</div>
                    </div>
                    <div>
                        <i className="fas fa-bath"></i>
                        <div>6 Bathrooms</div>
                    </div>
                    <div>
                        <i className="fas fa-ruler-combined"></i>
                        <div>7,132 sqft / 663 sqm</div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="property-title">VILLA FOR SALE IN THE SUNDIALS, EARTH</div>
                <div className="property-subtitle">View Today | Golf View | Exclusive Community</div>
                <div className="property-description">
                    Mirabella Properties is pleased to present this exceptional villa for sale in Sundials, Jumeirah Golf Estates.
                </div>
                <div className="property-details">
                    Property Details:<br />
                    - 5 Bedrooms<br />
                    - 6 Bathrooms<br />
                    - Built Up Area (BUA): 7,132 square feet<br />
                    - Plot: 7,535 square feet<br />
                    - Fully Upgraded<br />
                    - Basement<br />
                    ...
                </div>
                <a href="#" className="full-description">See full description</a>
            </div>
            <hr />
            <div className="property-details-main">
                <div className="property-details">

                    <div className="title">Property details</div>
                    <div className="details">
                        <div className="detail-item">
                            <i className="fas fa-building"></i>
                            <span>Property Type</span>
                            <span className="value">Villa</span>
                        </div>
                        <div className="detail-item">
                            <i className="fas fa-ruler-combined"></i>
                            <span>Property Size</span>
                            <span className="value">7,132 sqft / 663 sqm</span>
                        </div>
                        <div className="detail-item">
                            <i className="fas fa-bed"></i>
                            <span>Bedrooms</span>
                            <span className="value">5 + Maid</span>
                        </div>
                        <div className="detail-item">
                            <i className="fas fa-bath"></i>
                            <span>Bathrooms</span>
                            <span className="value">6</span>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="property-amenities-main" id="amenities">

                <h2>Amenities</h2>
                <div className="property-amenities">
                    <div className="features-grid">
                        <div className="feature-item">Gym</div>
                        <div className="feature-item">Parking</div>
                        <div className="feature-item">Security</div>
                        <div className="feature-item">Play Area</div>
                        <div className="feature-item">Garden</div>
                    </div>

                    {/* <div className="column">
                        <div className="item">
                            <img src="https://www.flaticon.com/svg/static/icons/svg/263/263494.svg" alt="Maid's Room" width="20" height="20" />
                            Maid's Room
                        </div>
                        <div className="item">
                            <img src="https://www.flaticon.com/svg/static/icons/svg/3494/3494035.svg" alt="Balcony" width="20" height="20" />
                            Balcony
                        </div>
                        <div className="item">
                            <img src="https://www.flaticon.com/svg/static/icons/svg/3494/3494047.svg" alt="Shared Pool" width="20" height="20" />
                            Shared Pool
                        </div>
                        <div className="item">
                            <img src="https://www.flaticon.com/svg/static/icons/svg/3494/3494157.svg" alt="Built-in Wardrobe" width="20" height="20" />
                            Built in Wardrobes
                        </div>
                        <div className="item">
                            <img src="https://www.flaticon.com/svg/static/icons/svg/3494/3494021.svg" alt="Barbecue Area" width="20" height="20" />
                            Barbecue Area
                        </div>
                    </div>
                    <div className="column">
                        <div className="item">
                            <img src="https://www.flaticon.com/svg/static/icons/svg/3494/3494040.svg" alt="Gym" width="20" height="20" />
                            Gym
                        </div>
                        <div className="item">
                            <img src="https://www.flaticon.com/svg/static/icons/svg/3494/3494045.svg" alt="Parking" width="20" height="20" />
                            Parking
                        </div>
                        <div className="item">
                            <img src="https://www.flaticon.com/svg/static/icons/svg/3494/3494048.svg" alt="Security" width="20" height="20" />
                            Security
                        </div>
                        <div className="item">
                            <img src="https://www.flaticon.com/svg/static/icons/svg/3494/3494051.svg" alt="Play Area" width="20" height="20" />
                            Play Area
                        </div>
                        <div className="item">
                            <img src="https://www.flaticon.com/svg/static/icons/svg/3494/3494053.svg" alt="Garden" width="20" height="20" />
                            Garden
                        </div>
                    </div> */}
                </div>
            </div>
            <hr />
            <div className="location-main-div" id="location" >
                <div className="location-main">
                    <div className="location-header">
                        Location
                    </div>
                    <div className="map-container">
                        <img alt="Map background" height="200" src="https://storage.googleapis.com/a1aa/image/1oY3FCztjZYeUyudeNsreH8CX49yRp5EVgtEKZUWXbDeeoFgC.jpg" width="1200" />
                        <div className="location-info">
                            <div>
                                <i className="fas fa-map-marker-alt">
                                </i>
                                Jasmine Lane, Jumeirah Golf Estates, Dubai
                            </div>
                            <a href="#">
                                View on map
                                {" "} <i className="fas fa-arrow-right">
                                </i>
                            </a>
                        </div>
                    </div>
                    <div className="cards-container">
                        <div className="card">
                            <div className="location-card">
                                <img alt="Residential Insights" height="100" src="https://storage.googleapis.com/a1aa/image/yD3dezVvOq3PVKIKB7xMkJwPeOQLmRLZs6SqFz3qQb2yHtAUA.jpg" width="100" />
                                <div>
                                    <div className="card-title">
                                        Jasmine Lane
                                    </div>
                                    <div className="card-subtitle">
                                        Residential Insights
                                    </div>
                                </div>
                                <a href="#">
                                    <i className="fas fa-chevron-right ">
                                    </i>
                                </a>
                            </div>
                            <div className="card-price" >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.34118 11.9825C9.34118 11.3881 8.97921 10.8525 8.42358 10.6252C7.86865 10.3978 7.22922 10.5236 6.80387 10.9438C6.37923 11.364 6.25176 11.9956 6.48204 12.5451C6.71232 13.0938 7.25387 13.4518 7.85457 13.4518C8.45527 13.4518 8.99752 13.8098 9.22709 14.3585C9.45737 14.9073 9.32991 15.5396 8.90526 15.9598C8.48062 16.38 7.84119 16.5058 7.28556 16.2784C6.73063 16.0511 6.36796 15.5155 6.36796 14.9211M7.8519 10.5108V9.7112M7.8519 17.197V16.398M22.0004 15.2019C22.0004 16.2233 19.5922 17.0513 16.6216 17.0513C15.1321 17.0513 13.784 16.8432 12.8099 16.5068M22.0004 15.2019C22.0004 14.1805 19.5922 13.3525 16.6216 13.3525C15.546 13.3525 14.5442 13.4611 13.7037 13.648M22.0004 15.2019L21.9999 17.3425C21.9999 17.8332 21.433 18.3032 20.4246 18.6501C19.4154 18.9971 18.0478 19.192 16.6211 19.192C14.3035 19.192 12.2464 18.6812 11.5162 17.9251M13.7037 13.648C13.7059 13.5841 13.707 13.5201 13.707 13.456C13.707 10.2886 11.0866 7.72046 7.85348 7.72046C4.6204 7.72046 2 10.2886 2 13.456C2 16.6233 4.6204 19.1915 7.85348 19.1915C9.40558 19.1915 10.8943 18.5868 11.9922 17.5114C12.3048 17.2052 12.5785 16.8678 12.8099 16.5068M13.7037 13.648C13.6688 14.6679 13.3571 15.6535 12.8099 16.5068" stroke="currentColor" strokeLinejoin="round"></path></svg>   Price Range:
                                <span style={{ color: "#000" }}>
                                    4M-6M AED
                                </span>
                            </div>

                        </div>
                        <div className="card">
                            <div className="location-card">
                                <img alt="Community Insights" height="100" src="https://storage.googleapis.com/a1aa/image/stfWf40JFHs5U08sX5Hf90Nt3Ujx3fbWz6Ks3T7h1WuBfoFgC.jpg" width="100" />
                                <div>
                                    <div className="card-title">
                                        Jumeirah Golf Estates
                                    </div>
                                    <div className="card-subtitle">
                                        Community Insights
                                    </div>
                                    <div className="card-subtitle">
                                        <i className="fas fa-star" style={{ color: "#4caf50" }}>
                                        </i>{" "}
                                        <span style={{ color: "white", backgroundColor: "#00a663", padding: "3px", borderRadius: "5px" }}>  4.9/5 </span>
                                        <span style={{ color: "#888", marginLeft: '5px' }}>
                                            {" "} 3 building reviews
                                        </span>
                                    </div>
                                </div>
                                <a href="#">
                                    <i className="fas fa-chevron-right ">
                                    </i>
                                </a>
                            </div>
                            <div className="card-subtitle">
                                Green Areas | Mostly villas
                            </div>
                            <div className="card-price">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.34118 11.9825C9.34118 11.3881 8.97921 10.8525 8.42358 10.6252C7.86865 10.3978 7.22922 10.5236 6.80387 10.9438C6.37923 11.364 6.25176 11.9956 6.48204 12.5451C6.71232 13.0938 7.25387 13.4518 7.85457 13.4518C8.45527 13.4518 8.99752 13.8098 9.22709 14.3585C9.45737 14.9073 9.32991 15.5396 8.90526 15.9598C8.48062 16.38 7.84119 16.5058 7.28556 16.2784C6.73063 16.0511 6.36796 15.5155 6.36796 14.9211M7.8519 10.5108V9.7112M7.8519 17.197V16.398M22.0004 15.2019C22.0004 16.2233 19.5922 17.0513 16.6216 17.0513C15.1321 17.0513 13.784 16.8432 12.8099 16.5068M22.0004 15.2019C22.0004 14.1805 19.5922 13.3525 16.6216 13.3525C15.546 13.3525 14.5442 13.4611 13.7037 13.648M22.0004 15.2019L21.9999 17.3425C21.9999 17.8332 21.433 18.3032 20.4246 18.6501C19.4154 18.9971 18.0478 19.192 16.6211 19.192C14.3035 19.192 12.2464 18.6812 11.5162 17.9251M13.7037 13.648C13.7059 13.5841 13.707 13.5201 13.707 13.456C13.707 10.2886 11.0866 7.72046 7.85348 7.72046C4.6204 7.72046 2 10.2886 2 13.456C2 16.6233 4.6204 19.1915 7.85348 19.1915C9.40558 19.1915 10.8943 18.5868 11.9922 17.5114C12.3048 17.2052 12.5785 16.8678 12.8099 16.5068M13.7037 13.648C13.6688 14.6679 13.3571 15.6535 12.8099 16.5068" stroke="currentColor" strokeLinejoin="round"></path></svg>  Price Range:
                                <span style={{ color: "#000" }}>
                                    1.2M-70M AED
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="price-insights-main" id="price-insights">

                <div className="price-insights">
                    <h1>Price Insights</h1>
                    <h2>Transactions for Similar Properties</h2>
                    <p>5 Beds Villa in The Sundials</p>
                    <div className="table-div">
                        <div>
                            <h2>SOLD FOR</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>AED</th>
                                        <th>Area (sqft)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>11 Nov 2024</td>
                                        <td>30,000,000</td>
                                        <td>9,849</td>
                                    </tr>
                                    <tr>
                                        <td>1 Nov 2024</td>
                                        <td>11,500,000</td>
                                        <td>7,535</td>
                                    </tr>
                                    <tr>
                                        <td>15 Oct 2024</td>
                                        <td>25,000,000</td>
                                        <td>8,200</td>
                                    </tr>
                                    <tr>
                                        <td>20 Sep 2024</td>
                                        <td>15,000,000</td>
                                        <td>6,500</td>
                                    </tr>
                                    <tr>
                                        <td>5 Aug 2024</td>
                                        <td>20,000,000</td>
                                        <td>7,800</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <h2>Rented FOR</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>AED/year</th>
                                        <th>Area (sqft)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>11 Nov 2024</td>
                                        <td>30,000,000</td>
                                        <td>9,849</td>
                                    </tr>
                                    <tr>
                                        <td>1 Nov 2024</td>
                                        <td>11,500,000</td>
                                        <td>7,535</td>
                                    </tr>
                                    <tr>
                                        <td>15 Oct 2024</td>
                                        <td>25,000,000</td>
                                        <td>8,200</td>
                                    </tr>
                                    <tr>
                                        <td>20 Sep 2024</td>
                                        <td>15,000,000</td>
                                        <td>6,500</td>
                                    </tr>
                                    <tr>
                                        <td>5 Aug 2024</td>
                                        <td>20,000,000</td>
                                        <td>7,800</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
            <hr /> */}
            {/* <div className="price-trends-main">
                <div class="price-trends">
                    <div class="title">
                        Price trends
                    </div>
                    <div class="subtitle">
                        5 bedrooms villas sold in The Sundials and Jumeirah Golf Estates
                    </div>
                    <div class="legend">
                        <div class="sundials">
                            <span>
                            </span>
                            The Sundials
                        </div>
                        <div class="golf-estates">
                            <span>
                            </span>
                            Jumeirah Golf Estates
                        </div>
                    </div>
                    <div class="buttons">
                        <button>
                            1Y
                        </button>
                        <button>
                            2Y
                        </button>
                        <button>
                            5Y
                        </button>
                    </div>
                    <img alt="Line chart showing price trends for The Sundials and Jumeirah Golf Estates" class="chart" height="300" src="https://storage.googleapis.com/a1aa/image/FsW4KiVeWfgNt0U0dspT5Geefg9gjkbO3s0JWtIKoJk0wzFgC.jpg" width="800" />

                    <div class="info-boxes">
                        <div class="info-box">
                            <i class="fas fa-home">
                            </i>
                            <div class="text">
                                <div class="highlight">
                                    This property costs 32% more
                                </div>
                                than the average price of 5 bedroom in Jumeirah Golf Estates
                                <br />
                                Average Sale Price is 16,330,394 AED
                            </div>
                        </div>
                        <div class="info-box">
                            <i class="fas fa-ruler-combined">
                            </i>
                            <div class="text">
                                <div class="highlight">
                                    This property is 5% smaller
                                </div>
                                than the average size of 5 bedroom in Jumeirah Golf Estates
                                <br />
                                Average size is 7,478 sqft
                            </div>
                        </div>
                    </div>
                    <div class="footer-price">
                        The data displayed is based on average prices and sizes of all listings that were live on Property Finder in Jumeirah Golf Estates
                    </div>
                </div>
            </div> */}
        </div>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p style={{ display: "flex", justifyContent: "flex-end", cursor: "pointer" }} onClick={handleClose}>
                            X
                        </p>
                        <h3>Share this page</h3>
                        <p>Copy the link or share via social media:</p>

                        <button className="copy-button" onClick={handleCopyLink}>
                            Copy Link
                        </button>

                        <div className="social-buttons">
                            {/* Facebook */}
                            <FacebookShareButton url={shareUrl}>
                                <i className="fab fa-facebook" style={{ fontSize: "24px", color: "#3b5998" }}></i>
                            </FacebookShareButton>

                            {/* Twitter */}
                            <TwitterShareButton url={shareUrl}>
                                <i className="fab fa-twitter" style={{ fontSize: "24px", color: "#1DA1F2" }}></i>
                            </TwitterShareButton>

                            {/* LinkedIn */}
                            <LinkedinShareButton url={shareUrl}>
                                <i className="fab fa-linkedin" style={{ fontSize: "24px", color: "#0077b5" }}></i>
                            </LinkedinShareButton>

                            {/* WhatsApp */}
                            <WhatsappShareButton url={shareUrl}>
                                <i className="fab fa-whatsapp" style={{ fontSize: "24px", color: "#25D366" }}></i>
                            </WhatsappShareButton>

                            {/* Email */}
                            <EmailShareButton url={shareUrl} subject="Check this out!" body="Hey, take a look at this page: ">
                                <i className="fas fa-envelope" style={{ fontSize: "24px", color: "#D44638" }}></i>
                            </EmailShareButton>

                            {/* Pinterest */}
                            <PinterestShareButton url={shareUrl} media={shareUrl}>
                                <i className="fab fa-pinterest" style={{ fontSize: "24px", color: "#E60023" }}></i>
                            </PinterestShareButton>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PropertyDetails;