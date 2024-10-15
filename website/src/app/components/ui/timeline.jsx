"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10" ref={containerRef}>
      {/* <div id="timeline" className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 justify-center w-full align-middle"> */}
        {/* <h2 className="text-lg md:text-4xl mb-4 text-[#003399] dark:text-[#66CC33] max-w-4xl align-middle">
          Hackathon Timeline
        </h2> */}
      {/* </div> */}
      
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-20 md:pt-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-[#66CC33] dark:bg-[#003399] border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden  md:block text-xl md:pl-20 md:text-3xl font-bold text-[#003399] dark:text-[#66CC33]">
                {item.title}
              </h3>
            </div>

            <div className=" flex flex-col items-baseline relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="text-xl md:text-3xl md:hidden block  mb-4 text-left font-bold   text-[#003399] dark:text-[#66CC33]">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent via-neutral-200 dark:via-neutral-700 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#003399] via-[#66CC33] to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};