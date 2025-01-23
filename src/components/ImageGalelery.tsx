import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
    images: string[];
    isOpen: boolean;
    onClose: () => void;
    initialIndex?: number;
}

export function ImageGallery({ images, isOpen, onClose, initialIndex = 0 }: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    const handlePrevious = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    const handleNext = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        } else if (e.key === 'ArrowRight') {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        } else if (e.key === 'Escape') {
            onClose();
        }
    }, [images.length, onClose]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
                <X className="w-8 h-8" />
            </button>

            <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2"
            >
                <ChevronRight className="w-8 h-8" />
            </button>

            <div
                className="relative max-w-4xl w-full aspect-square mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={images[currentIndex]}
                    alt={`Gallery image ${currentIndex + 1}`}
                    className="w-full h-full object-contain"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentIndex(index);
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${
                                index === currentIndex
                                    ? 'bg-white w-4'
                                    : 'bg-white/50 hover:bg-white/75'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}