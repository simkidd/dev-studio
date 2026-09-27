"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../../ui/input";
import { ScrollArea } from "../../ui/scroll-area";
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

import { TechIcon } from "@/components/ui/tech-icon";
import { POPULAR_TECH_NAMES } from "@/lib/tech-icons";

export interface SkillFormData {
  name: string;
  category: SkillCategory;
  isTopSkill: boolean;
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

  const isSaving =
    createSkillMutation.isPending || updateSkillMutation.isPending;

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SkillFormData>({
    defaultValues: {
      name: "",
      category: "Languages",
      isTopSkill: false,
    },
  });

  const currentName = watch("name");

  useEffect(() => {
    if (skill) {
      reset({
        name: skill.name,
        category: skill.category,
        isTopSkill: skill.isTopSkill,
      });
    } else {
      reset({
        name: "",
        category: "Languages",
        isTopSkill: false,
      });
    }
  }, [skill, reset, isOpen]);

  const onSubmit = (data: SkillFormData) => {
    const payload = {
      name: data.name,
      category: data.category,
      isTopSkill: data.isTopSkill,
    };

    if (skill) {
      updateSkillMutation.mutate(
        { id: skill._id, payload },
        {
          onSuccess: () => {
            onSaved();
            onClose();
          },
        },
      );
    } else {
      createSkillMutation.mutate(payload, {
        onSuccess: () => {
          onSaved();
          onClose();
        },
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
            Showcase specific tools, languages, and frameworks with authentic brand logos.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col min-h-0 flex-1"
        >
          <ScrollArea className="flex-1 w-full p-4 overflow-y-auto">
            <div className="space-y-4 px-2">
              {/* Skill Name with Live Icon Preview */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Skill / Technology Name *
                </label>
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-muted/70 border border-border flex items-center justify-center shrink-0 shadow-xs p-2">
                    <TechIcon
                      name={currentName || "Tech"}
                      size={24}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      type="text"
                      {...register("name", {
                        required: "Skill name is required",
                      })}
                      placeholder="e.g. React, Ruby, .NET, Docker"
                      className="text-xs h-9"
                    />
                  </div>
                </div>
                {errors.name && (
                  <span className="text-[10px] text-destructive">
                    {errors.name.message}
                  </span>
                )}

                {/* Quick tech suggestions */}
                {!skill && !currentName && (
                  <div className="pt-1">
                    <p className="text-[10px] text-muted-foreground mb-1.5 font-medium">
                      Quick suggestions:
                    </p>
                    <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                      {POPULAR_TECH_NAMES.slice(0, 12).map((tech) => (
                        <button
                          key={tech}
                          type="button"
                          onClick={() => setValue("name", tech)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted/80 hover:bg-primary/10 hover:text-primary text-[10px] border border-border/60 transition-colors cursor-pointer"
                        >
                          <TechIcon name={tech} size={12} />
                          <span>{tech}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Category */}
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

              {/* Highlight as Top Skill */}
              <div className="flex items-center gap-2 pt-2 border-t border-border/60">
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
              disabled={isSaving}
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
