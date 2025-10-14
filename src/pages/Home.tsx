import { motion } from "framer-motion";
import { useState } from "react";

const HomePage = () => {

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };
    return(
        <div 
            className="bg-[#1f4037] min-h-screen relative"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <motion.div
                className="absolute pointer-events-none w-44 h-44 overflow-hidden bg-[#99f2c8] rounded-full blur-2xl"
                animate={{
                opacity: isHovering ? 1 : 0,
                x: mousePosition.x - 250,
                y: mousePosition.y - 250,
                }}
                transition={{ type: "tween", duration: 0.2 }}
            />
            <h2>Say Hii</h2>
        </div>
    )
}

export default HomePage;