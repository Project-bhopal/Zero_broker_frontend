"use client";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";

const PropertyGallery = ({ Images }) => {
  if (!Images || Images.length === 0) return null; // Handle empty image list

  return (
    <Gallery>
      <div className="row">
        <div className="col-sm-9">
          <div className="sp-img-content mb15-md">
            <div className="popup-img preview-img-1 sp-img">
              <Item original={Images[0]} thumbnail={Images[0]} width={810} height={500}>
                {({ ref, open }) => (
                  <Image
                    src={Images[0]}
                    width={591}
                    height={558}
                    ref={ref}
                    onClick={open}
                    alt="image"
                    role="button"
                    className="w-100 h-100 cover pointer"
                  />
                )}
              </Item>
            </div>
          </div>
        </div>

        <div className="col-sm-3 ">
          {/* <div className="col"> */}
            {Images.slice(1, 5).map((image, index) => (
              <div className="col-8 ps-sm-0" key={index}>
                <div className="sp-img-content">
                  <div className={`popup-img preview-img-${index + 2} sp-img mb10`}>
                    <Item original={image} thumbnail={image} width={810} height={510}>
                      {({ ref, open }) => (
                        <Image
                          width={370}
                          height={250}
                          className="w-100 h-100 cover pointer"
                          ref={ref}
                          onClick={open}
                          src={image}
                          alt={`image-${index}`}
                        />
                      )}
                    </Item>
                  </div>
                </div>
              </div>
            ))}
          {/* </div> */}
        </div>
      </div>
    </Gallery>
  );
};

export default PropertyGallery;
