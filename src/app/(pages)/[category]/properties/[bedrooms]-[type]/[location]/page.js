"use client";
import DefaultHeader from "@/components/common/DefaultHeader";
import AdvanceFilterModal from "@/components/common/advance-filter-two";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import PropertyFiltering from "@/components/listing/grid-view/grid-full-1-col-v1/PropertyFiltering";
import TopFilterBar2 from "@/components/listing/map-style/map-v1/TopFilterBar2";
import listings from "@/data/listings";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const locations = [
  { name: "Dubai", count: 1069 },
  { name: "Abu Dhabi", count: 122 },
  { name: "Sharjah", count: 73 },
  { name: "Ras Al Khaimah", count: 53 },
  { name: "Umm Al Quwain", count: 27 },
  { name: "Ajman", count: 12 },
];

const Commercial = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleLocations = showAll ? locations : locations.slice(0, 3);
  const [propData, setPropData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [filteredData, setFilteredData] = useState([]);

  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");

  const [sortedFilteredData, setSortedFilteredData] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(true);
  const [pageItems, setPageItems] = useState([]);
  const [pageContentTrac, setPageContentTrac] = useState([]);
  const path = usePathname();
  const selectedFilter = path.split("/")[1].includes("-")
    ? path.split("/")[1]?.split("-")[0]
    : path.split("/")[1];
  const isPropertyType = path.split("/")[1].includes("-");
  const capitalizedFilter =
    selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1);

  const { data, isLoading, error, isError } =
    useAxiosFetch("/property/approved");

  useEffect(() => {
    if (data) {
      setPropData(data?.data);
    }
  }, [data]);

   const router = useRouter();
    const searchParams = useSearchParams();
    const [filters, setFilters] = useState({
      purpose: searchParams.get("purpose") || "property",
      type: searchParams.get("type") || "property",
      bedrooms: searchParams.get("bedrooms") || "2-bedroom",
      location: searchParams.get("location") || "uae",
      baths: searchParams.get("baths_in") || "3",
    });
    
      const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
    
        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([k, v]) => {
          if (v) params.set(k, v); // Add only non-empty values
        });
    
         // Dynamically construct the URL path
        const purpose = newFilters.purpose ? `${newFilters.purpose}` : "";
        const bedrooms = newFilters.bedrooms ? `${newFilters.bedrooms}-` : "";
        const type = newFilters.type ? newFilters.type : "property";
        const location = newFilters.location ? newFilters.location : "uae";

        const urlPath = `/${purpose}/${bedrooms}${type}/${location}/?${params.toString()}`;
        
        router.replace(urlPath);
      };

  useEffect(() => {
    setPageItems(
      sortedFilteredData.slice((pageNumber - 1) * 4, pageNumber * 4)
    );
    setPageContentTrac([
      (pageNumber - 1) * 4 + 1,
      pageNumber * 4,
      sortedFilteredData.length,
    ]);
  }, [pageNumber, sortedFilteredData]);

  const [listingStatus, setListingStatus] = useState(
    !isPropertyType ? capitalizedFilter : ""
  );
  const [propertyTypes, setPropertyTypes] = useState(
    isPropertyType ? capitalizedFilter : ""
  );
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [location, setLocation] = useState("All Cities");
  const [squirefeet, setSquirefeet] = useState([]);
  const [yearBuild, setyearBuild] = useState([]);
  const [categories, setCategories] = useState([]);

  const resetFilter = () => {
    setListingStatus("");
    setPropertyTypes("");
    setPriceRange([0, 100000]);
    setBedrooms(0);
    setBathrooms(0);
    setLocation("All Cities");
    setSquirefeet([]);
    setyearBuild([0, 2050]);
    setCategories([]);
    setCurrentSortingOption("Newest");
    // document.querySelectorAll(".filterInput").forEach(function (element) {
    //   element.value = null;
    // });

    // document.querySelectorAll(".filterSelect").forEach(function (element) {
    //   element.value = "All Cities";
    // });
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handlelistingStatus = (elm) => {
    setListingStatus((pre) => (pre == elm ? "All" : elm));
    handleFilterChange("purpose", elm)
  };
  const handlepropertyTypes = (elm) => {
    setPropertyTypes((pre) => (pre == elm ? "All" : elm));
    handleFilterChange("type", elm)
  };

  // const handlepropertyTypes = (elm) => {
  //   if (elm == "All") {
  //     setPropertyTypes([]);
  //   } else {
  //     setPropertyTypes((pre) =>
  //       pre.includes(elm) ? [...pre.filter((el) => el != elm)] : [...pre, elm]
  //     );
  //   }
  // };
  const handlepriceRange = (elm) => {
    setPriceRange(elm);
  };
  const handlebedrooms = (elm) => {
    setBedrooms(elm);
  };
  const handlebathrooms = (elm) => {
    setBathrooms(elm);
  };
  const handlelocation = (elm) => {
    console.log(elm);
    setLocation(elm);
  };
  const handlesquirefeet = (elm) => {
    setSquirefeet(elm);
  };
  const handleyearBuild = (elm) => {
    setyearBuild(elm);
  };
  const handlecategories = (elm) => {
    if (elm == "All") {
      setCategories([]);
    } else {
      setCategories((pre) =>
        pre.includes(elm) ? [...pre.filter((el) => el != elm)] : [...pre, elm]
      );
    }
  };

  const filterFunctions = {
    handlelistingStatus,
    handlepropertyTypes,
    handlepriceRange,
    handlebedrooms,
    handlebathrooms,
    handlelocation,
    handlesquirefeet,
    handleyearBuild,
    handlecategories,
    priceRange,
    listingStatus,
    propertyTypes,
    resetFilter,
    bedrooms,
    bathrooms,
    location,
    squirefeet,
    yearBuild,
    categories,
    setPropertyTypes,
    setSearchQuery,
  };

  useEffect(() => {
    const refItems = propData.filter((elm) => {
      if (listingStatus == "All") {
        return true;
      } else if (listingStatus == "Buy") {
        return elm.details.purpose == "Sell";
      } else if (listingStatus == "Rent") {
        return elm.details.purpose == "Rent";
      }
    });

    let filteredArrays = [];

    if (propertyTypes.length > 0) {
      filteredArrays.push(
        refItems.filter((elm) =>
          propertyTypes.includes(elm.details.property_type)
        )
      );
    }

    filteredArrays.push(
      refItems.filter((el) => el.details.bedrooms >= bedrooms)
    );
    filteredArrays.push(
      refItems.filter((el) => el.details.bathrooms >= bathrooms)
    );

    filteredArrays.push(
      refItems.filter(
        (el) =>
          el.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          el.location.emirate
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          el.features_amenities
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          el.other_amenities
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    );

    filteredArrays.push(
      !categories.length
        ? [...refItems]
        : refItems.filter((elm) =>
            categories.every((elem) => elm.features_amenities.includes(elem))
          )
    );

    if (location != "All Cities") {
      filteredArrays.push(
        refItems.filter((el) => el.location.city == location)
      );
    }

    if (priceRange.length > 0) {
      filteredArrays.push(
        refItems.filter(
          (elm) =>
            Number(elm.price) >= priceRange[0] &&
            Number(elm.price) <= priceRange[1]
        )
      );
    }
    if (squirefeet.length > 0 && squirefeet[1]) {
      filteredArrays.push(
        refItems.filter(
          (elm) =>
            elm.details.size.value >= squirefeet[0] &&
            elm.details.size.value <= squirefeet[1]
        )
      );
    }
    if (yearBuild.length > 0) {
      filteredArrays.push(
        refItems.filter(
          (elm) =>
            elm.building_information.year_of_completion >= yearBuild[0] &&
            elm.building_information.year_of_completion <= yearBuild[1]
        )
      );
    }

    const commonItems = refItems.filter((item) =>
      filteredArrays.every((array) => array.includes(item))
    );
    setFilteredData(commonItems);
  }, [
    listingStatus,
    propertyTypes,
    priceRange,
    bedrooms,
    bathrooms,
    location,
    squirefeet,
    yearBuild,
    categories,
    searchQuery,
    propData,
  ]);

  useEffect(() => {
    setPageNumber(1);
    if (currentSortingOption == "Newest") {
      const sorted = [...filteredData].sort(
        (a, b) =>
          b.building_information.year_of_completion -
          a.building_information.year_of_completion
      );
      setSortedFilteredData(sorted);
    } else if (currentSortingOption.trim() == "Price Low") {
      const sorted = [...filteredData].sort((a, b) => a.price - b.price);
      setSortedFilteredData(sorted);
    } else if (currentSortingOption.trim() == "Price High") {
      const sorted = [...filteredData].sort((a, b) => b.price - a.price);
      setSortedFilteredData(sorted);
    } else {
      setSortedFilteredData(filteredData);
    }
  }, [filteredData, currentSortingOption]);

  const handleSaveSearchClick = () => {
    setShowModal(true);
  };

  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}
      <div className="d-flex justify-content-center align-items-center xl:h-[120px] md:h-[170px] sm:px-20 px-5">
        <div>
          <div className="advance-feature-modal">
            <div
              className="modal fade"
              id="advanceSeachModal"
              tabIndex={-1}
              aria-labelledby="advanceSeachModalLabel"
              aria-hidden="true"
            >
              <AdvanceFilterModal filterFunctions={filterFunctions} />
            </div>
          </div>

          <div className="col-lg-12 py-10" style={{ marginTop: "15px" }}>
            <div className="advance-search-list d-flex justify-content-between">
              <div className="dropdown-lists">
                <ul className="p-0 mb-0">
                  <TopFilterBar2 filterFunctions={filterFunctions} />
                </ul>
                <button
                  className="hover:underline text-[#0a644a]"
                  onClick={handleSaveSearchClick}
                >
                  Save Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcumb Sections */}
      <section className="breadcumb-section bgc-f7">
        <div className="container">
          <div className="flex md:flex-row flex-col items-center w-[74%]">

            <div className="md:w-1/2">
              <div className="breadcumb-style1">
                <h2 className="title">Dubai Homes for Sale </h2>
                <div className="breadcumb-list">
                  <a href="/" style={{ color: "#1E6753" }}>
                    Home
                  </a>
                  <a
                    href={`/${listingStatus}/properties`}
                    style={{ color: "#0f8363" }}
                  >
                    {listingStatus}
                  </a>
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
            
            {/* <div className="md:w-1/2 border rounded-lg px-4 py-2 md:mt-0 mt-2">
              <div className="flex flex-wrap gap-4">
                {visibleLocations.map((loc, index) => (
                  <a href="#" key={index} style={{color : "#0f8363" , textDecoration : "underline"}} className="hover:underline">
                    {loc.name}{" "}
                    <span className="text-gray-500">({loc.count})</span>
                  </a>
                ))}
              </div>
              <div className="mt-1 text-right">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-[#0f8363] md:text-base text-sm font-semibold"
                >
                  {showAll ? "VIEW FEWER LOCATIONS" : "VIEW MORE LOCATIONS"}
                </button>
              </div>
            </div> */}

          </div>
        </div>
            
      </section>
      {/* End Breadcumb Sections */}
      

      {/* Property Filtering */}
      <PropertyFiltering showModal={showModal} setShowModal={setShowModal} />

      {/* Property Filtering */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Commercial;
