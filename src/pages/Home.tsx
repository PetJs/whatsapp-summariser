import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import type { AcceptedFile } from "../types/types";
import Button from "../components/common/Button";
import { Upload } from 'lucide-react';
import { CloudUpload } from 'lucide-react';
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const setFile = useChatStore((state) => state.setFile);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };


    const onDrop = useCallback((acceptedFiles: AcceptedFile[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setIsUploading(true);
        alert("Uploading file...");

        const reader = new FileReader();
        reader.onload = () => {
        // toast.dismiss();
        try {
            const text = reader.result as string;
            setFile({
                name: file.name,
                content: text,
            });

            alert("File uploaded successfully!");
            console.log("File Name", file.name)
        } catch (error) {
            //toast.dismiss();
            console.error("Failed to read file. Please try again.");
        } finally {
            setIsUploading(false);
        }
        };

        reader.onerror = () => {
        //toast.dismiss();
            console.error("Error reading file.");
            setIsUploading(false);
        };

        // Simulate reading delay for UX
        setTimeout(() => reader.readAsText(file), 1000);
    }, [setFile]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


    return(
        <div 
            className="bg-[#1f4037] min-h-screen w-full"
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
            <h2 className="bg-black text-white z-20">Welcome to Whatsapp Chat Summariser</h2>

            <div className="flex justify-center items-center h-screen p-6 mx-auto w-full">
                <div {...getRootProps()} className="border-2 rounded-4xl h-[50vh] border-dashed border-[#88a192ff] w-full flex flex-col items-center justify-center text-center gap-6">
                    <input {...getInputProps()} />
                    {isUploading ? (
                        <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="flex flex-col items-center justify-center gap-4"
                        >
                            <CloudUpload size={80} className="text-[#88a192ff]" />
                            <p className="text-white text-lg font-medium animate-pulse">Reading data...</p>
                        </motion.div>
                    ) : isDragActive ? (
                        <p>Drop the Files here ...</p>
                    ) : (
                        <div className="flex flex-col justify-center items-center gap-6">
                            <CloudUpload size={150} stroke="#88a192ff" className="mb-6" />
                            <div className="text-white">
                                <p className="text-xl">Drop your Chat file here</p>
                                <p>Or click to browse</p>
                            </div>
                            <Button className="transition duration-300 transform hover:scale-105 bg-[#88a192ff] py-1 justify-center">
                                <Upload size={16} stroke="#fff" />
                                <p className="text-white">Choose File</p>
                            </Button>
                            <p className="text-gray-300 text-[14px] italic">
                                Supports .txt or .zip files exported from WhatsApp
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomePage;