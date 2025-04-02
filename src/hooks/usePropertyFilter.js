'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const usePropertyFilter = (propData) => {
  const path = usePathname();
  const selectedFilter = path.split('/')[1].includes('-')
    ? path.split('/')[1]?.split('-')[0]
    : path.split('/')[1];
  const isPropertyType = path.split('/')[1].includes('-');
  const capitalizedFilter = selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1);

  const [listingStatus, setListingStatus] = useState(!isPropertyType ? capitalizedFilter : '');
  const [propertyTypes, setPropertyTypes] = useState(isPropertyType ? capitalizedFilter : '');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [location, setLocation] = useState('All Cities');
  const [squirefeet, setSquirefeet] = useState([]);
  const [yearBuild, setyearBuild] = useState([0, 2050]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [sortedFilteredData, setSortedFilteredData] = useState([]);
  const [currentSortingOption, setCurrentSortingOption] = useState('Newest');

  const resetFilter = () => {
    setListingStatus('');
    setPropertyTypes('');
    setPriceRange([0, 100000]);
    setBedrooms(0);
    setBathrooms(0);
    setLocation('All Cities');
    setSquirefeet([]);
    setyearBuild([0, 2050]);
    setCategories([]);
    setCurrentSortingOption('Newest');
  };

  useEffect(() => {
    const refItems = propData.filter((elm) => {
      if (listingStatus === 'All') return true;
      return listingStatus === 'Buy' ? elm.details.purpose === 'Sell' : elm.details.purpose === 'Rent';
    });

    let filteredArrays = [];
    if (propertyTypes.length > 0) {
      filteredArrays.push(refItems.filter((elm) => propertyTypes.includes(elm.details.property_type)));
    }
    filteredArrays.push(refItems.filter((el) => el.details.bedrooms >= bedrooms));
    filteredArrays.push(refItems.filter((el) => el.details.bathrooms >= bathrooms));
    filteredArrays.push(refItems.filter(
      (el) =>
        el.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.location.emirate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.features_amenities.join(' ').toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.other_amenities.join(' ').toLowerCase().includes(searchQuery.toLowerCase())
    ));
    if (categories.length) {
      filteredArrays.push(refItems.filter((elm) => categories.every((elem) => elm.features_amenities.includes(elem))));
    }
    if (location !== 'All Cities') {
      filteredArrays.push(refItems.filter((el) => el.location.city === location));
    }
    if (priceRange.length) {
      filteredArrays.push(refItems.filter((elm) => elm.price >= priceRange[0] && elm.price <= priceRange[1]));
    }
    if (squirefeet.length > 0) {
      filteredArrays.push(refItems.filter((elm) => elm.details.size.value >= squirefeet[0] && elm.details.size.value <= squirefeet[1]));
    }
    if (yearBuild.length) {
      filteredArrays.push(refItems.filter((elm) => elm.building_information.year_of_completion >= yearBuild[0] && elm.building_information.year_of_completion <= yearBuild[1]));
    }
    const commonItems = refItems.filter((item) => filteredArrays.every((array) => array.includes(item)));
    setFilteredData(commonItems);
  }, [listingStatus, propertyTypes, priceRange, bedrooms, bathrooms, location, squirefeet, yearBuild, categories, searchQuery, propData]);

  useEffect(() => {
    let sortedData = [...filteredData];
    if (currentSortingOption === 'Newest') {
      sortedData.sort((a, b) => b.building_information.year_of_completion - a.building_information.year_of_completion);
    } else if (currentSortingOption === 'Price Low') {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (currentSortingOption === 'Price High') {
      sortedData.sort((a, b) => b.price - a.price);
    }
    setSortedFilteredData(sortedData);
  }, [filteredData, currentSortingOption]);

  const handlelistingStatus = (elm) => {
    setListingStatus((pre) => (pre == elm ? "All" : elm));
  };
  const handlepropertyTypes = (elm) => {
    setPropertyTypes((pre) => (pre == elm ? "All" : elm));
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

  return {
    filteredData: sortedFilteredData,
     filterFunctions : {
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
      }
  };
};

export default usePropertyFilter;
