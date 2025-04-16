"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useNewProjectFilter = (intialData) => {
  const [propData, setPropData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");
  const [sortedFilteredData, setSortedFilteredData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(true);
  const [pageItems, setPageItems] = useState([]);
  const [pageContentTrac, setPageContentTrac] = useState([]);
  const path = usePathname();

  // console.log("intialData : ", intialData)

  let isListingStatus;
  let selectedLocation;
  const selectedFilter = path.split("/")[1];
  if (selectedFilter == "for-sale") {
    isListingStatus = "Buy";
  } else if (selectedFilter == "for-rent") {
    isListingStatus = "Rent";
  } else if (selectedFilter == "properties") {
    isListingStatus = "All";
  }
  const isPropertyType = path.split("/")[2].split("-").pop();
  let filterBedrooms;
  const pathBedrooms = path.split("/")[2].split("-")[0];
  const numberedBedrooms = Number(pathBedrooms);
  if (!isNaN(numberedBedrooms)) {
    filterBedrooms = path.split("/")[2].split("-")[0];
  }
  const urlLocation = decodeURIComponent(path.split("/")[3]);
  selectedLocation = urlLocation
    .split(/[-\s]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  useEffect(() => {
    if (intialData?.length > 0) {
      setPropData(intialData);
    }
  }, [intialData]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({});

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

  const [listingStatus, setListingStatus] = useState(isListingStatus || "All");
  const [propertyTypes, setPropertyTypes] = useState(isPropertyType || "All");
  const [priceRange, setPriceRange] = useState([0, 1000000000]);
  const [bedrooms, setBedrooms] = useState(filterBedrooms || 0);
  const [bathrooms, setBathrooms] = useState(0);
  const [location, setLocation] = useState(selectedLocation || "uae");
  const [squirefeet, setSquirefeet] = useState([]);
  const [yearBuild, setyearBuild] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);

      const extractedFilters = {
        bathrooms: searchParams.get("bathrooms") || "",
        min_price: searchParams.get("min_price") || "",
        max_price: searchParams.get("max_price") || "",
        priceRange: searchParams.get("priceRange") || "",
      };

      setFilters(extractedFilters);
      setBathrooms(extractedFilters.bathrooms);
      // setPriceRange([extractedFilters.min_price, extractedFilters.max_price]);
    }
  }, [router.query]);

  const handleFilterChange = (key, value) => {
    const lower = location.toLowerCase();
    const Location = lower.includes(" ") ? lower.replace(/\s+/g, "-") : lower;

    const existingParams = new URLSearchParams(window.location.search);
    const newFilters = { ...filters, [key]: value };

    const params = new URLSearchParams();
    const allowedParams = [
      "bathrooms",
      "priceRange",
      "min_price",
      "max_price",
      "min_feet",
      "max_feet",
    ];

    allowedParams.forEach((paramKey) => {
      const filterValue = newFilters[paramKey];
      const urlValue = existingParams.get(paramKey);

      if (filterValue) {
        params.set(paramKey, filterValue);
      } else if (urlValue) {
        params.set(paramKey, urlValue);
      }
    });

    setFilters(newFilters);

    const currentPath = window.location.pathname;
    const urlPath = params.toString();
    const hasParams = Array.from(params.keys()).length > 0;

    if (key === "propertyType") {
      if (filterBedrooms) {
        if (hasParams) {
          router.replace(
            `/${selectedFilter}/${filterBedrooms}-bedrooms-${value}/${Location}?${urlPath}`
          );
          return;
        }
        router.replace(
          `/${selectedFilter}/${filterBedrooms}-bedrooms-${value}/${Location}`
        );
        return;
      }
      if (hasParams) {
        if (filterBedrooms) {
          router.replace(
            `/${selectedFilter}/${filterBedrooms}-bedrooms-${value}/${Location}?${urlPath}`
          );
          return;
        }
        router.replace(`/${selectedFilter}/${value}/${Location}?${urlPath}`);
        return;
      }
      // if (filterBedrooms) {
      //   router.replace(`/${selectedFilter}/${filterBedrooms}-bedrooms-${value}/uae`);
      //   return;
      // }
      console.log("inside propetyType");
      router.replace(`/${selectedFilter}/${value}/${Location}`);
    }

    if (key === "listingStatus") {
      // if(hasParams){
      //   router.replace(`/${value}/${filterBedrooms}-bedrooms-${propertyTypes}/uae?${urlPath}`);
      // }
      // if(filterBedrooms){
      //   router.replace(`/${value}/${filterBedrooms}-bedrooms-${propertyTypes}/uae`);
      //   return
      // }

      if (filterBedrooms) {
        if (hasParams) {
          router.replace(
            `/${value}/${filterBedrooms}-bedrooms-${propertyTypes}/${Location}?${urlPath}`
          );
          return;
        }
        router.replace(
          `/${value}/${filterBedrooms}-bedrooms-${propertyTypes}/${Location}`
        );
        return;
      }
      if (hasParams) {
        if (filterBedrooms) {
          router.replace(
            `/${value}/${filterBedrooms}-bedrooms-${propertyTypes}/${Location}?${urlPath}`
          );
          return;
        }
        router.replace(`/${value}/${propertyTypes}/${Location}?${urlPath}`);
        return;
      }

      router.replace(`/${value}/${propertyTypes}/${Location}`);
    }
    if (key === "bedrooms") {
      if (value == 0) {
        router.replace(`/${selectedFilter}/${propertyTypes}/${Location}`);
      } else {
        if (hasParams) {
          console.log("inside");
          router.replace(
            `/${selectedFilter}/${value}-bedrooms-${propertyTypes}/${Location}?${urlPath}`
          );
          return;
        }
        console.log("outside");
        router.replace(
          `/${selectedFilter}/${value}-bedrooms-${propertyTypes}/${Location}`
        );
      }
    }
    if (key === "location") {
      if (filterBedrooms) {
        if (hasParams) {
          router.replace(
            `/${selectedFilter}/${filterBedrooms}-bedrooms-${propertyTypes}/${value}?${urlPath}`
          );
          return;
        }
        router.replace(
          `/${selectedFilter}/${filterBedrooms}-bedrooms-${propertyTypes}/${value}`
        );
        return;
      }
      if (hasParams) {
        if (filterBedrooms) {
          router.replace(
            `/${selectedFilter}/${filterBedrooms}-bedrooms-${propertyTypes}/${value}?${urlPath}`
          );
          return;
        }
        router.replace(
          `/${selectedFilter}/${propertyTypes}/${value}?${urlPath}`
        );
        return;
      }
      // if (filterBedrooms) {
      //   router.replace(`/${selectedFilter}/${filterBedrooms}-bedrooms-${value}/uae`);
      //   return;
      // }
      console.log("inside propetyType");
      router.replace(`/${selectedFilter}/${propertyTypes}/${value}`);
    }
    if (
      key === "bathrooms" ||
      key === "priceRange" ||
      key === "min_price" ||
      key === "max_price" ||
      key == "min_feet" ||
      key == "max_feet"
    ) {
      router.push(`${currentPath}?${urlPath}`);
    }
  };

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
    handleFilterChange("purpose", elm);
  };
  const handlepropertyTypes = (elm) => {
    setPropertyTypes((pre) => (pre == elm ? "All" : elm));
    handleFilterChange("type", elm);
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

  // useEffect(() => {
  //   if (propData.length > 0) {
  //     const refItems = propData.filter((elm) => {
  //       if (listingStatus === "All") return true;
  //       return listingStatus === "Buy"
  //         ? elm.details.purpose === "Sell"
  //         : elm.details.purpose === "Rent";
  //     });

  //     let filteredArrays = [];

  //     if (propertyTypes.length > 0) {
  //       filteredArrays.push(
  //         refItems.filter((elm) =>
  //           propertyTypes.includes(elm.details.property_type)
  //         )
  //       );
  //     }

  //     filteredArrays.push(refItems.filter((el) => el.details.bedrooms >= bedrooms));
  //     filteredArrays.push(refItems.filter((el) => el.details.bathrooms >= bathrooms));

  //     filteredArrays.push(
  //       refItems.filter(
  //         (el) =>
  //           el.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //           el.location.emirate.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //           el.name.toLowerCase().includes(searchQuery.toLowerCase())
  //       )
  //     );

  //     filteredArrays.push(
  //       !categories.length
  //         ? [...refItems]
  //         : refItems.filter((elm) =>
  //             categories.every((elem) => elm.features_amenities.includes(elem))
  //           )
  //     );

  //     if (location !== "All Cities") {
  //       filteredArrays.push(refItems.filter((el) => el.location.city === location));
  //     }

  //     if (priceRange.length > 0) {
  //       filteredArrays.push(
  //         refItems.filter(
  //           (elm) =>
  //             Number(elm.price) >= priceRange[0] && Number(elm.price) <= priceRange[1]
  //         )
  //       );
  //     }

  //     const commonItems = refItems.filter((item) =>
  //       filteredArrays.every((array) => array.includes(item))
  //     );

  //     console.log("Filtered items:", commonItems.length);
  //     setFilteredData(commonItems);
  //   }
  // }, [propData, listingStatus, propertyTypes, priceRange, bedrooms, bathrooms, location, categories, searchQuery]);

  // useEffect(() => {
  //   setPageNumber(1);
  //   if (currentSortingOption == "Newest") {
  //     const sorted = [...filteredData].sort(
  //       (a, b) =>
  //         b.building_information.year_of_completion -
  //         a.building_information.year_of_completion
  //     );
  //     setSortedFilteredData(sorted);
  //   } else if (currentSortingOption.trim() == "Price Low") {
  //     const sorted = [...filteredData].sort((a, b) => a.price - b.price);
  //     setSortedFilteredData(sorted);
  //   } else if (currentSortingOption.trim() == "Price High") {
  //     const sorted = [...filteredData].sort((a, b) => b.price - a.price);
  //     setSortedFilteredData(sorted);
  //   } else {
  //     setSortedFilteredData(filteredData);
  //   }
  // }, [filteredData, currentSortingOption]);

  useEffect(() => {
    if (propData.length > 0) {
      const refItems = propData.filter((elm) => {
        if (listingStatus === "All") return true;
        return listingStatus === "Buy"
          ? elm.details.purpose === "Sell"
          : elm.details.purpose === "Rent";
      });

      let filtered = [...refItems];
      console.log("refItems length:", refItems.length);
      
      if (propertyTypes.length > 0) {
        filtered = filtered.filter((el) => {
          if (propertyTypes == "properties" || propertyTypes === "All")
            return el;
          const processedType = propertyTypes.endsWith("s")
            ? propertyTypes.slice(0, -1)
            : propertyTypes;

          return el.details.property_type === processedType;
        });
      }
      console.log("After propertyTypes filter", filtered.length);

      // Bedrooms
      if (bedrooms > 0) {
        filtered = filtered.filter((el) => {
          return el.details.bedrooms == 
          bedrooms;
        });
      }
      console.log("After bedrooms filter", filtered.length);

      // Bathrooms
      if (bathrooms > 0) {
        filtered = filtered.filter((el) => {
          return Number(el.details.bedrooms) == Number(bedrooms);
        });
      }
      console.log("After bathrooms filter", filtered.length);

      // Location
      // if (location && location !== "All Cities") {
      //   filtered = filtered.filter((el) => el.location.city === location);
      // }

      // if (location && location !== "All Cities") {
      //   filtered = filtered.filter((el) => {
      //     const { address, city, emirate, country } = el.location;
      //     return (
      //       address?.includes(location) ||
      //       city?.includes(location) ||
      //       emirate?.includes(location) ||
      //       country?.includes(location)
      //     );
      //   });
      // }
      console.log("After location filter", filtered.length);

      // Price Range
      if (priceRange.length === 2) {
        filtered = filtered.filter((el) => {  
          return el.price >= priceRange[0] && el.price <= priceRange[1];
        });
      }
      console.log("After price filter", filtered.length);
      
      // Search Query
      if (searchQuery.trim() !== "") {
        filtered = filtered.fill((el)=>{
          return el.detais.size.value >= squirefeet[0] && el.details.size.value <= squirefeet[1]
        })
      }
      console.log("After search filter", filtered.length);
      console.log("Filtered items:", filtered);
      setFilteredData(filtered);
    }
  }, [
    propData,
    listingStatus,
    propertyTypes,
    priceRange,
    bedrooms,
    bathrooms,
    location,
    categories,
    searchQuery,
  ]);

  // useEffect(() => {
  //   setPageNumber(1);
  //   let sorted = [...filteredData];

  //   switch (currentSortingOption.trim()) {
  //     case "Newest":
  //       sorted.sort((a, b) =>
  //         (b.building_information?.year_of_completion || 0) -
  //         (a.building_information?.year_of_completion || 0)
  //       );
  //       break;
  //     case "Price Low":
  //       sorted.sort((a, b) => a.price - b.price);
  //       break;
  //     case "Price High":
  //       sorted.sort((a, b) => b.price - a.price);
  //       break;
  //   }

  //   setSortedFilteredData(sorted);
  // }, [filteredData, currentSortingOption]);

  useEffect(() => {
    setPageNumber(1); // Reset to first page on filter change
    if (currentSortingOption === "Newest") {
      const sorted = [...filteredData].sort(
        (a, b) =>
          b.building_information?.year_of_completion -
          a.building_information?.year_of_completion
      );
      setSortedFilteredData(sorted);
    } else if (currentSortingOption === "Price Low") {
      const sorted = [...filteredData].sort((a, b) => a.price - b.price);
      setSortedFilteredData(sorted);
    } else if (currentSortingOption === "Price High") {
      const sorted = [...filteredData].sort((a, b) => b.price - a.price);
      setSortedFilteredData(sorted);
    } else {
      setSortedFilteredData(filteredData);
    }
  }, [filteredData, currentSortingOption]);

  return {
    propData,
    selectedFilter,
    listingStatus,
    propertyTypes,
    bedrooms,
    bathrooms,
    filteredData,
    sortedFilteredData,
    pageItems,
    pageContentTrac,
    pageNumber,
    setPageNumber,
    currentSortingOption,
    setCurrentSortingOption,
    colstyle,
    setColstyle,
    filters,
    handleFilterChange,
    filterFunctions,
  };
};

export default useNewProjectFilter;
