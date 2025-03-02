import React, { useEffect, useState } from "react";
import InfoCard from "@/lib/components/InfoCard";


export default function Tracker() {
  return (
    <section className="w-screen flex flex-col items-center">
      <div className="w-2/3 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold mb-4">Today</h1>
        <div className="grid grid-cols-3 gap-4">
          <InfoCard
            title="MongoDB Atlas"
            image=""
            summary="HEELO HELLOHE JJSAODJADIOWA D SHAO DISAJJ DISIAJDJA KL DJSIAIDJA DKLSAJDKLA DKSLAJDLKA"
            link=""
          />
          <InfoCard
            title="MongoDB Atlas"
            image=""
            summary="HEELO HELLOHE JJSAODJADIOWA D SHAO DISAJJ DISIAJDJA KL DJSIAIDJA DKLSAJDKLA DKSLAJDLKA"
            link=""
          />
          <InfoCard
            title="MongoDB Atlas"
            image=""
            summary="HEELO HELLOHE JJSAODJADIOWA D SHAO DISAJJ DISIAJDJA KL DJSIAIDJA DKLSAJDKLA DKSLAJDLKA"
            link=""
          />
          <InfoCard
            title="MongoDB Atlas"
            image=""
            summary="HEELO HELLOHE JJSAODJADIOWA D SHAO DISAJJ DISIAJDJA KL DJSIAIDJA DKLSAJDKLA DKSLAJDLKA"
            link=""
          />
        </div>

        <h1 className="text-2xl font-semibold mb-4">Past Week</h1>
        <h1 className="text-2xl font-semibold mb-4">Past Month</h1>
      </div>
    </section>
  );
}
