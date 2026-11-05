"use client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertTriangle, Trash, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import { IStudio } from "@/lib/types/studiospace";

const DeleteMyStudioDialog = ({ studio }: { studio: IStudio }) => {
  const router = useRouter();

  const handleDeleteStudio = async () => {
    // Send the data to the backend
    try {
      const res = await fetch(`http://localhost:5000/my-studio-listings/${studio._id}`, {
        method: "DELETE",
      });

      // Get the response from the backend, convert it to JSON, and log the returned data.
      const afterDelete = await res.json();

      if (!res.ok || !afterDelete.deletedCount) {
        throw new Error(afterDelete.message ?? "The studio could not be deleted.");
      } else {
        toast.add({
          title: "Deleting successful",
          description: "The studio has been successfully deleted.",
          type: "success",
        });
        router.push("/my-studio-listings"); // Redirect to the my-studio-listings page after deletion
      }
    } catch (error) {
      toast.add({
        title: "Deleting failed",
        description: error instanceof Error ? error.message : "Something went wrong while deleting the studio.",
        type: "error",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button type="button" size="sm" variant="destructive" className="h-7 rounded-full px-3 text-xs" />}>
        <Trash className="size-3.5" />
        Delete
      </AlertDialogTrigger>

      <AlertDialogContent className="min-w-auto sm:min-w-lg">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-red-50 text-red-500">
            <AlertTriangle />
          </AlertDialogMedia>
          <AlertDialogTitle className="text-2xl font-normal">Delete Studio Space</AlertDialogTitle>
          <AlertDialogDescription className="text-base leading-6">
            Are you sure you want to delete <strong>&quot;{studio.title}&quot;</strong>? This action cannot be undone and will permanently remove this studio space.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4 gap-3 sm:flex-row sm:justify-end">
          <AlertDialogCancel className="h-12 rounded-lg px-6 text-base">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteStudio} className="h-12 rounded-lg bg-red-500 px-6 text-base text-white hover:bg-red-600">
            <Trash2 />
            Delete Studio
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMyStudioDialog;
