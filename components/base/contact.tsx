'use client';

import React, { useState } from 'react';
import { MessageCircle, Instagram, Send } from 'lucide-react';
import { footer } from '@/lib/constants/landing';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [message , setmessage] = useState('');
  const whatsapp = footer.contact.find(c => c.platform === 'WhatsApp');
  const instagram = footer.contact.find(c => c.platform === 'Instagram');

  const handleWhatsApp = () => {
    const text = `Hi! My name is ${name}. ${message}`;
    const url = `https://wa.me/${whatsapp?.link}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-16 px-4 bg-white">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
          <p className="text-sm text-gray-500 mt-2">Have a question or want to bring DineSync to your restaurant?</p>
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <a
            href={`https://wa.me/${whatsapp?.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5C] text-white font-semibold text-sm py-3.5 rounded-2xl transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <a
            href={`https://instagram.com/${instagram?.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white font-semibold text-sm py-3.5 rounded-2xl transition-opacity"
          >
            <Instagram className="w-4 h-4" />
            Instagram
          </a>
        </div>

    

      </div>
    </section>
  );
}