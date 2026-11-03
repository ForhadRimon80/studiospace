"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { ArrowLeft, Car, Check, Headphones, Home, ImageIcon, Lightbulb, MoreHorizontal, RotateCcw, Send, ShieldCheck, Snowflake, Star, UploadCloud, UserRound, Wifi } from "lucide-react";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const amenities = [
  { label: "Professional Lighting", icon: Lightbulb },
  { label: "Sound System", icon: Headphones },
  { label: "High Speed Wi-Fi", icon: Wifi },
  { label: "Backdrop", icon: ImageIcon },
  { label: "Parking", icon: Car },
  { label: "Makeup Room", icon: Star },
  { label: "AC", icon: Snowflake },
  { label: "Others", icon: MoreHorizontal },
];

const initialImages = ["/images/common.png", "/images/signup.png", "/images/Login.png"];

const AddNewStudioPage = () => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [images, setImages] = useState(initialImages);
  const [submitted, setSubmitted] = useState(false);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((current) => (current.includes(amenity) ? current.filter((item) => item !== amenity) : [...current, amenity]));
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImages((current) => [...current, ...previews].slice(0, 6));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setSelectedAmenities([]);
    setImages(initialImages);
    setSubmitted(false);
  };

  return (
    <main className="mx-auto max-w-300 px-4 py-5 sm:px-7 lg:px-8">
      <div className="mb-5 flex items-center gap-3">
        <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-[#dff6e6] px-3 py-1.5 text-xs font-semibold text-[#087a43] hover:bg-[#c9efd5]">
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="relative mb-5 overflow-hidden rounded-2xl bg-white">
        <div className="relative z-10 py-1">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Add New <span className="text-[#087a43]">Studio</span>
          </h1>
          <p className="mt-1 text-sm text-[#5e716b]">Share your creative space with the community.</p>
        </div>
        <Image src="/images/common.png" alt="" width={520} height={120} className="absolute right-0 top-0 hidden h-28 w-1/2 object-cover object-center opacity-80 sm:block" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <Card className="border-[#e1ebe6] bg-white shadow-sm">
            <CardHeader className="border-b border-[#edf2ef] py-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Home className="size-5 text-[#0a9b50]" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 p-4 sm:grid-cols-2">
              {[
                ["Studio Title", "Enter studio name...", "text"],
                ["Hourly Rate ($)", "Enter hourly rate", "number"],
                ["Maximum Capacity", "Enter max people", "number"],
                ["Location / Address", "Enter studio address", "text"],
              ].map(([label, placeholder, type]) => (
                <label key={label} className="space-y-1 text-xs font-semibold">
                  <span>
                    {label} <b className="text-red-500">*</b>
                  </span>
                  <Input name={label} type={type} placeholder={placeholder} required className="h-9 rounded-lg border-[#dce7e1] text-xs placeholder:text-[#8b9b95]" />
                </label>
              ))}
              <label className="space-y-1 text-xs font-semibold">
                <span>
                  Category <b className="text-red-500">*</b>
                </span>
                <select name="Category" required className="h-9 w-full rounded-lg border border-[#dce7e1] bg-white px-3 text-xs text-[#687a73] outline-none focus:border-[#087a43]">
                  <option value="">Select Category</option>
                  <option>Photography</option>
                  <option>Music</option>
                  <option>Film & Video</option>
                  <option>Dance</option>
                </select>
              </label>
              <label className="space-y-1 text-xs font-semibold">
                <span>
                  Security Deposit ($) <b className="text-red-500">*</b>
                </span>
                <Input name="Security Deposit" type="number" placeholder="Enter deposit amount" required className="h-9 rounded-lg border-[#dce7e1] text-xs placeholder:text-[#8b9b95]" />
              </label>
            </CardContent>
          </Card>

          <Card className="border-[#e1ebe6] bg-white shadow-sm">
            <CardHeader className="border-b border-[#edf2ef] py-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Star className="size-5 fill-[#087a43] text-[#087a43]" />
                Amenities
              </CardTitle>
              <p className="text-xs text-[#687a73]">Select the amenities available in your studio</p>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 p-4">
              {amenities.map(({ label, icon: Icon }) => {
                const selected = selectedAmenities.includes(label);
                return (
                  <button key={label} type="button" onClick={() => toggleAmenity(label)} className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-left text-xs transition-colors ${selected ? "border-[#087a43] bg-[#edfaf1] text-[#087a43]" : "border-[#dce7e1] text-[#30453c] hover:border-[#8dc9a5]"}`}>
                    <Icon className="size-4 shrink-0 text-[#0a9b50]" />
                    {label}
                    {selected && <Check className="ml-auto size-3.5" />}
                  </button>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border-[#e1ebe6] bg-white shadow-sm">
            <CardHeader className="border-b border-[#edf2ef] py-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <ImageIcon className="size-5 text-[#0a9b50]" />
                Studio Images
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <label className="flex h-16 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#cbded3] bg-[#fbfdfc] text-xs text-[#4e665b] hover:bg-[#f1faf4]">
                <UploadCloud className="mb-1 size-5 text-[#365367]" />
                Drag & drop images here or click to upload
                <span className="text-[10px]">PNG, JPG up to 5MB each</span>
                <input type="file" accept="image/png,image/jpeg" multiple className="hidden" onChange={handleImageUpload} />
              </label>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {images.map((src, index) => (
                  <div key={`${src}-${index}`} className="relative aspect-square overflow-hidden rounded-lg border border-[#dce7e1]">
                    <Image src={src} alt={`Studio preview ${index + 1}`} fill sizes="100px" className="object-cover" />
                  </div>
                ))}
                <label className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border border-dashed border-[#b9cec2] text-2xl text-[#496258] hover:bg-[#f1faf4]">
                  +<input type="file" accept="image/png,image/jpeg" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#e1ebe6] bg-white shadow-sm">
            <CardHeader className="border-b border-[#edf2ef] py-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <ShieldCheck className="size-5 text-[#0a9b50]" />
                Detailed Overview
              </CardTitle>
              <p className="text-xs text-[#687a73]">Tell us more about your studio, features and facilities...</p>
            </CardHeader>
            <CardContent className="p-4">
              <Textarea name="overview" placeholder="Write a detailed description about your studio..." maxLength={1000} className="min-h-24 resize-none border-[#dce7e1] text-xs placeholder:text-[#8b9b95]" />
              <p className="mt-1 text-right text-[10px] text-[#687a73]">0 / 1000</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4 border-[#e1ebe6] bg-white shadow-sm">
          <CardHeader className="border-b border-[#edf2ef] py-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <UserRound className="size-5 text-[#0a9b50]" />
              Host Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 p-4 sm:grid-cols-2">
            <label className="space-y-1 text-xs font-semibold">
              Host Name
              <Input value="Rimon Ahmed" readOnly className="mt-1 h-9 bg-[#f0f3f5] text-xs text-[#718078]" />
            </label>
            <label className="space-y-1 text-xs font-semibold">
              Host Email
              <Input value="rimon@gmail.com" readOnly className="mt-1 h-9 bg-[#f0f3f5] text-xs text-[#718078]" />
            </label>
          </CardContent>
        </Card>

        <div className="mt-4 flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <Button type="button" variant="outline" onClick={resetForm} className="rounded-full border-[#0a9b50] px-8 text-[#087a43] hover:bg-[#edfaf1]">
            <RotateCcw className="size-4" />
            Reset Form
          </Button>
          <Button type="submit" className="rounded-full bg-[#0a9b50] px-10 text-white hover:bg-[#087a43]">
            <Send className="size-4" />
            Submit Studio
          </Button>
        </div>
        {submitted && (
          <p className="mt-3 text-right text-sm font-medium text-[#087a43]" role="status">
            Studio submitted successfully.
          </p>
        )}
      </form>
    </main>
  );
};

export default AddNewStudioPage;
