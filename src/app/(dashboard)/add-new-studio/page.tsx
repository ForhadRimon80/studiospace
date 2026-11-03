"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowLeft, Car, Check, Headphones, Home, ImageIcon, Lightbulb, Wallpaper, RotateCcw, ArrowRight, ShieldCheck, Snowflake, Star, UserRound, Wifi, DollarSign, MicVocal, Sofa, Construction, PanelsTopLeft, Paintbrush } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


const amenities = [
  { label: "4K DMX Professional Lighting", icon: Lightbulb },
  { label: "Sound System", icon: Headphones },
  { label: "High Speed Wi-Fi", icon: Wifi },
  { label: "Backdrop", icon: ImageIcon },
  { label: "Parking", icon: Car },
  { label: "Makeup Room", icon: Paintbrush },
  { label: "AC", icon: Snowflake },
  { label: "Cyclorama Wall", icon: Wallpaper },
  { label: "Soundproof Vocal Booth", icon: MicVocal },
  { label: "Client Lounge", icon: Sofa },
  { label: "Heavy Rigging Trusses (2-Ton)", icon: Construction },
  { label: "Green / Blue Screen Drops", icon: PanelsTopLeft },
];

const studioCategories = ["Photography Studio", "Audio/Voice Studio", "Podcast Room", "Music Studio", "Art & Workshop Studio", "Film & Video Studio", "Creative Space/Loft", "Dance Studio", "Event Space", "Fashion Studio"];

