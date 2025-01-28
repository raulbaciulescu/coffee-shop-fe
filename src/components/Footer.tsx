import {Phone} from "lucide-react";
import React from "react";

export function Footer() {
    return (<>
        <footer className="bg-[#2C1810] text-white py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h4 className="text-xl font-bold mb-2">Daily Brew</h4>
                        <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2"/>
                            <span>(555) 123-4567</span>
                        </div>
                    </div>
                    <div className="text-sm">
                        <p>© 2024 Daily Brew. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    </>);
}