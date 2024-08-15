"use client";

import { cn } from "@/lib/utils";

const RatingBar = ({ rating, totalRating, star }: any) => {
  const percentage = (rating / totalRating) * 100;

  return (
    <div className="flex items-center gap-2">
      <div className="w-1/2 flex items-center">
        <div className="w-[150px] bg-gray-300 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full ${star > 2 && "bg-green-600"} ${
              star == 2 && "bg-orange-500"
            } ${star == 1 && "bg-red-500"}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      <div className="text-muted-foreground">{rating}</div>
    </div>
  );
};

export const Rating = ({ rating }: any) => {
  const totalRating = rating?.overall?.breakup.reduce(
    (sum: any, r: any) => sum + r,
    0
  );

  return (
    <div className="space-y-2">
      {rating?.overall?.breakup.map((count: any, index: any) => (
        <div key={index} className="flex items-center gap-2">
          <span className="">{index + 1} ★</span>
          <RatingBar rating={count} totalRating={totalRating} star={index} />
        </div>
      ))}
    </div>
  );
};