const AddNewStudioPage = () => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((current) => (current.includes(amenity) ? current.filter((item) => item !== amenity) : [...current, amenity]));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const studioData = {
      title: formData.get("title"),
      hourlyRate: formData.get("hourlyRate"),
      capacity: formData.get("capacity"),
      location: formData.get("location"),
      category: formData.get("category"),
      securityDeposit: formData.get("securityDeposit"),
      imageUrl: formData.get("imageUrl"),
      overview: formData.get("overview"),
      amenities: selectedAmenities,
    };

    console.log(studioData);
  };

  const resetForm = () => {
    setSelectedAmenities([]);
  };

  return (
    <main className="mx-auto max-w-300 px-4 py-5 sm:px-7 lg:px-8">
      {/* Back Button */}
      <div className="mb-5 flex items-center gap-3">
        <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-[#dff6e6] px-3 py-1.5 text-xs font-semibold text-[#087a43] hover:bg-[#c9efd5]">
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* Page Header */}
      <div className="relative mb-5 overflow-hidden rounded-2xl bg-white px-1 text-[#132330] dark:bg-bg-surface dark:text-foreground">
        <div className="relative z-10 py-4 px-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Add Your New <span className="text-[#087a43]">Studio</span>
          </h1>

          <p className="mt-1 text-sm text-[#5e716b]">Share your creative space with the community.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="rounded-2xl bg-white p-12 text-[#132330] shadow-lg dark:bg-bg-surface dark:text-foreground">
          <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
            {/* Basic Information */}
            <Card className="border-[#e1ebe6] bg-white text-[#132330] shadow-sm dark:border-[#294239] dark:bg-bg-surface dark:text-foreground">
              <CardHeader className="border-b border-[#edf2ef] py-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Home className="size-5 text-[#0a9b50]" />
                  Basic Information
                </CardTitle>
              </CardHeader>

              <CardContent className="grid gap-3 p-4 sm:grid-cols-2">
                {/* Studio Title */}
                <label className="space-y-1 font-semibold">
                  <span>
                    Studio Title <b className="text-red-500">*</b>
                  </span>
                  <Input name="title" type="text" placeholder="Enter studio name..." required className="h-9 rounded-lg border-[#dce7e1] bg-white text-xs! text-[#132330] placeholder:text-[#737c79] dark:border-[#294239] dark:bg-[#1d3028] dark:text-foreground dark:placeholder:text-[#d1d8d5]" />
                </label>

                {/* Hourly Rate */}
                <label className="space-y-1 font-semibold">
                  <span className="flex">
                    Hourly Rate (<DollarSign className="size-4 mt-1" />)<b className="text-red-500">*</b>
                  </span>
                  <Input name="hourlyRate" type="number" min="0" placeholder="Enter hourly rate" required className="h-9 rounded-lg border-[#dce7e1] bg-white text-xs! text-[#132330] placeholder:text-[#737c79] dark:border-[#294239] dark:bg-[#1d3028] dark:text-foreground dark:placeholder:text-[#d1d8d5]" />
                </label>

                {/* Maximum Capacity */}
                <label className="space-y-1 font-semibold">
                  <span>
                    Maximum Capacity <b className="text-red-500">*</b>
                  </span>
                  <Input name="maxCapacity" type="number" min="0" placeholder="Enter max people" required className="h-9 rounded-lg border-[#dce7e1] bg-white text-xs! text-[#132330] placeholder:text-[#737c79] dark:border-[#294239] dark:bg-[#1d3028] dark:text-foreground dark:placeholder:text-[#d1d8d5]" />
                </label>

                {/* Location / Address */}
                <label className="space-y-1 font-semibold">
                  <span>
                    Location / Address <b className="text-red-500">*</b>
                  </span>
                  <Input name="location" type="text" placeholder="Enter studio address" required className="h-9 rounded-lg border-[#dce7e1] bg-white text-xs! text-[#132330] placeholder:text-[#737c79] dark:border-[#294239] dark:bg-[#1d3028] dark:text-foreground dark:placeholder:text-[#d1d8d5]" />
                </label>

                {/* Category */}
                <label className="space-y-1 font-semibold">
                  <span>
                    Category <b className="text-red-500">*</b>
                  </span>

                  <select name="category" required defaultValue="Photography Studio" className="h-9 w-full rounded-lg border border-[#dce7e1] bg-white px-3 text-xs text-[#687a73] outline-none focus:border-[#087a43] dark:border-[#294239] dark:bg-[#1d3028] dark:text-foreground">
                    {studioCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                {/* Security Deposit */}
                <label className="space-y-1 font-semibold">
                  <span className="flex">
                    Security Deposit (<DollarSign className="size-4 mt-1" />) <b className="text-red-500">*</b>
                  </span>

                  <Input name="securityDeposit" type="number" min="0" placeholder="Enter deposit amount" required className="h-9 rounded-lg border-[#dce7e1] bg-white text-xs! text-[#132330] placeholder:text-[#737c79] dark:border-[#294239] dark:bg-[#1d3028] dark:text-foreground dark:placeholder:text-[#d1d8d5]" />
                </label>

                {/* Image URL */}
                <label className="col-span-full space-y-1 font-semibold">
                  <span>
                    Image URL <b className="text-red-500">*</b>
                  </span>

                  <Input name="imageUrl" type="url" placeholder="https://example.com/image.jpg" required className="h-9 rounded-lg border-[#dce7e1] bg-white text-xs! text-[#132330] placeholder:text-[#737c79] dark:border-[#294239] dark:bg-[#1d3028] dark:text-foreground dark:placeholder:text-[#d1d8d5]" />
                </label>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="border-[#e1ebe6] bg-white text-[#132330] shadow-sm dark:border-[#294239] dark:bg-bg-surface dark:text-foreground">
              <CardHeader className="border-b border-[#edf2ef] py-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Star className="size-5 fill-[#087a43] text-[#087a43]" />
                  Amenities
                </CardTitle>

                <p className="text-xs text-[#687a73] dark:text-[#b5c2bc]">Select the amenities available in your studio</p>
              </CardHeader>

              <CardContent className="grid grid-cols-2 gap-2 p-4">
                {amenities.map(({ label, icon: Icon }) => {
                  const selected = selectedAmenities.includes(label);

                  return (
                    <button key={label} type="button" onClick={() => toggleAmenity(label)} className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-left text-xs transition-colors ${selected ? "border-[#087a43] bg-[#edfaf1] text-[#087a43] dark:border-[#b8f36b] dark:bg-[#064e32] dark:text-[#b8f36b]" : "border-[#dce7e1] text-[#30453c] hover:border-[#8dc9a5] dark:border-[#294239] dark:text-[#f7f9f7] dark:hover:border-[#b8f36b]"}`}>
                      <Icon className="size-4 shrink-0 text-[#0a9b50]" />

                      {label}

                      {selected && <Check className="ml-auto size-3.5" />}
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Detailed Overview */}
            <Card className="border-[#e1ebe6] bg-white text-[#132330] shadow-sm dark:border-[#294239] dark:bg-bg-surface dark:text-foreground xl:col-span-2">
              <CardHeader className="border-b border-[#edf2ef] py-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldCheck className="size-5 text-[#0a9b50]" />
                  Detailed Overview
                </CardTitle>

                <p className="text-xs text-[#687a73] dark:text-[#b5c2bc]">Tell us more about your studio, features and facilities...</p>
              </CardHeader>

              <CardContent className="p-4">
                <Textarea name="overview" placeholder="Write a detailed description about your studio..." maxLength={1000} className="min-h-24 resize-none border-[#dce7e1] bg-white text-xs text-[#132330] placeholder:text-[#8b9b95] dark:border-[#294239] dark:bg-[#1d3028] dark:text-foreground dark:placeholder:text-[#b5c2bc]" />

                <p className="mt-1 text-right text-[10px] text-[#687a73] dark:text-[#b5c2bc]">Maximum 1000 characters</p>
              </CardContent>
            </Card>
          </div>
          {/* Host Information */}
          <Card className="mt-4 border-[#e1ebe6] bg-white text-[#132330] shadow-sm dark:border-[#294239] dark:bg-bg-surface dark:text-foreground">
            <CardHeader className="border-b border-[#edf2ef] py-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <UserRound className="size-5 text-[#0a9b50]" />
                Host Information
              </CardTitle>
            </CardHeader>

            <CardContent className="grid gap-3 p-4 sm:grid-cols-2">
              <label className="space-y-1 text-xs font-semibold">
                Host Name
                <Input value="Rimon Ahmed" readOnly className="mt-1 h-9 bg-[#f0f3f5] text-xs text-[#718078] dark:border-[#294239] dark:bg-[#1d3028] dark:text-[#b5c2bc]" />
              </label>

              <label className="space-y-1 text-xs font-semibold">
                Host Email
                <Input value="rimon@gmail.com" readOnly className="mt-1 h-9 bg-[#f0f3f5] text-xs text-[#718078] dark:border-[#294239] dark:bg-[#1d3028] dark:text-[#b5c2bc]" />
              </label>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="mt-8 flex flex-col-reverse justify-center gap-3 rounded-xl border border-[#e1ebe6] bg-white p-3 shadow-sm dark:border-[#294239] dark:bg-bg-surface sm:flex-row">
            <Button type="reset" variant="outline" onClick={resetForm} className="flex-1 rounded-xl border-[#0a9b50] bg-white py-5 text-[#087a43] hover:bg-[#edfaf1] dark:border-[#b8f36b] dark:bg-transparent dark:text-[#b8f36b] dark:hover:bg-[#1d3028]">
              <RotateCcw className="size-4" />
              Reset Form
            </Button>

            <Button type="submit" className="flex-1 rounded-xl bg-[#0a9b50] py-5 text-white hover:bg-[#087a43]">
              Publish Studio Listing
              <ArrowRight className="size-4 mt-1" />
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default AddNewStudioPage;
