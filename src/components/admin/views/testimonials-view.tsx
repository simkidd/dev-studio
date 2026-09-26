"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useTestimonials,
  useCreateTestimonial,
  useUpdateTestimonial,
  useDeleteTestimonial,
  useUploadFile,
} from "@/hooks";
import { ITestimonial } from "@/interfaces";
import { Quote, Plus, Trash2, Edit, Star, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileDropzone } from "@/components/ui/file-dropzone";
import { toast } from "sonner";

export interface TestimonialFormData {
  clientName: string;
  clientRole: string;
  company: string;
  avatarUrl: string;
  quote: string;
  rating: number;
  isFeatured: boolean;
}

export function TestimonialsView() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<ITestimonial | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const uploadFileMutation = useUploadFile();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialFormData>({
    defaultValues: {
      clientName: "",
      clientRole: "VP of Engineering",
      company: "Fintech Partner",
      avatarUrl: "",
      quote: "",
      rating: 5,
      isFeatured: true,
    },
  });

  const {
    data: testimonials = [],
    isLoading,
    refetch,
    isRefetching,
  } = useTestimonials();

  const createMutation = useCreateTestimonial();
  const updateMutation = useUpdateTestimonial();
  const deleteMutation = useDeleteTestimonial();

  const handleOpenCreate = () => {
    setEditingTestimonial(null);
    reset({
      clientName: "",
      clientRole: "VP of Engineering",
      company: "Fintech Partner",
      avatarUrl: "",
      quote: "",
      rating: 5,
      isFeatured: true,
    });
    setDialogOpen(true);
  };

  const handleOpenEdit = (t: ITestimonial) => {
    setEditingTestimonial(t);
    reset({
      clientName: t.clientName,
      clientRole: t.clientRole,
      company: t.company,
      avatarUrl: t.avatarUrl || "",
      quote: t.quote,
      rating: t.rating || 5,
      isFeatured: t.isFeatured,
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: TestimonialFormData) => {
    const payload = {
      clientName: data.clientName,
      clientRole: data.clientRole,
      company: data.company,
      avatarUrl: data.avatarUrl || undefined,
      quote: data.quote,
      rating: Number(data.rating),
      isFeatured: data.isFeatured,
      isApproved: true,
      order: 0,
    };

    if (editingTestimonial) {
      updateMutation.mutate(
        { id: editingTestimonial._id, payload },
        { onSuccess: () => setDialogOpen(false) },
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => setDialogOpen(false),
      });
    }
  };

  const handleDelete = (id: string, name: string) => {
    setDeleteTarget({ id, name });
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Testimonials & Social Proof CMS
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-muted text-muted-foreground border border-border">
              {testimonials.length} endorsements
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Collect and display high-value endorsements from VP Engineering
            leaders and founders.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => refetch()}
            disabled={isRefetching}
            className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            title="Refresh"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${
                isRefetching ? "animate-spin text-primary" : ""
              }`}
            />
          </button>
          <button
            onClick={handleOpenCreate}
            className="px-3.5 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Endorsement</span>
          </button>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-5 space-y-3 animate-pulse"
            >
              <Skeleton className="h-5 w-36 bg-muted" />
              <Skeleton className="h-4 w-48 bg-muted" />
              <Skeleton className="h-12 w-full bg-muted" />
            </div>
          ))
        ) : testimonials.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-card border border-border rounded-xl">
            <Quote className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-60" />
            <p className="text-sm font-semibold text-foreground">
              No testimonials yet
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add client praise, performance recommendations, and peer reviews.
            </p>
          </div>
        ) : (
          testimonials.map((t: ITestimonial) => (
            <div
              key={t._id}
              className="bg-card border border-border hover:border-primary/40 rounded-xl p-5 transition-all group flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border border-border shrink-0">
                      <AvatarImage
                        src={t.avatarUrl}
                        alt={t.clientName}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                        {t.clientName
                          ? t.clientName.charAt(0).toUpperCase()
                          : "C"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground text-sm">
                          {t.clientName}
                        </span>
                        {t.isFeatured && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            STAR
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground block">
                        {t.clientRole}
                        {t.company ? ` @ ${t.company}` : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                    <button
                      onClick={() => handleOpenEdit(t)}
                      className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(t._id, t.clientName)}
                      className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-1 mt-3 text-amber-400">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="mt-3 text-xs text-foreground/85 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Testimonial Dialog Form with ScrollArea */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] flex flex-col bg-card border-border text-card-foreground p-0 overflow-hidden shadow-2xl gap-0">
          <DialogHeader className="p-6 pb-3 border-b border-border shrink-0">
            <DialogTitle className="text-base font-bold text-foreground">
              {editingTestimonial
                ? "Edit Endorsement"
                : "Add Client Testimonial"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Add social proof and leadership recommendations to accelerate
              client trust.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col min-h-0 flex-1 overflow-hidden"
          >
            <ScrollArea className="flex-1 min-h-0 w-full p-6">
              <div className="space-y-4 pr-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Client / Endorser Name *
                  </label>
                  <Input
                    type="text"
                    {...register("clientName", {
                      required: "Client name is required",
                    })}
                    placeholder="e.g. Sarah Jenkins"
                    className="text-xs h-9"
                  />
                  {errors.clientName && (
                    <span className="text-[10px] text-destructive">
                      {errors.clientName.message}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">
                      Title / Role *
                    </label>
                    <Input
                      type="text"
                      {...register("clientRole", {
                        required: "Role is required",
                      })}
                      placeholder="e.g. VP of Engineering"
                      className="text-xs h-9"
                    />
                    {errors.clientRole && (
                      <span className="text-[10px] text-destructive">
                        {errors.clientRole.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">
                      Company
                    </label>
                    <Input
                      type="text"
                      {...register("company")}
                      placeholder="e.g. Series-B FinTech"
                      className="text-xs h-9"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Client Avatar
                  </label>
                  <FileDropzone
                    variant="avatar"
                    previewUrl={watch("avatarUrl")}
                    onFileSelect={(file: File) => {
                      uploadFileMutation.mutate(
                        { file, folder: "testimonials" },
                        {
                          onSuccess: (res) => {
                            if (res?.url) {
                              setValue("avatarUrl", res.url);
                              toast.success("Client avatar uploaded");
                            }
                          },
                        },
                      );
                    }}
                    onClear={() => setValue("avatarUrl", "")}
                    isUploading={uploadFileMutation.isPending}
                    label="Upload client photo"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Endorsement Quote *
                  </label>
                  <Textarea
                    {...register("quote", { required: "Quote is required" })}
                    placeholder="He delivered exceptional high-throughput code on time..."
                    rows={4}
                    className="text-xs resize-none"
                  />
                  {errors.quote && (
                    <span className="text-[10px] text-destructive">
                      {errors.quote.message}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <Controller
                      name="isFeatured"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="isFeatTest"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <label
                      htmlFor="isFeatTest"
                      className="text-xs text-foreground cursor-pointer select-none"
                    >
                      Feature on Homepage
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground">
                      Rating:
                    </label>
                    <Controller
                      name="rating"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={String(field.value)}
                          onValueChange={(val) => field.onChange(Number(val))}
                        >
                          <SelectTrigger className="w-28 text-xs h-8">
                            <SelectValue placeholder="Rating" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 Stars</SelectItem>
                            <SelectItem value="4">4 Stars</SelectItem>
                            <SelectItem value="3">3 Stars</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </div>
            </ScrollArea>

            <DialogFooter className="p-4 px-6 border-t border-border bg-muted/30 flex items-center justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm cursor-pointer"
              >
                {editingTestimonial ? "Save Changes" : "Create Endorsement"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            deleteMutation.mutate(deleteTarget.id, {
              onSuccess: () => setDeleteTarget(null),
            });
          }
        }}
        title="Delete Testimonial"
        description={`Are you sure you want to delete the testimonial from "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmText="Delete Testimonial"
        isLoading={deleteMutation.isPending}
        variant="destructive"
      />
    </div>
  );
}
