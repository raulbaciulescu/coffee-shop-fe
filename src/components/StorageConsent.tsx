import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function StorageConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const CONSENT_KEY = 'storage_consent';

    useEffect(() => {
        // Check if user has already given consent
        const hasConsent = localStorage.getItem(CONSENT_KEY);
        if (!hasConsent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(CONSENT_KEY, 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200">
            <div className="max-w-6xl mx-auto p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600 text-center sm:text-left">
                    <p>
                        We use browser storage to enhance your shopping experience and save your cart items.
                        By continuing to use this site, you consent to our use of local storage.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleAccept}
                        className="bg-[#6F4E37] text-white px-6 py-2 rounded-lg hover:bg-[#5D3D2B] transition-colors text-sm font-medium whitespace-nowrap"
                    >
                        Accept
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}