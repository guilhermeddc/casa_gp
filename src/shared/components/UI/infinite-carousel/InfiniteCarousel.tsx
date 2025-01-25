"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface PartnerInstitution {
  name: string;
  imageUrl: string;
  link: string;
}

interface InfiniteCarouselProps {
  items: PartnerInstitution[];
}

export const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({
  items,
}) => {
  // Duplicar os itens para criar o efeito infinito
  const duplicatedItems = [...items, ...items];

  return (
    <div className="overflow-hidden w-full py-8">
      <motion.div
        className="flex items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 20, // Ajuste a duração conforme necessário
          ease: "linear",
        }}
      >
        {duplicatedItems.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div
              className="w-32 h-32 md:w-40 md:h-40 mx-4 relative"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                sizes="100%"
                className="object-cover hover:scale-125 transition-transform duration-300 ease-in-out"
              />
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};
