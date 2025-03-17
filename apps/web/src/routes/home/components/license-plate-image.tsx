import { motion } from "framer-motion";

interface LicensePlateImageProps {
  imageUrl: string;
  onClick?: () => void;
}

export function LicensePlateImage({
  imageUrl,
  onClick,
}: LicensePlateImageProps) {
  return (
    <motion.div
      onClick={onClick}
      className="cursor-pointer overflow-hidden rounded border"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <img
        src={imageUrl}
        alt="License plate"
        className="max-w-full object-cover"
      />
    </motion.div>
  );
}
