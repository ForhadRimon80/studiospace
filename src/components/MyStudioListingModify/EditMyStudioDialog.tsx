"use client";

import { FormEvent, useState } from "react";
import { Car, Headphones, Home, ImageIcon, Lightbulb, Wallpaper, ArrowRight, ShieldCheck, Snowflake, Star, UserRound, Wifi, DollarSign, MicVocal, Sofa, Construction, PanelsTopLeft, Paintbrush, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { IStudio } from "@/lib/types/studiospace";
import { Checkbox } from "../ui/checkbox";

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

const EditMyStudioDialog = ({ studio }: { studio: IStudio }) => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(studio.amenities || []);
  const router = useRouter();

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((current) => (current.includes(amenity) ? current.filter((item) => item !== amenity) : [...current, amenity]));
  };

  // Get the current session and user information (client side)
  const { data: session } = useSession();
  const user = session?.user;
  // console.log(user);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    // Extract form data and convert it to an object
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

        const updateStudioData = {
          updatedAt: new Date().toISOString(),
          ...data,
          amenities: selectedAmenities,
        };

    // Send the data to the backend
    try {
      const res = await fetch(`http://localhost:5000/my-studio-listings/${studio._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateStudioData),
      });

      // Get the response from the backend, convert it to JSON, and log the returned data.
      const afterUpdate = await res.json();
      console.log("Data after submission:", afterUpdate);

      if (!res.ok || !afterUpdate.modifiedCount) {
        throw new Error(afterUpdate.message ?? "The studio listing could not be updated.");
      } else {
        toast.add({
          title: "Updating successful",
          description: "The studio listing has been successfully updated.",
          type: "success",
        });
        router.refresh();
      }
    } catch (error) {
      toast.add({
        title: "Updating failed",
        description: error instanceof Error ? error.message : "Something went wrong while updating the studio listing.",
        type: "error",
      });
    }
  };

  
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button type="button" size="sm" className="h-7 rounded-full bg-[#d9f9df] px-3 text-xs text-[#087a43] hover:bg-[#c3f1cd] dark:bg-[#173d2c] dark:text-[#b8f36b] dark:hover:bg-[#20543a]">
            <Pencil className="size-3.5" />
            Edit
          </Button>
        }></DialogTrigger>

      <DialogContent className="max-h-screen overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden sm:max-w-5xl px-6 py-6">
        <DialogHeader>
          <DialogTitle className="text-[28px] font-semibold">Update your studio listing</DialogTitle>
          <DialogDescription className="text-lg">Make changes to your studio listing details below</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdate}>
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
                    <span className="ml-1">
                      Studio Title <b className="text-red-500">*</b>
                    </span>
                    <Input name="title" type="text" defaultValue={studio.title} placeholder="Enter studio name..." required className="h-9 mt-1.5 rounded-lg border-[#dce7e1] bg-white text-xs! text-[#132330] placeholder:text-[#737c79] dark:border-[#294239] dark:bg-[#1d3028] dark:text-foreground dark:placeholder:text-[#d1d8d5]" />
                  </label>

                  {/* Hourly Rate */}
                  <label className="space-y-1 font-semibold">
                    <span className="flex ml-1">
                      Hourly Rate (<DollarSign className="size-4 mt-1" />)<b className="text-red-500">*</b>
                    </span>
                    <Input name="hourlyRate" type="number" min="0" defaultValue={studio.hourlyRate} placeholder="Enter hourly rate" required className="h-9 m-0.5 rounded-lg border-[#dce7e1] bg-white text-xs! text-[#132330] placeholder:text-[#737c79] dark:border-[#294239] dark:bg-[#1d3028] dark:text-foreground dark:placeholder:text-[#d1d8d5]" />
                  </label>

                  {/* Maximum Capacity */}
                  <label className="space-y-1 font-semibold">
                    <span className="ml-1">
                      Maximum Capacity <b className="text-red-500">*</b>
                    </span>
                    <Input name="maxCapacity" type="number" min="0" defaultValue={studio.maxCapacity} placeholder="Enter max people" required className="h-9 mt-1.5 rounded-lg border-[#dce7e1] bg-white text-xs! text-[#132330] placeholder:text-[#737c79] dark:border-[#294239] dark:bg-[#1d3028] dark:text-foreground dark:placeholder:text-[#d1d8d5]" />
                  </label>

                  {/* Location / Address */}
                  <label className="space-y-1 font-semibold">
                    <span className="ml-1">
                      Location / Address <b className="text-red-500">*</b>
                    </span>
                    <Input name="location" type="text" defaultValue={studio.location} placeholder="Enter studio address" required className="h-9 mt-1.5 rounded-lg border-[#dce7e1] bg-white text-xs! text-[#132330] placeholder:text-[#737c79] dark:border-[#294239] dark:bg-[#1d3028] dark:text-foreground dark:placeholder:text-[#d1d8d5]" />
                  </label>

                  {/* Category */}
                  <label className="space-y-1 font-semibold">
                    <span className="ml-1">
                      Category <b className="text-red-500">*</b>
                    </span>

                    <select name="category" required defaultValue={studio.category} className="h-9 mt-1.5 w-full rounded-lg border border-[#dce7e1] bg-white px-3 text-xs text-[#687a73] outline-none focus:border-[#087a43] dark:border-[#294239] dark:bg-[#1d3028] dark:text-foreground">
                      {studioCategories.map((category) => (
                        <option
                          key={category}
                          value={category}
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                          }}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* Security Deposit */}
                  <label className="space-y-1 font-semibold">
                    <span className="flex ml-1">
                      Security Deposit (<DollarSign className="size-4 mt-1" />) <b className="text-red-500">*</b>
                    </span>

                    <Input name="securityDeposit" type="number" min="0" defaultValue={studio.securityDeposit} placeholder="Enter deposit amount" required className="h-9 mt-0.5 rounded-lg border-[#dce7e1] bg-white text-xs! text-[#132330] placeholder:text-[#737c79] dark:border-[#294239] dark:bg-[#1d3028] dark:text-foreground dark:placeholder:text-[#d1d8d5]" />
                  </label>

                  {/* Image URL */}
                  <label className="col-span-full space-y-1 font-semibold">
                    <span className="ml-1">
                      Image URL <b className="text-red-500">*</b>
                    </span>

                    <Input name="imageUrl" type="url" defaultValue={studio.imageUrl} placeholder="https://example.com/image.jpg" required className="h-9 mt-1.5 rounded-lg border-[#dce7e1] bg-white text-xs! text-[#132330] placeholder:text-[#737c79] dark:border-[#294239] dark:bg-[#1d3028] dark:text-foreground dark:placeholder:text-[#d1d8d5]" />
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
                      <label key={label} className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-left text-xs transition-colors ${selected ? "border-[#087a43] bg-[#edfaf1] text-[#087a43] dark:border-[#b8f36b] dark:bg-[#064e32] dark:text-[#b8f36b]" : "border-[#dce7e1] text-[#30453c] hover:border-[#8dc9a5] dark:border-[#294239] dark:text-[#f7f9f7] dark:hover:border-[#b8f36b]"}`}>
                        <Checkbox checked={selected} onCheckedChange={() => toggleAmenity(label)} />

                        <Icon className="size-4 shrink-0 text-[#0a9b50]" />

                        {label}
                      </label>
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
                  <Textarea name="overview" defaultValue={studio.overview} placeholder="Write a detailed description about your studio..." maxLength={1000} className="min-h-24 resize-none border-[#dce7e1] bg-white text-xs text-[#132330] placeholder:text-[#8b9b95] dark:border-[#294239] dark:bg-[#1d3028] dark:text-foreground dark:placeholder:text-[#b5c2bc]" />

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
                  <Input value={user?.name || ""} readOnly className="mt-1 h-9 bg-[#f0f3f5] text-xs text-[#718078] dark:border-[#294239] dark:bg-[#1d3028] dark:text-[#b5c2bc]" />
                </label>

                <label className="space-y-1 text-xs font-semibold">
                  Host Email
                  <Input value={user?.email || "rimon@gmail.com"} readOnly className="mt-1 h-9 bg-[#f0f3f5] text-xs text-[#718078] dark:border-[#294239] dark:bg-[#1d3028] dark:text-[#b5c2bc]" />
                </label>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="mt-8 flex flex-col-reverse justify-center gap-3 rounded-xl border border-[#e1ebe6] bg-white p-3 shadow-sm dark:border-[#294239] dark:bg-bg-surface sm:flex-row">
              <DialogClose render={<Button type="button" className="flex-1 rounded-xl bg-red-500 py-5 text-white hover:bg-red-50 hover:text-red-600" />}>
                Cancle
                <ArrowRight className="size-4 mt-1" />
              </DialogClose>
              <DialogClose render={<Button type="submit" className="flex-1 rounded-xl bg-[#0a9b50] py-5 text-white hover:bg-[#087a43]" />}>
                Update Studio Listing
                <ArrowRight className="size-4 mt-1" />
              </DialogClose>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMyStudioDialog;
