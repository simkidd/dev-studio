"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateExperience, useUpdateExperience } from "@/hooks";
import { ExperienceType, IExperience } from "@/interfaces";
import { Plus, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

export interface ExperienceFormData {
  company: string;
  role: string;
  location: string;
  employmentType: ExperienceType;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  summary: string;
  technologies: string;
  achievements: { value: string }[];
}

export interface ExperienceEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  exp?: IExperience | null;
  onSaved?: () => void;
}

const ExperienceEditorDialog = ({
  isOpen,
  onClose,
  exp,
  onSaved,
}: ExperienceEditorDialogProps) => {
  const createMutation = useCreateExperience();
  const updateMutation = useUpdateExperience();

  const isSaving = createMutation.isPending || updateMutation.isPending;

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    defaultValues: {
      company: "",
      role: "",
      location: "",
      employmentType: "full-time",
      startDate: "",
      endDate: "",
      isCurrent: false,
      summary: "",
      technologies: "TypeScript, React, Node.js",
      achievements: [
        { value: "Architected core microservices leading to 40% latency drop" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "achievements",
  });

  const isCurrent = watch("isCurrent");

  useEffect(() => {
    if (exp) {
      reset({
        company: exp.company,
        role: exp.role,
        location: exp.location || "",
        employmentType: exp.employmentType || "full-time",
        startDate: exp.startDate ? exp.startDate.split("T")[0] : "",
        endDate: exp.endDate ? exp.endDate.split("T")[0] : "",
        isCurrent: exp.isCurrent,
        summary: exp.summary || "",
        technologies: (exp.technologies || []).join(", "),
        achievements:
          exp.achievements && exp.achievements.length > 0
            ? exp.achievements.map((h) => ({ value: h }))
            : [{ value: "" }],
      });
    } else {
      reset({
        company: "",
        role: "",
        location: "",
        employmentType: "full-time",
        startDate: "",
        endDate: "",
        isCurrent: false,
        summary: "",
        technologies: "TypeScript, React, Node.js",
        achievements: [{ value: "" }],
      });
    }
  }, [exp, reset, isOpen]);

  const onSubmit = (data: ExperienceFormData) => {
    const techList = data.technologies
      ? data.technologies
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const achievementList = data.achievements
      .map((a) => a.value.trim())
      .filter((v) => v.length > 0);

    const payload = {
      company: data.company,
      role: data.role,
      location: data.location,
      employmentType: data.employmentType,
      isRemote: data.location.toLowerCase().includes("remote"),
      startDate: new Date(data.startDate).toISOString(),
      endDate:
        data.isCurrent || !data.endDate
          ? undefined
          : new Date(data.endDate).toISOString(),
      isCurrent: data.isCurrent,
      summary: data.summary,
      technologies: techList,
      achievements: achievementList,
    };

    if (exp) {
      updateMutation.mutate(
        { id: exp._id, payload },
        { onSuccess: () => onClose() },
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => onClose(),
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="sm:max-w-2xl max-h-[90vh] flex flex-col bg-card border-border text-card-foreground p-0 overflow-hidden shadow-2xl gap-0"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="p-6 pb-3 border-b border-border shrink-0">
          <DialogTitle className="text-base font-bold text-foreground">
            {exp ? "Edit Career Experience" : "Add Career Experience"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Highlight quantified achievements, architecture leadership, and
            engineering impact.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col min-h-0 flex-1 overflow-hidden"
        >
          <ScrollArea className="flex-1 min-h-0 w-full p-4 overflow-y-auto">
            <div className="space-y-4 pl-2">
              {/* Company & Role */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Company Name *
                  </label>
                  <Input
                    type="text"
                    {...register("company", {
                      required: "Company is required",
                    })}
                    placeholder="e.g. Stripe, Vercel"
                    className="text-xs h-9"
                  />
                  {errors.company && (
                    <span className="text-[10px] text-destructive">
                      {errors.company.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Job Title / Role *
                  </label>
                  <Input
                    type="text"
                    {...register("role", { required: "Role is required" })}
                    placeholder="e.g. Staff Full-Stack Engineer"
                    className="text-xs h-9"
                  />
                  {errors.role && (
                    <span className="text-[10px] text-destructive">
                      {errors.role.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Location
                  </label>
                  <Input
                    type="text"
                    {...register("location")}
                    placeholder="e.g. San Francisco, CA (Remote)"
                    className="text-xs h-9"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Type
                  </label>
                  <Controller
                    name="employmentType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="text-xs h-9 w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-Time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
                          <SelectItem value="part-time">Part-Time</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Start Date *
                  </label>
                  <Input
                    type="date"
                    {...register("startDate", {
                      required: "Start date is required",
                    })}
                    className="text-xs h-9"
                  />
                  {errors.startDate && (
                    <span className="text-[10px] text-destructive">
                      {errors.startDate.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    End Date
                  </label>
                  <Input
                    type="date"
                    {...register("endDate")}
                    disabled={isCurrent}
                    className="text-xs h-9 disabled:opacity-40"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Controller
                  name="isCurrent"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="isCurrentExp"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <label
                  htmlFor="isCurrentExp"
                  className="text-xs text-foreground cursor-pointer select-none"
                >
                  I currently work in this role
                </label>
              </div>

              {/* Technologies */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Technologies (comma-separated)
                </label>
                <Input
                  type="text"
                  {...register("technologies")}
                  placeholder="TypeScript, React, GraphQL, Tailwind CSS"
                  className="text-xs h-9 font-mono"
                />
              </div>

              {/* Summary */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Role Summary
                </label>
                <Textarea
                  {...register("summary")}
                  placeholder="High-level description of responsibilities and scope..."
                  rows={2}
                  className="text-xs resize-none"
                />
              </div>

              {/* Achievements */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-foreground">
                    Key Achievements / Impact Bullets
                  </label>
                  <button
                    type="button"
                    onClick={() => append({ value: "" })}
                    className="text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add Bullet
                  </button>
                </div>
                {fields.map((field, i) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <Input
                      type="text"
                      {...register(`achievements.${i}.value` as const)}
                      placeholder="e.g. Led migration to Next.js reducing bundle size by 55%"
                      className="flex-1 text-xs h-9"
                    />
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(i)}
                        className="text-muted-foreground hover:text-destructive p-1 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="p-4 px-6 border-t border-border bg-muted/40 shrink-0">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="cursor-pointer text-xs px-4"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              size="sm"
              className="cursor-pointer text-xs flex items-center gap-1.5 px-4"
            >
              {exp ? "Save Changes" : "Create Record"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceEditorDialog;
