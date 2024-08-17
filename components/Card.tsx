import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  imageSrc: string;
};
const Card = ({ title, imageSrc }: Props) => {
  return (
    <div
      className="flex flex-col gap-2 w-[200px] bg-secondary border rounded-md hover:shadow-primary cursor-pointer"
      title={title.slice(0, 30) + "..."}
    >
      <div className="w-[200px] h-[112.5px]">
        <Image
          src={imageSrc}
          alt={title + "okv music"}
          width={200}
          height={112.5}
          priority
          className="w-full h-full object-cover rounded-t-md"
        />
      </div>
      <p className="truncate px-2 pb-2">{title}</p>
    </div>
  );
};

export default Card;
