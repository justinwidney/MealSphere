import { Box, Heading, HStack } from "@chakra-ui/react";
import React, { useState } from "react";

import { A11y, Navigation, Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import { ItemCard } from "../Items/ItemCard";
import "swiper/css";
import Head from "next/head";
interface SaleItemsProps {}

export const SaleItems: React.FC<SaleItemsProps> = ({}) => {
  let fruits = [
    { label: "Apple", value: "Apple" },
    { label: "Banana", value: "Banana" },
    { label: "Orange", value: "Orange" },
    { label: "Grape", value: "Grape" },
    { label: "Flower", value: "Flower" },
  ];

  return (
    <>
      <Box w={"inherit"} borderWidth="1px" paddingLeft={10} paddingRight={10}>
        <Heading p={2} fontSize={20} paddingBottom={4}>
          Top Sales This Week
        </Heading>

        <Swiper
          spaceBetween={15}
          slidesPerView={4}
          slidesPerGroup={4}
          pagination={{
            clickable: true,
          }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          modules={[Pagination, Navigation, A11y]}
        >
          {fruits.map((_p) => (
            <>
              <SwiperSlide>
                <div>
                  <ItemCard
                    marginBottom={10}
                    key={_p.label}
                    HeadingName={_p.label}
                    storeName={_p.label}
                    storePrice={"9"}
                    storeDescription={""}
                    storeVolume={""}
                  ></ItemCard>{" "}
                </div>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </Box>
    </>
  );
};
