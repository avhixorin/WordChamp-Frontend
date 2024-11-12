import { motion } from "framer-motion";
import { Axe, Shield, Timer } from "lucide-react";
const PowerUpSection = ({
  powerUpVisible,
  togglePowerUpMenu,
}: {
  powerUpVisible: boolean;
  togglePowerUpMenu: () => void;
}) => (
  <div className="relative cursor-pointer w-full flex justify-end gap-4">
    <img
      src="./images/thunder.svg"
      width={32}
      height={32}
      alt="PowerUp Icon"
      onClick={togglePowerUpMenu}
    />
    {powerUpVisible && (
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
          delay: 0.2,
        }}
        className="absolute top-[-10] right-14 bg-transparent px-2 rounded-lg flex flex-col gap-4"
      >
        {[Timer, Shield, Axe].map((Icon, index) => (
          <motion.div
            key={index}
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: -50 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              delay: index * 0.1,
            }}
            whileHover={{
              scale: 1.1,
              rotate: 15,
              transition: { type: "spring", stiffness: 300, damping: 15 },
            }}
          >
            <Icon
              size={30}
              stroke="#000"
              fill="#fff"
              className="cursor-pointer"
            />
          </motion.div>
        ))}
      </motion.div>
     )} 
  </div>
);

export default PowerUpSection;
