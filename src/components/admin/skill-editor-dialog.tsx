"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { ISkill, SkillCategory } from "@/interfaces";
import { useCreateSkill, useUpdateSkill } from "@/hooks";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export interface SkillFormData {
  name: string;
  category: SkillCategory;
  proficiency: number;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  isTopSkill: boolean;
  icon: string;
}

export interface SkillEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  skill?: ISkill | null;
  onSaved: () => void;
}

const CATEGORIES: SkillCategory[] = [
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "DevOps/Cloud",
  "Architecture",
  "Tools",
];

const SkillEditorDialog = ({
  isOpen,
  onClose,
  onSaved,
  skill,
}: SkillEditorDialogProps) => {
  const createSkillMutation = useCreateSkill();
  const updateSkillMutation = useUpdateSkill();

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SkillFormData>({
    defaultValues: {
      name: "",
      category: "Languages",
      proficiency: 90,
      level: "Expert",
      isTopSkill: false,
      icon: "",
    },
  });

  const proficiency = watch("proficiency");

  useEffect(() => {
    if (skill) {
      reset({
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency ?? 90,
        level: skill.level || "Expert",
        isTopSkill: skill.isTopSkill,
        icon: skill.icon || "",
      });
    } else {
      reset({
        name: "",
        category: "Languages",
        proficiency: 90,
        level: "Expert",
        isTopSkill: false,
        icon: "",
      });
    }
  }, [skill, reset, isOpen]);

  const onSubmit = (data: SkillFormData) => {
    const payload = {
      name: data.name,
      category: data.category,
      proficiency: Number(data.proficiency),
      level: data.level,
      isTopSkill: data.isTopSkill,
      icon: data.icon,
    };

    if (skill) {
      updateSkillMutation.mutate(
        { id: skill._id, payload },
        {
          onSuccess: () => onClose(),
        },
      );
    } else {
      createSkillMutation.mutate(payload, {
        onSuccess: () => onClose(),
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="sm:max-w-md max-h-[90vh] flex flex-col bg-card border-border text-card-foreground p-0 overflow-hidden shadow-2xl gap-0"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="p-6 pb-3 border-b border-border shrink-0">
          <DialogTitle className="text-base font-bold text-foreground">
            {skill ? "Edit Skill" : "Add Technical Skill"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Showcase specific tools, languages, and systems in your interactive
            tech stack matrix.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col min-h-0 h-[200px]! flex-1"
        >
          <ScrollArea className="flex-1  w-full px-6 py-4 overflow-y-auto">
            <div className="space-y-4 pr-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Skill Name *
                </label>
                <Input
                  type="text"
                  {...register("name", {
                    required: "Skill name is required",
                  })}
                  placeholder="e.g. Next.js, Kubernetes, Rust"
                  className="text-xs h-9"
                />
                {errors.name && (
                  <span className="text-[10px] text-destructive">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Category
                  </label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="text-xs h-9 w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Mastery Level
                  </label>
                  <Controller
                    name="level"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="text-xs h-9 w-full">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <label className="font-medium text-foreground">
                    Proficiency Percentage
                  </label>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    {proficiency}%
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  {...register("proficiency", { valueAsNumber: true })}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Controller
                  name="isTopSkill"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="featSkill"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <label
                  htmlFor="featSkill"
                  className="text-xs text-foreground cursor-pointer select-none"
                >
                  Highlight as Top Skill on Homepage
                </label>
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
              disabled={isSubmitting}
              size="sm"
              className="cursor-pointer text-xs flex items-center gap-1.5 px-4"
            >
              {skill ? "Save Changes" : "Create Skill"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SkillEditorDialog;
